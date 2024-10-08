import { Avatar, Badge, Link, Table } from "@radix-ui/themes";
import React from "react";
import TableLoadingComponent from "./table_loading.component";
import TableDataComponentParams from "../interface/table_data_component.params";
import { useNavigate } from "react-router-dom";
import TenantEntity from "../../../../infrastructure/api/module/tenant/domain/entity/tenant.entity";


export default function TableDataComponent({ tenantListQuery }: TableDataComponentParams) {
    const navigate = useNavigate();
    const renderBadge = (status: string | undefined) => {

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

        const handleView = (id, event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault()
            navigate(`/tenant/${id}`);
        }

        return tenants.map((tenant) => {
            return (
                <Table.Row key={tenant.id}>
                    <Table.Cell>
                        <Link href="#" onClick={(event) => handleView(tenant.id, event)}  >{tenant.id}</Link>
                    </Table.Cell>
                    <Table.Cell>
                        <Avatar radius={"full"} size={"1"} fallback={tenant.first_name.slice(0, 1)} mr={"2"} />
                        {tenant.first_name} {tenant.last_name}
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