import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog, Flex, IconButton, Separator, Text, TextField, Select, Box, Button } from "@radix-ui/themes";
import React from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { plainToInstance } from "class-transformer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../infrastructure/redux/store.redux";
import PropertiesEntity from "../../../../infrastructure/api/module/property/domain/entity/properties.entity";
import PropertyStatusEntity from "../../../../infrastructure/api/module/property/domain/entity/property_status.entity";
import PropertyTypeEntity from "../../../../infrastructure/api/module/property/domain/entity/property_type.entity";
import { getProperty } from "../../../../infrastructure/api/slice/property/get_property_api.slice";
import { getPropertyStatus } from "../../../../infrastructure/api/slice/property/get_property_status_api.slice";
import { getPropertyTypes } from "../../../../infrastructure/api/slice/property/get_property_types_api.slice";
import { patchProperty } from "../../../../infrastructure/api/slice/property/patch_property_api.slice";




export default function EditPropertyComponent({
    isOpen, handleClose, refetch
}: { isOpen: boolean, handleClose: () => void, refetch: () => void }) {
    const dispatch: AppDispatch = useDispatch();
    const patchPropertyState = useSelector((state: RootState) => state.patchPropertyApi)
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { id } = useParams();
    const fetchProperty = async () => {
        const response = await dispatch(getProperty(Number(id)));
        if (response.payload === "UnhandledFailure") {
            toast.error("Something went wrong");
            return response
        }
        return response.payload as PropertiesEntity
    }

    const fetchPropertyTypesAndStatuses = async () => {
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
        queryKey: ["properties_types_and_statuses"],
        queryFn: fetchPropertyTypesAndStatuses,
        retry: true,
        refetchOnWindowFocus: true,
    });

    const propertyTypes = propertiesTypesAndStatusQuery.data?.types as PropertyTypeEntity[] ?? [];
    const propertyStatuses = propertiesTypesAndStatusQuery.data?.status as PropertyStatusEntity[] ?? [];

    const propertyQuery = useQuery({
        queryKey: ["property_view_edit"],
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

        const property = data as PropertiesEntity
        property.id = Number(id)
        property.unit_status_id = Number(property.unit_status_id)
        property.unit_type_id = Number(property.unit_type_id)
        const propertyEntity = plainToInstance(PropertiesEntity, property, { excludeExtraneousValues: true });
        const response = await dispatch(patchProperty({ propertyEntity }));
        if (response.payload === "UnhandledFailure") {
            toast.error("Unhandled Failure");
            return
        }

        if (response.payload === "ValidationFailure") {
            toast.error("Validation Failure");
            return
        }

        toast.success("Property updated successfully")
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
                    {errors.unit_name && <Text color="red" size={"1"}>{errors.unit_name.message?.toString()}</Text>}
                    <Flex mt="2" gap={"8"}>
                        <Box>
                            <Text as="p" size={"2"}> Unit Type</Text>
                            <Controller
                                name="unit_type_id"
                                control={control}
                                defaultValue={String(property.unit_type_id)}
                                rules={{ required: "Property type is required" }}
                                render={({ field }) => (
                                    <Select.Root name="unit_type_id" onValueChange={field.onChange} defaultValue={String(property.unit_type_id)} >
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
                                defaultValue={String(property.unit_status_id)}
                                rules={{ required: "Property status is required" }}
                                render={({ field }) => (
                                    <Select.Root name="unit_status_id" onValueChange={field.onChange} defaultValue={String(property.unit_status_id)} >
                                        <Select.Trigger placeholder="Select status..." />
                                        <Select.Content>
                                            <Select.Group>
                                                {renderPropertyStatuses()}
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
                            <Button type="button" variant={"outline"} disabled={patchPropertyState.isLoading} >Cancel</Button>
                        </Dialog.Close>
                        <Button loading={patchPropertyState.isLoading} type="submit" >Submit</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root >
    )
}