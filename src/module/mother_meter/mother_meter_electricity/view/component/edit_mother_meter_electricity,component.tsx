import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton, Separator, Text, TextField } from "@radix-ui/themes";
import React from "react";
import { AppDispatch, RootState } from "../../../../../infrastructure/redux/store.redux";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getMotherMeterElectricity } from "../../../../../infrastructure/api/slice/mother_meter_electricity/get_mother_meter_electricity_api.slice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import MotherMeterElectricityEntity from "../../../../../infrastructure/api/module/mother_meter_electricity/domain/entity/mother_meter_electricity.entity";
import { useQuery } from "@tanstack/react-query";
import { plainToInstance } from "class-transformer";
import { patchMotherMeterElectricity } from "../../../../../infrastructure/api/slice/mother_meter_electricity/patch_mother_meter_electricity_api.slice";

export default function EditMotherMeterElectricityComponent({ isOpen, handleClose, refetch }: { isOpen: boolean, handleClose: () => void, refetch: () => void }) {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const patchMotherMeterElectricityState = useSelector((state: RootState) => state.patchMotherMeterElectricityApi)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const fetchMotherMeterElectricity = async () => {
        const response = await dispatch(getMotherMeterElectricity(Number(id)));

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

        return response.payload as MotherMeterElectricityEntity
    }

    const motherMeterElectricityQuery = useQuery({
        queryKey: ["mother_meter_electricity_view"],
        queryFn: fetchMotherMeterElectricity,
        retry: true,
    })
    const motherMeter = motherMeterElectricityQuery.data as MotherMeterElectricityEntity || {}

    const handleSubmitForm = async (data) => {

        const motherMeterElectricity = data as MotherMeterElectricityEntity;
        const motherMeterElectricityEntity = plainToInstance(MotherMeterElectricityEntity, motherMeterElectricity, { excludeExtraneousValues: true });
        motherMeterElectricityEntity.id = Number(id);

        const response = await dispatch(patchMotherMeterElectricity(motherMeterElectricityEntity));

        if (response.payload === "ValidationFailure") {
            toast.error("Validation failed");

            return response
        }

        if (response.payload === "UnhandledFailure") {
            toast.error("Something went wrong");
            return response
        }
        toast.success("Update successfully");

        motherMeterElectricityQuery.refetch();
        handleClose();
        reset();
        refetch();
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
                            <Button type="button" disabled={patchMotherMeterElectricityState.isLoading} variant={"outline"} >Cancel</Button>
                        </Dialog.Close>
                        <Button loading={patchMotherMeterElectricityState.isLoading} type="submit" >Submit</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}