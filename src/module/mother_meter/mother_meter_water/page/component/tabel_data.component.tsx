import React from "react";
import TableDataComponentParams from "../interface/table_data_componet.params"
import { Table } from "@radix-ui/themes";
export default function TabelDataComponent({ motherMeterEntity }: TableDataComponentParams) {
    console.log(motherMeterEntity)
    const render = () => {
        return motherMeterEntity.map((motherMeter) => {
            return (
                <Table.Row key={motherMeter.id}>

                    <Table.Cell>
                        {motherMeter.id}
                    </Table.Cell>
                    <Table.Cell>
                        {motherMeter.serialNumber}
                    </Table.Cell>
                    <Table.Cell>
                        {motherMeter.createdAt && new Date(motherMeter.createdAt).toLocaleString()}
                    </Table.Cell>
                </Table.Row>
            );
        });
    }

    return (
        render()
    )
}