import { useState, useRef, useEffect } from 'react'
import { DISTRIBUTORS } from '../data'

const SUGGESTIONS = [
  '¿Cuáles son los 5 leads más urgentes hoy?',
  '¿Qué distribuidor tiene más leads calientes?',
  '¿Cuántos leads tienen presupuesto arriba de $500k?',
]

function formatAIMsg(text) {
  let html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^#{1,3}\s+(.+)$/gm, '<h4>$1</h4>')
    .replace(/^[\-*]\s+(.+)$/gm, '<li>$1</li>')
  const lis = html.match(/<li>.*?<\/li>/gs)
  if (lis) html = html.replace(lis.join(''), '<ul>' + lis.join('') + '</ul>')
  html = html.split(/\n\n/).map(p => {
    if (p.includes('<h4>') || p.includes('<ul>') || p.includes('<li>')) return p
    return '<p>' + p.replace(/\n/g, '<br>') + '</p>'
  }).join('')
  html = html.replace(/score\s+(\d+)/gi, 'score <span class="tag-hot">$1</span>')
  html = html.replace(/caliente/gi, '<span class="tag-hot">🔥 caliente</span>')
  html = html.replace(/urgente/gi, '<span class="tag-warn">⚡ urgente</span>')
  html = html.replace(/sin contacto/gi, '<span class="tag-red">sin contacto</span>')
  return html
}

async function callAI(question, leads) {
  const hotL = leads.filter(l => l.cls === 'hot')
  const urgL = leads.filter(l => l.diasCompra <= 7)
  const avg = Math.round(leads.reduce((a, l) => a + l.score, 0) / leads.length) || 0
  const nc = leads.filter(l => !l.email && !l.phone).length
  const distSum = DISTRIBUTORS.map(d => {
    const dl = leads.filter(l => l.assignedDist?.id === d.id)
    return `${d.name}: ${dl.length} leads, ${dl.filter(l => l.cls === 'hot').length} calientes, score avg ${dl.length ? Math.round(dl.reduce((a, l) => a + l.score, 0) / dl.length) : 0}`
  }).join('\n')
  const top5 = [...leads].sort((a, b) => b.score - a.score).slice(0, 5).map(l => `${l.name} (score ${l.score}, ${l.marca} ${l.modelo}, $${(l.presupuesto / 1000).toFixed(0)}k, ${l.zona}, ${l.diasCompra}d)`).join('\n')
  const sys = `Eres el analista de inteligencia artificial de Profit120, plataforma de calificación de leads automotrices en México. Respondes en español con análisis preciso y accionable.

DATOS DEL SISTEMA (${leads.length} leads totales):
- Leads calientes (≥70): ${hotL.length} leads
- Leads urgentes (<7 días): ${urgL.length} leads
- Sin datos de contacto: ${nc}
- Score promedio general: ${avg}/100

DISTRIBUIDORES:
${distSum}

TOP 5 LEADS POR SCORE:
${top5}

SCORING: zona coincide (+25), marca en portafolio (+20), presupuesto ≥$350k (+20), urgencia <30d (+15), enganche (+10), fuente premium (+10), cliente previo (+5), sin contacto (-20), compra >6m (-15), presupuesto <$150k (-10).

Responde de forma estructurada y concisa. Usa negritas para destacar nombres y datos clave. Máximo 4-5 oraciones o una lista corta.`

  const apiKey = import.meta.env.VITE_GROQ_API_KEY
  if (!apiKey) throw new Error('Falta VITE_GROQ_API_KEY en .env o .env.local')

  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1024,
      temperature: 0.3,
      messages: [
        { role: 'system', content: sys },
        { role: 'user', content: question },
      ],
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error?.message || res.statusText)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || 'Sin respuesta.'
}

export default function AIPanel({ leads }) {
  const [messages, setMessages] = useState([
    { role: 'ai', content: '<h4>Bienvenido al sistema</h4><p>Soy el analista de inteligencia de <strong>Profit120</strong>. Tengo acceso completo a tus <strong>' + leads.length + ' leads</strong>, distribuidores y zonas.</p><p>Puedo ayudarte con análisis de urgencia, comparación de distribuidores, estrategia de asignación y más.</p>', isHTML: true },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showSuggs, setShowSuggs] = useState(true)
  const msgsEnd = useRef(null)

  useEffect(() => {
    msgsEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = async (question) => {
    if (!question.trim()) return
    setShowSuggs(false)
    setMessages(m => [...m, { role: 'user', content: question, isHTML: false }])
    setTyping(true)
    try {
      const reply = await callAI(question, leads)
      setMessages(m => [...m, { role: 'ai', content: formatAIMsg(reply), isHTML: true }])
    } catch (e) {
      setMessages(m => [...m, { role: 'ai', content: '<p style="color:var(--red)">Error de conexión con el sistema IA.</p>', isHTML: true }])
    }
    setTyping(false)
  }

  return (
    <div className="ai-panel active">
      <div className="ai-hdr">
        <div className="ai-title">Profit120 <span className="ai-badge">AI</span></div>
        <div className="ai-sub">Análisis inteligente de leads y estrategia</div>
      </div>
      <div className="ai-msgs">
        {messages.map((msg, i) => (
          <div key={i} className={`msg ${msg.role}`}>
            <div className={`msg-av ${msg.role === 'ai' ? 'av-ai' : 'av-user'}`}>{msg.role === 'ai' ? 'P' : 'U'}</div>
            <div className={`msg-bubble ${msg.role === 'ai' ? 'b-ai' : 'b-user'}`}>
              {msg.isHTML ? <span dangerouslySetInnerHTML={{ __html: msg.content }} /> : msg.content}
            </div>
          </div>
        ))}
        {typing && (
          <div className="msg">
            <div className="msg-av av-ai">P</div>
            <div className="msg-bubble b-ai">
              <div className="typing"><div className="td" /><div className="td" /><div className="td" /></div>
            </div>
          </div>
        )}
        <div ref={msgsEnd} />
      </div>
      {showSuggs && (
        <div className="ai-suggs">
          <div className="sugg-lbl">Preguntas sugeridas</div>
          {SUGGESTIONS.map((q, i) => (
            <button key={i} type="button" className="sugg-btn" onClick={() => send(q)}>{q}</button>
          ))}
        </div>
      )}
      <div className="ai-input-area">
        <textarea
          className="ai-inp"
          rows={1}
          placeholder="Pregunta sobre tus leads..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); setInput(''); }
          }}
        />
        <button type="button" className="ai-send" onClick={() => { send(input); setInput(''); }}>↑</button>
      </div>
    </div>
  )
}
