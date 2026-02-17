import { Metadata } from 'next'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import DiscoverSection from './DiscoverSection'
import CallToActionSection from './CallToActionSection'
import FooterSection from './FooterSection'

export const metadata: Metadata = {
  title: 'Home',
}

const Landing = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <HeroSection />
      <FeatureSection />
      <DiscoverSection />
      <CallToActionSection />
      <FooterSection />
    </div>
  )
}

export default Landing
