import React, { useState } from "react";
import { Box, Button, Dialog, Flex, IconButton, Tooltip, Text, TextField, Separator } from "@radix-ui/themes";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { plainToInstance } from "class-transformer";
import toast from "react-hot-toast";
import MotherMeterWaterComponentParams from "../interface/mother_meter_create_component.params";
import { AppDispatch, RootState } from "../../../../../infrastructure/redux/store.redux";
import { postMotherMeterWater } from "../../../../../infrastructure/api/slice/mother_meter_water/post_mother_meter_water.slice";
import MotherMeterWaterEntity from "../../../../../infrastructure/api/module/mother_meter_water/domain/entity/mother_meter_water.entity";

export default function MotherMeterWaterCreateComponent({ refetchMotherMetersWater }: MotherMeterWaterComponentParams) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch: AppDispatch = useDispatch();
    const postMotherMeterWaterState = useSelector((state: RootState) => state.postMotherMeterWaterApi)

    const [open, setOpen] = useState(false);
    const handleSave = async (formData: MotherMeterWaterEntity) => {
        const motherMeterWaterEntity = plainToInstance(MotherMeterWaterEntity, formData, {
            excludeExtraneousValues: true,
        })

        const response = await dispatch(postMotherMeterWater({ motherMeterWaterEntity }))

        if (response.payload === "ValidationFailure") {
            return toast.error("Something went wrong, please try again later");
        }

        if (response.payload === "UnhandledFailure") {
            return toast.error("Something went wrong, please try again later");
        }

        if (response.payload === "AlreadyExistsFailure") {
            return toast.error("Serial number already exist");
        }

        reset();
        setOpen(false);
        toast.success("Save successfully");
        refetchMotherMetersWater();
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen} >
            <Dialog.Trigger>
                <Button variant={"solid"}><PlusIcon /> Create Mother Meter Water</Button>
            </Dialog.Trigger>

            <Dialog.Content aria-describedby="description" width={"450px"}>
                <Flex justify={"end"}>
                    <Tooltip content={"Close"}>
                        <Dialog.Close>
                            <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                        </Dialog.Close>
                    </Tooltip>
                </Flex>
                <form onSubmit={handleSubmit((data) => handleSave(data as MotherMeterWaterEntity))}>
                    <Box mb={"5"}>
                        <Dialog.Title >Create Mother Meter Water</Dialog.Title>
                        <Separator my="3" size="4" />
                        <Text size={"2"}>
                            Serial Number
                        </Text>
                        <TextField.Root type="text" {...register("serialNumber",
                            {
                                required: "Serial number is required",
                                minLength:
                                {
                                    value: 10,
                                    message: "Serial number must be at least 10 characters long"
                                }
                            })} >
                            <TextField.Slot />
                        </TextField.Root>

                        {errors.serialNumber && <Text size={"1"} color={"red"} >{errors.serialNumber?.message?.toString()}</Text>}

                    </Box>
                    <Flex justify={"end"} gap={"2"}>
                        <Dialog.Trigger>
                            <Button type="button" disabled={postMotherMeterWaterState.isLoading} variant={"outline"}>Cancel</Button>
                        </Dialog.Trigger>
                        <Button type="submit" loading={postMotherMeterWaterState.isLoading}>Save</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}

