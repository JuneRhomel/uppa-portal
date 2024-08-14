import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Failure from "../../../../../application/failure/failure";
import DeleteTenantUseCase from "../../../domain/use_case/delete_tenant.use_case";

export default function DeleteTenantComponent({ isOpen, handleClose }: { isOpen: boolean, handleClose: () => void }) {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        const response = await DeleteTenantUseCase({ id: Number(id) });

        if (response instanceof Failure) {
            toast.error("Something went wrong");
            return response
        }

        toast.success("Delete successfully");
        handleClose()
        navigate(-1)
    }

    return (
        <AlertDialog.Root open={isOpen} onOpenChange={handleClose} >
            <AlertDialog.Content maxWidth="450px">
                <AlertDialog.Title>Delete Tenant</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Are you sure? This Tenant will no longer be accessible and any
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