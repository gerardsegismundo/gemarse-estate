'use client'

import React, { useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID ?? '',
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID ?? '',
    },
  },
})

const components = {
  Header() {
    return (
      <View className='text-center'>
        <Heading
          level={3}
          className='!text-3xl !font-thin !tracking-tight !text-zinc-900'
        >
          Gemarse&nbsp;
          <span className='italic font-light text-zinc-400'>Estate</span>
        </Heading>
        <div className='h-[1px] w-8 bg-zinc-200 mx-auto my-4' />
        <p className='text-zinc-400 text-[9px] uppercase tracking-[0.5em] font-light'>
          Private Collection Access
        </p>
      </View>
    )
  },
  SignIn: {
    Footer() {
      return (
        <View className='text-center mt-4'>
          <p className='text-zinc-400 text-xs font-light tracking-wide'>
            New to the collection?&nbsp;
            <Link
              href='/signup'
              className='text-zinc-900 font-normal underline underline-offset-4 hover:text-zinc-500 transition-colors'
            >
              Request Access
            </Link>
          </p>
        </View>
      )
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator()
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend={
              <span className='text-[10px] uppercase tracking-[0.2em] text-zinc-400'>
                Account Type
              </span>
            }
            name='custom:role'
            errorMessage={validationErrors?.['custom:role']}
            hasError={!!validationErrors?.['custom:role']}
            isRequired
          >
            <Radio value='tenant'>Tenant</Radio>
            <Radio value='manager'>Manager</Radio>
          </RadioGroupField>
        </>
      )
    },
    Footer() {
      return (
        <View className='text-center mt-4'>
          <p className='text-zinc-400 text-xs font-light tracking-wide'>
            Already a member?&nbsp;
            <Link
              href='/signin'
              className='text-zinc-900 font-normal underline underline-offset-4 hover:text-zinc-500 transition-colors uppercase text-[10px] tracking-[0.1em]'
            >
              Sign In
            </Link>
          </p>
        </View>
      )
    },
  },
}

// --- Form Field Overrides ---
const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your email',
      label: 'Email',
      isRequired: true,
      type: 'email',
    },
    password: {
      placeholder: 'Enter your password',
      label: 'Password',
      isRequired: true,
      type: 'password',
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: 'Username',
      label: 'Username',
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: 'Email address',
      label: 'Email',
      isRequired: true,
      type: 'email',
    },
    password: {
      order: 3,
      placeholder: 'Password',
      label: 'Password',
      isRequired: true,
      type: 'password',
    },
    confirm_password: {
      order: 4,
      placeholder: 'Confirm password',
      label: 'Confirm Password',
      isRequired: true,
      type: 'password',
    },
  },
}

// --- Auth Wrapper Component ---
const Auth = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthenticator((ctx) => [ctx.user])
  const router = useRouter()
  const pathname = usePathname()

  const isAuthPage = /^\/(signin|signup)$/.test(pathname)
  const isDashboardPage =
    pathname.startsWith('/manager') || pathname.startsWith('/tenants')
  const initialState = pathname.includes('signup') ? 'signUp' : 'signIn'

  useEffect(() => {
    if (user && isAuthPage) {
      router.replace('/')
    }
  }, [user, isAuthPage, router])

  if (!isAuthPage && !isDashboardPage) return <>{children}</>

  return (
    <div className='h-full flex items-center justify-center bg-[#fafafa]'>
      <Authenticator
        initialState={initialState}
        components={components}
        formFields={formFields}
      >
        {() => <>{children}</>}
      </Authenticator>
    </div>
  )
}

export default Auth
