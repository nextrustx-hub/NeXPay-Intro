'use client'

import dynamic from 'next/dynamic'
import { IntroSection } from '@/components/nexpay/IntroSection'

// Dynamically import Three.js component to avoid SSR issues
const ParticleSphere = dynamic(
  () => import('@/components/nexpay/ParticleSphere').then((mod) => mod.ParticleSphere),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-0 bg-[#050505]" />
    )
  }
)

export default function Home() {
  return (
    <main 
      className="relative w-full h-screen overflow-hidden"
      style={{ 
        backgroundColor: '#050505',
        fontFamily: 'var(--font-geist-sans), sans-serif',
        color: 'white'
      }}
    >
      {/* Three.js Particle Sphere Background */}
      <ParticleSphere />
      
      {/* Intro UI Overlay */}
      <IntroSection />
    </main>
  )
}
