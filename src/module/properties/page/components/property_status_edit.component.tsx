import React from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, TextField, Text } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import PropertyStatusEditParams from "../interface/property_status_edit.params";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../infrastructure/redux/store.redux";
import { patchPropertyStatus } from "../../../../infrastructure/api/slice/property/patch_property_status_api.slice";
import { useForm } from "react-hook-form";

export default function PropertyStatusEditComponent({
    isOpen,
    propertyStatusEntity,
    refetchpropertiesTypesAndStatus,
    refetchProperties,
    handelClose
}: PropertyStatusEditParams) {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            unit_status_name: propertyStatusEntity.unit_status_name
        }
    });
    const patchPropertyStatusState = useSelector((state: RootState) => state.patchPropertyStatusSliceApi)


    const handleSave = async (data) => {
        propertyStatusEntity.unit_status_name = data.unit_status_name
        const response = await dispatch(patchPropertyStatus({ propertyStatusEntity }))

        if (response.payload === "UnhandledFailure") {
            toast.error('Something went wrong')
        }

        refetchpropertiesTypesAndStatus();
        refetchProperties()
        handelClose();
        reset()
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
                    <form onSubmit={handleSubmit(handleSave)}>
                        <Text size={"2"}>Status Name</Text>
                        <TextField.Root {
                            ...register("unit_status_name", {
                                required: "Please enter status name",
                            })
                        } />

                        {errors.unit_status_name && <Text color="red">{errors.unit_status_name.message}</Text>}

                        <Flex justify={"end"} mt="5" gap="2">
                            <Dialog.Close >
                                <Button type="button" disabled={patchPropertyStatusState.isLoading} variant={"outline"} >Cancel</Button>
                            </Dialog.Close>
                            <Button loading={patchPropertyStatusState.isLoading} type="submit" >Submit</Button>
                        </Flex>
                    </form>
                </Box>
            </Dialog.Content>
        </Dialog.Root>
    );
}