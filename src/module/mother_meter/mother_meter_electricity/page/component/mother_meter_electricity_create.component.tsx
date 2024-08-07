import React, { useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Dialog, Flex, IconButton, Separator, TextField, Tooltip, Text } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import MotherMeterElectricityEntity from "../../domain/entity/mother_meter_electricity.entity";
import toast
    from "react-hot-toast";
import { plainToInstance } from "class-transformer";
import Failure from "../../../../../application/failure/failure";
import ValidationFailure from "../../../../../application/failure/validation.failure";
import PostMotherMeterElectricityUseCase from "../../domain/use_case/post_mother_meter_electricity.use_case.params";
import MotherMeterCreateElectricityComponentParams from "../interface/mother_meter_create_electricity_component.params";

export default function MotherMeterElectricityCreateComponent({ refetchList }: MotherMeterCreateElectricityComponentParams) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleSave = async (formData: MotherMeterElectricityEntity) => {
        setIsLoading(true);
        const motherMeterElectricityEntity = plainToInstance(MotherMeterElectricityEntity, formData, {
            excludeExtraneousValues: true,
        })

        const response = await PostMotherMeterElectricityUseCase({
            motherMeterElectricityEntity
        });

        if (response instanceof ValidationFailure) {
            return toast.error("Validation failed");
        }

        if (response instanceof Failure) {
            return toast.error("Something went wrong, please try again later");
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

