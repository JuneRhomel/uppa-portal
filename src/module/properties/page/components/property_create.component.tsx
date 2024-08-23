import * as Form from "@radix-ui/react-form";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Select, Separator, TextField, Tooltip } from "@radix-ui/themes";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import PropertyCreateParams from "../interface/property_create.params"
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { postProperty } from "../../../../infrastructure/api/slice/post_property_api.slice";
import { getPropertyStatus } from "../../../../infrastructure/api/slice/get_property_status_api.slice";
import { getPropertyTypes } from "../../../../infrastructure/api/slice/get_property_types_api.slice";
import PropertiesEntity from "../../../../infrastructure/api/module/property/domain/entity/properties.entity";
import PropertyStatusEntity from "../../../../infrastructure/api/module/property/domain/entity/property_status.entity";
import PropertyTypeEntity from "../../../../infrastructure/api/module/property/domain/entity/property_type.entity";


export default function PropertyCreateComponent({
    refetchProperties
}: PropertyCreateParams) {
    const dispatch: AppDispatch = useDispatch();

    const [form, setForm] = useState({
        unit_name: "",
        unit_type_id: 1,
        unit_status_id: 1,
    })
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSelectChange = (name, value) => {
        setForm({ ...form, [name]: value })
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const propertyEntity = plainToInstance(PropertiesEntity, form, {
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
                    <Form.Root onSubmit={handleSave}>
                        <Form.Field name="unit_name">
                            <Form.Label style={{ fontSize: "13px" }}>Property Name</Form.Label>
                            <Form.Control asChild>
                                <TextField.Root onChange={handleChange} type="text" name="unit_name" required />
                            </Form.Control>
                            <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter property name</Form.Message>

                        </Form.Field>
                        <Flex mt="2" gap={"8"}>
                            <Form.Field name="unit_type_id"  >
                                <Form.Label style={{ fontSize: "13px" }}>Property Type</Form.Label><br />
                                <Form.Control asChild >
                                    <Select.Root name="unit_type_id" required defaultValue="1" onValueChange={(e) => handleSelectChange("unit_type_id", parseInt(e))} >
                                        <Select.Trigger placeholder="Select Type..." />
                                        <Select.Content>
                                            <Select.Group>
                                                {renderPropertyTypes()}
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                </Form.Control>
                                <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter property type</Form.Message>
                            </Form.Field>

                            <Form.Field name="unit_status_id" onChange={handleChange}>
                                <Form.Label style={{ fontSize: "13px" }}>Property status</Form.Label><br />
                                <Form.Control asChild>
                                    <Select.Root name="unit_status_id" required defaultValue="2" onValueChange={(e) => handleSelectChange("unit_status_id", parseInt(e))} >
                                        <Select.Trigger placeholder="Select status..." />
                                        <Select.Content>
                                            <Select.Group>
                                                {renderPropertyStatus()}
                                            </Select.Group>
                                        </Select.Content>
                                    </Select.Root>
                                </Form.Control>
                                <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter property status</Form.Message>
                            </Form.Field>
                        </Flex>

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
    )
}

