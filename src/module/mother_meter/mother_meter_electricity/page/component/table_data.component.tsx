import React from "react";
import TableDataComponentParams from "../interface/table_data_component.params"
import { Table, Link } from "@radix-ui/themes";
import {  useNavigate } from "react-router-dom";
export default function TabelDataComponent({ motherMeterElectricityEntity }: TableDataComponentParams) {
    const navigate = useNavigate();
    const render = () => {
        return motherMeterElectricityEntity.map((motherMeter) => {
            if (!motherMeter) {
                return <></>
            }
            const navigateTo = (event: React.MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault()
                navigate(`/mother-meter/electricity/${event.currentTarget.textContent}`);
            }
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