import { MagnifyingGlassIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, IconButton, TextField, Tooltip } from "@radix-ui/themes";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableHeaderComponentParams from "./interface/table_header.component.params";


export default function TableHeaderComponent({
    prefix,
    create,
    reload,
    onReload
}: TableHeaderComponentParams) {
    const navigate = useNavigate();
    const location = useLocation();

    const handelSearch = (e) => {

        e.preventDefault();
        const queryPathParameters = new URLSearchParams(location.search);
        queryPathParameters.set("search", e.target.value);
        navigate(`?${queryPathParameters.toString()}`);
    };

    const renderCreate = () => {
        if (!create) {
            return null
        }
        return create
    }

    const renderPrefix = () => {
        if (!prefix) {
            return null
        }
        return prefix
    }

    const renderReload = () => {
        if (!reload) {
            return null
        }
        return (
            <Tooltip content={"Reload"}>
                <IconButton variant={"soft"} onClick={onReload}><ReloadIcon /></IconButton>
            </Tooltip>)
    }
    return (
        <Flex justify={"between"} mb="5">
            <Flex gap="3" align="center">
                <TextField.Root onChange={handelSearch} placeholder="Search the properties">
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
                {renderReload()}
                {renderPrefix()}
            </Flex>



            {renderCreate()}
        </Flex>
    )
}