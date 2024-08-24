import * as Form from "@radix-ui/react-form";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Select, Separator, TextField, Tooltip, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import PropertyCreateParams from "../interface/property_create.params"
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../infrastructure/redux/store.redux";
import { postProperty } from "../../../../infrastructure/api/slice/property/post_property_api.slice";
import { getPropertyStatus } from "../../../../infrastructure/api/slice/property/get_property_status_api.slice";
import { getPropertyTypes } from "../../../../infrastructure/api/slice/property/get_property_types_api.slice";
import PropertiesEntity from "../../../../infrastructure/api/module/property/domain/entity/properties.entity";
import PropertyStatusEntity from "../../../../infrastructure/api/module/property/domain/entity/property_status.entity";
import PropertyTypeEntity from "../../../../infrastructure/api/module/property/domain/entity/property_type.entity";
import { Controller, useForm } from "react-hook-form";


export default function PropertyCreateComponent({
    refetchProperties
}: PropertyCreateParams) {
    const dispatch: AppDispatch = useDispatch();
    const postPropertyState = useSelector((state: RootState) => state.postPropertyApi)
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    const [open, setOpen] = useState(false);
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

    const handleSave = async (data) => {
        data.unit_type_id = Number(data.unit_type_id);
        data.unit_status_id = Number(data.unit_status_id);

        const property = data as PropertiesEntity;

        const propertyEntity = plainToInstance(PropertiesEntity, property, {
            excludeExtraneousValues: true
        });

        const response = await dispatch(postProperty(propertyEntity));

        if (response.payload === "ValidationFailure") {
            toast.error("Validation Failure");
            return;
        }

        if (response.payload === "UnhandledFailure") {
            toast.error("Unhandled Failure");
            return;
        }

        toast.success("Save", { icon: "👏" });
        propertiesTypesAndStatusQuery.refetch();
        refetchProperties();
        reset();
        setOpen(false);
    }

    const renderPropertyTypes = () => {
        if (propertiesTypesAndStatusQuery.isLoading) {
            return <Select.Item value="1">Loading...</Select.Item>
        }
        return propertyTypes.map((propertyType) => (
            <Select.Item key={propertyType.id} value={propertyType.id.toString()}>{propertyType.unit_type_name}</Select.Item>
        ))
    }
    const renderPropertyStatus = () => {
        if (propertiesTypesAndStatusQuery.isLoading) {
            return <Select.Item value="1">Loading...</Select.Item>
        }
        return propertyStatus.map((propertyStatus) => (
            <Select.Item key={propertyStatus.id} value={propertyStatus.id.toString()}>{propertyStatus.unit_status_name}</Select.Item>
        ))
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>

            <Dialog.Trigger>
                <Button variant={"solid"}><PlusIcon /> Create Property</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px" >
                <Flex justify={"end"}>
                    <Tooltip content={"Close"}>
                        <Dialog.Close>
                            <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                        </Dialog.Close>
                    </Tooltip>
                </Flex>
                <Box>
                    <Dialog.Title size={"3"}>Create Property</Dialog.Title>
                    <Separator my="3" size="4" />
                    <form onSubmit={handleSubmit(handleSave)}>
                        <Box>
                            <Text size={"2"}>Property Name</Text>
                            <TextField.Root   {
                                ...register("unit_name", {
                                    required: "Property name is required",
                                    minLength: {
                                        value: 3,
                                        message: "Property name must be at least 3 characters"
                                    }
                                })
                            } />
                            {errors.unit_name && <Form.Message style={{ color: "red" }} match="valueMissing">Please enter property name</Form.Message>}
                        </Box>
                        <Flex mt="2" gap={"8"}>
                            <Box>
                                <Text as="p" size={"2"}> Unit Type</Text>
                                <Controller
                                    name="unit_type_id"
                                    control={control}
                                    rules={{ required: "Property type is required" }}
                                    render={({ field }) => (
                                        <Select.Root name="unit_type_id" onValueChange={field.onChange}>
                                            <Select.Trigger placeholder="Select Type..." />
                                            <Select.Content >
                                                <Select.Group >
                                                    {renderPropertyTypes()}
                                                </Select.Group>
                                            </Select.Content>
                                        </Select.Root>
                                    )}
                                />
                                {errors.unit_type_id && <Text color="red" size={"1"}>{errors.unit_type_id.message?.toString()}</Text>}
                            </Box>
                            <Box>
                                <Text as="p" size={"2"}> Unit Status</Text>
                                <Controller
                                    name="unit_status_id"
                                    control={control}
                                    rules={{ required: "Property status is required" }}
                                    render={({ field }) => (
                                        <Select.Root name="unit_status_id" onValueChange={field.onChange}  >
                                            <Select.Trigger placeholder="Select status..." />
                                            <Select.Content>
                                                <Select.Group>
                                                    {renderPropertyStatus()}
                                                </Select.Group>
                                            </Select.Content>
                                        </Select.Root>
                                    )}
                                />
                                {errors.unit_status_id && <Text color="red" size={"1"}>{errors.unit_status_id.message?.toString()}</Text>}
                            </Box>
                        </Flex>

                        <Flex justify={"end"} mt="5" gap="2">
                            <Dialog.Close >
                                <Button type="button" variant={"outline"} loading={postPropertyState.isLoading} >Cancel</Button>
                            </Dialog.Close>
                            <Button type="submit" loading={postPropertyState.isLoading} >Submit</Button>
                        </Flex>
                    </form>
                </Box>
            </Dialog.Content>
        </Dialog.Root >
    )
}

