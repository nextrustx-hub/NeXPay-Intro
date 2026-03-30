'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ArrowLeft, User, UserPlus, Loader2, Shield, MessageCircle, ExternalLink } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<'menu' | 'login' | 'register'>('menu')

  const NEXPAY_LOGIN_URL = 'https://nexpay.nextrustx.com/login'
  const NEXPAY_REGISTER_URL = 'https://nexpay.nextrustx.com/register'
  const WALLET_URL = 'https://wallet.nextrustx.com'

  const handleLogin = () => {
    window.open(NEXPAY_LOGIN_URL, '_blank')
  }

  const handleRegister = () => {
    window.open(NEXPAY_REGISTER_URL, '_blank')
  }

  const handleBlackAccount = () => {
    window.open(WALLET_URL, '_blank')
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/15846665195', '_blank')
  }

  const handleDiscord = () => {
    window.open('https://discord.gg/3uYNXJsWYc', '_blank')
  }

  const resetState = () => {
    setMode('menu')
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
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
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md p-5 sm:p-6 border border-gray-800 rounded-lg"
            style={{
              background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-5">
              <motion.h2
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-xl sm:text-2xl font-bold tracking-widest"
                style={{
                  color: '#00d2ff',
                  textShadow: '0 0 20px rgba(0, 210, 255, 0.5)',
                }}
              >
                NeXPay
              </motion.h2>
              <p className="text-gray-500 text-[10px] sm:text-xs mt-1.5 font-mono">Sistema de Autenticação</p>
            </div>

            {/* Menu Principal */}
            {mode === 'menu' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-3"
              >
                {/* Entrar na Conta */}
                <button
                  onClick={handleLogin}
                  className="w-full p-3.5 sm:p-4 rounded-md flex items-center gap-3 sm:gap-4 transition-all group"
                  style={{
                    background: 'rgba(0, 210, 255, 0.05)',
                    border: '1px solid rgba(0, 210, 255, 0.3)',
                  }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0, 210, 255, 0.2)' }}>
                    <User className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#00d2ff' }} />
                  </div>
                  <div className="text-left flex-grow">
                    <p className="text-white font-semibold text-sm sm:text-base">Entrar na Conta</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Acesse sua conta NeXPay</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                </button>

                {/* Abrir Conta */}
                <button
                  onClick={handleRegister}
                  className="w-full p-3.5 sm:p-4 rounded-md flex items-center gap-3 sm:gap-4 transition-all group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-gray-800">
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  </div>
                  <div className="text-left flex-grow">
                    <p className="text-white font-semibold text-sm sm:text-base">Abrir Conta</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">Crie sua conta NeXPay</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                </button>

                {/* Conta BLACK */}
                <motion.button
                  onClick={handleBlackAccount}
                  className="w-full p-4 sm:p-5 rounded-md flex flex-col items-center justify-center gap-3 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(20, 20, 20, 0.9))',
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #00d2ff, #a855f7) 1',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: '#a855f7' }} />
                    <span className="text-white font-bold text-base sm:text-lg tracking-wider">CONTA BLACK</span>
                  </div>
                  <p className="text-gray-400 text-[10px] sm:text-xs text-center">
                    Anónima sem KYC • Crypto, BRL e EUR<br/>
                    Wallet Internacional NexTrustX
                  </p>
                </motion.button>

                {/* Separador */}
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-grow h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <span className="text-gray-600 text-[10px]">Profissionais</span>
                  <div className="flex-grow h-px" style={{ background: 'rgba(255,255,255,0.1)' }} />
                </div>

                {/* Contato para Profissionais */}
                <div className="p-3 rounded-md text-center" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <p className="text-gray-400 text-[10px] sm:text-xs mb-3">
                    IGaming, Casinos Online ou outros segmentos que precisam de Orquestração de Fluxos Internacionais e Multimoedas?
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={handleWhatsApp}
                      className="flex-1 py-2 rounded-md flex items-center justify-center gap-2 font-semibold text-xs transition-all"
                      style={{
                        background: '#25D366',
                        color: 'white',
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </button>
                    <button
                      onClick={handleDiscord}
                      className="flex-1 py-2 rounded-md flex items-center justify-center gap-2 font-semibold text-xs transition-all"
                      style={{
                        background: '#5865F2',
                        color: 'white',
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      Discord
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Botão Fechar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4 text-center"
            >
              <button
                onClick={handleClose}
                className="text-[10px] sm:text-xs text-gray-600 hover:text-gray-400 transition"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
