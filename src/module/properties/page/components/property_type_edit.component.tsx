import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, Heading, IconButton, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import PropertyTypeEditParams from "../interface/property_type_edit.params";
import PatchPropertyTypeUseCase from "../../domain/use_case/patch_property_type.use_case";
import Failure from "../../../../application/failure/failure";
import { toast } from "react-toastify";

export default function PropertyTypeEditComponent({
    isOpen,
    propertyTypeEntity,
    refetchpropertiesTypesAndStatus,
    refetchProperties,
    handelClose
}: PropertyTypeEditParams) {
    const [name, setName] = useState(propertyTypeEntity.unit_type_name);
    const [isLoading, setIsLoading] = useState(false);

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        propertyTypeEntity.unit_type_name = name;

        const response = await PatchPropertyTypeUseCase({ propertyTypeEntity });

        if (response instanceof Failure) {
            console.log("patch Type failure");
            toast.error('Something went wrong')
        }

        setIsLoading(false);
        toast.success('Save')
        refetchpropertiesTypesAndStatus();
        refetchProperties();
        handelClose();
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={handelClose}>
            <Dialog.Content maxWidth="450px">
                <Flex justify={"end"}>
                    <Dialog.Close >
                        <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                    </Dialog.Close>
                </Flex>

                <Box>
                    <Dialog.Title size={"3"}>Edit Type</Dialog.Title>
                    <Form.Root onSubmit={handleSubmit}>
                        <Form.Field name="name">
                            <Form.Label style={{ fontSize: "13px" }}>Type Name</Form.Label>
                            <Form.Control asChild>
                                <TextField.Root value={name} onChange={handleChangeName} type="text" required />
                            </Form.Control>

                            <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter Type name</Form.Message>

                        </Form.Field>
                        <Flex justify={"end"} mt="5" gap="2">
                            <Dialog.Close >
                                <Button type="button" variant={"outline"} >Cancel</Button>
                            </Dialog.Close>

                            <Button loading={isLoading} type="submit" >Submit</Button>
                        </Flex>
                    </Form.Root>
                </Box>
            </Dialog.Content>
        </Dialog.Root>
    );
}