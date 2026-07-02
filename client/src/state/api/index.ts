export { baseApi } from './baseApi'
export { authApi, useGetAuthUserQuery } from './authApi'
export { propertyApi, useGetPropertiesQuery, useGetPropertyQuery, useCreatePropertyMutation } from './propertyApi'
export { tenantApi, useGetTenantQuery, useGetCurrentResidencesQuery, useUpdateTenantSettingsMutation, useAddFavoritePropertyMutation, useRemoveFavoritePropertyMutation } from './tenantApi'
export { managerApi, useGetManagerPropertiesQuery, useUpdateManagerSettingsMutation } from './managerApi'
export { applicationApi, useGetLeasesQuery, useGetPropertyLeasesQuery, useGetPaymentsQuery, useGetApplicationsQuery, useUpdateApplicationStatusMutation, useCreateApplicationMutation } from './applicationApi'

export const api = baseApi
