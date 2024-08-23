import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { Button, Flex, Tooltip, Link, DataList, Code, Badge, Avatar } from "@radix-ui/themes";
import { FiEdit3 } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineDeleteSweep } from "react-icons/md";
import ContentComponent from "../../../components/content/content.component";
import EditTenantComponent from "./component/edit_tenant.component";
import DeleteTenantComponent from "./component/delete_tenant.component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../infrastructure/redux/store.redux";
import { getTenant } from "../../../infrastructure/api/slice/tenant/get_tenant_api.slice";
import TenantEntity from "../../../infrastructure/api/module/tenant/domain/entity/tenant.entity";

export default function TenantView() {
    const dispatch: AppDispatch = useDispatch();

    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const fetchTenant = async () => {
        const response = await dispatch(getTenant({
            id: Number(id)
        }));
        if (response.payload === "UnhandledFailure") {
            toast.error("Something went wrong");
            return response
        }

        return response.payload as TenantEntity
    }
    const handleBack = () => {
        navigate(-1)
    }

    const tenantQuery = useQuery({
        queryKey: ["tenant_view"],
        queryFn: fetchTenant,
        retry: true,
    })

    if (tenantQuery.isLoading) {
        return <div>Loading...</div>
    }

    if (tenantQuery.isError) {
        return <div>Error</div>
    }
    const tenant = tenantQuery.data as TenantEntity

    const renderBadge = (status: string | undefined) => {
        if (status === "Active") {
            return <Badge color={"green"}>{status}</Badge>
        }
        if (status === "Inactive") {
            return <Badge color={"red"}>{status}</Badge>
        }
        return <Badge color={"orange"}>{status}</Badge>
    }
    const handelModelEdit = () => {
        setIsOpenEdit(!isOpenEdit)
    }

    const refetch = () => {
        tenantQuery.refetch()
    }

    const handelModelDelete = () => {
        setIsOpenDelete(!isOpenDelete)
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
                        <Button onClick={handelModelEdit} variant="soft"><FiEdit3 /> Edit</Button>
                    </Tooltip>
                    <Tooltip content={"Delete"}>
                        <Button variant="soft" onClick={handelModelDelete} color='red'><MdOutlineDeleteSweep /> Delete</Button>
                    </Tooltip>
                </Flex>
            </Flex>
            <ContentComponent >
                <DataList.Root>
                    <DataList.Label>
                        <Avatar radius={"full"} size={"2"} fallback={tenant.first_name.slice(0, 1)} mr={"2"} />
                    </DataList.Label>
                    <DataList.Item>
                        <DataList.Label minWidth="158px">ID</DataList.Label>
                        <DataList.Value><Code variant="ghost" >{tenant.id}</Code></DataList.Value>
                        <DataList.Label minWidth="158px">Name</DataList.Label>
                        <DataList.Value>{tenant.first_name} {tenant.last_name}</DataList.Value>
                        <DataList.Label minWidth="158px">Email</DataList.Label>
                        <DataList.Value>{tenant.email}</DataList.Value>
                        <DataList.Label minWidth="158px">Contact Number</DataList.Label>
                        <DataList.Value>{tenant.contact_number}</DataList.Value>
                        <DataList.Label minWidth="158px">Status</DataList.Label>
                        <DataList.Value>
                            {renderBadge(tenant.status)}
                        </DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </ContentComponent>
            {isOpenEdit && <EditTenantComponent refetch={refetch} isOpen={isOpenEdit} handleClose={handelModelEdit} />}
            {isOpenDelete && <DeleteTenantComponent isOpen={isOpenDelete} handleClose={handelModelDelete} />}
        </div>
    )
}