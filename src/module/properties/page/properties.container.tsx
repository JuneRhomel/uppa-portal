import React from 'react';
import { Box, Table, Heading } from '@radix-ui/themes';
import { motion } from "framer-motion";
import { useQuery } from '@tanstack/react-query';
import PaginationEntity from '../../../application/entity/pagination.entity';
import { plainToInstance } from 'class-transformer';
import Pagination from '../../../components/pagination/pagination.component';
import TableHeaderComponent from '../../../components/table_header/table_header.component';
import TableHeadComponent from './components/table_head.component';
import PropertyFilterComponent from './components/property_filter.component';
import PropertyTableLoading from './components/property_table_loading';
import PropertySettingsComponent from './components/property_settings.component';
import PropertyCreateComponent from './components/property_create.component';
import TableDataComponent from './components/table_data.component';
import ContentComponent from '../../../components/content/content.component';
import { AppDispatch, RootState } from "../../../infrastructure/redux/store.redux";
import { useDispatch, useSelector } from 'react-redux';
import { getPropertyList } from '../../../infrastructure/api/slice/get_property_list_api.slice';
import ListPropertiesEntity from '../../../infrastructure/api/module/property/domain/entity/list_properties.entity';
import PropertiesEntity from '../../../infrastructure/api/module/property/domain/entity/properties.entity';
import { useNavigate } from 'react-router-dom';

export default function PropertiesContainer() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const queryPathParameters = new URLSearchParams(location.search);
  const sortBy = queryPathParameters.get("sortBy") ?? "id";
  const page = queryPathParameters.get("page") ?? "1";
  const search = queryPathParameters.get("search") ?? "";
  const sortOrder = queryPathParameters.get("sortOrder") ?? "DESC";
  const filters = queryPathParameters.get("filters") ?? "";

  const propertyListState = useSelector((state: RootState) => state.getProeprtyListApi);

  const columns = "unit_name,unit_type_name,unit_status_name";
  const fetchProperties = async () => {
    const pagination = plainToInstance(PaginationEntity, {
      numberOfRows: 10,
      page: parseInt(page, 10),
      columns,
      sortBy,
      sortOrder,
      search,
      filters,
    });

    const response = await dispatch(getPropertyList(pagination));

    if (response.payload === "UnhandledFailure") {
      return;
    }

    if (response.payload === "Failure") {
      return;
    }

    return response.payload as ListPropertiesEntity;
  };

  const propertiesQuery = useQuery({
    queryKey: ["properties_list", search, page, columns, sortBy, sortOrder, filters],
    queryFn: fetchProperties,
    retry: true,
    refetchOnWindowFocus: true,
  });

  const totalRows = propertiesQuery.data?.totalRows as number;

  const refetchProperties = () => propertiesQuery.refetch();

  const renderPrefix = () => (
    <>
      <PropertyFilterComponent />
      <PropertySettingsComponent refetchProperties={refetchProperties} />
    </>
  );

  const renderCreateProperty = () => <PropertyCreateComponent refetchProperties={refetchProperties} />

  return (
    <div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <Box mb="4">
          <Heading size="8">Properties</Heading>
        </Box>
      </motion.div>
      <ContentComponent>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <TableHeaderComponent
            create={renderCreateProperty()}
            prefix={renderPrefix()}
            reload={true}
            onReload={refetchProperties}
          />
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Table.Root variant="surface">
            <TableHeadComponent />
            <Table.Body>
              {propertyListState.isLoading && <PropertyTableLoading />}
              {propertiesQuery.data?.properties && (
                <TableDataComponent propertyEntity={propertiesQuery.data.properties as PropertiesEntity[]} />
              )}
            </Table.Body>
          </Table.Root>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Pagination totalRows={totalRows} recordsPerPage={10} />
        </motion.div>
      </ContentComponent>
    </div>
  );
}
