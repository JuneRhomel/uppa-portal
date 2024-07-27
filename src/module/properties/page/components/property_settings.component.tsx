import React, { useEffect, useState } from "react";
import GetPropertyTypeUseCase from "../../domain/use_case/get_property_type.use_case";
import GetPropertyStatusUseCase from "../../domain/use_case/get_property_status.use_case";
import { Cross2Icon, GearIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Dialog, IconButton, Tabs, Text, Table, Flex, Tooltip } from "@radix-ui/themes";
import PropertyTypeEntity from "../../domain/entity/property_type.entity";
import PropertyStatusEntity from "../../domain/entity/property_status.entity";
import Failure from "../../../../application/failure/failure";
import PropertyStatusEditComponent from "./property_status_edit.component";

export default function PropertySettingsComponent() {

    const [propertyTypes, setPropertyTypes] = useState([] as PropertyTypeEntity[]);
    const [propertyStatuses, setPropertyStatuses] = useState([] as PropertyStatusEntity[]);

    const fetchPropertyTypesAndStatuses = async () => {
        const [typesResponse, statusesResponse] = await Promise.all([
            GetPropertyTypeUseCase(),
            GetPropertyStatusUseCase()
        ]) as [PropertyTypeEntity[] | Failure, PropertyStatusEntity[] | Failure];

        if (!(typesResponse instanceof Failure)) {
            setPropertyTypes(typesResponse);
        }

        if (!(statusesResponse instanceof Failure)) {
            setPropertyStatuses(statusesResponse);
        }
    }

    useEffect(() => {
        fetchPropertyTypesAndStatuses();
    }, []);


    return (
        <Dialog.Root>
            <Tooltip content={"Settings"}>
                <Dialog.Trigger>
                    <IconButton variant={"soft"}><GearIcon /></IconButton>
                </Dialog.Trigger>
            </Tooltip>

            <Dialog.Content maxWidth="450px">
                <Flex justify={"end"}>
                    <Dialog.Close >
                        <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                    </Dialog.Close>
                </Flex>
                <Tabs.Root defaultValue="statusSettings">
                    <Tabs.List>
                        <Tabs.Trigger value="statusSettings">Status Settings</Tabs.Trigger>
                        <Tabs.Trigger value="propertySettings">Property Settings</Tabs.Trigger>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="statusSettings">
                            <Box p="3">
                                <Table.Root variant="surface">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell>Status Name</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {propertyStatuses.map((status) => (
                                            <Table.Row>
                                                <Table.Cell>{status.unit_status_name}</Table.Cell>
                                                <Table.Cell>
                                                    <Dialog.Root>
                                                        <Dialog.Trigger>
                                                            <IconButton variant={'ghost'}><Pencil1Icon /></IconButton>
                                                        </Dialog.Trigger>
                                                        <PropertyStatusEditComponent propertyStatusEntity={status} />
                                                    </Dialog.Root>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}

                                    </Table.Body>
                                </Table.Root>
                            </Box>
                        </Tabs.Content>

                        <Tabs.Content value="propertySettings">
                            <Box p="3">
                                <Table.Root variant="surface">
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.ColumnHeaderCell>Property Type</Table.ColumnHeaderCell>
                                            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {propertyTypes.map((type) => (
                                            <Table.Row>
                                                <Table.Cell>{type.unit_type_name}</Table.Cell>
                                                <Table.Cell><IconButton variant={'ghost'}><Pencil1Icon /></IconButton></Table.Cell>
                                            </Table.Row>
                                        ))}

                                    </Table.Body>
                                </Table.Root>
                            </Box>
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>
            </Dialog.Content>
        </Dialog.Root>
    );
}

