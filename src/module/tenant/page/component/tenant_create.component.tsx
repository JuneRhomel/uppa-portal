import { Cross2Icon, InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Separator, TextField, Tooltip, Select, Badge, Callout } from "@radix-ui/themes";
import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TenantCreateComponentParams from "../interface/tenant_create_component.params";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { patchTenant } from "../../../../infrastructure/api/slice/tenant/patch_tenant_api.slice";
import { getTenantStatusList } from "../../../../infrastructure/api/slice/tenant/get_tenant_status_list_ai.slice";
import TenantEntity from "../../../../infrastructure/api/module/tenant/domain/entity/tenant.entity";
import TenantStatusEntity from "../../../../infrastructure/api/module/tenant/domain/entity/tenant_status.entity";

export default function TenantCreateComponent({ fetchTenant }: TenantCreateComponentParams) {
    const { register, handleSubmit, reset } = useForm();
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const fetchTenantStatuses = async () => {
        const response = await dispatch(getTenantStatusList());

        if (response.payload === "UnhandledFailure") {
            console.error(response);
            return
        }

        return response.payload as TenantStatusEntity[];
    }

    const tenantStatusesQuery = useQuery({
        queryKey: ["tenant_statuses", open],
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


        return tenantStatuses.map((status) => (
            <Select.Item key={status.id} value={status.id.toString()}>
                {renderBadge(status.statusName)}
            </Select.Item>
        ))
    }

    const handleSave = async (formData) => {
        const data = formData as TenantEntity
        const tenantEntity = plainToInstance(TenantEntity, data, {
            excludeExtraneousValues: true,
        });

        const result = await dispatch(patchTenant({ tenantEntity }));

        if (result.payload === "UnhandledFailure") {
            toast.error("Something went wrong");
            return;
        }

        if (result.payload === "AlreadyExists") {
            toast.error("Tenant already exists");
            return;
        }

        setOpen(false);
        toast.success("Save", { icon: "👏" });
        reset();
        fetchTenant();
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
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

                    <Form.Root onSubmit={handleSubmit(handleSave)} >
                        <Form.Field name="first_name">
                            <Form.Label style={{ fontSize: "13px" }}>First Name</Form.Label>
                            <Form.Control asChild>
                                <TextField.Root {...register("first_name")} type="text" name="first_name" required />
                            </Form.Control>
                            <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter tenant name</Form.Message>
                        </Form.Field>
                        <Form.Field name="last_name">
                            <Form.Label style={{ fontSize: "13px" }}>Last Name</Form.Label>
                            <Form.Control asChild>
                                <TextField.Root {...register("last_name")} type="text" name="last_name" required />
                            </Form.Control>
                            <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter tenant name</Form.Message>
                        </Form.Field>
                        <Flex mt="2" mb={"2"} gap={"2"} >
                            <Form.Field style={{ width: "100%" }} name="email">
                                <Form.Label style={{ fontSize: "13px" }}>Email</Form.Label>
                                <Form.Control asChild>
                                    <TextField.Root {...register("email")} type="email" name="email" required />
                                </Form.Control>
                                <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter email</Form.Message>
                            </Form.Field>
                            <Form.Field style={{ width: "100%" }} name="contact_number">
                                <Form.Label style={{ fontSize: "13px" }}>Contact Number</Form.Label>
                                <Form.Control asChild>
                                    <TextField.Root {...register("contact_number")} type="number" name="contact_number" required />
                                </Form.Control>
                                <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter contact number</Form.Message>
                                <Form.Message style={{ color: "red", fontSize: "10px" }} match={(value) => value.length > 11 || value.length < 11} >Please enter valid contact number</Form.Message>
                            </Form.Field>
                        </Flex>
                        <Form.Field name="status_id"  >
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