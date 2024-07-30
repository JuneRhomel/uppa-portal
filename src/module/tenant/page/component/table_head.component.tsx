import { CaretDownIcon, CaretUpIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Box, Table } from "@radix-ui/themes";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

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
                <Table.ColumnHeaderCell style={{ width: "10%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("id")}>
                    Tenant Id
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("id")}
                    </Box>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell style={{ width: "20%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("full_name")}>
                    Tenant Name
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("full_name")}
                    </Box>
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell style={{ width: "20%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("email")}>
                    Email
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("email")}
                    </Box>
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell style={{ width: "20%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("contact_number")}>
                    Contact Number
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("contact_number")}
                    </Box>
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell style={{ width: "10%", cursor: "pointer", position: "relative" }} onClick={() => handleSortBy("status")}>
                    Status
                    <Box position={"absolute"} right={"1"} style={{ top: "50%", transform: "translateY(-50%)" }} >
                        {renderIcon("status")}
                    </Box>
                </Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>
    )
}