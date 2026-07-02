import { createNewUserInDatabase, withToast } from '@/lib/utils'
import { baseApi } from './baseApi'
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAuthUser: build.query<User, void>({
      queryFn: async (_, _queryApi, _extraoptions, fetchWithBQ) => {
        try {
          const session = await fetchAuthSession()
          const { idToken } = session.tokens ?? {}
          const user = await getCurrentUser()

          if (!idToken) throw new Error('No access token found')

          const userRole = idToken?.payload['custom:role'] as string
          const endpoint =
            userRole === 'manager'
              ? `/managers/${user.userId}`
              : `/tenants/${user.userId}`

          let userDetailsResponse = await fetchWithBQ(endpoint)

          if (
            userDetailsResponse.error &&
            userDetailsResponse.error.status === 404
          ) {
            userDetailsResponse = await createNewUserInDatabase(
              user,
              idToken,
              userRole,
              fetchWithBQ
            )
          }

          return {
            data: {
              cognitoInfo: { ...user },
              userInfo: userDetailsResponse.data as Tenant | Manager,
              userRole,
            },
          }
        } catch (error: any) {
          return { error: error.message || 'Could not fetch user data' }
        }
      },
    }),
  }),
})

export const { useGetAuthUserQuery } = authApi
