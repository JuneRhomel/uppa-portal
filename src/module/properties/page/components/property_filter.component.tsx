import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Separator, Table, TextField, Text, Popover, IconButton, Select, Tooltip } from '@radix-ui/themes';
import { CheckIcon, ChevronDownIcon, Cross2Icon, MixerVerticalIcon } from '@radix-ui/react-icons';
// import { StyledSelectContent, StyledSelectIcon, StyledSelectItem, StyledSelectItemIndicator, StyledSelectRoot, StyledSelectTrigger } from '../style/filter.style';
import GetPropertyTypeUseCase from '../../domain/use_case/get_property_type.use_case';
import GetPropertyStatusUseCase from '../../domain/use_case/get_property_status.use_case';
import Failure from "../../../../application/failure/failure";
import PropertyTypeEntity from "../../domain/entity/property_type.entity";
import PropertyStatusEntity from "../../domain/entity/property_status.entity";
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

export default function PropertyFilterComponent() {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedType, setSelectedType] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');

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

    const renderPropertyStatuses = () => {
        if (!Array.isArray(propertyStatuses) || propertyStatuses.length === 0) {
            return null;
        }
        return propertyStatuses.map((item) => {
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
                                        {renderPropertyStatuses()}
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