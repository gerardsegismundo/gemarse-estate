'use client' // Required for the scroll function

import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faLinkedinIn,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'

const navLinks = [
  { name: 'ABOUT', href: '/about' },
  { name: 'PROPERTIES', href: '/search' },
  { name: 'FAQ', href: '/faq' },
  { name: 'CONTACT', href: '/contact' },
  { name: 'TERMS', href: '/terms' },
]

const socialLinks = [
  { icon: faFacebookF, label: 'Facebook' },
  { icon: faInstagram, label: 'Instagram' },
  { icon: faTwitter, label: 'Twitter' },
  { icon: faLinkedinIn, label: 'LinkedIn' },
  { icon: faYoutube, label: 'YouTube' },
]

const FooterSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className='bg-white border-t border-zinc-100 pt-24'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Central Branding Section */}
        <div className='flex flex-col items-center mb-16'>
          <Link
            href='/'
            className='flex flex-col items-center gap-4 group mb-10'
          >
            <div className='relative w-16 h-16 duration-500'>
              <Image
                src='/favicon.svg'
                alt='Gemarse Estate Logo'
                fill
                className='object-contain'
              />
            </div>
            <span
              className='text-4xl md:text-5xl font-light italic tracking-tight text-zinc-800'
              style={{ fontFamily: 'var(--font-cursive), cursive' }}
            >
              Gemarse Estate
            </span>
          </Link>

          {/* Social Icons */}
          <div className='flex items-center gap-6'>
            {socialLinks.map((social, i) => (
              <a
                key={i}
                href='#'
                aria-label={social.label}
                className='w-10 h-10 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-400 hover:border-zinc-900 hover:text-zinc-900 transition-all duration-300'
              >
                <FontAwesomeIcon icon={social.icon} className='h-4 w-4' />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className='mb-12'>
          <ul className='flex flex-wrap justify-center items-center gap-x-10 gap-y-4'>
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className='text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500 hover:text-zinc-900 transition-colors duration-200'
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Top Trigger */}
        <div className='flex justify-center mb-16'>
          <button
            onClick={scrollToTop}
            className='flex flex-col items-center gap-2 group text-zinc-300 hover:text-zinc-900 transition-colors'
          >
            <span className='text-[9px] uppercase tracking-[0.3em] font-bold'>
              Back to Top
            </span>
            <div className='w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center group-hover:border-zinc-900 transition-colors'>
              <FontAwesomeIcon icon={faChevronUp} className='h-3 w-3' />
            </div>
          </button>
        </div>

        {/* Bottom Bar */}
      </div>
      <div className='p-6 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-zinc-400'>
        <p className='font-medium'>
          © {new Date().getFullYear()} Gemarse Estate. All rights reserved.
        </p>
        <div className='flex gap-10'>
          <Link
            href='/privacy'
            className='hover:text-zinc-900 transition-colors'
          >
            Privacy Policy
          </Link>
          <Link href='/terms' className='hover:text-zinc-900 transition-colors'>
            Terms of Use
          </Link>
          <Link
            href='/cookies'
            className='hover:text-zinc-900 transition-colors'
          >
            Cookie Settings
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
