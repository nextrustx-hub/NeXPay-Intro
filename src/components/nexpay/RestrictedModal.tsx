'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { AuthModal } from './AuthModal'

interface RestrictedModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RestrictedModal({ isOpen, onClose }: RestrictedModalProps) {
  const [showAuth, setShowAuth] = useState(false)

  const handleEnterApp = () => {
    setShowAuth(true)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && !showAuth && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(15px)',
            }}
          >
            {/* Botão X no canto superior direito */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all z-[210]"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{ 
                scale: 1.1, 
                background: 'rgba(255, 255, 255, 0.1)',
                borderColor: 'rgba(255, 255, 255, 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="w-5 h-5 text-gray-400" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative text-center p-6 sm:p-8 border border-gray-800 rounded-lg w-full max-w-xs sm:max-w-sm"
              style={{
                background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ícone */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(0, 210, 255, 0.1)',
                  border: '1px solid rgba(0, 210, 255, 0.3)',
                }}
              >
                <svg className="w-6 h-6" style={{ color: '#00d2ff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m9-9a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>

              <motion.h3
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="text-lg sm:text-xl font-bold mb-3"
                style={{ color: '#00d2ff' }}
              >
                NeXPay
              </motion.h3>
              
              <motion.p
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-xs sm:text-sm mb-5 leading-relaxed"
              >
                Ecossistema Financeiro Internacional para gestão de fluxos multimoedas.
              </motion.p>
              
              {/* ENTRAR APP NeXPay Button */}
              <motion.button
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                onClick={handleEnterApp}
                className="relative w-full px-5 py-3.5 sm:px-6 sm:py-4 font-bold text-xs sm:text-sm tracking-wider uppercase cursor-pointer transition-all duration-300 rounded-md overflow-hidden group flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 210, 255, 0.15), rgba(0, 168, 204, 0.1))',
                  border: '1px solid #00d2ff',
                  color: '#00d2ff',
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 25px rgba(0, 210, 255, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span>ENTRAR APP NeXPay</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              {/* Botão Fechar */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                onClick={onClose}
                className="mt-4 w-full py-2.5 text-gray-500 hover:text-gray-300 text-xs sm:text-sm font-mono transition-colors flex items-center justify-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                }}
                whileHover={{ 
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderColor: 'rgba(255, 255, 255, 0.15)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <X className="w-3.5 h-3.5" />
                TOQUE PARA SAIR
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuth} 
        onClose={() => {
          setShowAuth(false)
          onClose()
        }} 
      />
    </>
  )
}
