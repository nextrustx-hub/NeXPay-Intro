'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ActionButtonsProps {
  onAccessAI: () => void
  onAccessPay: () => void
}

export function ActionButtons({ onAccessAI, onAccessPay }: ActionButtonsProps) {
  const [isHoveredAI, setIsHoveredAI] = useState(false)
  const [isHoveredPay, setIsHoveredPay] = useState(false)

  return (
    <div className="flex flex-col gap-4 w-full items-center px-6">
      {/* Primary Button - NeX-AI */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        onClick={onAccessAI}
        onMouseEnter={() => setIsHoveredAI(true)}
        onMouseLeave={() => setIsHoveredAI(false)}
        className="relative w-full max-w-[280px] px-8 py-5 font-bold text-sm tracking-[2px] uppercase cursor-pointer transition-all duration-300 rounded-md overflow-hidden group"
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid #00d2ff',
          color: '#00d2ff',
          backdropFilter: 'blur(10px)',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-cyan-500"
          initial={{ x: '-100%' }}
          animate={{ x: isHoveredAI ? '0%' : '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        <span className="relative z-10 group-hover:text-black transition-colors duration-300">
          NeX-AI
        </span>
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHoveredAI
              ? '0 0 30px rgba(0, 210, 255, 0.8), inset 0 0 20px rgba(0, 210, 255, 0.2)'
              : '0 0 0px rgba(0, 210, 255, 0)',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Secondary Button - NeXPay */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6, ease: 'easeOut' }}
        onClick={onAccessPay}
        onMouseEnter={() => setIsHoveredPay(true)}
        onMouseLeave={() => setIsHoveredPay(false)}
        className="relative w-full max-w-[280px] px-8 py-5 font-bold text-sm tracking-[2px] uppercase cursor-pointer transition-all duration-300 rounded-md overflow-hidden group"
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: '1px solid #444',
          color: '#888',
          backdropFilter: 'blur(10px)',
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gray-600"
          initial={{ x: '-100%' }}
          animate={{ x: isHoveredPay ? '0%' : '-100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
          NeXPay
        </span>
      </motion.button>
    </div>
  )
}
