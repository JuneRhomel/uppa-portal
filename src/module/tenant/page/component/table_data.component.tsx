import { Badge, Link, Table } from "@radix-ui/themes";
import React from "react";
import TableLoadingComponent from "./table_loading.component";
import TableDataComponentParams from "../interface/table_data_component.params";
import TenantEntity from "../../domain/entity/tenant.entity";


export default function TableDataComponent({ tenantListQuery }: TableDataComponentParams) {

    const renderBadge = (status: string) => {

        if (status === "Active") {
            return <Badge color={"green"}>{status}</Badge>
        }
        if (status === "Inactive") {
            return <Badge color={"red"}>{status}</Badge>
        }
        return <Badge color={"orange"}>{status}</Badge>
    }
    const render = () => {
        if (tenantListQuery.isError) {
            return <div>Error</div>
        }
        if (tenantListQuery.isLoading) {
            return <TableLoadingComponent />
        }
        const tenants = tenantListQuery.data?.tenants as TenantEntity[];

        return tenants.map((tenant) => {
            return (
                <Table.Row key={tenant.id}>
                    <Table.Cell>
                        {tenant.id}
                    </Table.Cell>
                    <Table.Cell>
                        {tenant.last_name} {tenant.first_name}
                    </Table.Cell>
                    <Table.Cell>
                        <Link href={`mailto:${tenant.email}`} >{tenant.email}</Link>
                    </Table.Cell>
                    <Table.Cell>
                        {tenant.contact_number}
                    </Table.Cell>
                    <Table.Cell>
                        {renderBadge(tenant.status)}
                    </Table.Cell>
                </Table.Row>
            );
        });


    }

    return (
        render()
    )
}