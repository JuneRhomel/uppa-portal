import { Cross2Icon, InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Separator, TextField, Tooltip, Select, Badge, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import TenantStatusEntity from "../../domain/entity/tenant_status.entity";
import Failure from "../../../../application/failure/failure";
import GetTenantStatusUseCase from "../../domain/use_case/get_tenant_status.use_case";
import { useQuery } from "@tanstack/react-query";

export default function TenantCreateComponent() {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        statusId: 2,
    })
    const fetchTenantStatuses = async () => {
        const response = await GetTenantStatusUseCase() as TenantStatusEntity[] | Failure;
        if (response instanceof Failure) {
            console.error(response);
        }
        return response;
    }

    const tenantStatusesQuery = useQuery({
        queryKey: ["tenant_statuses"],
        queryFn: fetchTenantStatuses,
        retry: true,
        refetchOnWindowFocus: true,
    });

    const tenantStatuses = tenantStatusesQuery.data as TenantStatusEntity[] ?? [];
    const renderBadge = (status: string) => {
        if (status === "Active") {
            return <Badge color={"green"}>{status}</Badge>
        }
        if (status === "Inactive") {
            return <Badge color={"red"}>{status}</Badge>
        }
        return <Badge color={"orange"}>{status}</Badge>
    }

    const renderStatusOptions = () => {
        if (tenantStatusesQuery.isLoading) {
            return <Select.Item value="1">Loading...</Select.Item>
        }
        return tenantStatuses.map((tenantStatus) => (
            <Select.Item key={tenantStatus.id} value={tenantStatus.id.toString()}>{renderBadge(tenantStatus.statusName)}</Select.Item>
        ))
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSelectChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    return (
        <Dialog.Root >
            <Dialog.Trigger>
                <Button variant={"solid"}><PlusIcon /> Create Property</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="550px" >
                <Flex justify={"end"}>
                    <Tooltip content={"Close"}>
                        <Dialog.Close>
                            <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                        </Dialog.Close>
                    </Tooltip>
                </Flex>
                <Box>
                    <Dialog.Title size={"3"}>Create Tenant</Dialog.Title>
                    <Separator my="3" size="4" />
                    <Callout.Root mb={"2"}>
                        <Callout.Icon>
                            <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>
                            The Satats of Tenant will be set to "Inactive" by default and can be only cange to "Active" if the Tenant account setup is completed.
                        </Callout.Text>
                    </Callout.Root>

                    <Form.Root >
                        <Form.Field name="first_name">
                            <Form.Label style={{ fontSize: "13px" }}>First Name</Form.Label>
                            <Form.Control asChild>
                                <TextField.Root onChange={handleChange} type="text" name="first_name" required />
                            </Form.Control>
                            <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter tenant name</Form.Message>
                        </Form.Field>
                        <Form.Field name="last_name">
                            <Form.Label style={{ fontSize: "13px" }}>Last Name</Form.Label>
                            <Form.Control asChild>
                                <TextField.Root onChange={handleChange} type="text" name="last_name" required />
                            </Form.Control>
                            <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter tenant name</Form.Message>
                        </Form.Field>
                        <Flex mt="2" mb={"2"} gap={"2"} >
                            <Form.Field style={{ width: "100%" }} name="email">
                                <Form.Label style={{ fontSize: "13px" }}>Email</Form.Label>
                                <Form.Control asChild>
                                    <TextField.Root onChange={handleChange} type="email" name="email" required />
                                </Form.Control>
                                <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter email</Form.Message>
                            </Form.Field>
                            <Form.Field style={{ width: "100%" }} name="contact_number">
                                <Form.Label style={{ fontSize: "13px" }}>Contact Number</Form.Label>
                                <Form.Control asChild>
                                    <TextField.Root onChange={handleChange} type="number" name="contact_number" required />
                                </Form.Control>
                                <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter contact number</Form.Message>
                            </Form.Field>
                        </Flex>
                        <Form.Field name="status_id" onChange={handleChange} >
                            <Form.Label style={{ fontSize: "13px" }}>Status</Form.Label><br />
                            <Select.Root name="status_id" required defaultValue="2" value="2" >
                                <Select.Trigger placeholder="Select Type..." />
                                <Select.Content>
                                    <Select.Group>
                                        {renderStatusOptions()}
                                    </Select.Group>
                                </Select.Content>
                            </Select.Root>
                        </Form.Field>


                        <Flex justify={"end"} mt="5" gap="2">
                            <Dialog.Close >
                                <Button type="button" variant={"outline"} >Cancel</Button>
                            </Dialog.Close>
                            <Button type="submit" >Submit</Button>
                        </Flex>
                    </Form.Root>
                </Box>
            </Dialog.Content>
        </Dialog.Root >
    );
}