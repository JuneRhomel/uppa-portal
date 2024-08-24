import { Cross2Icon, InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Separator, TextField, Tooltip, Select, Badge, Callout, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import * as Form from "@radix-ui/react-form";
import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TenantCreateComponentParams from "../interface/tenant_create_component.params";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../infrastructure/redux/store.redux";
import { getTenantStatusList } from "../../../../infrastructure/api/slice/tenant/get_tenant_status_list_ai.slice";
import TenantEntity from "../../../../infrastructure/api/module/tenant/domain/entity/tenant.entity";
import TenantStatusEntity from "../../../../infrastructure/api/module/tenant/domain/entity/tenant_status.entity";
import { postTenant } from "../../../../infrastructure/api/slice/tenant/post_tenant_api.slice";

export default function TenantCreateComponent({ fetchTenant }: TenantCreateComponentParams) {
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm();
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const postTenantState = useSelector((state: RootState) => state.postTenantApi)

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

        const result = await dispatch(postTenant({ tenantEntity }));

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

                    <form onSubmit={handleSubmit(handleSave)} >

                        <Text size={"2"}>First Name</Text>

                        <TextField.Root {
                            ...register("first_name",
                                {
                                    required: "Please enter tenant name",
                                    minLength:
                                    {
                                        value: 3,
                                        message: "Please enter tenant name"
                                    }
                                })} />
                        {errors.first_name && <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter tenant name</Form.Message>}

                        <Text size={"2"}>Last Name</Text>

                        <TextField.Root {...register("last_name",
                            {
                                required: "Please enter last name",
                                minLength:
                                {
                                    value: 3,
                                    message: "Please enter last name"
                                }
                            }
                        )} />

                        {errors.last_name && <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter last name</Form.Message>}

                        <Flex mt="2" mb={"2"} gap={"2"} >
                            <Box width={"100%"}>
                                <Text size={"2"}>Email</Text>
                                <TextField.Root {...register("email", { required: "Please enter email", pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Please enter valid email" } })} />
                                {errors.email && <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter email</Form.Message>}
                            </Box>
                            <Box width={"100%"}>
                                <Text size={"2"}>Contact Number</Text>
                                <TextField.Root {...register("contact_number", {
                                    required: "Please enter contact number",
                                    minLength:
                                    {
                                        value: 11,
                                        message: "Please enter valid contact number"
                                    },
                                    maxLength:
                                    {
                                        value: 11,
                                        message: "Please enter valid contact number"
                                    }
                                })} />
                                {errors.contact_number && <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter contact number</Form.Message>}
                            </Box>
                        </Flex>

                        <Text size={"2"}>Status</Text><br />
                        <Controller
                            name="status_id"
                            control={control}
                            render={({ field }) => (
                                <Select.Root name="status_id" onValueChange={field.onChange} defaultValue="2" value="2" >
                                    <Select.Trigger placeholder="Select Type..." />
                                    <Select.Content>
                                        <Select.Group>
                                            {renderStatusOptions()}
                                        </Select.Group>
                                    </Select.Content>
                                </Select.Root>
                            )}
                        />
                        {errors.status_id && <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please select status</Form.Message>}
                        <Flex justify={"end"} mt="5" gap="2">
                            <Dialog.Close >
                                <Button type="button" disabled={postTenantState.isLoading} variant={"outline"} >Cancel</Button>
                            </Dialog.Close>
                            <Button type="submit" loading={postTenantState.isLoading} >Submit</Button>
                        </Flex>
                    </form>
                </Box>
            </Dialog.Content>
        </Dialog.Root >
    );
}