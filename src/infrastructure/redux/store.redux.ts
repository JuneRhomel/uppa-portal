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
