import React from "react";
import { motion } from "framer-motion"
import { Badge, Box, Button, Heading, Table } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import GetTenantListUseCase from "../domain/use_case/get_tenant_list.use_case";
import PaginationEntity from "../../../application/entity/pagination.entity";
import { plainToInstance } from "class-transformer";
import TenantEntity from "../domain/entity/tenant.entity";
import TenantListEntity from "../domain/entity/tenant_list.entity";
import TableHeaderComponent from "../../../components/table_header/table_header.component";
import Pagination from "../../../components/pagination/pagination.component";
import TableHeadComponent from "./component/table_head.component";
import Failure from "../../../application/failure/failure";
import TimeoutFailure from "../../../application/failure/timeout.failure";
import { useNavigate } from "react-router-dom";
import TableLoadingComponent from "./component/table_loading.component";
import TableDataComponent from "./component/table_data.component";
import { MixerVerticalIcon } from "@radix-ui/react-icons";
import TenantFilterComponent from "./component/tenant_filter.component";
import TenantCreateComponent from "./component/tenant_create.component";

export default function TenantContainer() {
    const navigate = useNavigate();
    const queryPathParameters = new URLSearchParams(location.search);
    const sortBy = queryPathParameters.get("sortBy") ?? "id";
    const page = queryPathParameters.get("page") ?? "1";
    const search = queryPathParameters.get("search") ?? "";
    const sortOrder = queryPathParameters.get("sortOrder") ?? "DESC";
    const filters = queryPathParameters.get("filters") ?? "";

    const columns = "full_name,first_name,last_name,email,status_name,contact_number";
    const fetchTenants = async () => {
        const paginationEntity = plainToInstance(PaginationEntity, {
            numberOfRows: 14,
            page: parseInt(page, 10),
            columns,
            sortBy,
            sortOrder,
            search,
            filters,
        });

        const response = await GetTenantListUseCase({
            paginationEntity
        });

        if (response instanceof TimeoutFailure) {
            alert("Your session has expired. Please login again.");
            return navigate("/login");
        }

        if (response instanceof Failure) {
            alert(response.message);
        }

        return response as TenantListEntity;
    };

    const tenantListQuery = useQuery({
        queryKey: ["tenants", search, page, columns, sortBy, sortOrder, filters],
        queryFn: fetchTenants,
        retry: true,
        refetchOnWindowFocus: true,
    });

    const tenants = tenantListQuery.data?.tenants as TenantEntity[];
    const totalRows = tenantListQuery.data?.totalRows as number;

    const refetch = () => {
        tenantListQuery.refetch();
    }

    const renderPrefix = () => {
        return (
            <TenantFilterComponent />
        )
    }
    const renderCreateButton = () => {
        return (
            <TenantCreateComponent />
        )
    }

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