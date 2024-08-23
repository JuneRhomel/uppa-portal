import { AlertDialog, Flex, Button } from "@radix-ui/themes";
import React from "react";
import DeleteMotherMeterWaterUseCase from "../../../mother_meter_water/domain/use_case/delete_mother_meter_water.use_case";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Failure from "../../../../../application/failure/failure";

export default function DeleteMotherMeterWaterViewComponent({ isOpen, handleClose }: { isOpen: boolean, handleClose: () => void }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const handleDelete = () => {
        const response = DeleteMotherMeterWaterUseCase({ id: Number(id) });

        if (response instanceof Failure) {
            toast.error("Something went wrong");
            return response
        }

        toast.success("Delete successfully");
        navigate(-1)
        handleClose()
    }

    return (
        <AlertDialog.Root open={isOpen} onOpenChange={handleClose} >
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Mother Meter</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? This Mother Meter will no longer be accessible and any
                    existing sessions will be expired.
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button onClick={handleClose} variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <Button onClick={handleDelete} variant="solid" color="red">
                        Delete
                    </Button>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}