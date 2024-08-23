import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import PropertyStatusEditParams from "../interface/property_status_edit.params";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { patchPropertyStatus } from "../../../../infrastructure/api/slice/patch_property_status_api.slice";

export default function PropertyStatusEditComponent({
    isOpen,
    propertyStatusEntity,
    refetchpropertiesTypesAndStatus,
    refetchProperties,
    handelClose
}: PropertyStatusEditParams) {
    const dispatch = useDispatch<AppDispatch>();
    const [name, setName] = useState(propertyStatusEntity.unit_status_name);
    const [isLoading, setIsLoading] = useState(false);
    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        propertyStatusEntity.unit_status_name = name;

        const response = await dispatch(patchPropertyStatus({ propertyStatusEntity }))

        if (response.payload === "UnhandledFailure") {
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