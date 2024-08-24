import React, { useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Separator, TextField, Tooltip, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import toast
    from "react-hot-toast";
import { plainToInstance } from "class-transformer";
import MotherMeterCreateElectricityComponentParams from "../interface/mother_meter_create_electricity_component.params";
import { AppDispatch } from "../../../../../infrastructure/redux/store.redux";
import { useDispatch } from "react-redux";
import { postMotherMeterElectricity } from "../../../../../infrastructure/api/slice/mother_meter_electricity/post_mother_meter_electricity_api.slice";
import MotherMeterElectricityEntity from "../../../../../infrastructure/api/module/mother_meter_electricity/domain/entity/mother_meter_electricity.entity";

export default function MotherMeterElectricityCreateComponent({ refetchList }: MotherMeterCreateElectricityComponentParams) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async (formData: MotherMeterElectricityEntity) => {
        setIsLoading(true);
        const motherMeterElectricityEntity = plainToInstance(MotherMeterElectricityEntity, formData, {
            excludeExtraneousValues: true,
        })

        const response = await dispatch(postMotherMeterElectricity({ motherMeterElectricityEntity }))

        if (response.payload === "ValidationFailure") {
            return toast.error("Validation failed");
        }

        if (response.payload === "AlreadyExist") {
            return toast.error("Already Exist");
        }

        if (response.payload === "UnhandledFailure") {
            return toast.error("Unhandled Failure");
        }

        reset();
        setOpen(false);
        setIsLoading(false);
        refetchList()
        toast.success("Save successfully");
    }

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}  >
            <Dialog.Trigger>
                <Button variant={"solid"}><PlusIcon /> Create Mother Meter Electricity </Button>
            </Dialog.Trigger>


            <Dialog.Content aria-describedby="description" width={"450px"}>
                <Flex justify={"end"}>
                    <Tooltip content={"Close"}>
                        <Dialog.Close>
                            <IconButton variant={"ghost"}><Cross2Icon /></IconButton>
                        </Dialog.Close>
                    </Tooltip>
                </Flex>
                <form onSubmit={handleSubmit((data) => handleSave(data as MotherMeterElectricityEntity))}>
                    <Box mb={"5"}>
                        <Dialog.Title >Create Mother Meter Electricity</Dialog.Title>
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
                            <Button type="button" variant={"outline"}>Cancel</Button>
                        </Dialog.Trigger>
                        <Button loading={isLoading} type="submit">Save</Button>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    )
}

