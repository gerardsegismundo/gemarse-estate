import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'

/**
 * Merge Tailwind class strings safely
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Convert enum string to human-readable string
 * Example: "SomeEnumValue" -> "Some Enum Value"
 */
export function formatEnumString(str: string) {
  return str.replace(/([A-Z])/g, ' $1').trim()
}

/**
 * Format a numeric price for display
 */
export function formatPriceValue(value: number | null, isMin: boolean) {
  if (value === null || value === 0)
    return isMin ? 'Any Min Price' : 'Any Max Price'

  if (value >= 1000) {
    const kValue = value / 1000
    return isMin ? `$${kValue}k+` : `<$${kValue}k`
  }

  return isMin ? `$${value}+` : `<$${value}`
}

/**
 * Clean query params by removing null, undefined, empty string, "any"
 */
export function cleanParams<T extends Record<string, unknown>>(
  params: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined &&
        value !== 'any' &&
        value !== '' &&
        (Array.isArray(value)
          ? value.some((v) => v !== null && v !== undefined)
          : value !== null)
    )
  ) as Partial<T>
}

type MutationMessages = {
  success?: string
  error: string
}

/**
 * Wrap an async mutation function and show toast notifications
 */
export async function withToast<T>(
  mutationFn: Promise<T>,
  messages: Partial<MutationMessages>
): Promise<T> {
  const { success, error } = messages

  try {
    const result = await mutationFn
    if (success) toast.success(success)
    return result
  } catch (err) {
    if (error) toast.error(error)
    throw err
  }
}

/**
 * Types for creating a user
 */
interface CognitoUser {
  userId: string
  username: string
}

interface IdToken {
  payload: {
    email?: string
  }
}

interface FetchArgs {
  url: string
  method: 'POST' | 'GET' | 'PUT' | 'DELETE'
  body?: Record<string, unknown>
}

/**
 * Create a new user in the database
 */
export async function createNewUserInDatabase(
  user: CognitoUser,
  idToken: any,
  userRole: string,
  fetchWithBQ: (args: string | FetchArgs) => Promise<any>
) {
  const createEndpoint =
    userRole.toLowerCase() === 'manager' ? '/managers' : '/tenants'

  const createUserResponse = await fetchWithBQ({
    url: createEndpoint,
    method: 'POST',
    body: {
      cognitoId: user.userId,
      name: user.username,
      email: idToken?.payload?.email || '',
      phoneNumber: '',
    },
  })

  if (createUserResponse.error) {
    throw new Error('Failed to create user record')
  }

  return createUserResponse
}
