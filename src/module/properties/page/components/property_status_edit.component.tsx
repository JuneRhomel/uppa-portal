import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, Heading, IconButton, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import PropertyStatusEditParams from "../interface/property_status_edit.params";
import PatchPropertyStatusUseCase from "../../domain/use_case/patch_property_status.use_case";
import Failure from "../../../../application/failure/failure";
import { toast } from "react-hot-toast";

export default function PropertyStatusEditComponent({
    isOpen,
    propertyStatusEntity,
    refetchpropertiesTypesAndStatus,
    refetchProperties,
    handelClose
}: PropertyStatusEditParams) {
    const [name, setName] = useState(propertyStatusEntity.unit_status_name);
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        propertyStatusEntity.unit_status_name = name;

        const response = await PatchPropertyStatusUseCase({ propertyStatusEntity });

        if (response instanceof Failure) {
            toast.error('Something went wrong')
        }

        setIsLoading(false);

        refetchpropertiesTypesAndStatus();
        refetchProperties()
        handelClose();
        toast.success('Save')
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
                    <Dialog.Title size={"3"}>Edit Status</Dialog.Title>
                    <Form.Root onSubmit={handleSubmit}>
                        <Form.Field name="name">
                            <Form.Label style={{ fontSize: "13px" }}>Status Name</Form.Label>
                            <Form.Control asChild>
                                <TextField.Root value={name} onChange={handleChangeName} type="text" required />
                            </Form.Control>

                            <Form.Message style={{ color: "red", fontSize: "10px" }} match="valueMissing">Please enter status name</Form.Message>

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