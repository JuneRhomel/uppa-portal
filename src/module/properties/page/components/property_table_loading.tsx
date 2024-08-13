import { Skeleton, Table } from "@radix-ui/themes";
import React from "react";

export default function PropertyTableLoading() {
    return (
        <>
            {Array.from({ length: 14 }).map((_, index) => (
                <Table.Row key={index}>
                    <Table.Cell>
                        <Skeleton width={"100%"} />
                    </Table.Cell>
                    <Table.Cell>
                        <Skeleton width={"100%"} />
                    </Table.Cell>
                    <Table.Cell>
                        <Skeleton width={"100%"} />
                    </Table.Cell>
                    <Table.Cell>
                        <Skeleton width={"100%"} />
                    </Table.Cell>
                </Table.Row>
            ))}
        </>
    );
}