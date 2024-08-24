import React, { useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, Text, IconButton, TextField } from "@radix-ui/themes";
import * as Form from "@radix-ui/react-form";
import PropertyTypeEditParams from "../interface/property_type_edit.params";
import { toast } from 'react-hot-toast';
import { AppDispatch, RootState } from "../../../../infrastructure/redux/store.redux";
import { useDispatch, useSelector } from "react-redux";
import { patchPropertyType } from "../../../../infrastructure/api/slice/property/patch_property_type_api.slice";
import { useForm } from "react-hook-form";

export default function PropertyTypeEditComponent({
    isOpen,
    propertyTypeEntity,
    refetchpropertiesTypesAndStatus,
    refetchProperties,
    handelClose
}: PropertyTypeEditParams) {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            unit_type_name: propertyTypeEntity.unit_type_name
        }
    });
    const patchPropertyTypeState = useSelector((state: RootState) => state.patchPropertyTypeSliceApi)

    const handleSave = async (data) => {
        propertyTypeEntity.unit_type_name = data.unit_type_name;

        const response = await dispatch(patchPropertyType({ propertyTypeEntity }))

        if (response.payload === "UnhandledFailure") {
            toast.error('Something went wrong')
        }
        toast.success('Save')
        reset()
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
                    < form onSubmit={handleSubmit(handleSave)}>
                        <Text size={"2"}>Type Name</Text>
                        <TextField.Root {...register("unit_type_name", { required: "Please enter type name", minLength: 3 })} />
                        {errors.unit_type_name && <Text color="red">{errors.unit_type_name.message}</Text>}
                        <Flex justify={"end"} mt="5" gap="2">
                            <Dialog.Close >
                                <Button type="button" disabled={patchPropertyTypeState.isLoading} variant={"outline"} >Cancel</Button>
                            </Dialog.Close>

                            <Button loading={patchPropertyTypeState.isLoading} type="submit" >Submit</Button>
                        </Flex>
                    </ form>
                </Box>
            </Dialog.Content>
        </Dialog.Root>
    );
}