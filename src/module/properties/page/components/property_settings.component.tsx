import React, { useState } from "react";
import { Cross2Icon, GearIcon, InfoCircledIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { Box, Dialog, IconButton, Tabs, Table, Flex, Tooltip, Callout } from "@radix-ui/themes";

import PropertyStatusEditComponent from "./property_status_edit.component";
import { useQuery } from "@tanstack/react-query";
import PropertySettingsComponentParams from "../interface/property_settings.params";
import PropertyTypeEditComponent from "./property_type_edit.component";
import { useDispatch } from "react-redux";
import { getPropertyStatus } from "../../../../infrastructure/api/slice/property/get_property_status_api.slice";
import type { AppDispatch } from '../../../../infrastructure/redux/store.redux';
import { getPropertyTypes } from "../../../../infrastructure/api/slice/property/get_property_types_api.slice";
import PropertyStatusEntity from "../../../../infrastructure/api/module/property/domain/entity/property_status.entity";
import PropertyTypeEntity from "../../../../infrastructure/api/module/property/domain/entity/property_type.entity";

export default function PropertySettingsComponent({
    refetchProperties,
}: PropertySettingsComponentParams) {
    const dispatch = useDispatch<AppDispatch>(); 
    const [EditStatus, setEditStatus] = useState(false);
    const [SelectedStatus, setSelectedStatus] = useState({} as PropertyStatusEntity);
    const [SelectedType, setSelectedType] = useState({} as PropertyTypeEntity);
    const [EditType, setEditType] = useState(false);
    
    const fetchPropertyTypesAndStatus = async () => {
        const [typesResponse, statusResponse] = await Promise.all([
            dispatch((getPropertyTypes())),
            dispatch(getPropertyStatus())
        ]);

        if (typesResponse.payload === "UnhandledFailure") {
            console.error(typesResponse);
        }

        if (statusResponse.payload === "UnhandledFailure") {
            console.error(statusResponse);
        }

        return { types: typesResponse.payload, status: statusResponse.payload };
    }


    const propertiesTypesAndStatusQuery = useQuery({
        queryKey: ["properties_types_and_status"],
        queryFn: fetchPropertyTypesAndStatus,
        retry: true,
        refetchOnWindowFocus: true,
    });



    const propertyTypes = propertiesTypesAndStatusQuery.data?.types as PropertyTypeEntity[] ?? [];
    const propertyStatus = propertiesTypesAndStatusQuery.data?.status as PropertyStatusEntity[] ?? [];

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
    const renderPropertystatus = () => {
        if (!Array.isArray(propertyStatus) || propertyStatus.length === 0) {
            return null;
        }
        return propertyStatus.map((status) => {
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
                                        {renderPropertystatus()}
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

