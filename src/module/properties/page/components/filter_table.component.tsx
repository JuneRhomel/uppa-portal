import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import Failure from "../../../../application/failure/failure";
import PropertyStatusEntity from "../../domain/entity/property_status.entity";
import GetPropertyTypeUseCase from "../../domain/use_case/get_property_type.use_case";
import GetPropertyStatusUseCase from "../../domain/use_case/get_property_status.use_case";
import PropertyTypeEntity from "../../domain/entity/property_type.entity";
import FilterTabelComponentParams from "../interface/filter_tabel_component.params";

export default function FilterTableComponent({ isOpen }: FilterTabelComponentParams) {
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorElStatus, setAnchorElStatus] = useState<null | HTMLElement>(null);
    const [anchorElType, setAnchorEType] = useState<null | HTMLElement>(null);
    const [selectedStatus, setSelectedStatus] = useState<string>("");
    const [selectedType, setSelectedType] = useState<string>("");
    const [listPropertyStatus, setListPropertyStatus] = useState([] as PropertyStatusEntity[]);
    const [listPropertyType, setListPropertyType] = useState([] as PropertyTypeEntity[]);

    const openStatus = Boolean(anchorElStatus);
    const openType = Boolean(anchorElType);
    const handleClickStatus = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorElStatus(event.currentTarget);
    };
    const handleCloseStatus = () => {
        setAnchorElStatus(null);
    };

    const handleClickType = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEType(event.currentTarget);
    };
    const handleCloseType = () => {
        setAnchorEType(null);
    };

    const propertyTypesQuery = async () => {
        const response = await GetPropertyTypeUseCase();
        if (response instanceof Failure) {
            alert(response.message);
        }
        return response;
    }
    const propertyStatusQuery = async () => {
        const response = await GetPropertyStatusUseCase();
        if (response instanceof Failure) {
            alert(response.message);
        }
        return response;
    }


    useEffect(() => {
        const fetchPropertyTypes = async () => {
            const propertyTypes = await propertyTypesQuery() as PropertyTypeEntity[];
            const propertyStatus = await propertyStatusQuery() as PropertyStatusEntity[];
            setListPropertyType(propertyTypes);
            setListPropertyStatus(propertyStatus);
        };

        fetchPropertyTypes();
    }, []);

    const queryPathParameters = new URLSearchParams(location.search);
    const columns = queryPathParameters.get("columns") ?? "";
    const sortBy = queryPathParameters.get("sortBy") ?? "";
    const sortOrder = queryPathParameters.get("sortOrder") ?? "";
    const page = queryPathParameters.get("page") ?? "1";
    const search = queryPathParameters.get("search") ?? "";
    const filters = queryPathParameters.get("filters") ?? "";

    const handelChangeStatus = (value: string) => {
        setSelectedStatus(value);
        let filterData = ""
        if (selectedType) {
            filterData = `unit_status_name='${value}',unit_type_name='${selectedType}'`;
        } else {
            filterData = `unit_status_name='${value}'`;
        }
        navigate(
            `/properties?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&columns=${columns}&search=${search}&filters=${filterData}`,
        );
    };
    const handelChangeType = (value) => {
        setSelectedType(value);
        let filterData = ""
        if (selectedStatus) {
            filterData = `unit_status_name='${selectedStatus}',unit_type_name='${value}'`;
        } else {
            filterData = `unit_type_name='${value}'`;
        }
        navigate(
            `/properties?page=${page}&sortBy=${sortBy}&sortOrder=${sortOrder}&columns=${columns}&search=${search}&filters=${filterData}`,
        );

    };
    if (!isOpen) {
        return null;
    }
    return (
        <Box paddingBlock={2} display="flex" gap={2}>
            <Button
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClickStatus}
            >
                <Typography fontSize={12} >
                    Status :&nbsp;
                </Typography>
                <Typography fontSize={12} color="primary" fontWeight={"bold"}>
                    {selectedStatus ? ` ${selectedStatus}` : ` All`}
                </Typography>
            </Button>

            <Button
                variant="outlined"
                endIcon={<KeyboardArrowDownIcon />}
                onClick={handleClickType}

            >
                <Typography fontSize={12} >
                    Type :&nbsp;
                </Typography>

                <Typography fontSize={12} color="primary" fontWeight={"bold"}>
                    {selectedType ? ` ${selectedType}` : ` All`}
                </Typography>
            </Button>

            <Menu
                anchorEl={anchorElStatus}
                open={openStatus}
                onClose={handleCloseStatus}
            >
                {listPropertyStatus.map((status) => (
                    <MenuItem color="secondary" sx={{ fontSize: "12px" }} onClick={() => handelChangeStatus(status.unit_status_name)}>
                        {status.unit_status_name}
                    </MenuItem>
                ))}
                <MenuItem color="secondary" sx={{ fontSize: "12px" }} onClick={() => handelChangeStatus("All")}>
                    All
                </MenuItem>
            </Menu>


            <Menu
                anchorEl={anchorElType}
                open={openType}
                onClose={handleCloseType}
            >
                {listPropertyType.map((type) => (
                    <MenuItem color="secondary" sx={{ fontSize: "12px" }} onClick={() => handelChangeType(type.unit_type_name)}>
                        {type.unit_type_name}
                    </MenuItem>
                ))}
                <MenuItem color="secondary" sx={{ fontSize: "12px" }} onClick={() => handelChangeType("All")}>
                    All
                </MenuItem>
            </Menu>
        </Box >
    );
}
