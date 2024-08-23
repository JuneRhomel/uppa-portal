import { Cross2Icon } from "@radix-ui/react-icons";
import { Button, Dialog, Flex, IconButton, Separator, Text, TextField } from "@radix-ui/themes";
import { plainToInstance } from "class-transformer";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Failure from "../../../../../application/failure/failure";
import MotherMeterWaterEntity from "../../../mother_meter_water/domain/entity/mother_meter_water.entity";
import PatchMotherMeterWaterUseCase from "../../../mother_meter_water/domain/use_case/patch_mother_meter_water.use_case";
import { useParams } from "react-router-dom";
import GetMotherMeterWaterUseCase from "../../../mother_meter_water/domain/use_case/get_mother_meter_water.use_case";
import { useQuery } from "@tanstack/react-query";
import ValidationFailure from "../../../../../application/failure/validation.failure";

export default function EditMotherMeterWaterViewComponent({ isOpen, handleClose }: { isOpen: boolean, handleClose: () => void }) {
    const { id } = useParams();
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [isLoading, setIsLoading] = useState(false);

    const fetchMotherMeterWater = async () => {
        const response = await GetMotherMeterWaterUseCase({ id: Number(id) });

        if (response instanceof Failure) {
            toast.error("Something went wrong");
            return response
        }
        return response as MotherMeterWaterEntity
    }

    const motherMeterWaterQuery = useQuery({
        queryKey: ["mother_meter_view"],
        queryFn: fetchMotherMeterWater,
        retry: true,
    })
    const motherMeter = motherMeterWaterQuery.data as MotherMeterWaterEntity || {}

    const handleSubmitForm = async (data) => {
        setIsLoading(true);
        const motherMeterWater = data as MotherMeterWaterEntity;
        const motherMeterWaterEntity = plainToInstance(MotherMeterWaterEntity, motherMeterWater, { excludeExtraneousValues: true });
        motherMeterWaterEntity.id = Number(id);
        const response = await PatchMotherMeterWaterUseCase({ motherMeterWaterEntity });

        if (response instanceof ValidationFailure) {
            toast.error(response.message);
            setIsLoading(false);
            return response
        }

        if (response instanceof Failure) {
            toast.error("Something went wrong");
            setIsLoading(false);
            return response
        }
        toast.success("Update successfully");
        setIsLoading(false);
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
                            <Button type="button" variant={"outline"} >Cancel</Button>
                        </Dialog.Close>
                        <Button loading={isLoading} type="submit" >Submit</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}