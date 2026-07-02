import { baseApi } from './baseApi'
import { authApi, useGetAuthUserQuery } from './authApi'
import {
  propertyApi,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useCreatePropertyMutation,
} from './propertyApi'
import {
  tenantApi,
  useGetTenantQuery,
  useGetCurrentResidencesQuery,
  useUpdateTenantSettingsMutation,
  useAddFavoritePropertyMutation,
  useRemoveFavoritePropertyMutation,
} from './tenantApi'
import {
  managerApi,
  useGetManagerPropertiesQuery,
  useUpdateManagerSettingsMutation,
} from './managerApi'
import {
  applicationApi,
  useGetLeasesQuery,
  useGetPropertyLeasesQuery,
  useGetPaymentsQuery,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useCreateApplicationMutation,
} from './applicationApi'

export {
  baseApi,
  authApi,
  propertyApi,
  tenantApi,
  managerApi,
  applicationApi,
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetPropertyQuery,
  useCreatePropertyMutation,
  useGetTenantQuery,
  useGetCurrentResidencesQuery,
  useUpdateTenantSettingsMutation,
  useAddFavoritePropertyMutation,
  useRemoveFavoritePropertyMutation,
  useGetManagerPropertiesQuery,
  useUpdateManagerSettingsMutation,
  useGetLeasesQuery,
  useGetPropertyLeasesQuery,
  useGetPaymentsQuery,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useCreateApplicationMutation,
}

export const api = baseApi
