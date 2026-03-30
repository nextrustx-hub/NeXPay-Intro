'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { AnimatedLogo } from './AnimatedLogo'
import { ActionButtons } from './ActionButtons'
import { RestrictedModal } from './RestrictedModal'
import { NeXAIDashboard } from './NeXAIDashboard'

export function IntroSection() {
  const [showIntro, setShowIntro] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)

  const handleAccessAI = () => {
    setShowIntro(false)
    setTimeout(() => {
      setShowDashboard(true)
    }, 800)
  }

  const handleAccessPay = () => {
    setShowModal(true)
  }

  const handleCloseDashboard = () => {
    setShowDashboard(false)
    setShowIntro(true)
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="relative z-10 w-full h-full flex flex-col items-center justify-center p-5"
            style={{ pointerEvents: 'none' }}
          >
            {/* Logo Section */}
            <div className="text-center mb-12 md:mb-20">
              <AnimatedLogo className="mb-6" />
              
              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-gray-500 uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs font-light px-4"
                style={{ fontFamily: 'var(--font-geist-mono), monospace' }}
              >
                International Financial Ecosystem
              </motion.p>
            </div>

            {/* Action Buttons */}
            <div style={{ pointerEvents: 'auto' }}>
              <ActionButtons
                onAccessAI={handleAccessAI}
                onAccessPay={handleAccessPay}
              />
            </div>

            {/* Bottom hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-10 text-[10px] text-gray-700 font-mono tracking-widest uppercase pointer-events-none"
            >
              Touch to Disintegrate
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NeX-AI Dashboard */}
      <NeXAIDashboard isOpen={showDashboard} onClose={handleCloseDashboard} />

      {/* Restricted Access Modal */}
      <RestrictedModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
