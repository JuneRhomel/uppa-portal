import React, { useEffect, useState } from "react";
import GetPropertyTypeUseCase from "../../domain/use_case/get_property_type.use_case";
import GetPropertyStatusUseCase from "../../domain/use_case/get_property_status.use_case";
import { Cross2Icon, GearIcon, InfoCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Dialog, IconButton, Tabs, Text, Table, Flex, Tooltip, Callout } from "@radix-ui/themes";
import PropertyTypeEntity from "../../domain/entity/property_type.entity";
import PropertyStatusEntity from "../../domain/entity/property_status.entity";
import Failure from "../../../../application/failure/failure";
import PropertyStatusEditComponent from "./property_status_edit.component";
import { useQuery } from "@tanstack/react-query";
import PropertySettingsComponentParams from "../interface/property_settings.params";
import PropertyTypeEditComponent from "./property_type_edit.component";
export default function PropertySettingsComponent({
    refetchProperties,
}: PropertySettingsComponentParams) {
    const [EditStatus, setEditStatus] = useState(false);
    const [SelectedStatus, setSelectedStatus] = useState({} as PropertyStatusEntity);
    const [SelectedType, setSelectedType] = useState({} as PropertyTypeEntity);
    const [EditType, setEditType] = useState(false);
    const fetchPropertyTypesAndStatuses = async () => {
        const [typesResponse, statusesResponse] = await Promise.all([
            GetPropertyTypeUseCase(),
            GetPropertyStatusUseCase()
        ]);

        if (typesResponse instanceof Failure) {
            console.error(typesResponse);
        }

        if (statusesResponse instanceof Failure) {
            console.error(statusesResponse);
        }

        return { types: typesResponse, statuses: statusesResponse };
    }


    const propertiesTypesAndStatusQuery = useQuery({
        queryKey: ["properties_types_and_statuses"],
        queryFn: fetchPropertyTypesAndStatuses,
        retry: true,
        refetchOnWindowFocus: true,
    });

    const propertyTypes = propertiesTypesAndStatusQuery.data?.types as PropertyTypeEntity[] ?? [];
    const propertyStatuses = propertiesTypesAndStatusQuery.data?.statuses as PropertyStatusEntity[] ?? [];

    const refetchpropertiesTypesAndStatus = () => {
        propertiesTypesAndStatusQuery.refetch();
    }

    const handleEditStatus = (statusEntity) => {
        setSelectedStatus(statusEntity);
        setEditStatus(!EditStatus);
    }

    const handleEditType = (typeEntity) => {
        setSelectedType(typeEntity);
        setEditType(!EditType);
    }

    const renderEditStatus = (status) => {
        if (EditStatus) {
            return <PropertyStatusEditComponent
                isOpen={EditStatus}
                propertyStatusEntity={status}
                refetchpropertiesTypesAndStatus={refetchpropertiesTypesAndStatus}
                refetchProperties={refetchProperties}
                handelClose={() => setEditStatus(!EditStatus)}
            />
        }
        return null
    }

    const renderEditType = (type) => {
        if (EditType) {
            return <PropertyTypeEditComponent
                isOpen={EditType}
                propertyTypeEntity={type}
                refetchpropertiesTypesAndStatus={refetchpropertiesTypesAndStatus}
                refetchProperties={refetchProperties}
                handelClose={() => setEditType(!EditType)}
            />
        }
        return null
    }
    const renderPropertyStatuses = () => {
        if (!Array.isArray(propertyStatuses) || propertyStatuses.length === 0) {
            return null;
        }
        return propertyStatuses.map((status) => {
            return (
                <Table.Row key={status.id}>
                    <Table.Cell>{status.unit_status_name}</Table.Cell>
                    <Table.Cell>
                        <Tooltip content={"Edit"}>
                            <IconButton onClick={() => handleEditStatus(status)} variant={'ghost'}><Pencil1Icon /></IconButton>
                        </Tooltip>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    const renderPropertyTypes = () => {
        if (!Array.isArray(propertyTypes) || propertyTypes.length === 0) {
            return null;
        }
        return propertyTypes.map((type) => {
            return (
                <Table.Row key={type.id}>
                    <Table.Cell>{type.unit_type_name}</Table.Cell>
                    <Table.Cell>
                        <Tooltip content={"Edit"}>
                            <IconButton onClick={() => handleEditType(type)} variant={'ghost'}><Pencil1Icon /></IconButton>
                        </Tooltip>
                    </Table.Cell>
                </Table.Row>
            )
        })
    }

    return (
        <>
            <Dialog.Root>
                <Tooltip content={"Settings"}>
                    <Dialog.Trigger>
                        <IconButton variant={"soft"}><GearIcon /></IconButton>
                    </Dialog.Trigger>
                </Tooltip>

                <Dialog.Content maxWidth="450px">
                    <Flex justify={"end"}>
                        <Tooltip content={"Close"}>
                            <Dialog.Close >
                                <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                            </Dialog.Close>
                        </Tooltip>
                    </Flex>
                    <Tabs.Root defaultValue="statusSettings">
                        <Tabs.List>
                            <Tabs.Trigger value="statusSettings">Status Settings</Tabs.Trigger>
                            <Tabs.Trigger value="propertySettings">Property Settings</Tabs.Trigger>
                        </Tabs.List>

                        <Box pt="3">
                            <Tabs.Content value="statusSettings">
                                <Box p="3">
                                    <Callout.Root mb={"2"}>
                                        <Callout.Icon>
                                            <InfoCircledIcon />
                                        </Callout.Icon>
                                        <Callout.Text>
                                            If you want to add new status you can contact our support.
                                        </Callout.Text>
                                    </Callout.Root>

                                    <Table.Root variant="surface">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.ColumnHeaderCell>Status Name</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        {renderPropertyStatuses()}
                                    </Table.Root>
                                </Box>
                            </Tabs.Content>

                            <Tabs.Content value="propertySettings">
                                <Box p="3">
                                    <Callout.Root mb={"2"}>
                                        <Callout.Icon>
                                            <InfoCircledIcon />
                                        </Callout.Icon>
                                        <Callout.Text>
                                            If you want to add new status you can contact our support.
                                        </Callout.Text>
                                    </Callout.Root>
                                    <Table.Root variant="surface">
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.ColumnHeaderCell>Property Type</Table.ColumnHeaderCell>
                                                <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                                            </Table.Row>
                                        </Table.Header>

                                        <Table.Body>
                                            {renderPropertyTypes()}
                                        </Table.Body>
                                    </Table.Root>
                                </Box>
                            </Tabs.Content>
                        </Box>
                    </Tabs.Root>
                </Dialog.Content>
            </Dialog.Root>

            {renderEditStatus(SelectedStatus)}
            {renderEditType(SelectedType)}
        </>
    );
}

