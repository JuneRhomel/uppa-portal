import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton, Separator, Text, TextField } from "@radix-ui/themes";
import { plainToInstance } from "class-transformer";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../../infrastructure/redux/store.redux";
import { getMotherMeterWater } from "../../../../../infrastructure/api/slice/mother_meter_water/get_mother_meter_water.slice";
import { patchMotherMeterWater } from "../../../../../infrastructure/api/slice/mother_meter_water/patch_mother_meter_water.slice";
import MotherMeterWaterEntity from "../../../../../infrastructure/api/module/mother_meter_water/domain/entity/mother_meter_water.entity";

export default function EditMotherMeterWaterViewComponent({ isOpen, handleClose }: { isOpen: boolean, handleClose: () => void }) {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const patchMotherMeterWaterState = useSelector((state: RootState) => state.patchMotherMeterWaterApi)

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const fetchMotherMeterWater = async () => {
        const response = await dispatch(getMotherMeterWater(Number(id)));

        if (response.payload === "UnhandledFailure") {
            toast.error("Something went wrong");
            return response
        }

        if (response.payload === "isAlreadyExist") {
            toast.error("Serial number already exist");
            return response
        }

        if (response.payload === "ValidationFailure") {
            toast.error("Validation failed");
            return response
        }

        return response.payload as MotherMeterWaterEntity
    }

    const motherMeterWaterQuery = useQuery({
        queryKey: ["mother_meter_view"],
        queryFn: fetchMotherMeterWater,
        retry: true,
    })
    const motherMeter = motherMeterWaterQuery.data as MotherMeterWaterEntity || {}

    const handleSubmitForm = async (data) => {

        const motherMeterWater = data as MotherMeterWaterEntity;
        const motherMeterWaterEntity = plainToInstance(MotherMeterWaterEntity, motherMeterWater, { excludeExtraneousValues: true });
        motherMeterWaterEntity.id = Number(id);

        const response = await dispatch(patchMotherMeterWater(motherMeterWaterEntity));

        if (response.payload === "ValidationFailure") {
            toast.error("Validation failed");

            return response
        }

        if (response.payload === "UnhandledFailure") {
            toast.error("Something went wrong");
            return response
        }
        toast.success("Update successfully");

        motherMeterWaterQuery.refetch();
        handleClose();
    }
    return (
        <Dialog.Root open={isOpen} onOpenChange={handleClose}>
            <Dialog.Content maxWidth="450px">
                <Flex justify={"end"}>
                    <Dialog.Close >
                        <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                    </Dialog.Close>
                </Flex>
                <Dialog.Title>Edit Property</Dialog.Title>
                <Separator my="3" size="4" />

                <form onSubmit={handleSubmit(handleSubmitForm)} >
                    <Text size={"2"}> Serial Number</Text>
                    <TextField.Root {...register(
                        "serialNumber",
                        {
                            required: "Serial number is required",
                            minLength: {
                                value: 5,
                                message: "Serial number must be at least 5 characters long"
                            }
                        },
                    )} type="text" defaultValue={motherMeter.serialNumber} >
                        <TextField.Slot />
                    </TextField.Root>
                    {errors.serial_number && <Text color="red" size={"1"}>{errors.serial_number.message?.toString()}</Text>}
                    <Flex justify={"end"} mt="5" gap="2">
                        <Dialog.Close >
                            <Button type="button" disabled={patchMotherMeterWaterState.isLoading} variant={"outline"} >Cancel</Button>
                        </Dialog.Close>
                        <Button loading={patchMotherMeterWaterState.isLoading} type="submit" >Submit</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}