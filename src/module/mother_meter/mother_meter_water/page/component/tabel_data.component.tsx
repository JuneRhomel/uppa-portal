import React from "react";
import TableDataComponentParams from "../interface/table_data_componet.params"
import { Link, Table } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
export default function TabelDataComponent({ motherMeterEntity }: TableDataComponentParams) {
    const navigate = useNavigate();
    const render = () => {
        if (!motherMeterEntity) {
            return <></>
        }
        const navigateTo = (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault()
            navigate(`/mother-meter/water/${event.currentTarget.textContent}`);
        }
        return motherMeterEntity.map((motherMeter) => {
            return (
                <Table.Row key={motherMeter.id}>

                    <Table.Cell>
                        <Link href="#" onClick={navigateTo}>{motherMeter.id}</Link>
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