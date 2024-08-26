import { configureStore } from "@reduxjs/toolkit";
import getPropertyListApiReducer from "../api/slice/property/get_property_list_api.slice";
import getPropertyApiSliceReducer from "../api/slice/property/get_property_api.slice";
import postPropertyApiReducer from "../api/slice/property/post_property_api.slice";
import deletePropertyApiSliceReducer from "../api/slice/property/delete_property_api.slice";
import patchPropertyApiReducer from "../api/slice/property/patch_property_api.slice";
import getPropertyStatusApiReducer from "../api/slice/property/get_property_status_api.slice";
import getProeprtyTypesApiReducer from "../api/slice/property/get_property_types_api.slice";
import patchPropertyStatusSliceApiReducer from "../api/slice/property/patch_property_status_api.slice";
import patchPropertyTypeSliceApiReducer from "../api/slice/property/patch_property_type_api.slice";
import getTenantListApiSliceReducer from "../api/slice/tenant/get_tenant_list_api.slice";
import getTenantApiSliceReducer from "../api/slice/tenant/get_tenant_api.slice";
import patchTenantApiSliceReducer from "../api/slice/tenant/patch_tenant_api.slice";
import getTenantListStatusApiSliceReducer from "../api/slice/tenant/get_tenant_status_list_ai.slice";
import deleteTenantApiSliceReducer from "../api/slice/tenant/delete_tenant_api.slice";
import getMotherMeterElectricityListApiSliceReducer from "../api/slice/mother_meter_electricity/get_mother_meter_electricity_list_api.slice";
import postMotherMeterElectricityApiSliceReducer from "../api/slice/mother_meter_electricity/post_mother_meter_electricity_api.slice";
import getMotherMeterWaterListApiSliceReducer from "../api/slice/mother_meter_water/get_mother_meter_water_list.slice";
import getMotherMeterWaterApiSliceReducer from "../api/slice/mother_meter_water/get_mother_meter_water.slice";
import postMotherMeterWaterApiSliceReducer from "../api/slice/mother_meter_water/post_mother_meter_water.slice";
import deleteMotherMeterWaterApiSliceReducer from "../api/slice/mother_meter_water/delete_mother_meter_water.slice";
import loginApiSliceReducer from "../api/slice/login/login_api.slice";
import postTenantApiSliceReducer from "../api/slice/tenant/post_tenant_api.slice";
import patchMotherMeterWaterApiSliceReducer from "../api/slice/mother_meter_water/patch_mother_meter_water.slice";
import patchMotherMeterElectricityApiSliceReducer from "../api/slice/mother_meter_electricity/patch_mother_meter_electricity_api.slice";
import getMotherMeterElectricityApiSliceReducer from "../api/slice/mother_meter_electricity/get_mother_meter_electricity_api.slice";
import deleteMotherMeterElectricityApiSliceReducer from "../api/slice/mother_meter_electricity/delete_mother_meter_electricity_api.slice";
import deleteSubMeterElectricityApiSliceReducer from "../api/slice/sub_meter_electricity/delete_sub_meter_electricity_api.slice";
import getSubMeterElectricityApiSliceReducer from "../api/slice/sub_meter_electricity/get_sub_meter_electricity_api.slice";
import getSubMeterElectricityListApiSliceReducer from "../api/slice/sub_meter_electricity/get_sub_meter_electricity_list_api.slice";
import patchSubMeterElectricityApiSliceReducer from "../api/slice/sub_meter_electricity/patch_sub_meter_electricity_api.slice";
import postSubMeterElectricityApiSliceReducer from "../api/slice/sub_meter_electricity/post_sub_meter_electricity_api.slice";
import deleteSubMeterWaterApiSliceReducer from "../api/slice/sub_meter_water/delete_sub_meter_water_api.slice";
import getSubMeterWaterApiSliceReducer from "../api/slice/sub_meter_water/get_sub_meter_water_api.slice";
import getSubMeterWaterListApiSliceReducer from "../api/slice/sub_meter_water/get_sub_meter_water_list_api.slice";
import patchSubMeterWaterApiSliceReducer from "../api/slice/sub_meter_water/patch_sub_meter_water_api.slice";
import postSubMeterWaterApiSliceReducer from "../api/slice/sub_meter_water/post_sub_meter_water_api.slice";


const ReduxStore = configureStore({
    reducer: {
        getProeprtyListApi: getPropertyListApiReducer,
        getPropertyApi: getPropertyApiSliceReducer,
        postPropertyApi: postPropertyApiReducer,
        deletePropertyApi: deletePropertyApiSliceReducer,
        patchPropertyApi: patchPropertyApiReducer,
        getPropertyStatusApi: getPropertyStatusApiReducer,
        getProeprtyTypesApi: getProeprtyTypesApiReducer,
        patchPropertyStatusSliceApi: patchPropertyStatusSliceApiReducer,
        patchPropertyTypeSliceApi: patchPropertyTypeSliceApiReducer,
        getTenantListApi: getTenantListApiSliceReducer,
        getTenantApi: getTenantApiSliceReducer,
        patchTenantApi: patchTenantApiSliceReducer,
        getTenantListStatusApi: getTenantListStatusApiSliceReducer,
        deleteTenantApi: deleteTenantApiSliceReducer,
        getMotherMeterElectricityListApiSliceReducer: getMotherMeterElectricityListApiSliceReducer,
        postMotherMeterElectricityApi: postMotherMeterElectricityApiSliceReducer,
        getMotherMeterWaterListApi: getMotherMeterWaterListApiSliceReducer,
        getMotherMeterWaterApi: getMotherMeterWaterApiSliceReducer,
        postMotherMeterWaterApi: postMotherMeterWaterApiSliceReducer,
        deleteMotherMeterWaterApi: deleteMotherMeterWaterApiSliceReducer,
        loginApi: loginApiSliceReducer,
        postTenantApi: postTenantApiSliceReducer,
        patchMotherMeterWaterApi: patchMotherMeterWaterApiSliceReducer,
        getMotherMeterElectricityApi: getMotherMeterElectricityApiSliceReducer,
        patchMotherMeterElectricityApi: patchMotherMeterElectricityApiSliceReducer,
        deleteMotherMeterElectricityApi: deleteMotherMeterElectricityApiSliceReducer,
        deleteSubMeterElectricityApi: deleteSubMeterElectricityApiSliceReducer,
        getSubMeterElectricityApi: getSubMeterElectricityApiSliceReducer,
        getSubMeterElectricityListApi: getSubMeterElectricityListApiSliceReducer,
        patchSubMeterElectricityApi: patchSubMeterElectricityApiSliceReducer,
        postSubMeterElectricityApi: postSubMeterElectricityApiSliceReducer,
        deleteSubMeterWaterApi: deleteSubMeterWaterApiSliceReducer,
        getSubMeterWaterApi: getSubMeterWaterApiSliceReducer,
        getSubMeterWaterListApi: getSubMeterWaterListApiSliceReducer,
        patchSubMeterWaterApi: patchSubMeterWaterApiSliceReducer,
        postSubMeterWaterApi: postSubMeterWaterApiSliceReducer
    }
})
export default ReduxStore;

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
