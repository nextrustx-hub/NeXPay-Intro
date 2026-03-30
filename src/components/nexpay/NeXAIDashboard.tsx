'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Send, Loader2, ExternalLink } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  type?: 'text' | 'buttons'
  buttons?: { label: string; action: string; url?: string }[]
}

interface NeXAIDashboardProps {
  isOpen: boolean
  onClose: () => void
}

export function NeXAIDashboard({ isOpen, onClose }: NeXAIDashboardProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá! Sou a NeX-AI, assistente virtual do ecossistema NeXPay. Como posso ajudá-lo hoje?',
      sender: 'bot',
    },
    {
      id: '2',
      text: 'Posso apresentar nossos produtos, explicar o projeto e ajudá-lo a entrar em contato com nossa equipa.',
      sender: 'bot',
      type: 'buttons',
      buttons: [
        { label: '📦 Produtos', action: 'produtos' },
        { label: '🎯 O Projeto', action: 'projeto' },
        { label: '📞 Contato', action: 'contato' },
      ]
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleButtonClick = async (action: string) => {
    setIsTyping(true)
    
    await new Promise(resolve => setTimeout(resolve, 800))
    
    let response: Message = {
      id: Date.now().toString(),
      text: '',
      sender: 'bot',
    }

    switch (action) {
      case 'produtos':
        response.text = `📦 **Nossos Produtos**

**NeXPay Wallet**
Carteira digital internacional para gestão de ativos em Crypto, BRL e EUR.

**Conta BLACK**
Conta anónima sem KYC, com gestão de fluxo internacional multimoedas.

**NeXPay Commerce**
Solução de pagamentos para comerciantes com processamento instantâneo.

**NeXPay Protocol**
Protocolo DeFi para empréstimos, staking e yield farming.`
        response.buttons = [
          { label: '💳 Conta BLACK', action: 'black' },
          { label: '📞 Falar com Equipe', action: 'contato' },
        ]
        response.type = 'buttons'
        break
        
      case 'projeto':
        response.text = `🎯 **NeXPay - Ecossistema Financeiro Internacional**

A NeXPay é um ecossistema financeiro completo para gestão de fluxos internacionais em múltiplas moedas.

**Nossa Visão:**
Facilitar operações financeiras globais com privacidade e eficiência.

**Características:**
• Gestão multimoedas (Crypto, BRL, EUR)
• Contas anónimas sem KYC (BLACK)
• Orquestração de fluxos internacionais
• Soluções para IGaming e Casinos Online

**Segurança:**
• Criptografia de ponta a ponta
• Autenticação multifator
• Protocolos DeFi avançados`
        response.buttons = [
          { label: '📞 Contato', action: 'contato' },
          { label: '💳 Conta BLACK', action: 'black' },
        ]
        response.type = 'buttons'
        break
        
      case 'contato':
        response.text = 'Escolha como prefere entrar em contacto com a nossa equipa de Orquestração de Fluxos Internacionais:'
        response.buttons = [
          { label: '📱 WhatsApp', action: 'whatsapp', url: 'https://wa.me/15846665195' },
          { label: '💬 Discord', action: 'discord', url: 'https://discord.gg/3uYNXJsWYc' },
        ]
        response.type = 'buttons'
        break
        
      case 'black':
        response.text = `💳 **Conta BLACK - Wallet Internacional**

A Conta BLACK da NeXPay oferece:
• Anonimato total sem KYC
• Gestão de Crypto, BRL e EUR
• Fluxos internacionais ilimitados
• Privacidade de nível premium

Aceda à sua Wallet Internacional NexTrustX:`
        response.buttons = [
          { label: '🚀 Aceder Wallet', action: 'wallet', url: 'https://wallet.nextrustx.com' },
        ]
        response.type = 'buttons'
        break
        
      case 'whatsapp':
        window.open('https://wa.me/15846665195', '_blank')
        response.text = 'Redirecionando para WhatsApp...'
        break
        
      case 'discord':
        window.open('https://discord.gg/3uYNXJsWYc', '_blank')
        response.text = 'Redirecionando para Discord...'
        break
        
      case 'wallet':
        window.open('https://wallet.nextrustx.com', '_blank')
        response.text = 'Redirecionando para NexTrustX Wallet...'
        break
        
      default:
        response.text = 'Como posso ajudá-lo?'
        response.buttons = [
          { label: '📦 Produtos', action: 'produtos' },
          { label: '📞 Contato', action: 'contato' },
        ]
        response.type = 'buttons'
    }

    setIsTyping(false)
    setMessages((prev) => [...prev, response])
  }

  const handleSend = async () => {
    const text = inputValue.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const response = await fetch('/api/nex-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await response.json()
      setIsTyping(false)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'bot',
        type: data.buttons ? 'buttons' : 'text',
        buttons: data.buttons,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      setIsTyping(false)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Erro de conexão. Por favor, tente novamente.',
        sender: 'bot',
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  const renderMessage = (message: Message) => {
    return (
      <motion.div
        key={message.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-[90%] p-3 rounded-md leading-relaxed ${
          message.sender === 'bot'
            ? 'self-start border-l-[3px] border-[#00d2ff]'
            : 'self-end border-r-[3px] border-gray-600'
        }`}
        style={{
          backgroundColor:
            message.sender === 'bot'
              ? 'rgba(0, 210, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="whitespace-pre-wrap text-sm">{message.text}</div>
        
        {message.type === 'buttons' && message.buttons && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.buttons.map((button, index) => (
              button.url ? (
                <a
                  key={index}
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
                  style={{
                    background: 'rgba(0, 210, 255, 0.2)',
                    border: '1px solid rgba(0, 210, 255, 0.4)',
                    color: '#00d2ff',
                  }}
                >
                  {button.label}
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <button
                  key={index}
                  onClick={() => handleButtonClick(button.action)}
                  className="px-3 py-2 rounded-md text-xs font-semibold flex items-center gap-2 transition-all hover:scale-105"
                  style={{
                    background: 'rgba(0, 210, 255, 0.2)',
                    border: '1px solid rgba(0, 210, 255, 0.4)',
                    color: '#00d2ff',
                  }}
                >
                  {button.label}
                </button>
              )
            ))}
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col p-4"
          style={{ backgroundColor: '#050505' }}
        >
          {/* Header */}
          <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex justify-between items-center mb-4 border-b border-gray-900 pb-3"
          >
            <div>
              <h2
                className="text-lg font-bold tracking-widest"
                style={{
                  color: '#00d2ff',
                  textShadow: '0 0 15px rgba(0, 210, 255, 0.6), 0 0 30px rgba(0, 210, 255, 0.3)',
                }}
              >
                NeX-AI
              </h2>
              <span className="text-[9px] text-green-600 font-mono">STATUS: ONLINE</span>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition font-mono text-xs underline underline-offset-4"
            >
              [ TERMINAR ]
            </button>
          </motion.header>

          {/* Chat Container */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex-grow flex flex-col max-w-[1200px] w-full mx-auto overflow-hidden rounded-lg"
            style={{
              background: 'rgba(10, 10, 10, 0.98)',
              border: '1px solid rgba(0, 210, 255, 0.15)',
            }}
          >
            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-4 font-mono text-sm">
              {messages.map(renderMessage)}
              
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-4 py-2 text-[10px] text-cyan-400 font-mono flex items-center gap-2"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    A PROCESSAR REQUISIÇÃO...
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div
              className="p-4 flex gap-2"
              style={{
                background: '#000',
                borderTop: '1px solid #1a1a1a',
              }}
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua mensagem..."
                autoComplete="off"
                className="flex-grow p-3 rounded-md text-white outline-none"
                style={{
                  background: '#111',
                  border: '1px solid #222',
                }}
              />
              <button
                onClick={handleSend}
                disabled={isTyping || !inputValue.trim()}
                className="px-6 py-3 font-bold rounded text-xs flex items-center gap-2 transition-all disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #00d2ff, #00a8cc)',
                  color: 'black',
                }}
              >
                <Send className="w-4 h-4" />
                ENVIAR
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
