'use client'

import { motion } from 'framer-motion'

interface AnimatedLogoProps {
  className?: string
}

export function AnimatedLogo({ className = '' }: AnimatedLogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      className={`relative flex items-center justify-center ${className}`}
    >
      {/* Glow effect layers */}
      <motion.div 
        className="absolute blur-xl rounded-full"
        style={{ 
          backgroundColor: 'rgba(0, 210, 255, 0.12)',
          width: '140%',
          height: '180%',
        }}
        animate={{
          opacity: [0.12, 0.2, 0.12],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div 
        className="absolute blur-3xl rounded-full"
        style={{ 
          backgroundColor: 'rgba(0, 210, 255, 0.06)',
          width: '200%',
          height: '250%',
        }}
        animate={{
          opacity: [0.06, 0.12, 0.06],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      
      {/* Logo Text - NeXPay */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        animate={{
          filter: [
            'drop-shadow(0 0 20px rgba(0, 210, 255, 0.4))',
            'drop-shadow(0 0 40px rgba(0, 210, 255, 0.6))',
            'drop-shadow(0 0 20px rgba(0, 210, 255, 0.4))',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* NeX */}
        <motion.span
          className="font-bold tracking-wider"
          style={{
            fontSize: 'clamp(2rem, 10vw, 6rem)',
            background: 'linear-gradient(180deg, #e5e7eb 0%, #9ca3af 40%, #6b7280 70%, #4b5563 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.02em',
          }}
        >
          NeX
        </motion.span>
        
        {/* Pay */}
        <motion.span
          className="font-bold tracking-wider"
          style={{
            fontSize: 'clamp(2rem, 10vw, 6rem)',
            color: '#00d2ff',
            letterSpacing: '0.02em',
          }}
          animate={{
            textShadow: [
              '0 0 15px rgba(0, 210, 255, 0.7), 0 0 30px rgba(0, 210, 255, 0.4), 0 0 45px rgba(0, 210, 255, 0.2)',
              '0 0 25px rgba(0, 210, 255, 0.9), 0 0 50px rgba(0, 210, 255, 0.5), 0 0 75px rgba(0, 210, 255, 0.3)',
              '0 0 15px rgba(0, 210, 255, 0.7), 0 0 30px rgba(0, 210, 255, 0.4), 0 0 45px rgba(0, 210, 255, 0.2)',
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          Pay
        </motion.span>
      </motion.div>
    </motion.div>
  )
}

// Versão compacta para uso em headers, etc
export function LogoCompact({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`flex items-center ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span
        className="font-bold"
        style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          background: 'linear-gradient(180deg, #9ca3af 0%, #6b7280 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        NeX
      </span>
      <span
        className="font-bold"
        style={{
          fontSize: 'clamp(1rem, 3vw, 1.25rem)',
          color: '#00d2ff',
          textShadow: '0 0 10px rgba(0, 210, 255, 0.5)',
        }}
      >
        Pay
      </span>
    </motion.div>
  )
}
