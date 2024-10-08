import { Flex, Tooltip, Button, Link, DataList, Code } from "@radix-ui/themes";
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ContentComponent from "../../../../components/content/content.component";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import DeleteMotherMeterWaterViewComponent from "./component/delete_mother_meter_water.component";
import EditMotherMeterWaterViewComponent from "./component/edit_mother_meter_water.component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../infrastructure/redux/store.redux";
import { getMotherMeterWater } from "../../../../infrastructure/api/slice/mother_meter_water/get_mother_meter_water.slice";
import MotherMeterWaterEntity from "../../../../infrastructure/api/module/mother_meter_water/domain/entity/mother_meter_water.entity";

export default function MotherMeterWaterView() {
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

    const fetchMotherMeterWater = async () => {
        const response = await dispatch(getMotherMeterWater(Number(id)));

        if (response.payload === "UnhandledFailure") {
            toast.error("Something went wrong");
            return response
        }

        return response.payload as MotherMeterWaterEntity
    }

    const motherMeterWaterQuery = useQuery({
        queryKey: ["mother_meter_view"],
        queryFn: fetchMotherMeterWater,
        retry: true,
    })

    const motherMeter = motherMeterWaterQuery.data as MotherMeterWaterEntity || {}

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
            {isOpenDelete && <DeleteMotherMeterWaterViewComponent isOpen={isOpenDelete} handleClose={handelModelDelete} />}
            {isOpenEdit && <EditMotherMeterWaterViewComponent isOpen={isOpenEdit} handleClose={handelModelEdit} />}
        </div>

    );
}