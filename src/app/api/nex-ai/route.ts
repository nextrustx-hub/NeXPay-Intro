import { NextRequest, NextResponse } from 'next/server'

interface ButtonAction {
  label: string
  action: string
  url?: string
}

const RESPONSES: Record<string, { text: string; buttons?: ButtonAction[] }> = {
  'help': {
    text: `Comandos disponíveis:
    
• "produtos" - Ver nossos produtos
• "projeto" - Sobre a NeXPay
• "contato" - Falar com a equipe
• "black" - Conta BLACK

Ou digite sua pergunta diretamente!`,
    buttons: [
      { label: '📦 Produtos', action: 'produtos' },
      { label: '📞 Contato', action: 'contato' },
    ]
  },
  'produtos': {
    text: `📦 **Nossos Produtos**

**NeXPay Wallet**
Carteira digital internacional para gestão de ativos em Crypto, BRL e EUR.

**Conta BLACK**
Conta anónima sem KYC, com gestão de fluxo internacional multimoedas.

**NeXPay Commerce**
Solução de pagamentos para comerciantes com processamento instantâneo.

**NeXPay Protocol**
Protocolo DeFi para empréstimos, staking e yield farming.`,
    buttons: [
      { label: '💳 Conta BLACK', action: 'black', url: 'https://wallet.nextrustx.com' },
      { label: '📞 Falar com Equipe', action: 'contato' },
    ]
  },
  'projeto': {
    text: `🎯 **NeXPay - Ecossistema Financeiro Internacional**

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
• Protocolos DeFi avançados`,
    buttons: [
      { label: '📞 Contato', action: 'contato' },
      { label: '💳 Conta BLACK', action: 'black', url: 'https://wallet.nextrustx.com' },
    ]
  },
  'contato': {
    text: 'Escolha como prefere entrar em contacto com a nossa equipa de Orquestração de Fluxos Internacionais:',
    buttons: [
      { label: '📱 WhatsApp', action: 'whatsapp', url: 'https://wa.me/15846665195' },
      { label: '💬 Discord', action: 'discord', url: 'https://discord.gg/3uYNXJsWYc' },
    ]
  },
  'black': {
    text: `💳 **Conta BLACK - Wallet Internacional**

A Conta BLACK da NeXPay oferece:
• Anonimato total sem KYC
• Gestão de Crypto, BRL e EUR
• Fluxos internacionais ilimitados
• Privacidade de nível premium`,
    buttons: [
      { label: '🚀 Aceder Wallet', action: 'wallet', url: 'https://wallet.nextrustx.com' },
    ]
  },
}

function generateResponse(message: string): { response: string; buttons?: ButtonAction[] } {
  const lowerMessage = message.toLowerCase().trim()
  
  // Check for exact matches first
  if (RESPONSES[lowerMessage]) {
    return { response: RESPONSES[lowerMessage].text, buttons: RESPONSES[lowerMessage].buttons }
  }
  
  // Check for keywords
  if (lowerMessage.includes('produto') || lowerMessage.includes('serviço') || lowerMessage.includes('carteira') || lowerMessage.includes('wallet')) {
    return { response: RESPONSES['produtos'].text, buttons: RESPONSES['produtos'].buttons }
  }
  
  if (lowerMessage.includes('projeto') || lowerMessage.includes('sobre') || lowerMessage.includes('o que é') || lowerMessage.includes('missão') || lowerMessage.includes('nexpay')) {
    return { response: RESPONSES['projeto'].text, buttons: RESPONSES['projeto'].buttons }
  }
  
  if (lowerMessage.includes('contato') || lowerMessage.includes('contacto') || lowerMessage.includes('falar') || lowerMessage.includes('reunião') || lowerMessage.includes('equipe') || lowerMessage.includes('equipa')) {
    return { response: RESPONSES['contato'].text, buttons: RESPONSES['contato'].buttons }
  }
  
  if (lowerMessage.includes('black') || lowerMessage.includes('kyc') || lowerMessage.includes('anonim') || lowerMessage.includes('privad')) {
    return { response: RESPONSES['black'].text, buttons: RESPONSES['black'].buttons }
  }
  
  if (lowerMessage.includes('whatsapp') || lowerMessage.includes('wa ') || lowerMessage.includes('discord')) {
    return { 
      response: 'Pode contatar nossa equipe através de:',
      buttons: [
        { label: '📱 WhatsApp', action: 'whatsapp', url: 'https://wa.me/15846665195' },
        { label: '💬 Discord', action: 'discord', url: 'https://discord.gg/3uYNXJsWYc' },
      ]
    }
  }
  
  if (lowerMessage.includes('ajuda') || lowerMessage.includes('help') || lowerMessage.includes('comando')) {
    return { response: RESPONSES['help'].text, buttons: RESPONSES['help'].buttons }
  }
  
  if (lowerMessage.includes('casino') || lowerMessage.includes('igaming') || lowerMessage.includes('gaming') || lowerMessage.includes('fluxo') || lowerMessage.includes('internacional')) {
    return {
      response: `🎰 **Soluções para IGaming e Casinos Online**

A NeXPay oferece orquestração completa de fluxos internacionais para o sector de gaming:

• Processamento multimoedas (Crypto, BRL, EUR)
• Contas anónimas sem KYC
• Fluxos internacionais otimizados
• Suporte dedicado 24/7

Entre em contacto com nossa equipa especializada:`,
      buttons: [
        { label: '📱 WhatsApp', action: 'whatsapp', url: 'https://wa.me/15846665195' },
        { label: '💬 Discord', action: 'discord', url: 'https://discord.gg/3uYNXJsWYc' },
      ]
    }
  }
  
  // Default response
  return {
    response: `Entendi sua mensagem! Como assistente NeX-AI, posso ajudá-lo com:

• Informações sobre nossos produtos
• Detalhes sobre o projeto NeXPay
• Contato com nossa equipe
• Conta BLACK sem KYC

Digite "ajuda" para ver as opções disponíveis.`,
    buttons: [
      { label: '📦 Produtos', action: 'produtos' },
      { label: '📞 Contato', action: 'contato' },
    ]
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { response: 'Mensagem inválida. Por favor, envie uma mensagem de texto.' },
        { status: 400 }
      )
    }
    
    const { response, buttons } = generateResponse(message)
    
    return NextResponse.json({ response, buttons })
  } catch (error) {
    console.error('NeX-AI API error:', error)
    return NextResponse.json(
      { response: 'Erro ao processar sua solicitação. Por favor, tente novamente.' },
      { status: 500 }
    )
  }
}
