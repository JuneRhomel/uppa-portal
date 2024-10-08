import React from "react";
import { motion } from "framer-motion";
import { Box, Heading, TabNav, Table, Tooltip } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { plainToInstance } from "class-transformer";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import PaginationEntity from "../../../../application/entity/pagination.entity";
import TabelDataComponent from "./component/table_data.component";
import TableLoadingComponent from "./component/table_loading.component";
import Pagination from "../../../../components/pagination/pagination.component";
import TableHeaderComponent from "../../../../components/table_header/table_header.component";
import TableHeadComponent from "./component/table_head.component";
import MotherMeterElectricityCreateComponent from "./component/mother_meter_electricity_create.component";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { getMotherMeterElectricityList } from "../../../../infrastructure/api/slice/mother_meter_electricity/get_mother_meter_electricity_list_api.slice";
import MotherMeterElectricityListEntity from "../../../../infrastructure/api/module/mother_meter_electricity/domain/entity/mother_meter_electricity_list.entity";
import MotherMeterElectricityEntity from "../../../../infrastructure/api/module/mother_meter_electricity/domain/entity/mother_meter_electricity.entity";


export default function MotherMeterElectricityContainer() {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const queryPathParameters = new URLSearchParams(location.search);
    const sortBy = queryPathParameters.get("sortBy") ?? "id";
    const page = queryPathParameters.get("page") ?? "1";
    const search = queryPathParameters.get("search") ?? "";
    const sortOrder = queryPathParameters.get("sortOrder") ?? "DESC";
    const filters = queryPathParameters.get("filters") ?? "";
    const columns = "serial_number,created_at";

    const fetchMotherElectricity = async () => {

        const paginationEntity = plainToInstance(PaginationEntity, {
            numberOfRows: 10,
            page: parseInt(page, 10),
            columns,
            sortBy,
            sortOrder,
            search,
            filters,
        });

        const response = await dispatch(getMotherMeterElectricityList({ paginationEntity }));
        if (response.payload === "UnhandledFailure") {
            return;
        }

        return response.payload as MotherMeterElectricityListEntity;
    }

    const motherMeterElectricityQuery = useQuery({
        queryKey: ["mother_meter_Electricity", search, page, columns, sortBy, sortOrder, filters],
        queryFn: fetchMotherElectricity
    });




    const totalRows = motherMeterElectricityQuery.data?.totalRows as number;
    const motherMeterElectricityEntity = motherMeterElectricityQuery.data?.motherMeterElectricityEntity as MotherMeterElectricityEntity[];

    const renderData = () => {

        if (motherMeterElectricityQuery.isLoading) {
            return <TableLoadingComponent />
        }

        if (motherMeterElectricityEntity.length === 0) {
            return <div>No Data</div>
        }

        return <TabelDataComponent motherMeterElectricityEntity={motherMeterElectricityEntity} />
    }

    const handelNavigateTab = (url: string) => {
        navigate(url);
    }
    const refetch = () => {

        motherMeterElectricityQuery.refetch();
    }
    const renderCreateMotherMeter = () => {

        return <MotherMeterElectricityCreateComponent refetchList={refetch} />
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
                    <TabNav.Link onClick={() => handelNavigateTab("/mother-meter/water")} >Water</TabNav.Link>
                </Tooltip>
                <Tooltip content={"Electricity"}  >
                    <TabNav.Link onClick={() => handelNavigateTab("/mother-meter/electricity")} active >Electricity</TabNav.Link>
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
    )


}