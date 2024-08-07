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
                <Table.Cell>
                    Id
                </Table.Cell>
                <Table.Cell>
                    Serial Number
                </Table.Cell>
                <Table.Cell>
                    Created At
                </Table.Cell>

            </Table.Row>
        </Table.Header>
    )
}