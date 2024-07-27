import React, { useState } from 'react';
import { Box, Button, Flex, Separator, Table, TextField, Text, Popover, Heading, IconButton } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import TimeoutFailure from '../../../application/failure/timeout.failure';
import PropertiesUseCase from '../domain/use_case/properties.use_case';
import PaginationEntity from '../../../application/entity/pagination.entity';
import { plainToInstance } from 'class-transformer';
import { useNavigate } from 'react-router-dom';
import Failure from '../../../application/failure/failure';
import PropertiesEntity from '../domain/entity/properties.entity';
import ListPropertiesEntity from '../domain/entity/list_properties.entity';
import Pagination from '../../../components/pagination/pagination.component';
import TableHeaderComponent from '../../../components/table_header/table_header.component';
import TableHeadComponent from './components/table_head.component';
import PropertyFilterComponent from './components/property_filter.component';
import PropertyTableLoading from './components/property_table_loading';
import { GearIcon } from '@radix-ui/react-icons';
import PropertySettingsComponent from './components/property_settings.component';
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


  const refetch = () => propertiesQuery.refetch();


  const renderPrefix = () => {
    return (
      <>
        <PropertyFilterComponent />
        <PropertySettingsComponent />
      </>
    )
  }

  return (
    <div>
      <Box mb={"7"}>
        <Heading size='8'>Properties</Heading>
      </Box>
      <TableHeaderComponent
        create={true}
        prefix={renderPrefix()}
        reload={true}
        onReload={refetch}
      />
      <Table.Root variant='surface'>
        <TableHeadComponent />

        <Table.Body>
          {propertiesQuery.isLoading && <PropertyTableLoading />}

          {properties && properties.map((property) => (
            <Table.Row key={property.id}>
              <Table.Cell>{property.id}</Table.Cell>
              <Table.Cell>{property.unit_name}</Table.Cell>
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
