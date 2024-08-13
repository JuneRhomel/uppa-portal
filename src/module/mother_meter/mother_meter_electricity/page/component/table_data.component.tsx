import React from "react";
import TableDataComponentParams from "../interface/table_data_component.params"
import { Table } from "@radix-ui/themes";
export default function TabelDataComponent({ motherMeterElectricityEntity }: TableDataComponentParams) {
    const render = () => {
        return motherMeterElectricityEntity.map((motherMeter) => {
            if (!motherMeter) {
                return <></>
            }
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