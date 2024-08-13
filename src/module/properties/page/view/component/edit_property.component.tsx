import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, Flex, IconButton, Separator, Tooltip, Text, TextField, Select, Box, Button } from "@radix-ui/themes";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import GetPropertyUseCase from "../../../domain/use_case/get_property.use_case";
import PropertiesEntity from "../../../domain/entity/properties.entity";
import Failure from "../../../../../application/failure/failure";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import GetPropertyTypeUseCase from "../../../domain/use_case/get_property_type.use_case";
import GetPropertyStatusUseCase from "../../../domain/use_case/get_property_status.use_case";
import PropertyTypeEntity from "../../../domain/entity/property_type.entity";
import PropertyStatusEntity from "../../../domain/entity/property_status.entity";
import { useForm, Controller } from "react-hook-form";
import PatchPropertyUseCase from "../../../domain/use_case/patch_property.use_case";
import { plainToInstance } from "class-transformer";
import { minLength } from "class-validator";


export default function EditPropertyComponent({
    isOpen, handleClose, refetch
}: { isOpen: boolean, handleClose: () => void, refetch: () => void }) {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const fetchProperty = async () => {
        const response = await GetPropertyUseCase({ id: Number(id) });
        if (response instanceof Failure) {
            toast.error("Something went wrong");
            return response
        }
        return response as PropertiesEntity
    }

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

    const propertyQuery = useQuery({
        queryKey: ["property"],
        queryFn: fetchProperty,
        retry: true,
    })

    if (propertyQuery.isLoading) {
        return <div>Loading...</div>
    }

    if (propertyQuery.isError) {
        return <div>Error</div>
    }
    const property = propertyQuery.data as PropertiesEntity


    const renderPropertyTypes = () => {
        if (propertiesTypesAndStatusQuery.isLoading) {
            return <Select.Item value="1">Loading...</Select.Item>
        }
        return propertyTypes.map((propertyType) => (
            <Select.Item key={propertyType.id} value={propertyType.id.toString()}>{propertyType.unit_type_name}</Select.Item>
        ))
    }
    const renderPropertyStatuses = () => {
        if (propertiesTypesAndStatusQuery.isLoading) {
            return <Select.Item value="1">Loading...</Select.Item>
        }
        return propertyStatuses.map((propertyStatus) => (
            <Select.Item key={propertyStatus.id} value={propertyStatus.id.toString()}>{propertyStatus.unit_status_name}</Select.Item>
        ))
    }

    const onSubmit = async (data) => {
        setIsLoading(true)
        const property = data as PropertiesEntity
        property.id = Number(id)
        property.unit_status_id = Number(property.unit_status_id)
        property.unit_type_id = Number(property.unit_type_id)
        const propertyEntity = plainToInstance(PropertiesEntity, property, { excludeExtraneousValues: true });
        const response = await PatchPropertyUseCase({ propertyEntity });

        if (response instanceof Failure) {
            toast.error(response.message)
            return
        }

        toast.success("Property updated successfully")
        setIsLoading(false)
        handleClose()
        refetch()
    }
    return (
        <Dialog.Root open={isOpen} onOpenChange={handleClose} >
            <Dialog.Content maxWidth="450px">
                <Flex justify={"end"}>
                    <Dialog.Close >
                        <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                    </Dialog.Close>
                </Flex>
                <Dialog.Title>Edit Property</Dialog.Title>
                <Separator my="3" size="4" />
                <form onSubmit={handleSubmit(onSubmit)} >
                    <Text size={"2"}> Property Name</Text>
                    <TextField.Root {...register(
                        "unit_name",
                        {
                            required: "Property name is required",
                            minLength: {
                                value: 5,
                                message: "Property name must be at least 5 characters long"
                            }
                        },
                    )} type="text" defaultValue={property.unit_name} >
                        <TextField.Slot />
                    </TextField.Root>
                    {errors.unit_name && <Text color="red" size={"2"}>{errors.unit_name.message?.toString()}</Text>}
                    <Flex mt="2" gap={"8"}>
                        <Box>
                            <Text as="p" size={"2"}> Unit Type</Text>
                            <Controller
                                name="unit_type_id"
                                control={control}
                                defaultValue={String(property.unit_type_id)}
                                rules={{ required: "Property type is required" }}
                                render={({ field }) => (
                                    <Select.Root name="unit_type_id" onValueChange={field.onChange}  defaultValue={String(property.unit_type_id)} >
                                        <Select.Trigger placeholder="Select Type..." />
                                        <Select.Content >
                                            <Select.Group >
                                                {renderPropertyTypes()}
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                )}
                            />
                            {errors.unit_type_id && <Text color="red" size={"2"}>{errors.unit_type_id.message?.toString()}</Text>}
                        </Box>
                        <Box>
                            <Text as="p" size={"2"}> Unit Status</Text>
                            <Controller
                                name="unit_status_id"
                                control={control}
                                defaultValue={String(property.unit_status_id)}
                                rules={{ required: "Property status is required" }}
                                render={({ field }) => (
                                    <Select.Root name="unit_status_id" onValueChange={field.onChange}  defaultValue={String(property.unit_status_id)} >
                                        <Select.Trigger placeholder="Select status..." />
                                        <Select.Content>
                                            <Select.Group>
                                                {renderPropertyStatuses()}
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                )}
                            />
                            {errors.unit_status_id && <Text color="red" size={"2"}>{errors.unit_status_id.message?.toString()}</Text>}
                        </Box>
                    </Flex>
                    <Flex justify={"end"} mt="5" gap="2">
                        <Dialog.Close >
                            <Button type="button" variant={"outline"} >Cancel</Button>
                        </Dialog.Close>
                        <Button loading={isLoading} type="submit" >Submit</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root >
    )
}