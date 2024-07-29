import * as Form from "@radix-ui/react-form";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Select, TextField, Tooltip } from "@radix-ui/themes";
import React, { useState } from "react";
import PropertyTypeEntity from "../../domain/entity/property_type.entity";
import PropertyStatusEntity from "../../domain/entity/property_status.entity";
import GetPropertyStatusUseCase from "../../domain/use_case/get_property_status.use_case";
import GetPropertyTypeUseCase from "../../domain/use_case/get_property_type.use_case";
import Failure from "../../../../application/failure/failure";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import PropertiesEntity from "../../domain/entity/properties.entity";
import { plainToInstance } from "class-transformer";
import PostPropertyUseCase from "../../domain/use_case/post_property.use_case";
import PropertyCreateParams from "../interface/property_create.params";


export default function PropertyCreateComponent({
    refetchProperties
}: PropertyCreateParams) {
    const [form, setForm] = useState({
        unit_name: "",
        unit_type_id: 1,
        unit_status_id: 1,
    })
    const [open, setOpen] = useState(false);
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

        const response = await PostPropertyUseCase({
            propertyEntity
        });

        if (response instanceof Failure) {
            toast.error(response.message);
            return;
        }

        propertiesTypesAndStatusQuery.refetch();
        refetchProperties();
        toast.success('Save')
        setOpen(false);
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
                                                {propertiesTypesAndStatusQuery.isLoading && <Select.Item value="1">Loading...</Select.Item>}
                                                {propertyTypes.map((type) => (
                                                    <Select.Item key={type.id} value={type.id.toString()}>{type.unit_type_name}</Select.Item>
                                                ))}
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
                                                {propertiesTypesAndStatusQuery.isLoading && <Select.Item value="1">Loading...</Select.Item>}
                                                {propertyStatuses.map((status) => (
                                                    <Select.Item key={status.id} value={status.id.toString()}>{status.unit_status_name}</Select.Item>
                                                ))}
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

