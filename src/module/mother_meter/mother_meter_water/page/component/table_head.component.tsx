
import { Table } from "@radix-ui/themes";
import React from "react";

export default function TableHeadComponent() {
    return (
        <Table.Header>
            <Table.Row>
                <Table.Cell>
                    ID
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