import { Flex, Tooltip, Button, DataList, Code, Link } from "@radix-ui/themes";
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineDeleteSweep } from "react-icons/md";
import ContentComponent from "../../../../components/content/content.component";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMotherMeterElectricity } from "../../../../infrastructure/api/slice/mother_meter_electricity/get_mother_meter_electricity_api.slice";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import MotherMeterElectricityEntity from "../../../../infrastructure/api/module/mother_meter_electricity/domain/entity/mother_meter_electricity.entity";
import DeleteMotherMeterElectricityComponent from "./component/delete_mother_meter_electricity.component";
import EditMotherMeterElectricityComponent from "./component/edit_mother_meter_electricity,component";

export default function MotherMeterElectricityView() {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);

    const handleBack = () => {
        navigate(-1)
    }

    const handelModelEdit = () => {
        setIsOpenEdit(!isOpenEdit)
    }

    const handelModelDelete = () => {
        setIsOpenDelete(!isOpenDelete)
    }

    const fetchMotherMeterElectricity = async () => {
        const response = await dispatch(getMotherMeterElectricity(Number(id)));

        if (response.payload === "UnhandledFailure") {
            toast.error("Something went wrong");
            return response
        }

        return response.payload as MotherMeterElectricityEntity
    }

    const motherMeterElectricityQuery = useQuery({
        queryKey: ["mother_meter_view"],
        queryFn: fetchMotherMeterElectricity,
        retry: true,
    })

    const motherMeter = motherMeterElectricityQuery.data as MotherMeterElectricityEntity || {}

    const refetch = () => {
        motherMeterElectricityQuery.refetch();
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

            <ContentComponent>
                <DataList.Root>
                    <DataList.Item>
                        <DataList.Label minWidth="158px">ID</DataList.Label>
                        <DataList.Value><Code variant="ghost" >{motherMeter.id}</Code></DataList.Value>
                        <DataList.Label minWidth="158px">Name</DataList.Label>
                        <DataList.Value>{motherMeter.serialNumber}</DataList.Value>
                        <DataList.Label minWidth="158px">Email</DataList.Label>
                        <DataList.Value>{String(motherMeter.createdAt)}</DataList.Value>
                    </DataList.Item>
                </DataList.Root>
            </ContentComponent>
            {isOpenDelete && <DeleteMotherMeterElectricityComponent isOpen={isOpenDelete} handleClose={handelModelDelete} />}
            {isOpenEdit && <EditMotherMeterElectricityComponent isOpen={isOpenEdit} refetch={refetch} handleClose={handelModelEdit} />}
        </div>

    )
}