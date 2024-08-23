import { Cross2Icon, MixerVerticalIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, IconButton, Popover, Select, Separator, Text, Tooltip } from "@radix-ui/themes";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { isArray } from "class-validator";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { useDispatch } from "react-redux";
import { getTenantStatusList } from "../../../../infrastructure/api/slice/tenant/get_tenant_status_list_ai.slice";
import TenantStatusEntity from "../../../../infrastructure/api/module/tenant/domain/entity/tenant_status.entity";

export default function TenantFilterComponent() {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState('All');
    const dispatch: AppDispatch = useDispatch();


    const fetchTenantStatuses = async () => {
        const response = await dispatch(getTenantStatusList());

        if (response.payload === "UnhandledFailure") {
            console.error(response);
            return
        }

        return tenantStatuses as TenantStatusEntity[];
    }


    const tenantStatusesQuery = useQuery({
        queryKey: ["tenant_statuses"],
        queryFn: fetchTenantStatuses,
        retry: true,
        refetchOnWindowFocus: true,
    });

    const tenantStatuses = tenantStatusesQuery.data as TenantStatusEntity[] ?? [];

    const handleFilterSubmit = () => {
        const filters = `status_name="${selectedStatus}"`;
        navigate(`?filters=${filters}`);
    }
    const handleClearFilter = () => {
        navigate("?filters=");
        setSelectedStatus("All");
    }

    const renderStatus = () => {
        if (tenantStatusesQuery.isLoading) {
            return <Select.Item value="1">Loading...</Select.Item>
        }
        if (tenantStatuses.length === 0) {
            return <Select.Item value="1">Error</Select.Item>
        }
        if (!isArray(tenantStatuses)) {
            return <Select.Item value="1">Error</Select.Item>
        }
        return tenantStatuses.map((status) => (
            <Select.Item key={status.id} value={status.statusName}>
                {status.statusName}
            </Select.Item>
        ))
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
                            <Text size="1" weight={"bold"}>Status</Text>
                        </Box>
                        <Box>
                            <Select.Root defaultValue="All" onValueChange={(e) => setSelectedStatus(e)} value={selectedStatus} >
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Group>
                                        <Select.Item value="All" >All</Select.Item>
                                        {renderStatus()}
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
        </Popover.Root >
    );
}