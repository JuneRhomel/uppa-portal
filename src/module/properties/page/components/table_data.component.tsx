import { Link, Table } from "@radix-ui/themes";
import React from "react";
import PropertiesEntity from "../../domain/entity/properties.entity";
import { useNavigate } from "react-router-dom";


export default function TableDataComponent({ propertyEntity }: { propertyEntity: PropertiesEntity[] }) {
    const naviate = useNavigate()
    const render = () => {
        if (!propertyEntity) {
            return null
        }

        const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault()
            naviate(`/properties/${event.currentTarget.textContent}`)
        }
        return propertyEntity.map((item) => {
            return (
                <Table.Row key={item.id}>
                    <Table.Cell>
                        <Link  href="#" onClick={handleClick}>{item.id}</Link>
                    </Table.Cell>
                    <Table.Cell>{item.unit_name}</Table.Cell>
                    <Table.Cell>{item.unit_type_name}</Table.Cell>
                    <Table.Cell>{item.unit_status_name}</Table.Cell>
                </Table.Row>
            )
        })
    }


    return (
        render()
    )
}