import { Flex, Tooltip, Button, Link, DataList, Code } from "@radix-ui/themes";
import React, { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { IoArrowBack } from "react-icons/io5";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import ContentComponent from "../../../../components/content/content.component";
import toast from "react-hot-toast";
import Failure from "../../../../application/failure/failure";
import MotherMeterWaterEntity from "../../mother_meter_water/domain/entity/mother_meter_water.entity";
import GetMotherMeterWaterUseCase from "../../mother_meter_water/domain/use_case/get_mother_meter_water.use_case";
import { useQuery } from "@tanstack/react-query";
import DeleteMotherMeterWaterViewComponent from "./component/delete_mother_meter_water.view";

export default function MotherMeterWaterView() {
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
        </div>

    );
}