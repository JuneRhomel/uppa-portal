import React from "react";
import { motion } from "framer-motion"
import { Box, Heading, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import PaginationEntity from "../../../application/entity/pagination.entity";
import { plainToInstance } from "class-transformer";
import TenantListEntity from "../domain/entity/tenant_list.entity";
import TableHeaderComponent from "../../../components/table_header/table_header.component";
import Pagination from "../../../components/pagination/pagination.component";
import TableHeadComponent from "./component/table_head.component";
import TableDataComponent from "./component/table_data.component";
import TenantFilterComponent from "./component/tenant_filter.component";
import TenantCreateComponent from "./component/tenant_create.component";
import { AppDispatch } from "../../../infrastructure/redux/store.redux";
import { useDispatch } from "react-redux";
import { getTenantList } from "../../../infrastructure/api/slice/tenant/get_tenant_list_api.slice";

export default function TenantContainer() {
    const dispatch: AppDispatch = useDispatch();
    const queryPathParameters = new URLSearchParams(location.search);
    const sortBy = queryPathParameters.get("sortBy") ?? "id";
    const page = queryPathParameters.get("page") ?? "1";
    const search = queryPathParameters.get("search") ?? "";
    const sortOrder = queryPathParameters.get("sortOrder") ?? "DESC";
    const filters = queryPathParameters.get("filters") ?? "";

    const columns = "full_name,first_name,last_name,email,status_name,contact_number";
    const fetchTenants = async () => {
        const paginationEntity = plainToInstance(PaginationEntity, {
            numberOfRows: 10,
            page: parseInt(page, 10),
            columns,
            sortBy,
            sortOrder,
            search,
            filters,
        });

        const response = await dispatch(getTenantList({ paginationEntity }));


        if (response.payload === "UnhandledFailure") alert("UnhandledFailure");

        return response.payload as TenantListEntity;
    };

    const tenantListQuery = useQuery({
        queryKey: ["tenants", search, page, columns, sortBy, sortOrder, filters],
        queryFn: fetchTenants,
        retry: true,
        refetchOnWindowFocus: true,
    });

    const totalRows = tenantListQuery.data?.totalRows as number;

    const refetch = () => tenantListQuery.refetch();

    const renderPrefix = () => <TenantFilterComponent />

    const renderCreateButton = () => <TenantCreateComponent fetchTenant={refetch} />

    return (
        <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} >
                <Box mb={"7"}>
                    <Heading size='8'>Tenants</Heading>
                </Box>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <TableHeaderComponent
                    reload={true}
                    onReload={refetch}
                    prefix={renderPrefix()}
                    create={renderCreateButton()}
                />
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>

                <Table.Root variant='surface'>
                    <TableHeadComponent />
                    <Table.Body>
                        <TableDataComponent tenantListQuery={tenantListQuery} />
                    </Table.Body>
                </Table.Root >
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} >
                <Pagination totalRows={totalRows} recordsPerPage={10} />
            </motion.div>
        </div >

    );
}