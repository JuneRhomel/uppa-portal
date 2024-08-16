import { Box, Heading, Table, TabNav, Tabs, Tooltip } from "@radix-ui/themes";
import { motion } from "framer-motion";
import React from "react";
import TableHeaderComponent from "../../../../components/table_header/table_header.component";
import { useNavigate } from "react-router-dom";
import PaginationEntity from "../../../../application/entity/pagination.entity";
import { plainToInstance } from "class-transformer";
import GetMotherMeterWaterListUseCase from "../domain/use_case/get_mother_meter_water_list.use_case"
import TimeoutFailure from "../../../../application/failure/timeout.failure";
import toast from "react-hot-toast";
import MotherMeterWaterListEntity from "../domain/entity/mother_meter_water_list.entity";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../../../components/pagination/pagination.component";
import TabelDataComponent from "./component/tabel_data.component";
import MotherMeterWaterEntity from "../domain/entity/mother_meter_water.entity";
import TableHeadComponent from "./component/table_head.component";
import TableLoadingComponent from "./component/table_loading.component";
import MotherMeterWaterCreateComponent from "./component/mother_meter_water_create.component";

export default function MotherMeterWaterContainer() {
    const navigate = useNavigate();
    const queryPathParameters = new URLSearchParams(location.search);
    const sortBy = queryPathParameters.get("sortBy") ?? "id";
    const page = queryPathParameters.get("page") ?? "1";
    const search = queryPathParameters.get("search") ?? "";
    const sortOrder = queryPathParameters.get("sortOrder") ?? "DESC";
    const filters = queryPathParameters.get("filters") ?? "";

    const columns = "serial_number,created_at";
    const fetchMotherMeterWaters = async () => {

        const paginationEntity = plainToInstance(PaginationEntity, {
            numberOfRows: 10,
            page: parseInt(page, 10),
            columns,
            sortBy,
            sortOrder,
            search,
            filters,
        });

        const response = await GetMotherMeterWaterListUseCase({
            paginationEntity
        });
        
        if (response instanceof TimeoutFailure) {
            toast.error("Your session has expired. Please login again.");
            return navigate("/login");
        }

        return response as MotherMeterWaterListEntity;

    }

    const motherMeterWatersQuery = useQuery({
        queryKey: ["mother_meter_waters", search, page, columns, sortBy, sortOrder, filters],
        queryFn: fetchMotherMeterWaters
    });

    const totalRows = motherMeterWatersQuery.data?.totalRows as number;
    const motherMeterEntity = motherMeterWatersQuery.data?.motherMeterWaterEntity as MotherMeterWaterEntity[];

    const refetch = () => {
        motherMeterWatersQuery.refetch();
    }
    const renderData = () => {

        if (motherMeterWatersQuery.isLoading) {
            return <TableLoadingComponent />
        }

        if (motherMeterWatersQuery.isError) {
            return <div>Error</div>
        }

        return <TabelDataComponent motherMeterEntity={motherMeterEntity} />
    }

    const handelNavigateTab = (url: string) => {
        navigate(url);
    }

    const renderCreateMotherMeter = () => {
        return <MotherMeterWaterCreateComponent refetchMotherMetersWater={refetch} />
    }

    return (
        <div>

            <Box mb={"7"}>
                <Heading size='8'>Mother Meter</Heading>
            </Box>


            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <TableHeaderComponent
                    create={renderCreateMotherMeter()}
                />
            </motion.div>

            <TabNav.Root mb={"2"}>
                <Tooltip content={"Water"}  >
                    <TabNav.Link onClick={() => handelNavigateTab("/mother-meter/water")} active>Water</TabNav.Link>
                </Tooltip>
                <Tooltip content={"Electricity"}  >
                    <TabNav.Link onClick={() => handelNavigateTab("/mother-meter/electricity")} >Electricity</TabNav.Link>
                </Tooltip>
            </TabNav.Root>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Table.Root variant='surface'>
                    <TableHeadComponent />
                    <Table.Body>
                        {renderData()}
                    </Table.Body>
                </Table.Root>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} >
                <Pagination totalRows={totalRows} recordsPerPage={10} />
            </motion.div>

        </div>
    );
}