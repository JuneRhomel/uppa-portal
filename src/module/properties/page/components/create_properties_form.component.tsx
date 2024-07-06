import {
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CreatePropertiesFormContainerStyle from "../style/create_properties_form_container.style";
import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import PropertiesEntity from "../../domain/entity/properties.entity";
import { plainToInstance } from "class-transformer";
import TimeoutFailure from "../../../../application/failure/timeout.failure";
import Failure from "../../../../application/failure/failure";
import PostPropertyUseCase from "../../domain/use_case/post_property.use_case";
import CreatePropertiesModalParams from "../interface/create_properties_modal.params";

export default function CreatePropertiesFormComponent({ handleClose }: CreatePropertiesModalParams) {
    const navigate = useNavigate();
    const [propertyName, setPropertyName] = useState("");
    const [propertyTypeId, setPropertyTypeId] = useState("");
    const [propertyStatusId, setPropertyStatusId] = useState("");

    const handlePropertyNameChange = (event: any) => {
        setPropertyName(event.target.value);
    };
    const handlePropertyTypeIdChange = (event: any) => {
        setPropertyTypeId(event.target.value);
    };
    const handlePropertyStatusIdChange = (event: any) => {
        setPropertyStatusId(event.target.value);
    };
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const propertyEntity = plainToInstance(PropertiesEntity, {
            unit_name: propertyName,
            unit_type_id: propertyTypeId,
            unit_status_id: propertyStatusId
        })
        const response = await PostPropertyUseCase({
            propertyEntity
        });
        console.log(response);

        if (response instanceof TimeoutFailure) {
            alert("Your session has expired. Please login again.");
            return navigate("/login");
        }
        if (response instanceof Failure) {
            return alert(response.message);
        }
        alert("Property created successfully");
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
                                <MenuItem value={1}>Ten</MenuItem>
                                <MenuItem value={2}>Twenty</MenuItem>
                                <MenuItem value={3}>Three</MenuItem>
                                <MenuItem value={4}>Four</MenuItem>
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
                                <MenuItem value={1}>Active</MenuItem>
                                <MenuItem value={2}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </CreatePropertiesFormContainerStyle>
            <Stack direction="row" justifyContent="flex-end" spacing={1}>
                <Button variant="contained" type="submit">
                    Save
                </Button>
            </Stack>
        </form>
    );
}