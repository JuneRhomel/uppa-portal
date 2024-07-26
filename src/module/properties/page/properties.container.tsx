import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import TimeoutFailure from '../../../application/failure/timeout.failure';
import PropertiesUseCase from '../domain/use_case/properties.use_case';
import PaginationEntity from '../../../application/entity/pagination.entity';
import { plainToInstance } from 'class-transformer';
import { useNavigate } from 'react-router-dom';
import Failure from '../../../application/failure/failure';
import { Box, Button, Flex, Table, TextField, Text } from '@radix-ui/themes';
import PropertiesEntity from '../domain/entity/properties.entity';
import ListPropertiesEntity from '../domain/entity/list_properties.entity';
import { MagnifyingGlassIcon, PlusIcon } from '@radix-ui/react-icons'
import Pagination from '../../../components/pagination/pagination.component';

export default function PropertiesContainer() {

  const navigate = useNavigate();
  const queryPathParameters = new URLSearchParams(location.search);
  const sortBy = queryPathParameters.get("sortBy") ?? "id";
  const page = queryPathParameters.get("page") ?? "1";
  const search = queryPathParameters.get("search") ?? "";
  const sortOrder = queryPathParameters.get("sortOrder") ?? "DESC";
  const filters = queryPathParameters.get("filters") ?? "";

  const columns = "unit_name,unit_type_name,unit_status_name";
  const fetchProperties = async () => {
    const paginationEntity = plainToInstance(PaginationEntity, {
      numberOfRows: 10,
      page: parseInt(page, 10),
      columns,
      sortBy,
      sortOrder,
      search,
      filters,
    });

    const response = await PropertiesUseCase({
      paginationEntity,
    });

    if (response instanceof TimeoutFailure) {
      alert("Your session has expired. Please login again.");
      return navigate("/login");
    }
    if (response instanceof Failure) {
      alert(response.message);
    }
    return response as ListPropertiesEntity;
  };

  const propertiesQuery = useQuery({
    queryKey: ["properties", search, page, columns, sortBy, sortOrder, filters],
    queryFn: fetchProperties,
    retry: true,
    refetchOnWindowFocus: true,
  });

  const properties = propertiesQuery.data?.properties as PropertiesEntity[];
  const totalRows = propertiesQuery.data?.totalRows as number;

  function calculateTotalPages(totalRows, recordsPerPage) {
    if (recordsPerPage <= 0) {
      return 0;
    }
    return Math.ceil(totalRows / recordsPerPage);
  }

  const totalPages = calculateTotalPages(totalRows, 10);
  const refetch = () => propertiesQuery.refetch();
  return (
    <div>
      <Flex justify={"between"} mb="5">
        <TextField.Root placeholder="Search the properties">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <Button onClick={refetch}> <PlusIcon /> Create Property</Button>
      </Flex>

      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Property</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Type</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>

          {propertiesQuery.isLoading && <Table.Row><Table.Cell><Text>Loading...</Text></Table.Cell></Table.Row>}

          {properties && properties.map((property) => (
            <Table.Row key={property.id}>
              <Table.RowHeaderCell>{property.id}</Table.RowHeaderCell>
              <Table.RowHeaderCell>{property.unit_name}</Table.RowHeaderCell>
              <Table.Cell>{property.unit_type_name}</Table.Cell>
              <Table.Cell>{property.unit_status_name}</Table.Cell>
            </Table.Row>
          ))}

        </Table.Body>
      </Table.Root>

      <Pagination totalRows={totalRows} recordsPerPage={10} />
    </div>
  );
}
