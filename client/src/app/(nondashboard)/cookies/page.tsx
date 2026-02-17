'use client'

import Link from 'next/link'

export default function CookiesPage() {
  return (
    <>
      <main className='min-h-screen bg-white pt-32 pb-24'>
        <div className='max-w-4xl mx-auto px-6'>
          <h1
            className='text-4xl md:text-5xl font-light italic tracking-tight text-zinc-800 mb-12'
            style={{ fontFamily: 'var(--font-cursive), cursive' }}
          >
            Cookie Settings
          </h1>

          <div className='prose prose-zinc max-w-none'>
            <p className='text-zinc-600 text-lg mb-8'>
              This Cookie Settings page explains what cookies are, how we use
              them on Gemarse Estate, and how you can manage your preferences.
            </p>

            <section className='mb-10'>
              <h2 className='text-xl font-semibold text-zinc-800 mb-4'>
                What Are Cookies
              </h2>
              <p className='text-zinc-600 mb-4'>
                Cookies are small text files that are placed on your computer or
                mobile device when you visit a website. They are widely used to
                make websites work more efficiently and provide information to
                the website owners.
              </p>
            </section>

            <section className='mb-10'>
              <h2 className='text-xl font-semibold text-zinc-800 mb-4'>
                How We Use Cookies
              </h2>
              <p className='text-zinc-600 mb-4'>
                We use cookies for various purposes, including:
              </p>
              <ul className='list-disc pl-6 text-zinc-600 space-y-2 mb-4'>
                <li>
                  Essential cookies - required for the website to function
                  properly
                </li>
                <li>
                  Analytics cookies - help us understand how visitors use our
                  website
                </li>
                <li>
                  Marketing cookies - used to track visitors across websites for
                  advertising purposes
                </li>
                <li>
                  Preference cookies - remember your settings and preferences
                </li>
              </ul>
            </section>

            <section className='mb-10'>
              <h2 className='text-xl font-semibold text-zinc-800 mb-4'>
                Managing Your Cookie Preferences
              </h2>
              <p className='text-zinc-600 mb-4'>
                You can manage your cookie preferences at any time by:
              </p>
              <ul className='list-disc pl-6 text-zinc-600 space-y-2 mb-4'>
                <li>Using your browser settings to delete or block cookies</li>
                <li>
                  Using our cookie consent tool when first visiting the site
                </li>
                <li>Contacting us directly for assistance</li>
              </ul>
            </section>

            <section className='mb-10'>
              <h2 className='text-xl font-semibold text-zinc-800 mb-4'>
                Types of Cookies We Use
              </h2>

              <div className='mb-6'>
                <h3 className='text-lg font-medium text-zinc-700 mb-2'>
                  Strictly Necessary Cookies
                </h3>
                <p className='text-zinc-600 text-sm'>
                  These cookies are essential for the website to function
                  properly. They cannot be switched off in our systems.
                </p>
              </div>

              <div className='mb-6'>
                <h3 className='text-lg font-medium text-zinc-700 mb-2'>
                  Performance Cookies
                </h3>
                <p className='text-zinc-600 text-sm'>
                  These cookies help us understand how visitors interact with
                  our website by collecting and reporting information
                  anonymously.
                </p>
              </div>

              <div className='mb-6'>
                <h3 className='text-lg font-medium text-zinc-700 mb-2'>
                  Functional Cookies
                </h3>
                <p className='text-zinc-600 text-sm'>
                  These cookies enable enhanced functionality and
                  personalization, such as remembering your preferences.
                </p>
              </div>
            </section>

            <section className='mb-10'>
              <h2 className='text-xl font-semibold text-zinc-800 mb-4'>
                Contact Us
              </h2>
              <p className='text-zinc-600 mb-4'>
                If you have any questions about our use of cookies, please{' '}
                <Link
                  href='/contact'
                  className='text-zinc-900 underline hover:text-zinc-600'
                >
                  contact us
                </Link>
                .
              </p>
            </section>

            <div className='pt-8 border-t border-zinc-100'>
              <p className='text-zinc-400 text-sm'>
                Last updated:{' '}
                {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
