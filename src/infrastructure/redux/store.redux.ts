import { configureStore } from "@reduxjs/toolkit";
import getPropertyListApiReducer from "../../infrastructure/api/slice/get_property_list_api.slice";
import getPropertyApiSliceReducer from "../../infrastructure/api/slice/get_property_api.slice";
import postPropertyApiReducer from "../../infrastructure/api/slice/post_property_api.slice";
import deletePropertyApiSliceReducer from "../../infrastructure/api/slice/delete_property_api.slice";
import patchPropertyApiReducer from "../../infrastructure/api/slice/patch_property_api.slice";
import getPropertyStatusApiReducer from "../api/slice/get_property_status_api.slice";
import getProeprtyTypesApiReducer from "../api/slice/get_property_types_api.slice";
import patchPropertyStatusSliceApiReducer from "../api/slice/patch_property_status_api.slice";
import patchPropertyTypeSliceApiReducer from "../api/slice/patch_property_type_api.slice";
import getTenantListApiSliceReducer from "../api/slice/tenant/get_tenant_list_api.slice";
import getTenantApiSliceReducer from "../api/slice/tenant/get_tenant_api.slice";
import patchTenantApiSliceReducer from "../api/slice/tenant/patch_tenant_api.slice";
import getTenantListStatusApiSliceReducer from "../api/slice/tenant/get_tenant_status_list_ai.slice";
import deleteTenantApiSliceReducer from "../api/slice/tenant/delete_tenant_api.slice";


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
        deleteTenantApi: deleteTenantApiSliceReducer
    }
})
export default ReduxStore;

export type RootState = ReturnType<typeof ReduxStore.getState>;
export type AppDispatch = typeof ReduxStore.dispatch;
