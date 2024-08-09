import React from 'react';
import { Box, Table, Heading, Container } from '@radix-ui/themes';
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
import PropertySettingsComponent from './components/property_settings.component';
import PropertyCreateComponent from './components/property_create.component';
import { motion } from "framer-motion";
import TableDataComponent from './components/table_data.component';
import ContentComponent from '../../../components/content/content.component';

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
      numberOfRows: 14,
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

  const totalRows = propertiesQuery.data?.totalRows as number;


  const refetch = () => propertiesQuery.refetch();


  const renderPrefix = () => {
    return (
      <>
        <PropertyFilterComponent />
        <PropertySettingsComponent refetchProperties={refetch} />
      </>
    )
  }
  const renderCreateProperty = () => {
    return (
      <PropertyCreateComponent refetchProperties={refetch} />
    )
  }

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
        <Box mb={"4"}>
          <Heading size='8'>Properties</Heading>
        </Box>
      </motion.div>
      <ContentComponent >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <TableHeaderComponent
            create={renderCreateProperty()}
            prefix={renderPrefix()}
            reload={true}
            onReload={refetch}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} >
          <Table.Root variant='surface'>
            <TableHeadComponent />

            <Table.Body>
              {propertiesQuery.isLoading && <PropertyTableLoading />}
              {propertiesQuery.data?.properties && (
                <TableDataComponent propertyEntity={propertiesQuery.data.properties as PropertiesEntity[]} />
              )}

            </Table.Body>
          </Table.Root>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} >
          <Pagination totalRows={totalRows} recordsPerPage={10} />
        </motion.div>
      </ContentComponent>
    </div >
  );
}
