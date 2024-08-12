import { BackpackIcon, CopyIcon } from '@radix-ui/react-icons';
import { Badge, Code, DataList, Flex, IconButton, Link, Table, Separator, Text, Box, Button, Tooltip } from '@radix-ui/themes';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContentComponent from '../../../../components/content/content.component';
import { IoArrowBack } from "react-icons/io5";
import GetPropertyUseCase from "../../../../module/properties/domain/use_case/get_property.use_case";
import Failure from '../../../../application/failure/failure';
import toast from 'react-hot-toast';
import PropertiesEntity from '../../domain/entity/properties.entity';
import { useQuery } from '@tanstack/react-query';
import { FiEdit3 } from "react-icons/fi";
import { MdOutlineDeleteSweep } from "react-icons/md";
import DeletePropertyComponent from './component/delete_property.component';
import EditPropertyComponent from './component/edit_property.component';

export default function PreopertyView() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const fetchProperty = async () => {
        const response = await GetPropertyUseCase({ id: Number(id) });

        if (response instanceof Failure) {
            toast.error("Something went wrong");
            return response
        }

        return response as PropertiesEntity

    }

    const handleBack = () => {
        navigate(-1)
    }

    const propertyQuery = useQuery({
        queryKey: ["property"],
        queryFn: fetchProperty,
        retry: true,
    })

    if (propertyQuery.isLoading) {
        return <div>Loading...</div>
    }

    if (propertyQuery.isError) {
        return <div>Error</div>
    }
    const property = propertyQuery.data as PropertiesEntity

    const handleDelete = () => {
        setOpenDelete(!openDelete)
    }

    const handleEdit = () => {
        setOpenEdit(!openEdit)
    }

    const refetch = () => {
        propertyQuery.refetch()
    }
    return (
        <div>
            <Flex justify="between" align="center" mb={'4'}>
                <Tooltip content={"Back"}>
                    <Link style={{ "width": "fit-content", "display": "inline-block" }} href='#' onClick={handleBack}  >
                        <Flex gap="2" width={"fit-content"} align={"center"}>
                            <IoArrowBack /> Back
                        </Flex>
                    </Link>
                </Tooltip>
                <Flex gap="2">
                    <Tooltip content={"Edit"}>
                        <Button onClick={handleEdit} variant="soft"><FiEdit3 /> Edit</Button>
                    </Tooltip>
                    <Tooltip content={"Delete"}>
                        <Button onClick={handleDelete} variant="soft" color='red'><MdOutlineDeleteSweep /> Delete</Button>
                    </Tooltip>
                </Flex>
            </Flex>
            <ContentComponent >
                <DataList.Root>
                    <DataList.Item>
                        <DataList.Label minWidth="158px">ID</DataList.Label>
                        <DataList.Value>
                            <Flex align="center" gap="2">
                                <Code variant="ghost">{property.id}</Code>
                                <IconButton
                                    size="1"
                                    aria-label="Copy value"
                                    color="gray"
                                    variant="ghost"
                                >
                                    <CopyIcon />
                                </IconButton>
                            </Flex>
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="158px">Property Name</DataList.Label>
                        <DataList.Value>
                            {property.unit_name}
                        </DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Item align="center">
                            <DataList.Label minWidth="158px">Status</DataList.Label>
                            <DataList.Value>
                                <Badge color="jade" variant="soft" radius="full">
                                    {property.unit_status_name}
                                </Badge>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Label minWidth="158px">Type</DataList.Label>
                        <DataList.Value>{property.unit_type_name}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                        <DataList.Label minWidth="158px">Created At</DataList.Label>
                        <DataList.Value>
                            {String(property.created_at)}
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </ContentComponent>
            <Separator size={'4'} my={'5'} />
            <ContentComponent >
                <Text size={'4'} weight={'bold'}>Tenant History</Text>
                <Table.Root variant='surface' mt={'3'}>
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell>Status</Table.Cell>
                            <Table.Cell>Type</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>

                        <Table.Row>
                            <Table.Cell>Avalable</Table.Cell>
                            <Table.Cell>Studio Unit</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </ContentComponent>

            <DeletePropertyComponent isOpen={openDelete} handleClose={handleDelete} />
            <EditPropertyComponent refetch={refetch} isOpen={openEdit} handleClose={handleEdit} />
        </div>
    );
}