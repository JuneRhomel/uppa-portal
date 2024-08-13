import { Box, Table } from "@radix-ui/themes";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CaretSortIcon, CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'

export default function TableHeadComponent() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleSortBy = (sortBy: string) => {
        const queryPathParameters = new URLSearchParams(location.search);
        const sortOrder = queryPathParameters.get("sortOrder") === "ASC" ? "DESC" : "ASC";
        queryPathParameters.set("sortBy", sortBy);
        queryPathParameters.set("sortOrder", sortOrder);

        navigate(`?${queryPathParameters.toString()}`);

    };

    const renderIcon = (name: string) => {
        const queryPathParameters = new URLSearchParams(location.search);
        const sortOrder = queryPathParameters.get("sortOrder");

        if (name === queryPathParameters.get("sortBy")) {
            if (sortOrder === "ASC") {
                return <CaretDownIcon />
            } else if (sortOrder === "DESC") {
                return <CaretUpIcon />
            }

        }
        return <CaretSortIcon />
    }

    return (
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell style={{ width: "20%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("id")}>
                    Property Id
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("id")}
                    </Box>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell style={{ width: "20%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("unit_name")}>
                    Property
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("unit_name")}
                    </Box>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell style={{ width: "20%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("unit_type_name")}>
                    Type
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("unit_type_name")}
                    </Box>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell style={{ width: "20%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("unit_status_name")}>
                    Status
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("unit_status_name")}
                    </Box>
                </Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>
    )
}