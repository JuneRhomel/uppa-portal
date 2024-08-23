import React, { useState } from "react";
import { Box, Button, Flex, Separator, Table, TextField, Text, Popover, IconButton, Select, Tooltip } from '@radix-ui/themes';
import { Cross2Icon, MixerVerticalIcon } from '@radix-ui/react-icons';

import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPropertyTypes } from "../../../../infrastructure/api/slice/property/get_property_types_api.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { getPropertyStatus } from "../../../../infrastructure/api/slice/property/get_property_status_api.slice";
import PropertyStatusEntity from "../../../../infrastructure/api/module/property/domain/entity/property_status.entity";
import PropertyTypeEntity from "../../../../infrastructure/api/module/property/domain/entity/property_type.entity";

export default function PropertyFilterComponent() {
    const dispatch: AppDispatch = useDispatch();

    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

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
        queryKey: ["properties_types_and_Status"],
        queryFn: fetchPropertyTypesAndStatus,
        retry: true,
        refetchOnWindowFocus: true,
    });

    const propertyTypes = propertiesTypesAndStatusQuery.data?.types as PropertyTypeEntity[] ?? [];
    const propertyStatus = propertiesTypesAndStatusQuery.data?.status as PropertyStatusEntity[] ?? [];


    const handleFilterSubmit = () => {
        const filters = `unit_type_name="${selectedType}",unit_status_name="${selectedStatus}"`;
        navigate(`?filters=${filters}`);
    }


    const handleClearFilter = () => {
        navigate("?filters=");
        setSelectedType("All");
        setSelectedStatus("All");
    }

    const renderPropertyTypes = () => {
        if (!Array.isArray(propertyTypes) || propertyTypes.length === 0) {
            return null;
        }
        return propertyTypes.map((item) => {
            return (
                <Select.Item key={item.id} value={item.unit_type_name}>{item.unit_type_name}</Select.Item>
            )
        })
    }

    const renderPropertyStatus = () => {
        if (!Array.isArray(propertyStatus) || propertyStatus.length === 0) {
            return null;
        }
        return propertyStatus.map((item) => {
            return (
                <Select.Item key={item.id} value={item.unit_status_name}>{item.unit_status_name}</Select.Item>
            )
        })
    }
    return (
        <Popover.Root>
            <Tooltip content={"Filters"}>
                <Popover.Trigger>
                    <Button variant={"soft"}><MixerVerticalIcon /> Filters</Button>
                </Popover.Trigger>
            </Tooltip>

            <Popover.Content>
                <Box p={'1'} width={'300px'}>
                    <Flex justify={'between'}>
                        <Text size="1" weight={"bold"}>Filters</Text>
                        <Popover.Close className="PopoverClose" aria-label="Close">
                            <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                        </Popover.Close>
                    </Flex>
                    <Separator my={"3"} size={"4"} />

                    <Flex mb={"3"} direction={"row"} align={"center"} gap={"2"}>
                        <Box width={"100px"}>
                            <Text size="1" weight={"bold"}>Unit Type</Text>
                        </Box>
                        <Box>
                            <Select.Root defaultValue="All" onValueChange={(e) => setSelectedType(e)} value={selectedType} >
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value="All" >All</Select.Item>
                                        {renderPropertyTypes()}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Box>
                    </Flex>

                    <Flex direction={"row"} align={"center"} gap={"2"}>
                        <Box width={"100px"}>
                            <Text size="1" weight={"bold"}>Unit Status</Text>
                        </Box>
                        <Box>
                            <Select.Root defaultValue="All" onValueChange={(e) => setSelectedStatus(e)} value={selectedStatus}>
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value="All" >All</Select.Item>
                                        {renderPropertyStatus()}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Box>
                    </Flex>

                    <Separator my={"3"} size={"4"} />
                    <Flex justify={"end"} gap={"2"}>
                        <Button onClick={handleClearFilter} variant={"soft"}>Clear</Button>
                        <Button onClick={handleFilterSubmit}>Apply</Button>
                    </Flex>
                </Box>

            </Popover.Content>
        </Popover.Root>
    );
}