import { Cross2Icon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Separator, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useParams } from "react-router-dom";
import GetTenantUseCase from "../../../domain/use_case/get_tenant.use_case";
import toast from "react-hot-toast";
import TenantEntity from "../../../domain/entity/tenant.entity";
import Failure from "../../../../../application/failure/failure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { plainToInstance } from "class-transformer";
import PatchTenantUseCase from "../../../domain/use_case/patch_tenant.use_case";
import DuplicatedFailure from "../../../../../application/failure/duplicated.failure";


export default function EditTenantComponent({ isOpen, handleClose, refetch }: { isOpen: boolean, handleClose: () => void, refetch: () => void }) {
    const { id } = useParams();

    const fetchTenant = async () => {
        const response = await GetTenantUseCase({ id: Number(id) });
        if (response instanceof Failure) {
            toast.error("Something went wrong");
            return response
        }

        return response as TenantEntity
    }

    const tenantQuery = useQuery({
        queryKey: ["tenant_view"],
        queryFn: fetchTenant,
        retry: true,
    })

    if (tenantQuery.isLoading) {
        return <div>Loading...</div>
    }

    if (tenantQuery.isError) {
        return <div>Error</div>
    }
    const tenant = tenantQuery.data as TenantEntity


    const { register, handleSubmit, control, reset, formState: { errors }, clearErrors } = useForm({
        defaultValues: {
            first_name: tenant.first_name,
            last_name: tenant.last_name,
            email: tenant.email,
            contact_number: tenant.contact_number,
        }
    });

    const onSubmit = async (data) => {
        const dataRequest = data as TenantEntity
        const tenantEntity = plainToInstance(TenantEntity, dataRequest, {
            excludeExtraneousValues: true
        })
        tenantEntity.id = Number(id)
        tenantEntity.status_id = Number(tenant.status_id)

        const response = await PatchTenantUseCase({ tenantEntity })

        if (response instanceof DuplicatedFailure) {
            if (response.extra === "contact_number") {
                toast.error("Contact number already exists");
            }
            if (response.extra === "email") {
                toast.error("Email already exists");
            }

            return response;
        }

        if (response instanceof Failure) {
            toast.error("Something went wrong");
            return response
        }

        toast.success("Tenant updated successfully");
        refetch();
        clearErrors();
        reset()
        handleClose();
    }
    const handleCloseModal = () => {
        clearErrors();
        reset()
        handleClose();
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={handleCloseModal}>
            <Dialog.Content maxWidth="450px">
                <Flex justify={"end"}>
                    <Dialog.Close >
                        <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                    </Dialog.Close>
                </Flex>
                <Dialog.Title>Edit Tenant</Dialog.Title>
                <Separator my="3" size="4" />

                <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <Box>
                        <Text size={"2"}> First Name</Text>
                        <TextField.Root {...register("first_name", { required: "First name is required", minLength: 3 })}>
                            <TextField.Slot />
                        </TextField.Root>
                        {errors.first_name && <Text color="red" size={"1"}>{errors.first_name.message?.toString()}</Text>}
                    </Box>
                    <Box>
                        <Text size={"2"}> First Name</Text>
                        <TextField.Root {...register("last_name", { required: " Last name is required", minLength: 3 })}>
                            <TextField.Slot />
                        </TextField.Root>
                        {errors.last_name && <Text color="red" size={"1"}>{errors.last_name.message?.toString()}</Text>}
                    </Box>

                    <Flex mt="2" mb={"2"} gap={"2"} >
                        <Box width={"100%"}>
                            <Text size={"2"}>Email</Text>
                            <TextField.Root type="email"  {...register("email", {
                                required: "Email is required",
                                minLength: { value: 3, message: "Email must be at least 3 characters long" },
                                pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" }
                            })}>
                                <TextField.Slot />
                            </TextField.Root>
                            {errors.email && <Text color="red" size={"1"}>{errors.email.message?.toString()}</Text>}
                        </Box>
                        <Box width={"100%"}>
                            <Text size={"2"}>Contact Number</Text>
                            <TextField.Root
                                type="number"
                                {...register("contact_number", {
                                    required: "Contact number is required",
                                    minLength: {
                                        value: 11,
                                        message: "Must be at least 11 digits long"
                                    },
                                    maxLength: {
                                        value: 11,
                                        message: "Must be at most 11 digits long"
                                    }
                                })}>
                                <TextField.Slot />
                            </TextField.Root>
                            {errors.contact_number && (
                                <Text color="red" size={"1"}>
                                    {errors.contact_number.message?.toString()}
                                </Text>
                            )}
                        </Box>

                    </Flex>

                    <Flex justify={"end"} mt="5" gap="2">
                        <Dialog.Close >
                            <Button type="button" variant={"outline"} >Cancel</Button>
                        </Dialog.Close>
                        <Button type="submit" >Submit</Button>
                    </Flex>
                </form>

            </Dialog.Content>
        </ Dialog.Root>
    );
}