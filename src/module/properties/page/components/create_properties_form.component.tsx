import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from "react-router-dom";
import CreatePropertiesFormContainerStyle from "../style/create_properties_form_container.style";
import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import SendIcon from '@mui/icons-material/Send';
import PropertiesEntity from "../../domain/entity/properties.entity";
import { plainToInstance } from "class-transformer";
import TimeoutFailure from "../../../../application/failure/timeout.failure";
import Failure from "../../../../application/failure/failure";
import PostPropertyUseCase from "../../domain/use_case/post_property.use_case";
import CreatePropertiesModalParams from "../interface/create_properties_modal.params";
import GetPropertyTypeUseCase from "../../domain/use_case/get_property_type.use_case";
import PropertyTypEntity from "../../domain/entity/property_type.entity";
import GetPropertyStatusUseCase from "../../domain/use_case/get_property_status.use_case";
import PropertyStatusEntity from "../../domain/entity/property_status.entity";
export default function CreatePropertiesFormComponent({ handleClose }: CreatePropertiesModalParams) {
    const navigate = useNavigate();
    const [isLoadingSave, setIsLoadingSave] = useState(false);
    const [propertyName, setPropertyName] = useState("");
    const [propertyTypeId, setPropertyTypeId] = useState("");
    const [propertyStatusId, setPropertyStatusId] = useState("");
    const [listPropertyStatus, setListPropertyStatus] = useState([] as PropertyStatusEntity[]);
    const [listPropertyType, setListPropertyType] = useState([] as PropertyTypEntity[]);
    const propertyTypesQuery = async () => {
        const response = await GetPropertyTypeUseCase();
        if (response instanceof Failure) {
            alert(response.message);
        }
        return response;
    }
    const propertyStatusQuery = async () => {
        const response = await GetPropertyStatusUseCase();
        if (response instanceof Failure) {
            alert(response.message);
        }
        return response;
    }

    useEffect(() => {
        document.title = "Create Property - Properties";

        const fetchPropertyTypes = async () => {
            const propertyTypes = await propertyTypesQuery() as PropertyTypEntity[];
            const propertyStatus = await propertyStatusQuery() as PropertyStatusEntity[];
            setListPropertyType(propertyTypes);
            setListPropertyStatus(propertyStatus);
        };

        fetchPropertyTypes();
    }, []);



    const handlePropertyNameChange = (event: any) => {
        setPropertyName(event.target.value);
    };
    const handlePropertyTypeIdChange = (event: any) => {
        setPropertyTypeId(event.target.value);
    };
    const handlePropertyStatusIdChange = (event: any) => {
        setPropertyStatusId(event.target.value);
        console.log(event.target.value);
    };
    const handleSubmit = async (event: any) => {
        setIsLoadingSave(true);
        event.preventDefault();
        const propertyEntity = plainToInstance(PropertiesEntity, {
            unit_name: propertyName,
            unit_type_id: propertyTypeId,
            unit_status_id: propertyStatusId
        })
        const response = await PostPropertyUseCase({
            propertyEntity
        });
        if (response instanceof TimeoutFailure) {
            alert("Your session has expired. Please login again.");
            return navigate("/login");
        }
        if (response instanceof Failure) {
            return alert(response.message);
        }
        setIsLoadingSave(false);
        navigate("/properties")
        handleClose();
        setPropertyName("");
        setPropertyTypeId("");
        setPropertyStatusId("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <CreatePropertiesFormContainerStyle>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Property Name"
                            variant="outlined"
                            value={propertyName}
                            onChange={handlePropertyNameChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Type</InputLabel>
                            <Select
                                value={propertyTypeId}
                                label="Type"
                                size="small"
                                onChange={handlePropertyTypeIdChange}
                            >
                                {listPropertyType.map((propertyType) => (
                                    <MenuItem
                                        key={propertyType.id}
                                        value={propertyType.id}
                                    >
                                        {propertyType.unit_type_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={propertyStatusId}
                                label="Status"
                                size="small"
                                onChange={handlePropertyStatusIdChange}
                            >
                                {listPropertyStatus.map((propertyStatus) => (
                                    <MenuItem
                                        key={propertyStatus.id}
                                        value={propertyStatus.id}
                                    >
                                        {propertyStatus.unit_status_name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CreatePropertiesFormContainerStyle>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <LoadingButton
                    type="submit"
                    loading={isLoadingSave}
                    variant="contained"
                >
                    <span>Save</span>
                </LoadingButton>
            </Stack>
        </form>
    );
}