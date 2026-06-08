'use client'

import { useState, useEffect, useRef, type DragEvent, type ChangeEvent } from 'react'

type Comment = {
  id: string
  text: string
  author: string
  createdAt: number
}

type Block = {
  id: string
  type: 'heading' | 'subheading' | 'text' | 'todo' | 'file' | 'divider' | 'query-group' | 'task-group' | 'sticky'
  content: string
  done: boolean
  comments: Comment[]
  fileName: string
  fileData: string
  fileType: string
  collapsed: boolean
  children: Block[]
  color?: string
}

type BoardCard = {
  id: string
  title: string
  description: string
  done: boolean
  comments: Comment[]
  fileName: string
  fileData: string
  fileType: string
  labels: string[]
}

type BoardColumn = {
  id: string
  title: string
  period: string
  color: string
  cards: BoardCard[]
}

type ColumnType = 'text' | 'number' | 'select' | 'checkbox' | 'date'

type TableColumn = {
  id: string
  name: string
  type: ColumnType
  options: string[]
  width: number
}

type TableRow = {
  id: string
  cells: Record<string, string | number | boolean>
}

type DatabaseData = {
  columns: TableColumn[]
  rows: TableRow[]
}

type Page = {
  id: string
  title: string
  icon: string
  view: 'blocks' | 'board' | 'database'
  blocks: Block[]
  boardData?: BoardColumn[]
  databaseData?: DatabaseData
}

type Workspace = {
  pages: Page[]
  activePage: string
}

const STORAGE_KEY = 'antonio-aeo-workspace'

const defaultBlocks: Block[] = [
  { id: 'b-h', type: 'heading', content: 'Strategia di visibilità AEO + SEO — Antonio Pileggi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-info', type: 'text', content: 'Sito: antoniopileggi.com (Pixieset) · Base: Maida (CZ), Calabria · Nicchia: destination wedding, storytelling digitale + 35mm + VHS · Data: giugno 2026', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s1h', type: 'subheading', content: '1. Situazione attuale', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s1a', type: 'text', content: 'llms.txt non è usato da nessun AI provider (Google, OpenAI, ecc.) a metà 2026. Pixieset non permette file arbitrari nella root. Ignorare. Le tre leve reali: recensioni, dati strutturati, contenuti editoriali bilingue.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s1b', type: 'text', content: 'Punti di forza attuali: tono brand già forte, 12 recensioni Google + 27 su Matrimonio.com, presenza su Together Journal/Loverly/MyWed, canale YouTube @LoveOnVHS. Punto debole: sito vetrina povero di testo indicizzabile, nessuna FAQ, nessun dato strutturato, metà mercato (ITALIANO) scoperto.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2h', type: 'subheading', content: '2. Pilastro 1 — Recensioni e GBP (motore di fiducia)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2a', type: 'text', content: 'Obiettivo: 12 → 30+ recensioni Google in 6 mesi (1-3/mese). Le recensioni sono il formato AEO più potente: testo fresco con keyword naturali (location, "destination wedding") che le AI leggono direttamente.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2b', type: 'text', content: 'Azione: completare GBP (categorie, aree, descrizione IT/EN, foto, post settimanali). Link breve recensioni in firma email + consegna gallery. Chiedere al momento giusto (consegna finale). Suggerire dettagli da citare ("racconta dove vi siete sposati e cosa ti è rimasto"). Rispondere a tutte le recensioni.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2c', type: 'text', content: 'Tenere vivo anche Matrimonio.com (27 recensioni) e MyWed. Validazione su fonti multiple aumenta fiducia AI.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s3h', type: 'subheading', content: '3. Pilastro 2 — Dati strutturati JSON-LD (mossa AEO)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s3a', type: 'text', content: 'I dati strutturati danno alle AI una "scheda anagrafica" pulita: nome, professione, aree, lingue, profili social. Si inserisce nell\'header Pixieset (piano Website-Pro). Due blocchi: ProfessionalService/Photographer (con sameAs di tutti i 9 profili) e FAQPage (nella pagina FAQ).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s3b', type: 'text', content: 'Attenzione: non inserire aggregateRating che somma recensioni Google + Matrimonio — vietato dalle linee guida Google. Pubblicare testimonianze reali sul sito con schema Review.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s4h', type: 'subheading', content: '4. Pilastro 3 — Contenuti e autorità', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s4a', type: 'text', content: 'Ogni contenuto in ITALIANO e INGLESE. Tre tipi: (A) Real Wedding — pagina per matrimonio, 15-30 foto + 400-700 parole; (B) Guide location — articoli evergreen "Dove sposarsi in Calabria?", "Migliori location Taormina"; (C) Pagina pilastro VHS — "Cos\'è un wedding film in VHS e perché sceglierlo".', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s4b', type: 'text', content: 'Voce del brand: prima persona, frasi brevi, niente superlativi di marketing, racconto del vissuto più che della tecnica. Questo dà un "sentiment" riconoscibile che le AI restituiscono fedelmente. Cadenza: 1 contenuto ogni 2 settimane (alternando A, B, C).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s5h', type: 'subheading', content: '5. Pilastro 4 — Pagina FAQ + schema FAQPage', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s5a', type: 'text', content: 'Le FAQ sono il formato AEO per eccellenza: domanda esplicita + risposta autonoma. Le AI estraggono e citano direttamente. Creare pagina /faq IT e EN con 10 domande (aree, formati, coppie straniere, quando prenotare, stile, costi, ecc.) marcate con schema FAQPage. Risposte scritte per essere "citabili" così come sono.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s6h', type: 'subheading', content: '6. Pilastro 5 — "Be everywhere" e coerenza entità', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s6a', type: 'text', content: 'NAP + bio identici su tutti i 9 profili (sito, IG, FB, YT, Pinterest, Google, Matrimonio.com, Together Journal, Loverly, MyWed). Stessa bio boilerplate IT/EN. Il sito deve linkare ogni profilo (e viceversa, nel sameAs dello schema).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s6b', type: 'text', content: 'Frase di identità netta in About: "Antonio Pileggi è un fotografo di matrimoni destination con base a Maida (Catanzaro, Calabria), specializzato in storytelling su digitale, pellicola 35mm e VHS per matrimoni in Sud Italia." Le AI cercano proprio questa frase.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s7h', type: 'subheading', content: '7. Pilastro 6 — Social sistematici', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s7a', type: 'text', content: 'Tre pilastri contenuto: (1) Lavoro — foto/clip con racconto del perché; (2) Metodo — perché digitale/pellicola/VHS, dietro le quinte; (3) Territorio — location Sud Italia con occhio del fotografo.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s7b', type: 'text', content: 'IG: 3 post/settimana (reel + carousel) + storie. YT: 1-2 video/mese wedding film VHS. Pinterest: ricicla real wedding in board geolocalizzate. FB: ripubblica contenuti chiave. Usa Meta Business Suite (gratis) per schedulare.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s8h', type: 'subheading', content: '8. Pilastro 7 — llms.txt e robots.txt (cosa fare davvero)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s8a', type: 'text', content: 'Su Pixieset non puoi caricare file arbitrari. Non perdere tempo. Invece: verifica che robots.txt non blocchi crawler AI, invia sitemap a GSC, e aggiungi JSON-LD su ogni pagina chiave. Questo è il vero "rendere il sito leggibile dalle AI".', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s9h', type: 'subheading', content: '9. Pilastro 8 — Monitoraggio (gratuito)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s9a', type: 'text', content: 'GSC (query/impressioni/clic), GA4 (traffico), GBP Insights (ricerche/chiamate). Tracking citazioni AI manuale: una volta al mese chiedi a ChatGPT, Gemini e Perplexity le query target e annota se Antonio viene citato.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-d3', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-rd', type: 'subheading', content: 'Roadmap 90 giorni', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  {
    id: 'b-todo1', type: 'task-group', content: 'Settimane 1-2 — Fondamenta tecniche', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-t1', type: 'todo', content: 'Verificare piano Pixieset; upgrade a Website-Pro se necessario per header code', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t2', type: 'todo', content: 'Collegare Google Search Console + GA4 via header code; inviare sitemap', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t3', type: 'todo', content: 'Inserire JSON-LD ProfessionalService (Allegato A) nell\'header Pixieset', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t4', type: 'todo', content: 'Completare/ottimizzare Google Business Profile (categorie, aree, descrizione IT/EN, primo post)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo2', type: 'task-group', content: 'Settimane 3-4 — Entità e fiducia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-t5', type: 'todo', content: 'Uniformare NAP + bio (Allegato C) su tutti i 9 profili; collegare sameAs nello schema', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t6', type: 'todo', content: 'Creare pagina FAQ IT/EN con 10 domande (Allegato B) + schema FAQPage', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t7', type: 'todo', content: 'Avviare motore recensioni: link breve Google + template richiesta; chiedere alle ultime 5 coppie', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo3', type: 'task-group', content: 'Settimane 5-8 — Contenuti', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-t8', type: 'todo', content: 'Pubblicare 2 Real Wedding (IT+EN) — location forti: Tropea, Puglia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t9', type: 'todo', content: 'Pubblicare guida location "Dove sposarsi in Calabria" — evergreen con sezioni per location', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t10', type: 'todo', content: 'Pubblicare pagina pilastro VHS: "Cos\'è un wedding film in VHS e perché sceglierlo"', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t11', type: 'todo', content: 'Avviare calendario social sistematico con scheduler (Meta Business Suite)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo4', type: 'task-group', content: 'Settimane 9-12 — Ritmo e misura', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-t12', type: 'todo', content: 'Mantenere 1 contenuto ogni 2 settimane; continuare social e recensioni (1-3/mese)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t13', type: 'todo', content: 'Aggiungere testimonianze reali sul sito con schema JSON-LD Review', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-t14', type: 'todo', content: 'Primo monitoraggio AEO: GSC, GBP Insights, test citazioni AI su query target', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },

  { id: 'b-d4', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-qh', type: 'subheading', content: 'Query da testare (monitoraggio AEO)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  {
    id: 'b-q1', type: 'query-group', content: 'Ricerca geografica ampia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-q1a', type: 'text', content: 'IT — «Mi consigli dei fotografi per un matrimonio in Calabria?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-q1b', type: 'text', content: 'EN — «Recommend a destination wedding photographer in Southern Italy»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-q2', type: 'query-group', content: 'Per nicchia (VHS/pellicola)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-q2a', type: 'text', content: 'IT — «Esiste un fotografo che gira il film di matrimonio in VHS in Italia?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-q2b', type: 'text', content: 'EN — «Wedding photographer who shoots on VHS in Italy»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-q3', type: 'query-group', content: 'Per area servizio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-q3a', type: 'text', content: 'IT — «Fotografo matrimonio a Tropea»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-q3b', type: 'text', content: 'EN — «Wedding photographer Puglia»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-q4', type: 'query-group', content: 'Branded', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-q4a', type: 'text', content: 'EN — «Who is Antonio Pileggi, wedding photographer?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-q4b', type: 'text', content: 'IT — «Cosa rende diverso Antonio Pileggi dagli altri fotografi?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-tk', type: 'task-group', content: '9 · Toolkit gratuito esteso', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-tk1', type: 'todo', content: 'Impostare Google Trends e Keyword Planner per scegliere le prossime 3 guide-location', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk2', type: 'todo', content: 'Estrarre 10 domande reali con AlsoAsked → arricchire le FAQ', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk3', type: 'todo', content: 'Validare JSON-LD con Rich Results Test dopo inserimento su Pixieset', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk4', type: 'todo', content: 'Installare Microsoft Clarity e leggere le prime registrazioni sessione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk5', type: 'todo', content: 'Configurare Metricool come hub di pubblicazione social', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk6', type: 'todo', content: 'Iscriversi a Source of Sources e rispondere alla prima richiesta pertinente', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk7', type: 'todo', content: 'Avviare strategia LinkedIn con planner/venue e cross-linking fornitori ultimo matrimonio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-ai', type: 'task-group', content: '8 · Strumenti AI & piattaforme', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-ai1', type: 'todo', content: 'Collegare la Business DNA di Pomelli e generare il primo set di grafiche on-brand', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai2', type: 'todo', content: 'Produrre il primo teaser con Flow animando una foto reale', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai3', type: 'todo', content: 'Creare il primo episodio NotebookLM (IT+EN) da una guida location e pubblicarlo con trascrizione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai4', type: 'todo', content: 'Aprire Bing Places + Apple Business Connect', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai5', type: 'todo', content: 'Preparare la prima submission editoriale (Wedding Sparrow / Junebug)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai6', type: 'todo', content: 'Avviare la newsletter (Substack/Beehiiv)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai7', type: 'todo', content: 'Impostare una presenza autentica su Reddit/Quora', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-rc', type: 'task-group', content: '10 · Motore di reciprocità partner', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-rc1', type: 'todo', content: 'Definire il blocco "team fornitori" standard per i real wedding', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc2', type: 'todo', content: 'Creare il template del feature kit (cartella Drive + PDF)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc3', type: 'todo', content: 'Impostare la convenzione UTM vendor-feature', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc4', type: 'todo', content: 'Creare il tracker partner (Google Sheets)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc5', type: 'todo', content: 'Per ogni real wedding pubblicato: creditare i fornitori + inviare il feature kit', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc6', type: 'todo', content: 'Chiedere a venue/planner l\'inserimento tra i fornitori consigliati', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc7', type: 'todo', content: 'Check mensile del traffico referral e aggiornamento priorità partner', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
]

const defaultBoardData: BoardColumn[] = [
  {
    id: 'col-fondamenta',
    title: 'Fondamenta tecniche',
    period: 'Settimane 1–2',
    color: 'border-l-blue-500',
    cards: [
      { id: 'bc-f1', title: 'Verifica piano Pixieset', description: 'Controlla se è Website-Pro. Se no, upgrade per header code. Passo tecnico #1.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: ['critico'] },
      { id: 'bc-f2', title: 'GSC + GA4 + sitemap', description: 'Collega Google Search Console e GA4 via header code. Invia sitemap a GSC.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: ['critico'] },
      { id: 'bc-f3', title: 'JSON-LD ProfessionalService', description: 'Inserisci schema dati strutturati con sameAs di tutti i 9 profili (Allegato A).', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: ['critico'] },
      { id: 'bc-f4', title: 'Google Business Profile', description: 'Completa categorie, aree servite, descrizione IT/EN. Pubblica post settimanali.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
    ],
  },
  {
    id: 'col-entita',
    title: 'Entità e fiducia',
    period: 'Settimane 3–4',
    color: 'border-l-emerald-500',
    cards: [
      { id: 'bc-e1', title: 'NAP + bio uniformi 9 profili', description: 'Stessa bio boilerplate IT/EN su tutti i profili. Collega sameAs nello schema.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-e2', title: 'Pagina FAQ IT/EN + schema', description: '10 domande (Allegato B) marcate con schema FAQPage. Formato AEO perfetto.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-e3', title: 'Motore recensioni Google', description: 'Link breve + template richiesta (Allegato D). Chiedere alle ultime 5 coppie. Obiettivo: 30+ in 6 mesi.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: ['critico'] },
    ],
  },
  {
    id: 'col-contenuti',
    title: 'Contenuti',
    period: 'Settimane 5–8',
    color: 'border-l-amber-500',
    cards: [
      { id: 'bc-c1', title: '2 Real Wedding (IT+EN)', description: 'Location forti: Tropea, Puglia. 15-30 foto + 400-700 parole di racconto.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-c2', title: 'Guida location evergreen', description: '"Dove sposarsi in Calabria" — guida con sezioni per location, luce, stagioni.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-c3', title: 'Pagina pilastro VHS', description: '"Cos\'è un wedding film in VHS e perché sceglierlo" — differenziatore di brand.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-c4', title: 'Calendario social sistematico', description: 'Avvia scheduler Meta Business Suite. 3 post/settimana IG + 1-2 video/mese YT.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-c5', title: 'Pomelli — grafiche on-brand', description: 'Collega Business DNA Pomelli e genera primo set di grafiche e caroselli coerenti col brand.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-c6', title: 'Flow — teaser animato', description: 'Produce il primo teaser con Flow animando una foto reale. Hook per reel/Shorts.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-c7', title: 'NotebookLM — episodio pilota', description: 'Crea il primo episodio NotebookLM (IT+EN) da una guida location e pubblicalo con trascrizione.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-p1', title: 'Feature kit standard', description: 'Creare il template del feature kit per i fornitori (cartella Drive + PDF con immagini, blurb, link). Owner: Tu.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-p2', title: 'Tracker partner + UTM', description: 'Impostare la convenzione UTM vendor-feature e il foglio di tracciamento partner. Owner: Tu.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-p3', title: 'Feature kit all\'ultimo matrimonio', description: 'Inviare il feature kit ai fornitori dell\'ultimo matrimonio pubblicato. Owner: Antonio.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-p4', title: 'Richiesta fornitori consigliati', description: 'Richiedere l\'inserimento tra i fornitori consigliati a [venue principale]. Owner: Antonio.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
    ],
  },
  {
    id: 'col-ritmo',
    title: 'Ritmo e misura',
    period: 'Settimane 9–12',
    color: 'border-l-violet-500',
    cards: [
      { id: 'bc-r1', title: 'Ritmo contenuti bisettimanali', description: '1 contenuto ogni 2 settimane. Continua social e recensioni (1-3/mese).', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-r2', title: 'Testimonianze con schema Review', description: 'Pubblica testimonianze reali sul sito con schema JSON-LD Review.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-r3', title: 'Primo monitoraggio AEO', description: 'GSC, GBP Insights, test citazioni AI manuale su query target. Confronta baseline.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: ['critico'] },
      { id: 'bc-r4', title: 'Analytics + strumenti', description: 'Clarity (heatmap), Trends (stagionalità), AlsoAsked (FAQ), Metricool (scheduling).', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-r5', title: 'PR e backlink', description: 'Source of Sources, LinkedIn planner/venue, cross-linking fornitori.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-r6', title: 'Bing Places + Apple Business', description: 'Aprire Bing Places + Apple Business Connect per presenza su Bing/Apple Maps.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-r7', title: 'Submission editoriale', description: 'Preparare la prima submission su Wedding Sparrow / Junebug.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-r8', title: 'Avviare newsletter', description: 'Impostare newsletter su Substack o Beehiiv.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
      { id: 'bc-r9', title: 'Reddit e Quora', description: 'Impostare presenza autentica su Reddit/Quora: rispondere a domande pertinenti.', done: false, comments: [], fileName: '', fileData: '', fileType: '', labels: [] },
    ],
  },
]

const defaultDatabaseData: DatabaseData = {
  columns: [
    { id: 'dc-task', name: 'Task', type: 'text', options: [], width: 300 },
    { id: 'dc-status', name: 'Status', type: 'select', options: ['Da fare', 'In corso', 'Fatto', 'Bloccato'], width: 140 },
    { id: 'dc-priority', name: 'Priorità', type: 'select', options: ['Alta', 'Media', 'Bassa'], width: 120 },
    { id: 'dc-phase', name: 'Fase', type: 'select', options: ['Fondamenta', 'Entità', 'Contenuti', 'Ritmo', 'Partner'], width: 140 },
    { id: 'dc-done', name: 'Completato', type: 'checkbox', options: [], width: 120 },
  ],
  rows: [
    { id: 'dr-1', cells: { 'dc-task': 'Verificare piano Pixieset; upgrade a Website-Pro se necessario', 'dc-status': 'Da fare', 'dc-priority': 'Alta', 'dc-phase': 'Fondamenta', 'dc-done': false } },
    { id: 'dr-2', cells: { 'dc-task': 'Collegare GSC + GA4 via header code; inviare sitemap', 'dc-status': 'Da fare', 'dc-priority': 'Alta', 'dc-phase': 'Fondamenta', 'dc-done': false } },
    { id: 'dr-3', cells: { 'dc-task': 'Inserire JSON-LD ProfessionalService con sameAs', 'dc-status': 'Da fare', 'dc-priority': 'Alta', 'dc-phase': 'Fondamenta', 'dc-done': false } },
    { id: 'dr-4', cells: { 'dc-task': 'Ottimizzare Google Business Profile (categorie, aree, descrizione IT/EN)', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Fondamenta', 'dc-done': false } },
    { id: 'dr-5', cells: { 'dc-task': 'Uniformare NAP + bio su tutti i 9 profili', 'dc-status': 'Da fare', 'dc-priority': 'Alta', 'dc-phase': 'Entità', 'dc-done': false } },
    { id: 'dr-6', cells: { 'dc-task': 'Creare pagina FAQ IT/EN con 10 domande + schema FAQPage', 'dc-status': 'Da fare', 'dc-priority': 'Alta', 'dc-phase': 'Entità', 'dc-done': false } },
    { id: 'dr-7', cells: { 'dc-task': 'Avviare motore recensioni Google — link breve + template', 'dc-status': 'Da fare', 'dc-priority': 'Alta', 'dc-phase': 'Entità', 'dc-done': false } },
    { id: 'dr-8', cells: { 'dc-task': 'Pubblicare 2 Real Wedding (IT+EN) — Tropea, Puglia', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Contenuti', 'dc-done': false } },
    { id: 'dr-9', cells: { 'dc-task': 'Pubblicare guida location "Dove sposarsi in Calabria"', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Contenuti', 'dc-done': false } },
    { id: 'dr-10', cells: { 'dc-task': 'Pubblicare pagina pilastro VHS', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Contenuti', 'dc-done': false } },
    { id: 'dr-11', cells: { 'dc-task': 'Avviare calendario social con Meta Business Suite', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Contenuti', 'dc-done': false } },
    { id: 'dr-12', cells: { 'dc-task': 'Mantenere ritmo 1 contenuto/2 settimane + 1-3 recensioni/mese', 'dc-status': 'Da fare', 'dc-priority': 'Alta', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-13', cells: { 'dc-task': 'Aggiungere testimonianze reali con schema Review', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-14', cells: { 'dc-task': 'Primo monitoraggio AEO (GSC + GBP + test citazioni AI)', 'dc-status': 'Da fare', 'dc-priority': 'Alta', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-15', cells: { 'dc-task': 'Installare Microsoft Clarity per heatmap e sessioni', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-16', cells: { 'dc-task': 'Configurare Metricool come hub scheduling social', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-17', cells: { 'dc-task': 'Iscriversi e usare Source of Sources per PR/backlink', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-18', cells: { 'dc-task': 'Avviare LinkedIn con planner/venue + cross-linking fornitori', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-19', cells: { 'dc-task': 'Estrarre domande reali con AlsoAsked per arricchire FAQ', 'dc-status': 'Da fare', 'dc-priority': 'Bassa', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-20', cells: { 'dc-task': 'Pomelli — generare primo set di grafiche on-brand', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Contenuti', 'dc-done': false } },
    { id: 'dr-21', cells: { 'dc-task': 'Flow — produrre teaser animato da foto reale', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Contenuti', 'dc-done': false } },
    { id: 'dr-22', cells: { 'dc-task': 'NotebookLM — creare episodio pilota IT/EN da guida location', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Contenuti', 'dc-done': false } },
    { id: 'dr-23', cells: { 'dc-task': 'Aprire Bing Places + Apple Business Connect', 'dc-status': 'Da fare', 'dc-priority': 'Bassa', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-24', cells: { 'dc-task': 'Preparare submission editoriale (Wedding Sparrow/Junebug)', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-25', cells: { 'dc-task': 'Avviare newsletter su Substack/Beehiiv', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-26', cells: { 'dc-task': 'Impostare presenza autentica su Reddit/Quora', 'dc-status': 'Da fare', 'dc-priority': 'Bassa', 'dc-phase': 'Ritmo', 'dc-done': false } },
    { id: 'dr-27', cells: { 'dc-task': 'Definire il blocco "team fornitori" standard per i real wedding', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Partner', 'dc-done': false } },
    { id: 'dr-28', cells: { 'dc-task': 'Creare il template del feature kit (cartella Drive + PDF)', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Partner', 'dc-done': false } },
    { id: 'dr-29', cells: { 'dc-task': 'Impostare la convenzione UTM vendor-feature', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Partner', 'dc-done': false } },
    { id: 'dr-30', cells: { 'dc-task': 'Creare il tracker partner (Google Sheets)', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Partner', 'dc-done': false } },
    { id: 'dr-31', cells: { 'dc-task': 'Creditare i fornitori + inviare feature kit per ogni real wedding pubblicato', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Partner', 'dc-done': false } },
    { id: 'dr-32', cells: { 'dc-task': 'Chiedere a venue/planner l\'inserimento tra i fornitori consigliati', 'dc-status': 'Da fare', 'dc-priority': 'Media', 'dc-phase': 'Partner', 'dc-done': false } },
    { id: 'dr-33', cells: { 'dc-task': 'Check mensile traffico referral e aggiornamento priorità partner', 'dc-status': 'Da fare', 'dc-priority': 'Bassa', 'dc-phase': 'Partner', 'dc-done': false } },
  ],
}

const defaultStrumentiBlocks: Block[] = [
  {
    id: 's-h', type: 'heading', content: 'Strategie parallele — strumenti AI gratuiti e piattaforme ad alto valore', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-intro', type: 'text', content: 'Cliente: Antonio Pileggi — fotografo di matrimoni destination (Maida, Calabria) · film, digitale, VHS\nScopo: affiancare alla strategia madre (AEO/SEO, recensioni, schema, contenuti, social) un motore di produzione di contenuti basato su strumenti gratuiti, e nuove piattaforme di visibilità. Tutto alimenta gli stessi obiettivi: più visibilità nelle ricerche tradizionali e nelle risposte AI, più autorità, più contenuti di qualità in modo sostenibile.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  { id: 's-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  {
    id: 's-rh', type: 'subheading', content: 'Regola d\'oro (vale per TUTTO ciò che segue)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-r1', type: 'text', content: 'Antonio vende autenticità: il suo prodotto sono le fotografie e i film reali di matrimoni reali. L\'AI qui serve a confezionare, amplificare e distribuire, mai a sostituire il suo lavoro. Quindi:', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-r2', type: 'text', content: '• Mai spacciare immagini o video generati dall\'AI per servizi reali. Per un fotografo documentarista sarebbe il modo più rapido di distruggere la fiducia (e oggi le coppie riconoscono il "look AI").', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-r3', type: 'text', content: '• L\'AI può creare: grafiche di brand, copertine, caroselli testuali, animazioni leggere delle sue foto, teaser di atmosfera, podcast/serie editoriali, bozze di testi. Quando un contenuto è AI, o è palesemente astratto/di servizio (una grafica, un\'animazione di una sua foto) oppure va dichiarato. Trasparenza = coerenza con il brand.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-1h', type: 'subheading', content: '1. Google Pomelli (gratuito) — fabbrica di contenuti on-brand', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-1a', type: 'text', content: 'Cos\'è oggi: strumento gratuito di Google Labs + DeepMind che analizza il sito e costruisce una "Business DNA" (tono di voce, colori, font, stile), poi genera campagne social, creatività pubblicitarie, copy e grafiche coerenti col brand. Da marzo 2026 è disponibile anche in Italia. Antonio ha già aggiornato la sua Business DNA: ottimo punto di partenza.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-1b', type: 'text', content: 'Come usarlo per Antonio (sì):\n• Generare set di post social coerenti per le campagne ricorrenti: "Now booking 2026/2027", annunci di nuove pubblicazioni editoriali, caroselli "il mio approccio", quote/atmosphere card con le frasi del brand ("non rincorro i trend…").\n• Produrre varianti grafiche veloci per Pinterest/Instagram/Facebook partendo dal suo tono già definito, mantenendo palette e font coerenti.\n• Usare la funzione Photoshoot (foto studio da scatto semplice) per gli oggetti del brand — album, packaging, pellicole, attrezzatura — non per le persone/coppie.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-1c', type: 'text', content: 'Limiti da tenere a mente:\n• Pomelli automatizza la creatività iniziale, non la strategia: la regia resta la tua (questo documento).\n• L\'output va sempre rivisto e rifinito: serve a velocizzare, non a pubblicare "as is".\n• Le immagini generate non devono mai entrare nel portfolio o sembrare foto di matrimonio reali (vedi regola d\'oro).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-2h', type: 'subheading', content: '2. Google Flow / Veo 3.1 (gratuito) — movimento e atmosfera', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-2a', type: 'text', content: 'Cos\'è oggi: lo studio creativo AI di Google (flow.google.com) con il modello video Veo 3.1 e immagini Imagen 4 / Nano Banana. Gratuito con un account Google: ~50 crediti al giorno (in alcuni Paesi di più), clip di 4–8 secondi estendibili in catena fino a ~2,5 minuti, con audio nativo. Fa anche image-to-video: anima una foto statica. Nota: sul piano gratuito i video escono con il watermark "Made with Veo".', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-2b', type: 'text', content: 'Come usarlo per Antonio (sì):\n• Animare le SUE fotografie reali (image-to-video): un ritratto che "respira", un velo che si muove, la luce che cambia. Movimento sottile e cinematografico da una sua foto vera → hook perfetto per reel e Shorts, restando autentico perché parte dal suo scatto.\n• Teaser e mood film di atmosfera: brevi sequenze di luce, paesaggio, texture (Calabria, mare, pietra, pellicola) come sigle/intro per i suoi video o stacchi social — chiaramente "atmosfera", non un matrimonio.\n• B-roll di location per accompagnare le guide territoriali (Costa degli Dei, Tropea) quando non ha girato lui quella ripresa.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-2c', type: 'text', content: 'Limiti da tenere a mente:\n• Il watermark del piano gratuito lo rende adatto a hook/social, meno a contenuti "hero" premium.\n• Mai generare scene di matrimonio finte da presentare come lavoro. L\'uso onesto è: animare le sue foto + atmosfera/luogo astratti.\n• Clip brevi: pensalo per micro-contenuti, non per film lunghi.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-3h', type: 'subheading', content: '3. NotebookLM (gratuito) — podcast e serie editoriali dai suoi contenuti', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-3a', type: 'text', content: 'Cos\'è oggi: strumento gratuito di Google che, dai documenti che gli dai, genera "Audio Overview" — una conversazione in stile podcast tra due conduttori AI — e "Video Overview" (presentazioni narrate). Da metà 2026 gli Audio Overview sono full-length in oltre 80 lingue, italiano incluso, con formati diversi (approfondimento, sintesi, dibattito) e la possibilità di intervenire nella conversazione. Resta ancorato alle fonti che gli fornisci (poche allucinazioni).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-3b', type: 'text', content: 'Come usarlo per Antonio (sì):\n• Trasformare le guide alle location e le pagine pilastro (es. "Dove sposarsi in Calabria", "Perché il VHS") in episodi audio in italiano e in inglese — un nuovo formato di contenuto e una nuova superficie dove farsi trovare.\n• Pubblicare gli episodi come audio sul sito, su YouTube e su Spotify for Creators (hosting podcast gratuito): ogni episodio ha una trascrizione, che è oro per SEO/AEO (altro testo indicizzabile e citabile, in due lingue).\n• Usare i Video Overview per generare rapidamente caroselli/slide didattiche da ripubblicare sui social.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-3c', type: 'text', content: 'Due modi di usarlo, scegli in base al brand:\n• (A) Strumento di regia: usa NotebookLM per strutturare l\'episodio (scaletta, punti chiave), poi lo registri con la tua voce. Per un personal brand la voce reale conta: è la scelta più forte.\n• (B) Serie companion AI dichiarata: pubblichi l\'audio AI così com\'è, ma dichiarandolo ("episodio generato con AI a partire dai miei articoli"). Più veloce, ma meno personale.\n\nLimiti: il podcast AI non è la sua voce; per un brand personale è un supporto, non un sostituto. Il vero valore SEO sono comunque le trascrizioni.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-4h', type: 'subheading', content: '4. Piattaforme gratuite di visibilità ad alto valore (in ordine di leva)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-41h', type: 'subheading', content: '4.1 Pubblicazioni editoriali fine-art / film (la leva di prestigio + AEO più forte)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-41a', type: 'text', content: 'Far pubblicare i suoi matrimoni reali su blog editoriali di settore dà tre cose insieme: prestigio, backlink autorevoli e citazioni AI. Il suo angolo pellicola/VHS è perfetto per le testate "fine-art/film", molto selettive e quindi molto credibili agli occhi delle AI. Submission in genere gratuite:', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-41b', type: 'text', content: '• Wedding Sparrow e Magnolia Rouge (focus film/fine-art — su misura per lui).\n• Junebug Weddings (prestigio internazionale; ha anche directory di fotografi).\n• Together Journal (già presente: spingere nuove submission).\n• Per coppie straniere: Rock My Wedding, 100 Layer Cake, Wezoree.\n\nAzione: preparare 1 submission ogni 1–2 mesi del miglior matrimonio recente, con gallery curata e testo.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-42h', type: 'subheading', content: '4.2 Reddit e Quora — dove le AI vanno a pescare', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-42a', type: 'text', content: 'Google AI Overviews e ChatGPT citano moltissimo Reddit e Quora. Partecipare in modo autentico (rispondere a domande vere, non spam) a community come r/weddingphotography, r/destinationwedding, r/italytravel, r/Calabria, o a domande Quora tipo "getting married in Southern Italy" rende Antonio una fonte che le AI possono citare. Regola: dare valore reale, menzionarsi solo quando pertinente.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-43h', type: 'subheading', content: '4.3 Motori e mappe non-Google (presenza dove Google non arriva)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-43a', type: 'text', content: '• Bing Places + Bing Webmaster Tools (gratuiti): alimentano la ricerca Bing e Microsoft Copilot. Pochi fotografi li presidiano: vantaggio facile.\n• Apple Business Connect (gratuito): presenza su Apple Maps e Siri, rilevante per le coppie su iPhone.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-44h', type: 'subheading', content: '4.4 Entità e Knowledge Graph', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-44a', type: 'text', content: '• Wikidata: una scheda‑entità strutturata alimenta il Knowledge Graph di Google e le AI. Realizzabile solo se ci sono fonti affidabili che lo citano (le pubblicazioni editoriali del punto 4.1 servono anche a questo): prima le feature, poi la scheda.\n• Google Knowledge Panel: se compare un pannello su di lui, rivendicarlo dal proprio account.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-45h', type: 'subheading', content: '4.5 Audience di proprietà', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-45a', type: 'text', content: '• Newsletter gratuita (Substack o Beehiiv): lo spazio editoriale dove pubblicare i suoi pensieri su atmosfera, memoria, pellicola. È l\'unico canale che possiede davvero (non dipende dall\'algoritmo) e crea relazione con coppie e wedding planner. Su Substack, le "Notes" aiutano anche la scoperta.\n• Pinterest (già in piano): trattarlo come motore di ricerca visuale — per i matrimoni è enorme e porta traffico evergreen al sito. Ricicla ogni real wedding e guida in board geolocalizzate.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-46h', type: 'subheading', content: '4.6 Directory wedding internazionali (per le coppie straniere)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-46a', type: 'text', content: 'Oltre alle quattro già attive, profili gratuiti su Zankyou, Bridebook (coppie UK verso l\'Italia) e The Knot / WeddingWire ampliano la copertura sul mercato estero e aggiungono fonti di validazione dell\'entità.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-5h', type: 'subheading', content: '5. Toolkit gratuito di produzione (per confezionare ad alto livello)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-5a', type: 'text', content: '• Canva (free): pin Pinterest, caroselli, template storie, quote/atmosphere card. Si abbina a Pomelli per la parte grafica.\n• CapCut (free): montaggio reel/Shorts, sottotitoli automatici (utili in IT ed EN).\n• Gemini / Claude / ChatGPT (free): bozze bilingui di articoli, caption, FAQ, riadattamento di un contenuto nei vari formati.\n• Descript (free tier): se registra audio/video con la sua voce, trascrizione e montaggio "a testo".\n• Nano Banana / Imagen via Gemini (free): grafiche e elementi visivi — mai foto di matrimonio finte.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-6h', type: 'subheading', content: '6. Come si incastra tutto (il flusso)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-6a', type: 'text', content: 'Un solo contenuto sorgente alimenta più canali, senza moltiplicare il lavoro:\n\n1. Scrivi una guida/real wedding (IT+EN) sul sito → SEO + AEO.\n2. Da quella, NotebookLM genera l\'episodio audio → sito + YouTube + Spotify → nuova superficie + trascrizione AEO.\n3. Flow anima 1–2 sue foto del pezzo → hook reel/Shorts → social.\n4. Pomelli + Canva producono il set di grafiche e caroselli coerenti → Instagram/Facebook/Pinterest.\n5. Il miglior matrimonio diventa una submission editoriale (Wedding Sparrow/Junebug) → prestigio + backlink + entità.\n6. Spunti e domande dal pezzo vengono riusati su Reddit/Quora in modo autentico → citazioni AI.\n\nCadenza sostenibile: 1 contenuto sorgente ogni 2 settimane, declinato sui canali sopra. Meglio pochi contenuti curati e propagati bene, che tanti dispersi.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-7h', type: 'subheading', content: '7. Da aggiungere alla dashboard', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 's-7a', type: 'text', content: 'Queste attività vanno inserite come nuove card del kanban (fase 3–4) e voci di todolist (nuovo gruppo "8 · Strumenti AI & piattaforme"). Esempi di voci:\n• Collegare la Business DNA di Pomelli e generare il primo set di grafiche on-brand.\n• Produrre il primo teaser con Flow animando una foto reale.\n• Creare il primo episodio NotebookLM (IT+EN) da una guida location e pubblicarlo con trascrizione.\n• Aprire Bing Places + Apple Business Connect.\n• Preparare la prima submission editoriale (Wedding Sparrow / Junebug).\n• Avviare la newsletter (Substack/Beehiiv).\n• Impostare una presenza autentica su Reddit/Quora.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
]

const defaultStrategieBlocks: Block[] = [
  {
    id: 'st-h', type: 'heading', content: 'Strategie parallele — Piattaforme ad alto valore', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-intro', type: 'text', content: 'Piattaforme gratuite di visibilità per affiancare la strategia madre. Tutte alimentano gli stessi obiettivi: più visibilità nelle ricerche e nelle risposte AI, più autorità, più contenuti.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  { id: 'st-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  {
    id: 'st-1h', type: 'subheading', content: '1. Pubblicazioni editoriali fine-art / film', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-1a', type: 'text', content: 'Prestigio + backlink autorevoli + citazioni AI. Submit gratuite 1 ogni 1-2 mesi del miglior matrimonio recente.\n• Wedding Sparrow (focus film/fine-art)\n• Magnolia Rouge (focus film/fine-art)\n• Junebug Weddings (prestigio internazionale)\n• Together Journal (già presente: spingere nuove submission)\n• Per coppie straniere: Rock My Wedding, 100 Layer Cake, Wezoree', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-2h', type: 'subheading', content: '2. Reddit e Quora', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-2a', type: 'text', content: 'Google AI Overviews e ChatGPT citano Reddit e Quora. Partecipazione autentica: rispondere a domande vere (r/weddingphotography, r/destinationwedding, r/Calabria, Quora "getting married in Southern Italy"). Dare valore reale, menzionarsi solo quando pertinente.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-3h', type: 'subheading', content: '3. Motori e mappe non-Google', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-3a', type: 'text', content: '• Bing Places + Bing Webmaster Tools (gratuiti) → alimentano Bing + Microsoft Copilot. Pochi fotografi li presidiano.\n• Apple Business Connect (gratuito) → presenza su Apple Maps e Siri. Rilevante per coppie su iPhone.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-4h', type: 'subheading', content: '4. Entità e Knowledge Graph', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-4a', type: 'text', content: '• Wikidata: scheda entità strutturata → Knowledge Graph Google + AI. Realizzabile solo dopo pubblicazioni editoriali (fonti affidabili).\n• Google Knowledge Panel: rivendicarlo se compare.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-5h', type: 'subheading', content: '5. Audience di proprietà', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-5a', type: 'text', content: '• Newsletter gratuita (Substack/Beehiiv): spazio editoriale su atmosfera, memoria, pellicola. Unico canale posseduto davvero. Substack Notes aiutano la scoperta.\n• Pinterest (già in piano): motore di ricerca visuale. Ricicla real wedding e guide in board geolocalizzate.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-6h', type: 'subheading', content: '6. Directory wedding internazionali', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
  {
    id: 'st-6a', type: 'text', content: 'Oltre alle quattro già attive, profili gratuiti su:\n• Zankyou\n• Bridebook (coppie UK verso l\'Italia)\n• The Knot / WeddingWire\nAmpliano copertura mercato estero e aggiungono fonti di validazione dell\'entità.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [],
  },
]

const defaultToolkitBlocks: Block[] = [
  { id: 'tk-h', type: 'heading', content: 'Strumenti totalmente gratuiti — toolkit esteso e strategie collegate', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-cliente', type: 'text', content: 'Cliente: Antonio Pileggi — fotografo di matrimoni destination (Maida, Calabria)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-scopo', type: 'text', content: 'Scopo: ampliare l\'arsenale con strumenti realmente gratuiti, ognuno legato a una strategia concreta e ai pilastri già definiti (recensioni, schema, contenuti, FAQ, be-everywhere, social, monitoraggio). Completa gli strumenti AI già trattati (Pomelli, Flow, NotebookLM, Canva, CapCut, ecc.).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-legenda', type: 'text', content: 'Legenda: 🟢 = 100% gratis per sempre · 🟡 = piano gratuito ampiamente sufficiente per un singolo professionista. La regola d\'oro resta: l\'AI/strumento confeziona e amplifica, non sostituisce le foto reali.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-ah', type: 'subheading', content: 'A. Capire cosa cercano davvero le coppie (ricerca)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-strat-a', type: 'text', content: 'Strategia collegata: alimentare i contenuti (guide location, real wedding) e le FAQ con le parole e le domande reali, invece di andare a intuito. È ciò che fa sì che i contenuti intercettino la domanda vera (SEO) e rispondano alle domande che le coppie pongono alle AI (AEO).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-a1', type: 'text', content: 'Google Trends 🟢 — confronta l\'interesse nel tempo e per area. Strategia: capire la stagionalità ("matrimonio Puglia", "destination wedding Italy") per programmare quando pubblicare e quando spingere "Now booking"; confrontare l\'interesse IT vs EN per bilanciare le due lingue; scovare location emergenti prima dei concorrenti.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-a2', type: 'text', content: 'Google Keyword Planner 🟡 (gratis con un account Google Ads, senza spendere) — volumi di ricerca reali. Strategia: decidere quali guide-location scrivere per prime in base al volume (es. "sposarsi a Tropea" vs "sposarsi a Maida") e quali keyword inserire in titoli e meta description.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-a3', type: 'text', content: 'AlsoAsked 🟡 e AnswerThePublic 🟡 (ricerche giornaliere gratuite limitate) — mappano le domande reali attorno a un tema. Strategia: estrarre le domande vere ("quanto costa…", "quando prenotare…", "serve il permesso per sposarsi in spiaggia in Calabria…") e trasformarle in FAQ e in paragrafi-risposta dentro le guide → formato perfetto per le AI.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-a4', type: 'text', content: 'Google "People Also Ask" + autocomplete 🟢 (manuale) — la fonte più diretta e gratuita: digita le query target e annota i suggerimenti e le domande correlate.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-bh', type: 'subheading', content: 'B. Assicurarsi che il sito sia leggibile, valido e veloce (tecnico & QA)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-strat-b', type: 'text', content: 'Strategia collegata: rendere concreto il pilastro dati strutturati + monitoraggio. Serve a verificare che lo schema funzioni, che il sito non perda le coppie e che sia indicizzabile dalle AI.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-b1', type: 'text', content: 'Google Rich Results Test 🟢 + Schema Markup Validator (schema.org) 🟢 — Strategia: dopo aver inserito il JSON-LD su Pixieset, validarlo qui per essere certi che Google e le AI lo leggano senza errori. Passaggio obbligatorio di QA.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-b2', type: 'text', content: 'Microsoft Clarity 🟢 (gratis per sempre, nessun piano a pagamento) — heatmap e registrazioni delle sessioni reali. Strategia: vedere dove le coppie abbandonano il sito e ottimizzare il percorso verso la pagina Contact (è lì che si gioca la conversione). Per un sito-vetrina è la diagnosi più preziosa, a costo zero.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-b3', type: 'text', content: 'Google PageSpeed Insights 🟢 — Strategia: misurare velocità e Core Web Vitals; su Pixieset il controllo è limitato, ma serve a sapere quali immagini alleggerire.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-b4', type: 'text', content: 'Ahrefs Webmaster Tools 🟡 (gratis per il proprio sito verificato) — Strategia: monitorare i backlink in arrivo (dalle pubblicazioni editoriali, dalle venue) e ricevere un audit tecnico di base.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-b5', type: 'text', content: 'Screaming Frog SEO Spider 🟡 (gratis fino a 500 URL — il suo sito ci sta comodamente) — Strategia: crawl completo per scovare titoli/description mancanti, immagini senza alt, link rotti.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-d3', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-ch', type: 'subheading', content: 'C. Produrre contenuti ad alto livello (creazione)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-strat-c', type: 'text', content: 'Strategia collegata: il motore di contenuti (video VHS, podcast, social) con qualità professionale e senza watermark, a differenza dei piani gratuiti di alcuni strumenti AI.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-c1', type: 'text', content: 'DaVinci Resolve 🟢 (versione gratuita, livello cinema) — Strategia: montare i film VHS e i video YouTube in qualità professionale, color grading incluso, senza watermark e senza limiti di durata. Per i contenuti "hero" è nettamente superiore a CapCut.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-c2', type: 'text', content: 'Audacity 🟢 — Strategia: pulire e montare l\'audio del podcast (gli episodi che registra con la sua voce a partire dalle scalette NotebookLM).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-c3', type: 'text', content: 'Photopea 🟢 (Photoshop nel browser, gratis) — Strategia: ritocchi e grafiche per social/Pinterest quando serve più controllo di Canva.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-c4', type: 'text', content: 'Pexels / Unsplash 🟢 — Strategia: immagini di supporto per articoli di blog (texture, dettagli, paesaggi) — mai per simulare matrimoni.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-d4', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-dh', type: 'subheading', content: 'D. Pubblicare in modo sistematico (distribuzione)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-strat-d', type: 'text', content: 'Strategia collegata: rendere reale il pilastro social sistematici senza dipendere dalla disponibilità giornaliera e senza pagare.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-d1b', type: 'text', content: 'Metricool 🟡 (piano gratuito: 50 post/mese, 1 brand, con analytics) — Strategia: è l\'hub unico gratuito: copre Instagram, Facebook, Pinterest, YouTube, Google Business Profile e LinkedIn da un solo posto, con analitica e suggerimento dei "migliori orari". 50 post/mese coprono ~3 uscite a settimana: in linea con la cadenza del piano.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-d2b', type: 'text', content: 'Meta Business Suite 🟢 (illimitato per IG/FB) — Strategia: usarlo per il volume illimitato su Instagram e Facebook, tenendo Metricool per Pinterest/YouTube/GBP/LinkedIn e per i dati.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-d5', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-eh', type: 'subheading', content: 'E. Farsi citare e guadagnare autorità (PR & backlink)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-strat-e', type: 'text', content: 'Strategia collegata: pilastro autorità + be-everywhere. Farsi citare in articoli come esperto produce backlink autorevoli e, soprattutto, citazioni che le AI riprendono.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-e1', type: 'text', content: 'Source of Sources (SoS) 🟢 (il successore di HARO, di Peter Shankman, completamente gratuito) — Strategia: rispondere alle richieste dei giornalisti su matrimoni, destination wedding e Sud Italia, posizionandosi come "fotografo di matrimoni destination in Italia". Ogni citazione = backlink + autorità + possibile citazione AI.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-e2', type: 'text', content: '#journorequest 🟢 su X/Bluesky — Strategia: monitorare l\'hashtag con cui i giornalisti cercano fonti, e rispondere a quelle a tema wedding/Italia.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-e3', type: 'text', content: 'Featured.com 🟡 (piano Starter gratuito: 3 risposte/mese) — Strategia: contribuire a roundup di esperti su testate ad alta autorità.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-d6', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-fh', type: 'subheading', content: 'F. Costruire relazioni B2B e un ecosistema di link locale (strategia, a costo zero)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-strat-f', type: 'text', content: 'Strategia collegata: è forse la leva più sottovalutata e più potente per un fotografo di matrimoni di fascia alta. Non è un "tool", è un metodo gratuito.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-f1', type: 'text', content: 'LinkedIn 🟢 — Strategia: connettersi e coltivare relazioni con wedding planner e venue di lusso in Calabria, Puglia, Sicilia, Toscana. Sono loro a portare i matrimoni di fascia alta. Pochi fotografi presidiano LinkedIn in modo serio: vantaggio facile.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-f2', type: 'text', content: 'Cross-linking con i fornitori 🟢 — Strategia: farsi inserire nelle pagine "fornitori consigliati / preferred suppliers" dei siti di venue, planner, fioristi, catering con cui lavora, e ricambiare. I siti delle venue di lusso sono autorevoli e tematici: un loro link vale moltissimo per SEO ed è esattamente il tipo di fonte che le AI citano quando una coppia chiede "fotografi consigliati per [venue/zona]". Concretamente: dopo ogni matrimonio, chiedere alla venue/planner di essere aggiunto tra i fornitori e taggarli nei contenuti.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-d7', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-gh', type: 'subheading', content: 'G. Portfolio e community (scoperta + backlink)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-strat-g', type: 'text', content: 'Strategia collegata: aumentare le superfici dove l\'entità è presente e validata (be-everywhere).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-g1', type: 'text', content: 'Behance 🟢, 500px 🟢, Flickr 🟢 — Strategia: caricare alcuni progetti selezionati con link al sito: backlink, scoperta presso un pubblico che include addetti ai lavori, ulteriore conferma dell\'entità. Manutenzione minima, una volta impostati.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-d8', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-tab', type: 'subheading', content: 'Tabella riepilogo', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t1', type: 'text', content: 'Google Trends 🟢 — Stagionalità e trend — Timing contenuti/social; IT vs EN', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t2', type: 'text', content: 'Keyword Planner 🟡 — Volumi di ricerca — Priorità delle guide-location', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t3', type: 'text', content: 'AlsoAsked / AnswerThePublic 🟡 — Domande reali — FAQ e paragrafi-risposta (AEO)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t4', type: 'text', content: 'People Also Ask / autocomplete 🟢 — Domande correlate — Idee FAQ e titoli', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t5', type: 'text', content: 'Rich Results Test / Schema Validator 🟢 — Validare JSON-LD — QA dei dati strutturati', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t6', type: 'text', content: 'Microsoft Clarity 🟢 — Heatmap/sessioni — Ottimizzare il percorso a Contact', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t7', type: 'text', content: 'PageSpeed Insights 🟢 — Performance — Alleggerire immagini', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t8', type: 'text', content: 'Ahrefs Webmaster Tools 🟡 — Backlink/audit — Monitorare link in arrivo', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t9', type: 'text', content: 'Screaming Frog 🟡 — Crawl tecnico — Titoli/alt/link mancanti', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t10', type: 'text', content: 'DaVinci Resolve 🟢 — Montaggio video pro — Film VHS e YouTube senza watermark', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t11', type: 'text', content: 'Audacity 🟢 — Editing audio — Podcast con la sua voce', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t12', type: 'text', content: 'Photopea 🟢 — Grafica nel browser — Pin/post quando serve controllo', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t13', type: 'text', content: 'Pexels / Unsplash 🟢 — Immagini di supporto — Blog (mai matrimoni finti)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t14', type: 'text', content: 'Metricool 🟡 — Scheduling + analytics — Hub social sistematico', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t15', type: 'text', content: 'Meta Business Suite 🟢 — Scheduling IG/FB — Volume illimitato IG/FB', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t16', type: 'text', content: 'Source of Sources 🟢 — Richieste giornalisti — Citazioni + backlink di autorità', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t17', type: 'text', content: '#journorequest 🟢 — Richieste giornalisti — Citazioni a tema wedding/Italia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t18', type: 'text', content: 'Featured.com 🟡 — Roundup esperti — Backlink ad alta autorità', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t19', type: 'text', content: 'LinkedIn 🟢 — Relazioni B2B — Planner e venue di lusso', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t20', type: 'text', content: 'Cross-linking fornitori 🟢 — Ecosistema link locale — Backlink autorevoli + referral', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-t21', type: 'text', content: 'Behance / 500px / Flickr 🟢 — Portfolio/scoperta — Be-everywhere + backlink', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'tk-d9', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-pri', type: 'subheading', content: 'Priorità (se deve partire da pochi)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'tk-pri-text', type: 'text', content: 'Per impatto rispetto allo sforzo, i primi quattro da attivare sono: Microsoft Clarity (capire e convertire chi già arriva), Metricool (sistematizzare i social), Source of Sources + LinkedIn/cross-linking (autorità e backlink reali), Google Trends + AlsoAsked (scrivere i contenuti giusti). Il resto si aggiunge man mano.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
]

const defaultPianoBlocks: Block[] = [
  { id: 'po-h', type: 'heading', content: 'Piano operativo a due — Chi fa cosa (tu e Antonio)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-ob', type: 'text', content: 'Obiettivo: trasformare tutta la strategia in passi concreti, divisi tra te (consulente) e Antonio (cliente), così è chiaro chi fa cosa e niente resta in sospeso.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-princ', type: 'subheading', content: 'Principio di divisione del lavoro', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-princ-t', type: 'text', content: '• Tu (consulente): tutto ciò che è tecnico, strategico, di ricerca, scrittura/bozze, impostazione strumenti e monitoraggio. Sei il motore operativo.\n• Antonio: ciò che solo lui può dare o fare — gli accessi, la materia prima (foto, storie dei matrimoni, lista fornitori), la voce del brand e le approvazioni finali, e soprattutto le relazioni umane: chiedere le recensioni alle coppie, coltivare planner e venue, rispondere personalmente alle richieste, mettere la sua voce nel podcast e nelle stories.\n• Regola d\'oro della collaborazione: tu prepari e imposti, lui decide, approva e ci mette la faccia/voce dove conta. Mai scrivere recensioni al posto delle coppie, mai pubblicare contenuti personali senza la sua approvazione: l\'autenticità è il suo asset.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f0h', type: 'subheading', content: 'Fase 0 — Avvio: cosa farti dare da Antonio (prima di tutto)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f0-t', type: 'text', content: 'Senza questi, niente parte. Meglio accessi come gestore/utente che password condivise.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f0-tab', type: 'text', content: '| Cosa serve | Come |\n|---|---|\n| Accesso al sito Pixieset (e conferma del piano) | Antonio ti aggiunge o condivide l\'editor; verifica se è almeno Website-Pro |\n| Proprietà del Google Business Profile | Antonio ti aggiunge come gestore della scheda |\n| Google Search Console + GA4 | Antonio verifica la proprietà e ti aggiunge come utente |\n| Accesso ai 9 profili social/directory | Connessione via Metricool con il suo login, o ti aggiunge come collaboratore |\n| Materia prima contenuti | 2–3 matrimoni recenti migliori: foto, quale coppia, permesso a pubblicare, lista fornitori (venue, planner, fiorista, ecc.) e la storia di quel giorno |\n| Dati anagrafici e brand | Sede confermata (Maida ✓), telefono, brochure, le frasi del suo tono di voce |\n| Consensi | Ok delle coppie a pubblicare matrimonio e a essere ricontattate per la recensione |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f1h', type: 'subheading', content: 'Fase 1 (Settimane 1–2) — Fondamenta tecniche', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f1-tab', type: 'text', content: '| Passo | Tu (consulente) | Antonio |\n|---|---|---|\n| Piano Pixieset | Verifichi cosa manca e spieghi perché serve Website-Pro | Decide e fa l\'upgrade (è la sua spesa) |\n| Search Console + GA4 | Imposti tutto, inserisci il codice nell\'header, invii la sitemap | Ti dà accesso; verifica la proprietà |\n| Microsoft Clarity | Lo installi e configuri | — |\n| Google Business Profile | Scrivi categorie, area, descrizione IT/EN; imposti il primo post | Conferma le informazioni; rivendica la scheda se serve |\n| Schema JSON-LD | Inserisci il blocco ProfessionalService nell\'header e lo validi col Rich Results Test | — |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-d3', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f2h', type: 'subheading', content: 'Fase 2 (Settimane 3–4) — Entità e fiducia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f2-tab', type: 'text', content: '| Passo | Tu (consulente) | Antonio |\n|---|---|---|\n| Coerenza entità (NAP + bio) | Prepari la bio boilerplate IT/EN e uniformi i 9 profili | Approva il testo; ti dà gli accessi mancanti |\n| Pagina FAQ + schema | Scrivi le FAQ IT/EN e inserisci lo schema FAQPage | Rilegge e approva le risposte |\n| Motore recensioni | Crei il link breve Google, prepari i template IT/EN, imposti il flusso nella consegna gallery | Chiede personalmente la recensione alle ultime 5 coppie (da lui converte molto di più) e risponde alle recensioni con la sua voce |\n\n> Nota: le recensioni devono essere autentiche e scritte dalle coppie. Tu prepari il messaggio e il link; la richiesta parte da Antonio.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-d4', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f3h', type: 'subheading', content: 'Fase 3 (Settimane 5–8) — Contenuti, strumenti AI e partner', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f3-tab', type: 'text', content: '| Passo | Tu (consulente) | Antonio |\n|---|---|---|\n| Ricerca | Usi Google Trends, Keyword Planner, AlsoAsked per scegliere temi e domande | — |\n| Real wedding (Tropea, Puglia) | Scrivi la bozza IT/EN, selezioni le foto, imposti SEO | Fornisce foto, storia e lista fornitori; approva il testo |\n| Guida location ("Costa degli Dei/Calabria") | Scrivi la bozza IT/EN | Aggiunge il punto di vista da fotografo del posto; approva |\n| Pagina pilastro VHS | Scrivi la bozza | Mette la sua voce/visione sul perché del VHS; approva |\n| Strumenti AI | Colleghi Pomelli, generi le grafiche on-brand; con Flow animi le sue foto; con NotebookLM crei la scaletta del podcast | Registra il podcast con la sua voce; approva le grafiche e i teaser |\n| Social sistematici | Imposti Metricool, costruisci il calendario, programmi i post | Gira/sceglie i contenuti reali; pubblica le stories (sono personali e dal vivo) |\n| Partner / reciprocità | Prepari il "feature kit" (foto creditate, testo, link), inserisci i crediti fornitori negli articoli | Sceglie i partner (selettività = suo gusto) e chiede a venue/planner di ricambiare con un link/feature |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-d5', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f4h', type: 'subheading', content: 'Fase 4 (Settimane 9–12) — Ritmo e misura', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-f4-tab', type: 'text', content: '| Passo | Tu (consulente) | Antonio |\n|---|---|---|\n| Ritmo editoriale | Mantieni 1 contenuto/2 settimane (bozze) e la programmazione social | Fornisce materia prima; approva; pubblica le stories |\n| Testimonianze sul sito | Inserisci le testimonianze con schema Review | Raccoglie il consenso delle coppie |\n| Monitoraggio | Leggi GSC, GA4, Clarity; esegui il test citazioni AI (protocollo) | Riceve il report e decide le priorità del mese dopo |\n| Relazioni B2B | Prepari le bozze di outreach su LinkedIn | Coltiva di persona i rapporti con planner e venue |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-d6', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-rith', type: 'subheading', content: 'Ritmo continuativo (dal mese 4 in poi)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-rit-tab', type: 'text', content: '| Cadenza | Tu (consulente) | Antonio |\n|---|---|---|\n| Ogni 2 settimane | 1 contenuto sorgente (bozza) declinato su audio/video/grafiche/social | Materia prima + approvazione + stories |\n| Settimanale | Programmazione e analisi social su Metricool | Risponde alle richieste delle coppie personalmente |\n| Mensile | Report (GSC/GA4/Clarity) + test citazioni AI + 1 submission editoriale | Chiede 1–3 recensioni; cura 1–2 relazioni B2B; 1 risposta su Source of Sources |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-d7', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-ndh', type: 'subheading', content: 'Cose che DEVE fare Antonio in prima persona (non delegabili)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-nd-t', type: 'text', content: 'Queste non puoi farle tu al posto suo, perché toccano autenticità e relazioni:\n\n1. Chiedere le recensioni alle coppie (la richiesta da lui converte; mai scriverle tu).\n2. Approvare la voce del brand e i contenuti personali (è la sua voce).\n3. Coltivare planner e venue di lusso (le relazioni B2B sono personali).\n4. Rispondere alle richieste delle coppie ("ti guido personalmente" è una promessa del brand).\n5. Registrare il podcast con la sua voce e pubblicare le stories dal vivo.\n6. Scegliere i partner da creditare (selettività = suo gusto e suo brand).\n7. Decidere le spese (upgrade Pixieset) e concedere gli accessi.\n\nTutto il resto — tecnica, setup, ricerca, scrittura delle bozze, strumenti, programmazione, monitoraggio — lo gestisci tu.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-d8', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-comeh', type: 'subheading', content: 'Come lavorare insieme (per non incepparsi)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'po-come-t', type: 'text', content: '• Un punto di raccolta materiali: una cartella condivisa (Drive) dove Antonio carica foto, storie e liste fornitori di ogni matrimonio. È il collo di bottiglia tipico: rendilo facilissimo.\n• Approvazioni rapide: ogni bozza ha uno stato chiaro (da approvare / approvata). Tieni i giri di revisione brevi.\n• La dashboard come centro di controllo: le card del kanban e la todolist riflettono esattamente questa divisione — assegna mentalmente ogni card a "tu" o "Antonio".\n• Check mensile di 30 minuti: gli mostri il report, decidete insieme le 3 priorità del mese successivo.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
]

const defaultReciprocitaBlocks: Block[] = [
  { id: 'rc-h', type: 'heading', content: 'Motore di reciprocità con i partner — playbook completo', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-intro', type: 'text', content: 'Cliente: Antonio Pileggi — fotografo di matrimoni destination (Maida, Calabria)\nCos\'è: trasformare i crediti ai fornitori negli articoli (real wedding e guide) in un motore di reciprocità che porta traffico, backlink, autorità locale/AEO e relazioni B2B. Non un elenco di link a senso unico.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-1h', type: 'subheading', content: '1. Il principio (perché funziona così)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-1a', type: 'text', content: 'Inserire partner negli articoli non porta flusso direttamente nel sito: i link verso i fornitori mandano traffico fuori. Ciò che porta flusso dentro è la reciprocità: quando crediti e linki una venue o una planner, loro condividono il contenuto con il loro pubblico e — soprattutto — linkano a loro volta il tuo post o la tua home dalla loro pagina "fornitori consigliati / as featured". Sono quel link di ritorno e quella condivisione a portare traffico. Quindi va progettato come uno scambio.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-1b', type: 'text', content: 'Per Antonio ha tre ritorni in uno:\n• Traffico e backlink reali. Il real wedding con il "team fornitori" creditato è il formato classico: ognuno tende a ricondividere e a linkare. È il cross-linking con i fornitori, con il contenuto come veicolo.\n• SEO e AEO locali. Comparire insieme a venue e planner specifici crea un grappolo di siti locali a tema che si linkano in modo naturale: rafforza l\'autorità territoriale e fa sì che le AI lo associno a quei luoghi ("fotografo che lavora con [venue X]" → lo citano).\n• Relazioni B2B di fascia alta. Per i matrimoni di lusso i clienti arrivano da planner e venue: dare loro visibilità è il modo più elegante per coltivare quelle relazioni, che valgono molto più del singolo clic.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-2h', type: 'subheading', content: '2. Il loop (come gira, in 6 passi)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-2a', type: 'text', content: '1. Antonio fotografa un matrimonio in una venue, con un team fornitori.\n2. Tu pubblichi il real wedding (IT/EN) sul sito, creditando e linkando ogni fornitore.\n3. Tu prepari il feature kit (§5) e lo passi ad Antonio.\n4. Antonio invia il kit a venue e planner, con il messaggio di accompagnamento (§4).\n5. I partner ricambiano: condividono il post e/o aggiungono Antonio tra i fornitori consigliati con un link.\n6. Tu misuri (UTM + GA4 + Clarity, §7) quali partner portano davvero flusso, e si concentra l\'energia su quelli.\n\nIl loop si ripete a ogni matrimonio significativo. Col tempo si forma una rete stabile di siti autorevoli che linkano Antonio.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-3h', type: 'subheading', content: '3. Chi creditare e come sceglierli', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-31h', type: 'subheading', content: '3.1 Il "team fornitori" tipico da creditare in un real wedding', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-31a', type: 'text', content: 'Venue/location, wedding planner, fiorista, catering, abito (atelier/stilista), make-up & hair, musica/band/DJ, pasticceria/cake design, noleggio/allestimenti, eventuale agenzia di destination management. Per ciascuno: nome + link al sito + handle social da taggare.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-32h', type: 'subheading', content: '3.2 Criteri di selettività (proteggere un brand premium)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-32a', type: 'text', content: '• Solo fornitori reali di quel matrimonio (o consigli genuini in una guida). Mai posizionamenti casuali o a pagamento mascherati: un blog che sembra una bacheca di link diluisce il posizionamento e, per Google, profuma di spam.\n• Prestigio prima della quantità. Un brand di lusso guadagna a farsi associare a partner di livello. Essere selettivo protegge l\'immagine.\n• Priorità a chi ricambia. Dopo i primi cicli, dai più visibilità ai partner che hanno effettivamente condiviso/linkato (lo vedi dal tracker, §8). Una citazione a chi non ricambia mai è solo traffico regalato.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-4h', type: 'subheading', content: '4. I messaggi di accompagnamento (script pronti, IT + EN)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-4intro', type: 'text', content: 'Li prepari tu, li invia Antonio (la relazione è personale). Personalizzare sempre nome, venue e coppia.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-4ah', type: 'subheading', content: 'Script A — Dopo un matrimonio, al partner con cui hai appena lavorato (caldo)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-4a-it', type: 'text', content: 'IT:\nOggetto: La storia del matrimonio di [Coppia] a [Venue] — e un kit per voi\n\nCiao [Nome],\nè stato un piacere raccontare il matrimonio di [Coppia] da voi a [Venue]. Ho pubblicato la storia completa sul mio sito e vi ho creditati con piacere: [LINK-POST-UTM].\nVi lascio qui sotto un piccolo feature kit con alcune immagini che potete usare (citando "Foto: Antonio Pileggi" e con link al mio sito) se voleste condividerle o inserirle tra i vostri lavori.\nSe vi fa piacere, mi piacerebbe essere inserito tra i fotografi consigliati nella vostra pagina fornitori — ecco il link da usare: [LINK-HOME-UTM].\nA presto, e grazie per la bella collaborazione,\nAntonio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-4a-en', type: 'text', content: 'EN:\nSubject: [Couple]\'s wedding story at [Venue] — and a kit for you\n\nHi [Name],\nit was a pleasure to tell [Couple]\'s wedding at [Venue]. I\'ve published the full story on my site and was glad to credit you: [POST-LINK-UTM].\nBelow is a small feature kit with a few images you\'re welcome to use (crediting "Photo: Antonio Pileggi" and linking my site) if you\'d like to share them or add them to your work.\nIf you\'re happy to, I\'d love to be listed among your recommended photographers on your suppliers page — here\'s the link to use: [HOME-LINK-UTM].\nTalk soon, and thank you for the lovely collaboration,\nAntonio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-4bh', type: 'subheading', content: 'Script B — Verso una venue/planner con cui vorrebbe lavorare (presentazione)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-4b-it', type: 'text', content: 'IT:\nOggetto: Fotografo di matrimoni in [zona] — una collaborazione possibile\n\nCiao [Nome],\nseguo da tempo [Venue/Studio] e l\'eleganza dei vostri eventi. Sono Antonio Pileggi, fotografo di matrimoni destination in Sud Italia: lavoro su digitale, pellicola 35mm e VHS, con un\'attenzione all\'atmosfera e al senso del luogo.\nVi lascio il mio portfolio: [LINK-HOME-UTM]. Mi farebbe piacere essere preso in considerazione tra i fotografi consigliati per le coppie che si sposano da voi, e ricambierei volentieri con visibilità sui miei canali.\nUn caro saluto,\nAntonio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-4b-en', type: 'text', content: 'EN:\nSubject: Wedding photographer in [area] — a possible collaboration\n\nHi [Name],\nI\'ve long admired [Venue/Studio] and the elegance of your events. I\'m Antonio Pileggi, a destination wedding photographer in Southern Italy: I work on digital, 35mm film and VHS, with a focus on atmosphere and sense of place.\nHere\'s my portfolio: [HOME-LINK-UTM]. I\'d be glad to be considered among the recommended photographers for couples marrying with you — and I\'d happily reciprocate with visibility across my channels.\nWarm regards,\nAntonio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-5h', type: 'subheading', content: '5. Il "feature kit" (cosa contiene, pronto da inviare)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-5a', type: 'text', content: 'Un pacchetto che rende facilissimo al partner condividere e linkare. Preparalo come cartella condivisa (Drive) o PDF leggero, uno per matrimonio.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-5b', type: 'text', content: '1. Blurb pronto da incollare (descrizione breve di Antonio):\n   • IT: «Foto: Antonio Pileggi — fotografo di matrimoni destination (film, digitale, VHS), Sud Italia — antoniopileggi.com»\n   • EN: «Photo: Antonio Pileggi — destination wedding photographer (film, digital, VHS), Southern Italy — antoniopileggi.com»\n2. 3–5 immagini selezionate del matrimonio (ad alta qualità, già pronte per il web), in cui il partner è protagonista (la venue inquadrata, gli allestimenti del fiorista, ecc.).\n3. Condizioni d\'uso (chiare e semplici):\n   • «Le immagini possono essere usate per scopi editoriali e social citando "Foto: Antonio Pileggi" e con link a antoniopileggi.com. Si prega di non modificare o ritagliare le immagini.»\n4. Il link da usare (con UTM, §7) e l\'anchor text suggerito:\n   • Anchor consigliati (naturali, non forzati): "Antonio Pileggi", "fotografo: Antonio Pileggi", "fotografo di matrimoni Antonio Pileggi". Evitare anchor a parola chiave esatta tipo "fotografo matrimonio Calabria" ripetuti (innaturali agli occhi di Google).\n   • Link al post specifico del real wedding se inseriscono i crediti di quel matrimonio; alla home se è la pagina "fornitori consigliati".\n5. Handle social da taggare: Instagram @pileggiantonio (Facebook /pileggiantonio). «Se condividete, taggatemi così posso ricondividere.»\n6. La richiesta esplicita: «Se vi va, aggiungetemi tra i fotografi consigliati con questo link.»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-6h', type: 'subheading', content: '6. I due formati di contenuto che alimentano il motore', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-6a', type: 'text', content: '• Real wedding con team fornitori (il più potente): una pagina per matrimonio, con il blocco crediti in fondo che linka ogni fornitore. È il formato a più alta reciprocità.\n• Guide-location che raccomandano davvero le venue migliori: consigli genuini (le venue che conosce e stima) dentro guide tipo "Dove sposarsi in Costa degli Dei". Le venue citate amano essere raccomandate → condividono e linkano.\n\nIn entrambi: i link sono editoriali e pertinenti, mai a pagamento mascherati.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-7h', type: 'subheading', content: '7. Igiene tecnica e misurazione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-7a', type: 'text', content: 'Attributi dei link (sul tuo sito, verso i partner):\n• Crediti editoriali = link normali (dofollow). È il comportamento corretto e atteso.\n• Se un giorno nascesse un accordo a pagamento, quel link va marcato rel="sponsored" (onestà + nessuna penalizzazione Google).\n• Niente link di affiliazione a prodotti: cheapizzano un brand di questo livello.\n• Non chiedere ai partner anchor text innaturali o schemi di scambio massivi A↔B: i link devono restare crediti genuini, o scattano i segnali da "link scheme".', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-7b', type: 'text', content: 'UTM (per misurare il ritorno): chiedi ai partner di usare il link con questi parametri, così in GA4 vedi esattamente chi ti manda traffico.\n• Pattern home: https://www.antoniopileggi.com/?utm_source=[partner-slug]&utm_medium=referral&utm_campaign=vendor-feature\n• Pattern post: https://www.antoniopileggi.com/[slug-post]/?utm_source=[partner-slug]&utm_medium=referral&utm_campaign=vendor-feature\n• [partner-slug] = nome partner in minuscolo senza spazi (es. villa-rosa, planner-bianco).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-7c', type: 'text', content: 'Cosa guardare (mensile):\n• GA4 → Acquisizione → traffico referral e campagne vendor-feature: quali partner portano sessioni.\n• Microsoft Clarity: cosa fanno quegli utenti una volta arrivati (vanno a Contact?).\n• Backlink: in Ahrefs Webmaster Tools / Search Console, controlla che i link di ritorno compaiano.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-8h', type: 'subheading', content: '8. Tracker partner (chi ricambia davvero)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-8a', type: 'text', content: 'Un foglio semplice (Google Sheets). Aggiorna a ogni feature. Serve a dare più visibilità a chi ricambia e a smettere di regalare traffico a chi non lo fa.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-8tab', type: 'text', content: '| Partner | Tipo | Matrimonio / Contenuto | Li hai creditati? | Hanno ricambiato (link)? | Hanno condiviso? | URL del loro link | Traffico (GA4) | Priorità |\n|---|---|---|---|---|---|---|---|---|\n|  | venue/planner/… |  | Sì | Sì/No | Sì/No |  |  | Alta/Media/Bassa |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-8b', type: 'text', content: 'Regola: dopo 2–3 cicli, i partner che non ricambiano mai scendono in "Bassa" priorità; quelli che ricambiano e portano traffico salgono in "Alta" e ricevono più feature e collaborazioni.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-9h', type: 'subheading', content: '9. Divisione del lavoro (tu / Antonio)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-9tab', type: 'text', content: '| Attività | Tu (consulente) | Antonio |\n|---|---|---|\n| Blocco crediti negli articoli | Inserisci nomi, link e UTM | Fornisce la lista fornitori corretta del matrimonio |\n| Feature kit | Lo prepari (immagini selezionate, blurb, link, condizioni) | Conferma quali immagini sono condivisibili |\n| Messaggi ai partner | Scrivi le bozze (Script A/B) | Li invia e cura la relazione (è personale) |\n| Selezione partner | Proponi | Decide (selettività = suo gusto/brand) |\n| Misurazione | Imposti UTM, leggi GA4/Clarity, aggiorni il tracker | Riceve il quadro e decide su chi puntare |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-10h', type: 'subheading', content: '10. Da aggiungere alla dashboard', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-10a', type: 'text', content: 'Nuovo gruppo todolist "10 · Motore di reciprocità partner":\n• Definire il blocco "team fornitori" standard per i real wedding.\n• Creare il template del feature kit (cartella Drive + PDF).\n• Impostare la convenzione UTM vendor-feature.\n• Creare il tracker partner (Google Sheets).\n• Per ogni real wedding pubblicato: creditare i fornitori + inviare il feature kit.\n• Chiedere a venue/planner l\'inserimento tra i fornitori consigliati.\n• Check mensile del traffico referral e aggiornamento priorità partner.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-10b', type: 'text', content: 'Nuove card kanban (Fase 3–4, owner indicato):\n• "Creare il feature kit standard" (Tu)\n• "Inviare il feature kit ai fornitori dell\'ultimo matrimonio" (Antonio)\n• "Impostare tracker partner + UTM" (Tu)\n• "Richiedere inserimento tra i fornitori consigliati a [venue]" (Antonio)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'rc-10sint', type: 'text', content: 'In sintesi: Sì, fallo — ma come motore di reciprocità (io ti credito e ti do visibilità, tu mi linki e mi condividi), curato e selettivo, non come un modo per riempire gli articoli di link. Il formato che rende di più è il real wedding con il team fornitori; subito dopo, le guide-location che raccomandano davvero le venue migliori. La differenza tra "regalare traffico" e "guadagnarlo" sta tutta in due cose: il feature kit che rende facile ricambiare, e il tracker che ti dice su chi puntare.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
]

const defaultCoworkBlocks: Block[] = [
  { id: 'cw-h', type: 'heading', content: 'Piano operativo con Claude Cowork — Chi fa cosa (Cowork · Tu · Antonio)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-ob', type: 'text', content: 'Obiettivo: la stessa strategia del "Piano operativo a due", ma con Claude Cowork come esecutore del lavoro operativo. Cowork assorbe gran parte della tua colonna di consulente (ricerca, bozze, organizzazione, report): tu passi da "esecutore" a regista che imposta gli obiettivi, controlla e approva. I compiti di Antonio restano invariati.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-cosa', type: 'subheading', content: "Cos'è Claude Cowork e cosa cambia", done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-cosa-t', type: 'text', content: "Claude Cowork è l'app desktop agentica di Anthropic per il lavoro di conoscenza (stessa architettura di Claude Code, ma senza terminale). Gli dai accesso a una cartella del tuo computer e lui può leggere, modificare e creare file lì dentro; usa connettori (Google Drive, Gmail e altri) e, con Claude in Chrome, svolge anche compiti nel browser. Esegue attività multi-step in autonomia (organizzare file, redigere bozze, creare documenti/fogli/slide, compilare report) e supporta task programmati a cadenza fissa. È disponibile sui piani a pagamento (Pro, Team, Enterprise) — verifica piano e disponibilità su claude.com.", done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-cosa-b', type: 'text', content: "Il modello a tre livelli:\n• Claude Cowork = l'esecutore. Fa il lavoro ripetibile e di assemblaggio: ricerca, bozze, organizzazione, report, prime stesure di schema/FAQ/calendari.\n• Tu = il regista. Imposti gli obiettivi e i permessi, controlli e approvi ogni output, tieni il giudizio strategico e di gusto, e gestisci ciò che è sensibile (login, pubblicazione, invio).\n• Antonio = il cliente. Gli stessi non-delegabili di prima: materia prima, voce del brand, recensioni, relazioni B2B, approvazioni, accessi e spese.\n\n> Cowork gira sul tuo computer, con le tue cartelle e i tuoi connettori: è il moltiplicatore della tua parte, non un sostituto della relazione con Antonio.", done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-setup', type: 'subheading', content: 'Setup iniziale (una volta)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-setup-t', type: 'text', content: "1. Attiva Cowork nell'app desktop (Pro/Team/Enterprise).\n2. Crea la cartella di lavoro (es. su Google Drive, sincronizzata) con questa struttura e dai a Cowork l'accesso solo a questa:\n   • 00-materia-prima/ (foto, storie, liste fornitori che carica Antonio)\n   • 01-ricerca/ (keyword, domande, trend)\n   • 02-bozze/ (contenuti in lavorazione)\n   • 03-output/ (versioni approvate da pubblicare: FAQ, schema, articoli)\n   • 04-report/ (report mensili)\n   • 05-tracker/ (recensioni, partner, citazioni AI)\n3. Connettori: Google Drive (cartella di lavoro), Search Console/GA4 dove possibile, e Claude in Chrome per i compiti web. Gmail solo se serve, con cautela.\n4. Permessi minimi: dai accesso solo alla cartella di lavoro e ai connettori necessari. Niente cartelle personali, niente credenziali.", done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d3', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-regole', type: 'subheading', content: 'Le tre regole di delega', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-regole-t', type: 'text', content: "• Delegabile a Cowork: lavoro ripetibile e multi-step — ricerca e sintesi, organizzazione file, prime bozze, generazione di FAQ/schema/calendari/report, compilazione tracker.\n• Mai a Cowork senza la tua approvazione (gate umano): pubblicare sul sito/social, inviare messaggi a coppie o partner, inviare/compilare form, inserire credenziali o dati di pagamento, scrivere recensioni. Cowork prepara la bozza; la pubblicazione/invio la fai tu dopo revisione.\n• Solo umano: giudizio strategico e di gusto (tu), voce del brand e relazioni (Antonio).", done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d4', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f0h', type: 'subheading', content: 'Fase 0 — Avvio (materia prima e accessi)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f0tab', type: 'text', content: '| Attività | Claude Cowork | Tu (regista) | Antonio |\n|---|---|---|---|\n| Raccolta materiali | Organizza 00-materia-prima: crea sottocartelle per matrimonio, rinomina le foto, segnala cosa manca (storia, fornitori, consenso) | Imposti la struttura e i permessi | Carica foto, storie, liste fornitori, consensi |\n| Accessi | — | Configuri connettori e accessi (gestore/utente) | Concede accessi (GBP, GSC/GA4, Pixieset, social) |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f0prompt', type: 'text', content: 'Prompt Cowork: «Organizza la cartella 00-materia-prima. Per ogni matrimonio crea una sottocartella, rinomina le foto in modo coerente e scrivi un file da-completare.md che elenca cosa manca tra: storia del giorno, lista fornitori con link, consenso della coppia. Non toccare altre cartelle.»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d5', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f1h', type: 'subheading', content: 'Fase 1 (Settimane 1–2) — Fondamenta tecniche', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f1tab', type: 'text', content: '| Passo | Claude Cowork | Tu (regista) | Antonio |\n|---|---|---|---|\n| Schema JSON-LD | Genera i blocchi ProfessionalService e FAQPage in 03-output | Li validi col Rich Results Test e li incolli nell\'header Pixieset | — |\n| Google Business Profile | Redige descrizione IT/EN e una bozza di primo post | Riveda e pubblichi | Conferma le info; rivendica la scheda |\n| Setup tecnico | — | Colleghi Search Console, GA4, Microsoft Clarity (codice header) | Dà accesso |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f1prompt', type: 'text', content: 'Prompt Cowork: «In 03-output, genera il JSON-LD ProfessionalService per Antonio Pileggi (dati in 00-materia-prima/brand.md) e un JSON-LD FAQPage dalle FAQ in 01-ricerca/faq.md. Salva due file separati. Non pubblicare.»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d6', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f2h', type: 'subheading', content: 'Fase 2 (Settimane 3–4) — Entità e fiducia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f2tab', type: 'text', content: '| Passo | Claude Cowork | Tu (regista) | Antonio |\n|---|---|---|---|\n| Coerenza entità | Prepara un foglio con bio boilerplate IT/EN e lo stato dei 9 profili (cosa allineare) | Controlli e aggiorni i profili | Approva il testo |\n| FAQ IT/EN | Scrive le bozze delle FAQ in 02-bozze | Rifinisci e pubblichi | Approva le risposte |\n| Recensioni | Redige i template di richiesta IT/EN e imposta il 05-tracker/recensioni.csv | Imposti il link breve nel flusso gallery | Chiede la recensione alle coppie e risponde con la sua voce |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f2note', type: 'text', content: '> Le recensioni restano autentiche e scritte dalle coppie: Cowork prepara il messaggio, Antonio lo invia. Mai farle scrivere a Cowork.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d7', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f3h', type: 'subheading', content: 'Fase 3 (Settimane 5–8) — Contenuti, strumenti AI e partner', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f3tab', type: 'text', content: '| Passo | Claude Cowork | Tu (regista) | Antonio |\n|---|---|---|---|\n| Ricerca | Con Claude in Chrome raccoglie spunti da Google Trends/AlsoAsked e li sintetizza in 01-ricerca | Scegli i temi prioritari | — |\n| Real wedding (Tropea, Puglia) | Scrive la bozza IT/EN dai materiali, con blocco crediti fornitori e meta SEO | Rifinisci, controlli il tono, pubblichi | Fornisce foto/storia/fornitori; approva |\n| Guida location + pagina VHS | Bozza IT/EN | Rifinisci e pubblichi | Aggiunge il punto di vista; approva |\n| Strumenti AI | Prepara la scaletta del podcast (stile NotebookLM) e i testi per le grafiche (Pomelli/Canva) | Coordini Pomelli/Flow/NotebookLM | Registra il podcast con la sua voce; approva grafiche/teaser |\n| Social sistematici | Compila il calendario e prepara le bozze dei post in 02-bozze | Carichi/programmi su Metricool dopo revisione | Gira i contenuti reali; pubblica le stories |\n| Partner/reciprocità | Assembla il feature kit (cartella con immagini, blurb, link UTM) e redige gli script di outreach | Riveda e imposti gli UTM | Sceglie i partner e invia i messaggi |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f3prompt', type: 'text', content: 'Prompt Cowork: «In 02-bozze, scrivi un real wedding in italiano e in inglese usando foto e appunti in 00-materia-prima/tropea. Struttura: titolo ottimizzato, racconto 500–700 parole nel tono del brand (brand.md), e un blocco "Team fornitori" con i nomi e i link da fornitori.csv. Aggiungi meta title e description. Salva due file .md. Non pubblicare.»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d8', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f4h', type: 'subheading', content: 'Fase 4 (Settimane 9–12) — Ritmo e misura', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-f4tab', type: 'text', content: '| Passo | Claude Cowork | Tu (regista) | Antonio |\n|---|---|---|---|\n| Ritmo editoriale | Genera le bozze a cadenza (vedi task programmati) | Approvi e pubblichi | Materia prima + approvazione + stories |\n| Testimonianze sul sito | Bozza con schema Review dalle recensioni raccolte | Pubblichi | Raccoglie il consenso |\n| Monitoraggio | Compila il report (GSC/GA4/Clarity) e aggiorna il tracker citazioni AI | Leggi e decidi le priorità | Riceve il report |\n| Relazioni B2B | Redige le bozze di outreach LinkedIn | Riveda | Coltiva di persona planner e venue |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d9', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-taskprog', type: 'subheading', content: 'Task programmati di Cowork (imposti una volta, girano da soli)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-taskprog-note', type: 'text', content: '> Definisci la cadenza; Cowork esegue e ti avvisa. Output sempre in bozza/report da approvare, mai pubblicazione automatica.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-taskprog-t', type: 'text', content: '• Report mensile (primo lunedì del mese): «Compila 04-report/report-AAAA-MM.md: prendi i dati da Search Console e GA4, riassumi query, traffico, conversioni verso Contact e il traffico referral dei partner (campagna vendor-feature); elenca i 3 spunti principali.»\n• Prep social settimanale (venerdì): «Prepara in 02-bozze/social-settimana.md le bozze dei post della settimana seguendo il calendario, con caption IT/EN. Non pubblicare.»\n• Materia prima (settimanale): «Controlla 00-materia-prima e segnala i matrimoni con materiali incompleti.»\n• Monitoraggio citazioni AI (mensile, con Claude in Chrome): «Esegui le domande in 05-tracker/protocollo.md su Gemini e Perplexity, registra se Antonio è citato, posizione, sentiment e fonti, e aggiorna 05-tracker/citazioni.csv.» (Caveat: alcuni motori applicano limiti anti-bot; usalo come supporto alla compilazione, con controllo umano.)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d10', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-guardrail', type: 'subheading', content: 'Guardrail e privacy (riepilogo)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-guardrail-t', type: 'text', content: '• Gate umano prima di: pubblicare, inviare messaggi, compilare/inviare form. Cowork si ferma alla bozza.\n• Niente credenziali né dati di pagamento dentro Cowork: usa connettori (OAuth) e accessi come gestore/utente.\n• Scoping cartelle: accesso alla sola cartella di lavoro.\n• Recensioni autentiche: Cowork redige la richiesta, non la recensione; l\'invio è di Antonio.\n• Account di Antonio: accedi tramite condivisione (gestore/utente), non dando le sue password a Cowork.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d11', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-umano', type: 'subheading', content: 'Cosa resta umano (non delegabile)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-umano-t', type: 'text', content: 'Antonio: chiedere le recensioni, approvare voce e contenuti personali, coltivare planner/venue, rispondere alle coppie, registrare il podcast e le stories, scegliere i partner, decidere le spese e concedere gli accessi.\n\nTu: impostare obiettivi e permessi di Cowork, il giudizio strategico e di gusto, la revisione e approvazione di ogni output, e la pubblicazione/invio finale.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-d12', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-dash', type: 'subheading', content: 'Come si collega alla dashboard', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'cw-dash-t', type: 'text', content: 'Sulla dashboard puoi aggiungere a ogni card un campo owner con tre valori invece di due: Cowork, Tu, Antonio. Così il kanban mostra a colpo d\'occhio cosa è delegato all\'agente, cosa aspetta la tua revisione e cosa dipende da Antonio. Le card "Cowork" che richiedono approvazione passano in "In corso" finché non le validi tu, poi in "Fatto".', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
]

const defaultPostitBlocks: Block[] = [
  { id: 'pt-h', type: 'heading', content: 'Post-it — idee, promemoria e note veloci', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-intro', type: 'text', content: 'Usa i Post-it per appunti veloci, idee da condividere, promemoria di squadra. Aggiungine di nuovi con il bottone "+ Post-it" o scrivendo "/" in un blocco.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-note1', type: 'sticky', content: '🎯 Prossimo traguardo: 30 recensioni Google entro 3 mesi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'yellow' },
  { id: 'pt-note2', type: 'sticky', content: '📸 Chiedere ad Antonio le foto del matrimonio Tropea per il prossimo real wedding', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'pink' },
  { id: 'pt-note3', type: 'sticky', content: '🔍 Verificare citazioni AI su Gemini e Perplexity — protocollo AEO', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'blue' },
  { id: 'pt-note4', type: 'sticky', content: '🤝 Contattare Villa Rosa per reciprocità link — preparare feature kit', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'green' },
  { id: 'pt-note5', type: 'sticky', content: '📝 Scrivere guida "Dove sposarsi in Costa degli Dei" — bozza IT/EN', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'purple' },
  { id: 'pt-note6', type: 'sticky', content: '🎬 Preparare scaletta episodio pilota NotebookLM + registro podcast', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'orange' },
  { id: 'pt-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-team', type: 'subheading', content: '💬 Spazio team — note e aggiornamenti condivisi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-team1', type: 'sticky', content: '👤 Antonio: la prossima settimana carico le foto del matrimonio in Puglia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'blue' },
  { id: 'pt-team2', type: 'sticky', content: '👤 Consulente: monitoraggio AEO completato — visibility score migliorato del 15%', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'green' },
  { id: 'pt-team3', type: 'sticky', content: '👤 Cowork: report mensile pronto in 04-report/report-2026-06.md — da revisionare', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'purple' },
]

const defaultGuidaBlocks: Block[] = [
  { id: 'gd-h', type: 'heading', content: 'Guida di avvio — Claude Desktop + Cowork per Antonio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-intro', type: 'text', content: 'Una guida passo-passo per installare Claude sul computer, prepararlo a lavorare al tuo fianco e partire subito. Niente termini tecnici: dove serve, te lo spiego in parole semplici.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-cosa', type: 'subheading', content: 'Cosa stai installando (in due righe)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-cosa-t', type: 'text', content: 'Claude Desktop è l\'app di Claude che vive sul tuo computer. Ha due modalità nella stessa finestra:\n• Chat — fai domande, chiedi bozze veloci, ragioni insieme a Claude.\n• Cowork — dai a Claude un obiettivo e lui lavora da solo sui file della cartella che gli indichi (organizza, scrive bozze, prepara report) e poi ti riporta il risultato.\n\nServe un piano a pagamento. Cowork non è disponibile nel piano gratuito: il piano Pro (~20 $/mese) è sufficiente per iniziare.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p1h', type: 'subheading', content: 'Parte 1 — Installazione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p1mac', type: 'subheading', content: 'Su Mac', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p1mac-t', type: 'text', content: '1. Vai su claude.com/download e scarica l\'app per macOS.\n2. Apri il file scaricato e trascina Claude nelle Applicazioni.\n3. Avvia Claude, accedi con il tuo account (anche con Google) e attiva il piano Pro.\n4. In alto nella finestra vedrai le modalità: la Chat è quella di default; per Cowork clicca la scheda Cowork.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p1win', type: 'subheading', content: 'Su Windows', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p1win-t', type: 'text', content: '1. Prima, un controllo: dalla pagina di supporto di Cowork puoi scaricare un piccolo programma che verifica se il tuo PC è pronto ("Cowork readiness check"). Se dice "This computer is ready for Cowork", prosegui.\n2. Vai su claude.com/download e scarica l\'installer per Windows. Eseguilo.\n3. Nota tecnica: su Windows Cowork gira dentro una piccola "macchina virtuale" isolata. Per questo serve avere i privilegi di amministratore sul PC e, al primo avvio, Cowork scarica un file di sistema da circa 2 GB (una volta sola — serve connessione internet). È normale.\n4. Avvia Claude dal menu Start, accedi e attiva il piano Pro.\n5. In alto, clicca la scheda Cowork per passare dalla Chat alla modalità di lavoro.\n\n> Se al click su Cowork ti chiede di fare l\'upgrade, vuol dire che il piano a pagamento non è ancora attivo.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d3', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p2h', type: 'subheading', content: 'Parte 2 — Prepara la "scrivania" (la cartella di lavoro)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p2-t', type: 'text', content: 'Cowork lavora dentro una cartella che gli indichi tu, e non può toccare nient\'altro sul computer se non glielo permetti. Quindi prima creiamo la sua scrivania.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p2-t2', type: 'text', content: '1. Crea una cartella, per esempio Claude-Lavoro, con queste sottocartelle:\n   • 00-materia-prima (foto, storie dei matrimoni, liste fornitori)\n   • 01-ricerca (idee, parole chiave, domande)\n   • 02-bozze (contenuti in lavorazione)\n   • 03-output (versioni approvate, pronte da pubblicare)\n   • 04-report (i report mensili)\n   • 05-tracker (recensioni, partner, monitoraggio)\n2. In Cowork, quando te lo chiede, dai accesso solo a questa cartella.\n3. Consiglio pratico: invece di dare a Claude accesso a tutto il computer, copia dentro questa cartella i file su cui vuoi che lavori. Più ordinato e più sicuro.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d4', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p3h', type: 'subheading', content: 'Parte 3 — Collega gli strumenti (connettori)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p3-t', type: 'text', content: 'In Cowork, nella barra a sinistra, apri Customize → Connectors e collega solo ciò che usi davvero (sono gratuiti e si autorizzano una volta sola):\n• Google Drive — i tuoi file e documenti.\n• Google Calendar — per pianificare contenuti e shooting.\n• Claude in Chrome — per le ricerche sul web.\n• (Facoltativi) Notion se vuoi un quaderno digitale, Canva per la grafica.\n\nRegola: collega il minimo indispensabile e ricorda che puoi revocare l\'accesso quando vuoi.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d5', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p4h', type: 'subheading', content: 'Parte 4 — "Dai in pasto" il contesto per iniziare a lavorare', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p4-intro', type: 'text', content: 'Questo è il passaggio che fa la differenza: prima di chiedere qualunque cosa, dai a Claude il contesto del tuo brand. Lo fai in due posti, uno per modalità.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p4a', type: 'subheading', content: 'A) Nella CHAT — crea un "Progetto"', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p4a-t', type: 'text', content: '1. Nella Chat, crea un Progetto chiamato "Antonio Pileggi — Brand & Strategia".\n2. Incolla queste istruzioni del progetto (così ogni risposta esce già nel tuo tono):\n\n> Sei l\'assistente di Antonio Pileggi, fotografo di matrimoni destination con base a Maida (Calabria). Racconto matrimoni su digitale, pellicola 35mm e VHS in Sud Italia e in tutta Italia, per coppie italiane e internazionali. Tono: sobrio, sensoriale, anti-trend; parole chiave atmosfera, famiglia, memoria, senso del luogo; prima persona, frasi brevi, niente superlativi di marketing. Scrivi in italiano o in inglese secondo la richiesta. Non pubblicare né inviare nulla: fermati sempre alla bozza. Le recensioni le scrivono le coppie, non tu.\n\n3. Carica nel Progetto i documenti chiave della strategia (i .md che hai già): strategia, FAQ, protocollo domande AI, motore reciprocità. Così la Chat risponde sapendo tutto.\n4. Usa la Chat per: domande, idee, bozze veloci, caption, brainstorming.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p4b', type: 'subheading', content: 'B) In COWORK — il file di contesto + la materia prima', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p4b-t', type: 'text', content: '1. Nella cartella 00-materia-prima, crea un file di testo CONTESTO.md e incolla questo (Cowork lo leggerà come riferimento):\n\n> CONTESTO — Antonio Pileggi (leggi prima di ogni lavoro)\n> Chi sono: fotografo di matrimoni destination, base a Maida (Catanzaro, Calabria). Digitale, pellicola 35mm, VHS. Lavoro in Calabria, Sicilia, Puglia, Toscana e in tutta Italia, con coppie italiane e internazionali.\n> Voce del brand: sobria, sensoriale, anti-trend. Parole: atmosfera, famiglia, memoria, senso del luogo. Prima persona, frasi brevi, niente superlativi. Racconto come è stato vissuto il giorno. Scrivo in IT ed EN.\n> Regole d\'oro: 1) Autenticità: non inventare foto o matrimoni, non spacciare contenuti AI per lavoro reale. 2) Non pubblicare, non inviare email/messaggi, non compilare form, non spendere senza la mia approvazione: fermati alla bozza. 3) Mai inserire password o dati di pagamento. 4) Le recensioni le scrivono le coppie: tu prepari solo il messaggio di richiesta.\n> Dove sono le cose: 00-materia-prima (foto/storie/fornitori) · 01-ricerca · 02-bozze · 03-output · 04-report · 05-tracker.\n> Contatti: +39 327 9287 726 · IG @pileggiantonio · antoniopileggi.com\n\n2. Carica nelle sottocartelle la materia prima: per i primi matrimoni, foto + una breve storia + la lista fornitori (con i link).\n3. Quando dai un compito a Cowork, comincia ricordandogli: "Leggi prima 00-materia-prima/CONTESTO.md, poi…".', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d6', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p5h', type: 'subheading', content: 'Parte 5 — Skills utili (le "competenze" di Claude)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p5-t', type: 'text', content: 'Le skill sono competenze riutilizzabili che rendono i risultati più costanti. Si gestiscono da Customize → Skills.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p5-t2', type: 'text', content: 'Già pronte (funzionano da sole): le skill per creare documenti — Word, PowerPoint, PDF, Excel. Utilissime per produrre, partendo dalle tue note: una brochure o un listino in PDF, una proposta/preventivo elegante, un contratto base, un foglio per il tracker recensioni/partner.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p5-t3', type: 'text', content: 'Da creare su misura (con lo "Skill Creator", già installato nell\'app): apri lo Skill Creator e rispondi alle domande; ti genera la skill. Tre skill che vale la pena creare per te:\n1. "Voce del brand Antonio Pileggi" — racchiude tono, parole sì/no, lunghezza frasi. Così ogni testo esce già nel tuo stile.\n2. "Template Real Wedding" — la struttura fissa dell\'articolo (titolo SEO, racconto 500–700 parole, blocco crediti fornitori) in IT ed EN.\n3. "Template recensioni e partner" — i messaggi di richiesta recensione e il feature kit per venue/planner, pronti da personalizzare.\n\nLe skill che attivi sono disponibili sia in Chat sia in Cowork (e anche nei componenti aggiuntivi per Excel, PowerPoint e Word). Nota: alcune skill avanzate caricate come file richiedono un piano a pagamento con l\'esecuzione di codice attiva — ma per le tue tre skill sopra basta lo Skill Creator.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d7', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p6h', type: 'subheading', content: 'Parte 6 — Il tuo primo giorno (3 prove per partire)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-p6-t', type: 'text', content: '1. In Chat (riscaldamento): «Spiegami in 5 punti la mia strategia di visibilità e da dove conviene partire questo mese.»\n2. In Cowork (organizzare): «Leggi 00-materia-prima/CONTESTO.md. Poi organizza 00-materia-prima: crea una sottocartella per ogni matrimonio, rinomina le foto in modo coerente e scrivi un file che elenca cosa manca (storia, fornitori, consenso). Non toccare altre cartelle.»\n3. In Cowork (creare): «Leggi CONTESTO.md. In 02-bozze, scrivi la bozza di un real wedding in italiano e in inglese usando foto e appunti di 00-materia-prima/[matrimonio], con il blocco crediti fornitori. Non pubblicare.»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d8', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-sic', type: 'subheading', content: 'Regole di sicurezza (tienile sempre a mente)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-sic-t', type: 'text', content: '• Approvi tu prima di pubblicare o inviare. Cowork si ferma alla bozza; pubblicare sul sito/social, inviare email o compilare moduli lo decidi tu.\n• Mai password o dati di pagamento dentro Claude: usa i connettori ufficiali.\n• Accesso solo alla cartella di lavoro, niente cartelle personali.\n• Connettori minimi e revocabili in qualsiasi momento.\n• Recensioni autentiche: Claude prepara il messaggio, l\'invio è tuo; le scrivono le coppie.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-d9', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-note', type: 'subheading', content: 'Una nota onesta', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'gd-note-t', type: 'text', content: 'Gran parte del lavoro pesante in Cowork lo gestirà chi ti segue (il consulente), perché Cowork gira sul computer di chi lo usa. Questa guida ti serve per avere il tuo setup e per capire come funziona: la Chat ti è utilissima ogni giorno per idee e bozze veloci; Cowork lo userai quando vuoi che Claude prepari qualcosa di concreto a partire dai tuoi materiali. Tutto ciò che è la tua voce, le tue relazioni e le tue recensioni resta — giustamente — nelle tue mani.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
]

const defaultPages: Page[] = [
  {
    id: 'page-overview',
    title: 'Overview',
    icon: '◻',
    view: 'blocks',
    blocks: defaultBlocks,
  },
  {
    id: 'page-timeline',
    title: 'Cronoprogramma',
    icon: '◻',
    view: 'board',
    blocks: [],
    boardData: defaultBoardData,
  },
  {
    id: 'page-queries',
    title: 'Query AI',
    icon: '?',
    view: 'blocks',
    blocks: [
      { id: 'q-h', type: 'heading', content: 'Protocollo di monitoraggio AEO — Antonio Pileggi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-intro', type: 'text', content: 'A cosa serve: misurare come le AI vedono Antonio prima di iniziare (baseline) e ripetere il test ogni 30 giorni per capire se la strategia funziona. Si misurano tre cose distinte: (1) visibilità — appare quando una coppia cerca?, (2) percezione/sentiment — cosa pensano e dicono di lui?, (3) accuratezza dell\'entità — hanno i fatti giusti?', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b0h', type: 'subheading', content: 'Blocco 0 — Come eseguire il test (leggere prima)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b0a', type: 'text', content: '• Motori da testare: ChatGPT, Google Gemini, Perplexity, Google AI Overviews / AI Mode (la risposta AI in cima alla Ricerca), e Claude. Sono i cinque che oggi indirizzano scelte di acquisto.\n• Sessione pulita: usa finestre in incognito, senza login (o con memoria/personalizzazione disattivata). Altrimenti misuri la tua cronologia, non la realtà. Su Perplexity attiva la visualizzazione delle fonti.\n• Due lingue: esegui ogni query in italiano (coppie italiane) e in inglese (coppie straniere). Sono due mercati separati e oggi quello inglese è il più scoperto.\n• Neutralità: poni le domande come le porrebbe un cliente reale. Non suggerire la risposta ("non è vero che Antonio è il migliore…"): falsa la misura.\n• Cosa registrare per ogni query (vedi griglia in Blocco 6): se è citato, in che posizione/contesto, con quali parole lo descrivono, se i fatti sono corretti, il sentiment, e quali fonti ha citato il motore.\n• Il dato più prezioso sono le fonti. Quando Perplexity o AI Overviews citano Antonio, guarda da dove lo prendono: sito, Matrimonio.com, MyWed, Instagram… Ti dice quali tue proprietà le AI considerano affidabili, e dove conviene rafforzarsi.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1h', type: 'subheading', content: 'Blocco 1 — Query di scoperta (unbranded): "appare quando lo cercano?"', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1intro', type: 'text', content: 'Sono le ricerche reali delle coppie che non conoscono ancora Antonio. Qui si misura la visibilità vera. Obiettivo: comparire tra i nomi consigliati.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1cat', type: 'subheading', content: 'Categoria geografica ampia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1a1', type: 'text', content: 'IT — «Mi consigli dei fotografi per un matrimonio in Calabria?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1a2', type: 'text', content: 'IT — «Migliori fotografi di matrimonio nel Sud Italia»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1a3', type: 'text', content: 'EN — «Recommend a destination wedding photographer in Southern Italy»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1a4', type: 'text', content: 'EN — «Best wedding photographers in Calabria, Italy»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1loc', type: 'subheading', content: 'Per location specifica', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1l1', type: 'text', content: 'IT — «Fotografo per un matrimonio a Tropea»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1l2', type: 'text', content: 'IT — «Fotografo matrimonio Catanzaro» · «Fotografo matrimonio Maida»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1l3', type: 'text', content: 'EN — «Wedding photographer in Taormina, Sicily»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1l4', type: 'text', content: 'EN — «Destination wedding photographer in Puglia»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1nic', type: 'subheading', content: 'Per nicchia / differenziatore (il tuo angolo più forte)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1n1', type: 'text', content: 'IT — «C\'è un fotografo che fotografa matrimoni in pellicola in Italia?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1n2', type: 'text', content: 'IT — «Esiste un fotografo che gira il film di matrimonio in VHS in Italia?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1n3', type: 'text', content: 'EN — «Wedding photographer who shoots on VHS in Italy»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1n4', type: 'text', content: 'EN — «35mm film wedding photographer in Italy»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1int', type: 'subheading', content: 'Per intento / decisione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1i1', type: 'text', content: 'EN — «We\'re a couple from abroad getting married in Calabria and want the day documented on film. Who should we hire?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b1i2', type: 'text', content: 'IT — «Voglio un matrimonio raccontato in modo autentico e analogico in Sud Italia: chi mi consigli?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-d3', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b2h', type: 'subheading', content: 'Blocco 2 — Query branded: "cosa pensano e dicono di lui?"', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b2intro', type: 'text', content: 'Si nomina Antonio per leggere percezione, tono e sentiment che le AI gli associano. Confronta le parole che usano con il tuo posizionamento ("atmosfera, famiglia, memoria, senso del luogo"): se coincidono, il brand è arrivato; se no, c\'è lavoro da fare sulla coerenza.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b2a', type: 'text', content: 'IT — «Chi è Antonio Pileggi, fotografo di matrimoni?» / EN — «Who is Antonio Pileggi, wedding photographer?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b2b', type: 'text', content: 'IT — «Descrivimi lo stile di Antonio Pileggi» / EN — «Describe Antonio Pileggi\'s wedding photography style»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b2c', type: 'text', content: 'IT — «Cosa rende diverso Antonio Pileggi dagli altri fotografi di matrimonio?» / EN — «What makes Antonio Pileggi different from other wedding photographers?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b2d', type: 'text', content: 'IT — «Cosa dicono i clienti di Antonio Pileggi?» / EN — «What do couples say about working with Antonio Pileggi?» (sentiment)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b2e', type: 'text', content: 'IT — «Antonio Pileggi è un buon fotografo di matrimonio?» / EN — «Is Antonio Pileggi a good wedding photographer?» (reputazione)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-d4', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b3h', type: 'subheading', content: 'Blocco 3 — Verifica dei fatti (accuratezza dell\'entità)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b3intro', type: 'text', content: 'Qui scopri se le AI hanno l\'entità giusta o se "allucinano". Ogni risposta sbagliata è una cosa precisa da correggere con il lavoro di coerenza (schema, bio, directory). La risposta attesa è tra parentesi.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b3a', type: 'text', content: 'IT — «Dove ha sede Antonio Pileggi?» (atteso: Maida / Catanzaro / Calabria)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b3b', type: 'text', content: 'IT — «In quali regioni lavora Antonio Pileggi?» (atteso: Calabria, Sicilia, Puglia, Toscana, tutta Italia)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b3c', type: 'text', content: 'IT — «Quali formati o tecniche usa Antonio Pileggi?» (atteso: digitale, pellicola 35mm, VHS)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b3d', type: 'text', content: 'IT — «Antonio Pileggi lavora con coppie straniere e parla inglese?» (atteso: sì)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b3e', type: 'text', content: 'EN — «What languages does Antonio Pileggi work in?» (atteso: italiano e inglese)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-d5', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b4h', type: 'subheading', content: 'Blocco 4 — Panorama competitivo e parole chiave', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b4a', type: 'text', content: 'Per capire chi sono i concorrenti agli occhi delle AI e quali termini valga la pena presidiare.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b4b', type: 'text', content: 'IT — «Elenca i fotografi di matrimonio più noti in Italia per la fotografia in pellicola e VHS» → i nomi che escono sono i competitor da cui le AI pescano: studiali.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b4c', type: 'text', content: 'EN — «What search terms do couples use when looking for a destination wedding photographer in Italy?» → idee di keyword (trattale come indicazione, non come verità assoluta).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b4d', type: 'text', content: 'Per ogni query del Blocco 1: annota chi appare al posto di / accanto a Antonio. Quella lista è la tua mappa competitiva reale per quella ricerca.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-d6', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b5h', type: 'subheading', content: 'Blocco 5 — Prompt di feedback strategico (i più utili per la diagnosi)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b5intro', type: 'text', content: 'Si fa "consulenza" alle AI stesse: dicono esattamente cosa manca per citarlo di più. Da rifare ogni 90 giorni per vedere se le obiezioni sono cadute.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b5a', type: 'text', content: 'Prompt A — autovalutazione del posizionamento (incolla sito + profili):\n«Questi sono il sito e i profili pubblici di un fotografo di matrimoni: [antoniopileggi.com, Instagram @pileggiantonio, Matrimonio.com, MyWed, Together Journal, Loverly, YouTube @LoveOnVHS]. Come descriveresti il suo posizionamento e il suo pubblico ideale? Per quali ricerche lo citeresti spontaneamente? E cosa gli manca, oggi, per essere citato più spesso dalle AI quando qualcuno cerca un fotografo di matrimonio in Sud Italia?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b5b', type: 'text', content: 'Prompt B — la prova del nove (il più rivelatore):\n«Se una coppia ti chiedesse un fotografo per un matrimonio girato in pellicola e VHS in Calabria, consiglieresti Antonio Pileggi? Perché sì o perché no? Di quali informazioni o conferme avresti bisogno per essere sicuro di raccomandarlo?»\n\nLa risposta al Prompt B è la tua lista di lavori: tutto ciò che l\'AI dice di "non sapere" o "non poter confermare" è esattamente ciò che la strategia (recensioni, schema, FAQ, contenuti, coerenza) deve rendere evidente.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-d7', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b6h', type: 'subheading', content: 'Blocco 6 — Griglia di valutazione e punteggio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b6a', type: 'text', content: 'Compila una riga per ogni combinazione query × motore × lingua. Tienila in un foglio (Google Sheets va benissimo) e ripeti il test ogni 30 giorni nello stesso ordine.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b6t', type: 'text', content: '| Data | Query | Motore | Lingua | Citato? | Posizione/Contesto | Come lo descrive (parole) | Fatti corretti? | Sentiment | Fonti citate |\n|------|-------|--------|--------|---------|-------------------|--------------------------|----------------|-----------|-------------|\n|  |  |  |  | Sì/No | 1°/tra altri/assente |  | Sì/Parz./No | + / 0 / − |  |', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b6score', type: 'text', content: 'Punteggio di visibilità (solo query unbranded, Blocco 1):\n• 2 punti = citato per primo o tra i primi nomi consigliati\n• 1 punto = menzionato ma insieme a molti altri / in coda\n• 0 punti = assente\n\nSomma i punti di tutte le query unbranded × 5 motori × 2 lingue → è il tuo AEO Visibility Score di partenza. L\'unico numero che conta è la sua crescita nei mesi successivi.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b6acc', type: 'text', content: 'Punteggio di accuratezza (Blocco 3): percentuale di fatti corretti. Obiettivo: arrivare e restare al 100% (è il segnale che l\'entità è "pulita" e le AI non allucinano più).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-b6sent', type: 'text', content: 'Sentiment (Blocco 2): annota le parole ricorrenti. Obiettivo: che compaiano i termini del brand — atmosfera, autentico, pellicola/VHS, memoria, documentario, Sud Italia — al posto di descrizioni generiche o errate.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-d8', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-cadh', type: 'subheading', content: 'Cadenza consigliata', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'q-cad', type: 'text', content: '• Mese 0 (ora): baseline completa, tutti i blocchi. È la foto del "prima".\n• Mese 1 e 2: ripeti Blocco 1 (visibilità) e Blocco 3 (accuratezza) — sono i più reattivi al lavoro su recensioni, schema ed entità.\n• Mese 3: baseline completa di nuovo, incluso Blocco 5, e confronta tutti i punteggi con il Mese 0.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'page-notes',
    title: 'Note & Allegati',
    icon: '📎',
    view: 'blocks',
    blocks: [
      { id: 'n-h', type: 'heading', content: 'Note e allegati', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'n-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'n-1', type: 'text', content: 'Aggiungi qui note, screenshot dei test AEO, o file di riferimento.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'page-database',
    title: 'Database',
    icon: '▦',
    view: 'database',
    blocks: [],
    databaseData: defaultDatabaseData,
  },
  {
    id: 'page-strumenti',
    title: 'Strumenti & AI',
    icon: '⚡',
    view: 'blocks',
    blocks: defaultStrumentiBlocks,
  },
  {
    id: 'page-strategie',
    title: 'Strategie',
    icon: '◆',
    view: 'blocks',
    blocks: defaultStrategieBlocks,
  },
  {
    id: 'page-toolkit',
    title: 'Toolkit',
    icon: '🧰',
    view: 'blocks',
    blocks: defaultToolkitBlocks,
  },
  {
    id: 'page-piano',
    title: 'Piano Operativo',
    icon: '📋',
    view: 'blocks',
    blocks: defaultPianoBlocks,
  },
  {
    id: 'page-reciprocita',
    title: 'Reciprocità Partner',
    icon: '🔄',
    view: 'blocks',
    blocks: defaultReciprocitaBlocks,
  },
  {
    id: 'page-cowork',
    title: 'Claude Cowork',
    icon: '🤖',
    view: 'blocks',
    blocks: defaultCoworkBlocks,
  },
  {
    id: 'page-postit',
    title: 'Post-it',
    icon: '📌',
    view: 'blocks',
    blocks: defaultPostitBlocks,
  },
  {
    id: 'page-guida',
    title: 'Guida Avvio',
    icon: '📘',
    view: 'blocks',
    blocks: defaultGuidaBlocks,
  },
]

function genId() {
  return Math.random().toString(36).substring(2, 10)
}

const blockIcons: Record<string, string> = {
  heading: '#',
  subheading: '›',
  text: '·',
  todo: '○',
  file: '📎',
  divider: '—',
  'query-group': '?',
  'task-group': '◻',
  sticky: '📌',
}

const defaultAuthors = ['Antonio', 'Team', 'AI']

export default function Workspace() {
  const [workspace, setWorkspace] = useState<Workspace | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [addingBlock, setAddingBlock] = useState<string | null>(null)
  const [commentingBlock, setCommentingBlock] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [editingBlock, setEditingBlock] = useState<string | null>(null)
  const [editBlockContent, setEditBlockContent] = useState('')
  const [renamingPage, setRenamingPage] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [editingCardTitle, setEditingCardTitle] = useState<string | null>(null)
  const [editCardTitleValue, setEditCardTitleValue] = useState('')
  const [editingCardDesc, setEditingCardDesc] = useState<string | null>(null)
  const [editCardDescValue, setEditCardDescValue] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [targetBlockForFile, setTargetBlockForFile] = useState<string | null>(null)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('aeo-dark') === 'true'
      document.documentElement.classList.toggle('dark', isDark)
      return isDark
    }
    return false
  })
  const [slashMenu, setSlashMenu] = useState<string | null>(null)
  const [slashValue, setSlashValue] = useState('')
  const [iconPicker, setIconPicker] = useState<string | null>(null)

  const pageIcons = ['◻', '📋', '🔄', '🤖', '⚡', '◆', '🧰', '📎', '▦', '📝', '🎯', '📊', '🗂️', '📌', '⭐', '🔧', '💡', '🎨', '📈', '🗓️', '📁', '🔍', '📚', '✍️', '🎬', '📸', '🌍', '🏖️', '💍', '🎀']

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('aeo-dark', String(darkMode))
  }, [darkMode])

  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      setWorkspace({ pages: defaultPages, activePage: 'page-overview' })
    } catch {
      setWorkspace({ pages: defaultPages, activePage: 'page-overview' })
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded && workspace) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace))
    }
  }, [workspace, loaded])

  function save(fn: (w: Workspace) => Workspace) {
    setWorkspace(prev => prev ? fn(prev) : prev)
  }

  const activePage = workspace?.pages.find(p => p.id === workspace.activePage) ?? null

  function updateBlock(pageId: string, blockId: string, fn: (b: Block) => Block) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? { ...p, blocks: mapBlocks(p.blocks, blockId, fn) } : p),
    }))
  }

  function mapBlocks(blocks: Block[], id: string, fn: (b: Block) => Block): Block[] {
    return blocks.map(b => {
      if (b.id === id) return fn(b)
      if (b.children.length) return { ...b, children: mapBlocks(b.children, id, fn) }
      return b
    })
  }

  function findBlock(blocks: Block[], id: string): Block | null {
    for (const b of blocks) {
      if (b.id === id) return b
      if (b.children.length) {
        const found = findBlock(b.children, id)
        if (found) return found
      }
    }
    return null
  }

  function addPage() {
    const id = 'page-' + genId()
    save(w => ({
      ...w,
      pages: [...w.pages, { id, title: 'Nuova pagina', icon: '📄', view: 'blocks', blocks: [{ id: 'b-' + genId(), type: 'heading', content: 'Nuova pagina', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] }] }],
      activePage: id,
    }))
    setEditingPage(id)
    setEditTitle('Nuova pagina')
  }

  function deletePage(id: string) {
    save(w => {
      const filtered = w.pages.filter(p => p.id !== id)
      return {
        ...w,
        pages: filtered,
        activePage: w.activePage === id ? (filtered[0]?.id ?? '') : w.activePage,
      }
    })
  }

  function duplicatePage(id: string) {
    const page = workspace?.pages.find(p => p.id === id)
    if (!page) return
    const newId = 'page-' + genId()
    save(w => ({
      ...w,
      pages: [...w.pages, { ...JSON.parse(JSON.stringify(page)), id: newId, title: page.title + ' (copia)' }],
      activePage: newId,
    }))
  }

  function addBlockToPage(pageId: string, type: Block['type'], afterId?: string) {
    const newBlock: Block = {
      id: 'b-' + genId(),
      type,
      content: type === 'heading' ? 'Nuovo heading' : type === 'subheading' ? 'Nuovo subheading' : type === 'divider' ? '' : type === 'todo' ? 'Nuovo task' : type === 'task-group' ? 'Nuovo gruppo task' : type === 'query-group' ? 'Nuovo gruppo query' : '',
      done: false,
      comments: [],
      fileName: '', fileData: '', fileType: '',
      collapsed: false,
      children: [],
    }
    save(w => ({
      ...w,
      pages: w.pages.map(p => {
        if (p.id !== pageId) return p
        if (!afterId) return { ...p, blocks: [...p.blocks, newBlock] }
        const idx = p.blocks.findIndex(b => b.id === afterId)
        const blocks = [...p.blocks]
        blocks.splice(idx + 1, 0, newBlock)
        return { ...p, blocks }
      }),
    }))
    setAddingBlock(null)
  }

  function removeBlock(pageId: string, blockId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? { ...p, blocks: removeInBlocks(p.blocks, blockId) } : p),
    }))
  }

  function removeInBlocks(blocks: Block[], id: string): Block[] {
    return blocks.filter(b => {
      if (b.id === id) return false
      if (b.children.length) b.children = removeInBlocks(b.children, id)
      return true
    })
  }

  function moveBlock(pageId: string, blockId: string, direction: 'up' | 'down') {
    save(w => ({
      ...w,
      pages: w.pages.map(p => {
        if (p.id !== pageId) return p
        const idx = p.blocks.findIndex(b => b.id === blockId)
        if (idx === -1) return p
        const blocks = [...p.blocks]
        const target = direction === 'up' ? idx - 1 : idx + 1
        if (target < 0 || target >= blocks.length) return p
        ;[blocks[idx], blocks[target]] = [blocks[target], blocks[idx]]
        return { ...p, blocks }
      }),
    }))
  }

  function handleFileUpload(pageId: string, blockId: string | null, file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = e.target?.result as string
      const newBlock: Block = {
        id: 'b-' + genId(),
        type: 'file',
        content: file.name,
        done: false,
        comments: [],
        fileName: file.name,
        fileData: data,
        fileType: file.type,
        collapsed: false,
        children: [],
      }
      save(w => ({
        ...w,
        pages: w.pages.map(p => {
          if (p.id !== pageId) return p
          if (blockId) {
            const idx = p.blocks.findIndex(b => b.id === blockId)
            const blocks = [...p.blocks]
            blocks.splice(idx + 1, 0, newBlock)
            return { ...p, blocks }
          }
          return { ...p, blocks: [...p.blocks, newBlock] }
        }),
      }))
    }
    reader.readAsDataURL(file)
  }

  function handleDrop(e: DragEvent, pageId: string) {
    e.preventDefault()
    setDragOver(false)
    const files = e.dataTransfer?.files
    if (files?.length) {
      for (const file of Array.from(files)) {
        handleFileUpload(pageId, null, file)
      }
    }
  }

  function addComment(pageId: string, blockId: string) {
    if (!commentText.trim()) return
    updateBlock(pageId, blockId, b => ({
      ...b,
      comments: [...b.comments, { id: 'c-' + genId(), text: commentText, author: defaultAuthors[0], createdAt: Date.now() }],
    }))
    setCommentText('')
    setCommentingBlock(null)
  }

  function removeComment(pageId: string, blockId: string, commentId: string) {
    updateBlock(pageId, blockId, b => ({
      ...b,
      comments: b.comments.filter(c => c.id !== commentId),
    }))
  }

  function updateBoardCard(pageId: string, colId: string, cardId: string, fn: (c: BoardCard) => BoardCard) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.map(c => c.id === cardId ? fn(c) : c),
        } : col),
      } : p),
    }))
  }

  function toggleCard(pageId: string, colId: string, cardId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.map(c => c.id === cardId ? { ...c, done: !c.done } : c),
        } : col),
      } : p),
    }))
  }

  function addCard(pageId: string, colId: string) {
    const title = prompt('Titolo della card:')
    if (!title?.trim()) return
    const desc = prompt('Descrizione (opzionale):') || ''
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: [...col.cards, {
            id: 'bc-' + genId(),
            title: title.trim(),
            description: desc,
            done: false,
            comments: [],
            fileName: '', fileData: '', fileType: '',
            labels: [],
          }],
        } : col),
      } : p),
    }))
  }

  function removeCard(pageId: string, colId: string, cardId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.filter(c => c.id !== cardId),
        } : col),
      } : p),
    }))
  }

  function addColumn(pageId: string) {
    const title = prompt('Titolo colonna:')
    if (!title?.trim()) return
    const period = prompt('Periodo (es. "Settimane X-Y"):') || ''
    const colors = ['border-l-blue-500', 'border-l-emerald-500', 'border-l-amber-500', 'border-l-violet-500', 'border-l-rose-500', 'border-l-cyan-500']
    const color = colors[Math.floor(Math.random() * colors.length)]
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: [...(p.boardData || []), {
          id: 'col-' + genId(),
          title: title.trim(),
          period,
          color,
          cards: [],
        }],
      } : p),
    }))
  }

  function removeColumn(pageId: string, colId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.filter(col => col.id !== colId),
      } : p),
    }))
  }

  function moveCard(pageId: string, fromColId: string, toColId: string, cardId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => {
        if (p.id !== pageId) return p
        const fromCol = p.boardData?.find(c => c.id === fromColId)
        const card = fromCol?.cards.find(c => c.id === cardId)
        if (!card) return p
        return {
          ...p,
          boardData: p.boardData?.map(col => {
            if (col.id === fromColId) return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
            if (col.id === toColId) return { ...col, cards: [...col.cards, { ...card, done: false }] }
            return col
          }),
        }
      }),
    }))
  }

  function addBoardComment(pageId: string, colId: string, cardId: string) {
    if (!commentText.trim()) return
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.map(c => c.id === cardId ? {
            ...c,
            comments: [...c.comments, { id: 'c-' + genId(), text: commentText, author: defaultAuthors[0], createdAt: Date.now() }],
          } : c),
        } : col),
      } : p),
    }))
    setCommentText('')
    setCommentingBlock(null)
  }

  function removeBoardComment(pageId: string, colId: string, cardId: string, commentId: string) {
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: col.cards.map(c => c.id === cardId ? {
            ...c,
            comments: c.comments.filter(cm => cm.id !== commentId),
          } : c),
        } : col),
      } : p),
    }))
  }

  const [draggedCard, setDraggedCard] = useState<{colId: string; cardId: string} | null>(null)
  const [addingCardCol, setAddingCardCol] = useState<string | null>(null)
  const [newCardTitle, setNewCardTitle] = useState('')
  const [newCardDesc, setNewCardDesc] = useState('')
  const cardInputRef = useRef<HTMLInputElement>(null)

  function confirmAddCard(pageId: string, colId: string) {
    if (!newCardTitle.trim()) return
    save(w => ({
      ...w,
      pages: w.pages.map(p => p.id === pageId ? {
        ...p,
        boardData: p.boardData?.map(col => col.id === colId ? {
          ...col,
          cards: [...col.cards, {
            id: 'bc-' + genId(),
            title: newCardTitle.trim(),
            description: newCardDesc.trim(),
            done: false,
            comments: [],
            fileName: '', fileData: '', fileType: '',
            labels: [],
          }],
        } : col),
      } : p),
    }))
    setNewCardTitle('')
    setNewCardDesc('')
    setAddingCardCol(null)
  }

  const slashCommandItems = [
    { type: 'heading' as const, label: 'Heading', icon: '#' },
    { type: 'subheading' as const, label: 'Subheading', icon: '›' },
    { type: 'text' as const, label: 'Testo', icon: '·' },
    { type: 'todo' as const, label: 'Todo', icon: '○' },
    { type: 'divider' as const, label: 'Divisore', icon: '—' },
    { type: 'task-group' as const, label: 'Gruppo task', icon: '◻' },
    { type: 'query-group' as const, label: 'Gruppo query', icon: '?' },
    { type: 'sticky' as const, label: 'Post-it', icon: '📌' },
  ] as const

  const renderSlashMenu = (blockId: string, pageId: string) => {
    const filtered = slashCommandItems.filter(item =>
      item.label.toLowerCase().includes(slashValue.toLowerCase())
    )
    if (slashMenu !== blockId || filtered.length === 0) return null
    return (
      <div className="absolute left-0 top-full z-50 mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-1.5 w-56">
        <p className="text-xs text-zinc-400 px-2 py-1">Comando rapido</p>
        {filtered.map(item => (
          <button
            key={item.type}
            onClick={() => {
              addBlockToPage(pageId, item.type, blockId)
              setSlashMenu(null)
              setSlashValue('')
            }}
            className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 flex items-center gap-2"
          >
            <span className="text-xs w-4 text-zinc-400">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    )
  }

  const handleSlashInput = (value: string, blockId: string) => {
    const slashIdx = value.lastIndexOf('/')
    if (slashIdx >= 0 && (slashIdx === 0 || value[slashIdx - 1] === ' ')) {
      setSlashMenu(blockId)
      setSlashValue(value.slice(slashIdx + 1))
    } else {
      if (slashMenu === blockId) {
        setSlashMenu(null)
        setSlashValue('')
      }
    }
  }

  const renderBlock = (block: Block, pageId: string, depth = 0): React.ReactNode => {
    const isActivePage = activePage?.id === pageId
    const hasComments = block.comments.length > 0

    const blockControls = (
      <div className={`absolute right-0 top-0 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${depth > 0 ? '-top-5' : ''}`}>
        <button onClick={() => moveBlock(pageId, block.id, 'up')} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-400" title="Sposta su">↑</button>
        <button onClick={() => moveBlock(pageId, block.id, 'down')} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-400" title="Sposta giù">↓</button>
        <button onClick={() => setAddingBlock(block.id)} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-400" title="Aggiungi dopo">+</button>
        <button
          onClick={() => setTargetBlockForFile(block.id)}
          className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded text-zinc-400"
          title="Allega file"
        >
          📎
        </button>
        {block.id !== 'b-header' && (
          <button onClick={() => removeBlock(pageId, block.id)} className="p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-zinc-400 hover:text-red-500" title="Rimuovi">✕</button>
        )}
      </div>
    )

    const commentBubble = hasComments && (
      <button
        onClick={() => setCommentingBlock(commentingBlock === block.id ? null : block.id)}
        className="ml-2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
        title={`${block.comments.length} comment${block.comments.length > 1 ? 'i' : 'o'}`}
      >
        💬 {block.comments.length}
      </button>
    )

    const addBlockMenu = addingBlock === block.id && (
      <div className="relative z-20 my-1">
        <div className="absolute left-0 top-0 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-2 w-64">
          <p className="text-xs text-zinc-400 px-2 py-1">Aggiungi blocco</p>
          {([['heading', 'Heading'], ['subheading', 'Subheading'], ['text', 'Testo'], ['todo', 'Todo'], ['task-group', 'Gruppo task'], ['query-group', 'Gruppo query'], ['divider', 'Divisore'], ['sticky', 'Post-it']] as const).map(([type, label]) => (
            <button
              key={type}
              onClick={() => addBlockToPage(pageId, type, block.id)}
              className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
            >
              <span className="mr-2 text-xs">{blockIcons[type]}</span>
              {label}
            </button>
          ))}
        </div>
      </div>
    )

    const commentSection = commentingBlock === block.id && (
      <div className="ml-6 mt-2 border-l-2 border-zinc-200 dark:border-zinc-700 pl-4 space-y-2">
        {block.comments.map(c => (
          <div key={c.id} className="text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500">{c.author}</span>
              <button onClick={() => removeComment(pageId, block.id, c.id)} className="text-xs text-zinc-400 hover:text-red-500">✕</button>
            </div>
            <p className="text-zinc-700 dark:text-zinc-300">{c.text}</p>
          </div>
        ))}
        <div className="flex gap-2">
          <input
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            placeholder="Scrivi un commento..."
            className="flex-1 text-sm border-0 bg-transparent border-b border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-zinc-500 py-1 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400"
            onKeyDown={e => { if (e.key === 'Enter') addComment(pageId, block.id) }}
          />
          <button onClick={() => addComment(pageId, block.id)} className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">Invia</button>
        </div>
      </div>
    )

    switch (block.type) {
      case 'heading':
        return (
          <div key={block.id} className="relative group py-1">
            <div className="flex items-center gap-2">
              {editingBlock === block.id ? (
                <div className="flex-1 relative">
                  <input
                    autoFocus
                    value={editBlockContent}
                    onChange={e => {
                      setEditBlockContent(e.target.value)
                      handleSlashInput(e.target.value, block.id)
                    }}
                    onBlur={() => { 
                      if (!slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Escape') { setSlashMenu(null); setSlashValue(''); setEditingBlock(null) }
                      if (e.key === 'Enter' && !slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                      if (e.key === 'Enter' && slashMenu) { e.preventDefault(); setSlashMenu(null); setSlashValue('') }
                    }}
                    placeholder="Scrivi / per comandi..."
                    className="w-full text-2xl font-bold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-900 dark:text-zinc-100"
                  />
                  {renderSlashMenu(block.id, pageId)}
                </div>
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 cursor-text"
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'subheading':
        return (
          <div key={block.id} className="relative group py-1">
            <div className="flex items-center gap-2">
              {editingBlock === block.id ? (
                <div className="flex-1 relative">
                  <input
                    autoFocus
                    value={editBlockContent}
                    onChange={e => {
                      setEditBlockContent(e.target.value)
                      handleSlashInput(e.target.value, block.id)
                    }}
                    onBlur={() => { 
                      if (!slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Escape') { setSlashMenu(null); setSlashValue(''); setEditingBlock(null) }
                      if (e.key === 'Enter' && !slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                      if (e.key === 'Enter' && slashMenu) { e.preventDefault(); setSlashMenu(null); setSlashValue('') }
                    }}
                    placeholder="Scrivi / per comandi..."
                    className="w-full text-base font-semibold bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-800 dark:text-zinc-200"
                  />
                  {renderSlashMenu(block.id, pageId)}
                </div>
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-base font-semibold text-zinc-800 dark:text-zinc-200 cursor-text"
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'text':
        return (
          <div key={block.id} className="relative group py-0.5">
            <div className="flex items-center gap-2">
              {editingBlock === block.id ? (
                <div className="flex-1 relative">
                  <input
                    autoFocus
                    value={editBlockContent}
                    onChange={e => {
                      setEditBlockContent(e.target.value)
                      handleSlashInput(e.target.value, block.id)
                    }}
                    onBlur={() => { 
                      if (!slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    }}
                    onKeyDown={e => {
                      if (e.key === 'Escape') { setSlashMenu(null); setSlashValue(''); setEditingBlock(null) }
                      if (e.key === 'Enter' && !slashMenu) { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                      if (e.key === 'Enter' && slashMenu) { e.preventDefault(); setSlashMenu(null); setSlashValue('') }
                    }}
                    placeholder="Scrivi / per comandi..."
                    className="w-full text-sm bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-700 dark:text-zinc-300"
                  />
                  {renderSlashMenu(block.id, pageId)}
                </div>
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed cursor-text"
                >
                  {block.content || <span className="text-zinc-300 dark:text-zinc-600 italic">Scrivi / per comandi...</span>}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'todo':
        return (
          <div key={block.id} className="relative group py-0.5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={block.done}
                onChange={() => updateBlock(pageId, block.id, b => ({ ...b, done: !b.done }))}
                className="h-3.5 w-3.5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 dark:border-zinc-600"
              />
              {editingBlock === block.id ? (
                <input
                  autoFocus
                  value={editBlockContent}
                  onChange={e => setEditBlockContent(e.target.value)}
                  onBlur={() => { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    if (e.key === 'Escape') setEditingBlock(null)
                  }}
                  className={`flex-1 text-sm bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none ${block.done ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}`}
                />
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className={`text-sm cursor-text ${block.done ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-700 dark:text-zinc-300'}`}
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'file':
        return (
          <div key={block.id} className="relative group py-1">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
              <span className="text-sm">📎</span>
              <span className="text-sm text-zinc-700 dark:text-zinc-300 flex-1 truncate">{block.fileName || block.content}</span>
              {block.fileData && block.fileType?.startsWith('image/') && (
                <button
                  onClick={() => window.open(block.fileData, '_blank')}
                  className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                >
                  👁
                </button>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )

      case 'sticky': {
        const stickColors: Record<string, string> = {
          yellow: 'bg-yellow-100 dark:bg-yellow-900/40 border-yellow-200 dark:border-yellow-700 text-yellow-900 dark:text-yellow-200',
          pink: 'bg-pink-100 dark:bg-pink-900/40 border-pink-200 dark:border-pink-700 text-pink-900 dark:text-pink-200',
          blue: 'bg-blue-100 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-200',
          green: 'bg-green-100 dark:bg-green-900/40 border-green-200 dark:border-green-700 text-green-900 dark:text-green-200',
          purple: 'bg-purple-100 dark:bg-purple-900/40 border-purple-200 dark:border-purple-700 text-purple-900 dark:text-purple-200',
          orange: 'bg-orange-100 dark:bg-orange-900/40 border-orange-200 dark:border-orange-700 text-orange-900 dark:text-orange-200',
        }
        const c = block.color || 'yellow'
        const colorClass = stickColors[c] || stickColors.yellow
        return (
          <div key={block.id} className="relative group py-2">
            <div className={`rounded-xl border p-3 ${colorClass} shadow-sm`}>
              <div className="flex items-start gap-2">
                <span className="text-base shrink-0 mt-0.5">
                  {c === 'yellow' ? '💛' : c === 'pink' ? '🩷' : c === 'blue' ? '💙' : c === 'green' ? '💚' : c === 'purple' ? '💜' : '🧡'}
                </span>
                {editingBlock === block.id ? (
                  <input
                    autoFocus
                    value={editBlockContent}
                    onChange={e => setEditBlockContent(e.target.value)}
                    onBlur={() => { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }}
                    onKeyDown={e => {
                      if (e.key === 'Enter') { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                      if (e.key === 'Escape') setEditingBlock(null)
                    }}
                    className="flex-1 text-sm bg-transparent border-b border-current border-opacity-30 focus:outline-none"
                  />
                ) : (
                  <span
                    onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                    className="text-sm leading-relaxed cursor-text flex-1"
                  >
                    {block.content || <span className="opacity-50 italic">Scrivi...</span>}
                  </span>
                )}
                {commentBubble}
              </div>
              <div className="flex items-center gap-1 mt-2">
                {['yellow', 'pink', 'blue', 'green', 'purple', 'orange'].map(col => (
                  <button
                    key={col}
                    onClick={() => updateBlock(pageId, block.id, b => ({ ...b, color: col }))}
                    className={`w-3.5 h-3.5 rounded-full border border-zinc-300 dark:border-zinc-600 ${
                      c === col ? 'ring-1 ring-zinc-500 dark:ring-zinc-300 scale-110' : ''
                    } ${
                      col === 'yellow' ? 'bg-yellow-200 dark:bg-yellow-600' :
                      col === 'pink' ? 'bg-pink-200 dark:bg-pink-600' :
                      col === 'blue' ? 'bg-blue-200 dark:bg-blue-600' :
                      col === 'green' ? 'bg-green-200 dark:bg-green-600' :
                      col === 'purple' ? 'bg-purple-200 dark:bg-purple-600' : 'bg-orange-200 dark:bg-orange-600'
                    }`}
                    title={col}
                  />
                ))}
              </div>
            </div>
            {blockControls}
            {addBlockMenu}
            {commentSection}
          </div>
        )
      }

      case 'task-group':
        return (
          <div key={block.id} className="relative group">
            <div className="flex items-center gap-2 py-1">
              <button onClick={() => updateBlock(pageId, block.id, b => ({ ...b, collapsed: !b.collapsed }))} className="text-xs text-zinc-400 hover:text-zinc-600 w-4">
                {block.collapsed ? '▶' : '▼'}
              </button>
              {editingBlock === block.id ? (
                <input
                  autoFocus
                  value={editBlockContent}
                  onChange={e => setEditBlockContent(e.target.value)}
                  onBlur={() => { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    if (e.key === 'Escape') setEditingBlock(null)
                  }}
                  className="flex-1 text-sm font-medium bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-700 dark:text-zinc-300"
                />
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-text"
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {!block.collapsed && (
              <div className="ml-4 border-l-2 border-zinc-100 dark:border-zinc-800 pl-3 space-y-0.5">
                {block.children.map(child => renderBlock(child, pageId, depth + 1))}
              </div>
            )}
            {commentSection}
          </div>
        )

      case 'query-group':
        return (
          <div key={block.id} className="relative group">
            <div className="flex items-center gap-2 py-1">
              <button onClick={() => updateBlock(pageId, block.id, b => ({ ...b, collapsed: !b.collapsed }))} className="text-xs text-zinc-400 hover:text-zinc-600 w-4">
                {block.collapsed ? '▶' : '▼'}
              </button>
              {editingBlock === block.id ? (
                <input
                  autoFocus
                  value={editBlockContent}
                  onChange={e => setEditBlockContent(e.target.value)}
                  onBlur={() => { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') { updateBlock(pageId, block.id, b => ({ ...b, content: editBlockContent })); setEditingBlock(null) }
                    if (e.key === 'Escape') setEditingBlock(null)
                  }}
                  className="flex-1 text-sm font-medium bg-transparent border-b border-zinc-300 dark:border-zinc-600 focus:outline-none text-zinc-700 dark:text-zinc-300"
                />
              ) : (
                <span
                  onClick={() => { setEditingBlock(block.id); setEditBlockContent(block.content) }}
                  className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-text"
                >
                  {block.content}
                </span>
              )}
              {commentBubble}
            </div>
            {blockControls}
            {addBlockMenu}
            {!block.collapsed && (
              <div className="ml-4 border-l-2 border-zinc-100 dark:border-zinc-800 pl-3 space-y-0.5">
                {block.children.map(child => renderBlock(child, pageId, depth + 1))}
              </div>
            )}
            {commentSection}
          </div>
        )

      default:
        return null
    }
  }

  const renderBoard = (page: Page): React.ReactNode => {
    const bd = page.boardData || []
    const totalCards = bd.reduce((s, col) => s + col.cards.length, 0)
    const doneCards = bd.reduce((s, col) => s + col.cards.filter(c => c.done).length, 0)

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="shrink-0 px-6 pt-4 pb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">📋 Kanban — Cronoprogramma</h2>
            <p className="text-xs text-zinc-400">{doneCards}/{totalCards} card completate</p>
          </div>
          <button onClick={() => addColumn(page.id)} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
            + Colonna
          </button>
        </div>
        <div className="flex-1 overflow-x-auto px-4 pb-4">
          <div className="flex gap-4 h-full items-start min-h-0">
            {bd.map(col => {
              const doneCol = col.cards.filter(c => c.done).length
              return (
                <div key={col.id} className="w-72 shrink-0 bg-zinc-100 dark:bg-zinc-800/60 rounded-xl flex flex-col max-h-full">
                  {/* Column header */}
                  <div className={`shrink-0 p-3 border-b border-zinc-200 dark:border-zinc-700 border-l-2 ${col.color} rounded-t-xl`}>
                    <div className="flex items-center justify-between mb-0.5">
                      <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">{col.title}</h3>
                      <button onClick={() => removeColumn(page.id, col.id)} className="text-xs text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100">✕</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-zinc-400">{col.period}</span>
                      <span className="text-xs text-zinc-400">{doneCol}/{col.cards.length}</span>
                    </div>
                  </div>

                  {/* Cards */}
                  <div className="flex-1 overflow-y-auto p-2 space-y-2 min-h-0">
                    {col.cards.map(card => {
                      const commenting = commentingBlock === card.id
                      return (
                        <div
                          key={card.id}
                          draggable
                          onDragStart={() => setDraggedCard({ colId: col.id, cardId: card.id })}
                          onDragOver={e => { e.preventDefault(); if (draggedCard && draggedCard.cardId !== card.id) setDraggedCard(draggedCard) }}
                          onDrop={e => {
                            e.preventDefault()
                            if (draggedCard && draggedCard.cardId !== card.id) {
                              moveCard(page.id, draggedCard.colId, col.id, draggedCard.cardId)
                            }
                            setDraggedCard(null)
                          }}
                          className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-shadow group/card"
                        >
                          <div className="p-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2 flex-1 min-w-0">
                                <input
                                  type="checkbox"
                                  checked={card.done}
                                  onChange={() => toggleCard(page.id, col.id, card.id)}
                                  className="mt-0.5 h-3.5 w-3.5 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 dark:border-zinc-600 shrink-0"
                                />
                                <div className="min-w-0">
                                  {editingCardTitle === card.id ? (
                                    <input
                                      autoFocus
                                      value={editCardTitleValue}
                                      onChange={e => setEditCardTitleValue(e.target.value)}
                                      onBlur={() => { updateBoardCard(page.id, col.id, card.id, c => ({ ...c, title: editCardTitleValue })); setEditingCardTitle(null) }}
                                      onKeyDown={e => {
                                        if (e.key === 'Enter') { updateBoardCard(page.id, col.id, card.id, c => ({ ...c, title: editCardTitleValue })); setEditingCardTitle(null) }
                                        if (e.key === 'Escape') setEditingCardTitle(null)
                                      }}
                                      className="text-sm font-medium leading-snug w-full bg-transparent border-b border-zinc-400 focus:outline-none text-zinc-800 dark:text-zinc-200"
                                    />
                                  ) : (
                                    <p
                                      onClick={() => { setEditingCardTitle(card.id); setEditCardTitleValue(card.title) }}
                                      className={`text-sm font-medium leading-snug cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded px-0.5 -ml-0.5 ${card.done ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-800 dark:text-zinc-200'}`}
                                    >
                                      {card.title}
                                    </p>
                                  )}
                                  {editingCardDesc === card.id ? (
                                    <input
                                      autoFocus
                                      value={editCardDescValue}
                                      onChange={e => setEditCardDescValue(e.target.value)}
                                      onBlur={() => { updateBoardCard(page.id, col.id, card.id, c => ({ ...c, description: editCardDescValue })); setEditingCardDesc(null) }}
                                      onKeyDown={e => {
                                        if (e.key === 'Enter') { updateBoardCard(page.id, col.id, card.id, c => ({ ...c, description: editCardDescValue })); setEditingCardDesc(null) }
                                        if (e.key === 'Escape') setEditingCardDesc(null)
                                      }}
                                      className="text-xs w-full bg-transparent border-b border-zinc-400 focus:outline-none text-zinc-400 mt-1"
                                    />
                                  ) : (
                                    (card.description || card.title) && (
                                      <p
                                        onClick={() => { setEditingCardDesc(card.id); setEditCardDescValue(card.description || '') }}
                                        className="text-xs text-zinc-400 mt-1 leading-relaxed cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded px-0.5 -ml-0.5"
                                      >
                                        {card.description || 'Aggiungi descrizione...'}
                                      </p>
                                    )
                                  )}
                                  {card.labels.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {card.labels.map((label, li) => (
                                        <span key={li} className="text-[10px] px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400">
                                          {label}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-0.5 shrink-0">
                                {card.comments.length > 0 && (
                                  <button
                                    onClick={() => setCommentingBlock(commenting ? null : card.id)}
                                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                                  >
                                    💬 {card.comments.length}
                                  </button>
                                )}
                                <button onClick={() => removeCard(page.id, col.id, card.id)} className="text-xs text-zinc-300 hover:text-red-500 opacity-0 group-hover/card:opacity-100 transition-opacity">✕</button>
                              </div>
                            </div>

                            {/* Comments */}
                            {commenting && (
                              <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-700 space-y-1.5">
                                {card.comments.map(c => (
                                  <div key={c.id} className="text-xs">
                                    <div className="flex items-center justify-between">
                                      <span className="font-medium text-zinc-500">{c.author}</span>
                                      <button onClick={() => removeBoardComment(page.id, col.id, card.id, c.id)} className="text-zinc-400 hover:text-red-500">✕</button>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-400">{c.text}</p>
                                  </div>
                                ))}
                                <div className="flex gap-1.5">
                                  <input
                                    value={commentingBlock === card.id ? commentText : ''}
                                    onChange={e => setCommentText(e.target.value)}
                                    placeholder="Commento..."
                                    className="flex-1 text-xs border-0 bg-transparent border-b border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-zinc-500 py-0.5 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400"
                                    onKeyDown={e => { if (e.key === 'Enter') { addBoardComment(page.id, col.id, card.id); setCommentingBlock(null) } }}
                                  />
                                  <button onClick={() => { addBoardComment(page.id, col.id, card.id); setCommentingBlock(null) }} className="text-xs text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200">Invia</button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}

                    {/* Add card inline */}
                    {addingCardCol === col.id ? (
                      <div className="bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-3 space-y-2">
                        <input
                          ref={cardInputRef}
                          autoFocus
                          value={newCardTitle}
                          onChange={e => setNewCardTitle(e.target.value)}
                          placeholder="Titolo card..."
                          className="w-full text-sm border-0 bg-transparent focus:outline-none text-zinc-800 dark:text-zinc-200 placeholder-zinc-400"
                          onKeyDown={e => { if (e.key === 'Enter') confirmAddCard(page.id, col.id); if (e.key === 'Escape') { setAddingCardCol(null); setNewCardTitle('') } }}
                        />
                        <input
                          value={newCardDesc}
                          onChange={e => setNewCardDesc(e.target.value)}
                          placeholder="Descrizione (opzionale)..."
                          className="w-full text-xs border-0 bg-transparent focus:outline-none text-zinc-500 placeholder-zinc-400"
                          onKeyDown={e => { if (e.key === 'Enter') confirmAddCard(page.id, col.id) }}
                        />
                        <div className="flex gap-1.5">
                          <button onClick={() => confirmAddCard(page.id, col.id)} className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">Aggiungi</button>
                          <button onClick={() => { setAddingCardCol(null); setNewCardTitle(''); setNewCardDesc('') }} className="text-xs px-2.5 py-1 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Annulla</button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setAddingCardCol(col.id); setNewCardTitle(''); setNewCardDesc(''); setTimeout(() => cardInputRef.current?.focus(), 50) }}
                        className="w-full text-left px-2 py-1.5 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
                      >
                        + Aggiungi card
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  const [editCell, setEditCell] = useState<{rowId: string; colId: string} | null>(null)
  const [editValue, setEditValue] = useState<string | number | boolean>('')
  const [dbFilter, setDbFilter] = useState<string>('')
  const [dbSortCol, setDbSortCol] = useState<string | null>(null)
  const [dbSortAsc, setDbSortAsc] = useState(true)
  const [addingRow, setAddingRow] = useState(false)
  const [newRow, setNewRow] = useState<Record<string, string | number | boolean>>({})
  const [addingColumn, setAddingColumn] = useState(false)
  const [newColName, setNewColName] = useState('')
  const [newColType, setNewColType] = useState<ColumnType>('text')
  const [newColOptions, setNewColOptions] = useState('')
  const [contextMenu, setContextMenu] = useState<{colId: string; x: number; y: number} | null>(null)
  const editInputRef = useRef<HTMLInputElement>(null)

  const renderDatabase = (page: Page): React.ReactNode => {
    const db = page.databaseData || { columns: [], rows: [] }
    let filteredRows = [...db.rows]
    if (dbFilter.trim()) {
      const q = dbFilter.toLowerCase()
      filteredRows = filteredRows.filter(row =>
        db.columns.some(col => {
          const val = row.cells[col.id]
          return String(val ?? '').toLowerCase().includes(q)
        })
      )
    }
    if (dbSortCol) {
      filteredRows.sort((a, b) => {
        const va = a.cells[dbSortCol]
        const vb = b.cells[dbSortCol]
        if (va === undefined || va === null) return 1
        if (vb === undefined || vb === null) return -1
        const cmp = typeof va === 'string' ? va.localeCompare(String(vb)) : Number(va) > Number(vb) ? 1 : -1
        return dbSortAsc ? cmp : -cmp
      })
    }

    function updateCell(rowId: string, colId: string, val: string | number | boolean) {
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: {
            columns: db.columns,
            rows: db.rows.map(r => r.id === rowId ? { ...r, cells: { ...r.cells, [colId]: val } } : r),
          },
        } : p),
      }))
    }

    function deleteRow(rowId: string) {
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: { columns: db.columns, rows: db.rows.filter(r => r.id !== rowId) },
        } : p),
      }))
    }

    function duplicateRow(rowId: string) {
      const row = db.rows.find(r => r.id === rowId)
      if (!row) return
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: { columns: db.columns, rows: [...db.rows, { ...row, id: 'dr-' + genId(), cells: { ...row.cells } }] },
        } : p),
      }))
    }

    function confirmNewRow() {
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: {
            columns: db.columns,
            rows: [...db.rows, { id: 'dr-' + genId(), cells: { ...newRow } }],
          },
        } : p),
      }))
      setNewRow({})
      setAddingRow(false)
    }

    function confirmNewColumn() {
      if (!newColName.trim()) return
      const colId = 'dc-' + genId()
      const col: TableColumn = { id: colId, name: newColName.trim(), type: newColType, options: newColOptions ? newColOptions.split(',').map(s => s.trim()) : [], width: 150 }
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: {
            columns: [...db.columns, col],
            rows: db.rows.map(r => ({ ...r, cells: { ...r.cells, [colId]: newColType === 'checkbox' ? false : '' } })),
          },
        } : p),
      }))
      setNewColName('')
      setNewColOptions('')
      setAddingColumn(false)
    }

    function deleteColumn(colId: string) {
      save(w => ({
        ...w,
        pages: w.pages.map(p => p.id === page.id ? {
          ...p,
          databaseData: {
            columns: db.columns.filter(c => c.id !== colId),
            rows: db.rows.map(r => {
              const cells = { ...r.cells }
              delete cells[colId]
              return { ...r, cells }
            }),
          },
        } : p),
      }))
      setContextMenu(null)
    }

    function renderCellValue(row: TableRow, col: TableColumn) {
      const val = row.cells[col.id]
      const isEditing = editCell?.rowId === row.id && editCell?.colId === col.id

      if (isEditing) {
        if (col.type === 'select') {
          return (
            <select
              autoFocus
              value={String(editValue ?? '')}
              onChange={e => setEditValue(e.target.value)}
              onBlur={() => { updateCell(row.id, col.id, editValue); setEditCell(null) }}
              className="w-full text-xs border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            >
              <option value="">—</option>
              {col.options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          )
        }
        if (col.type === 'checkbox') {
          return (
            <input
              type="checkbox"
              checked={!!editValue}
              onChange={e => { updateCell(row.id, col.id, e.target.checked); setEditCell(null) }}
              className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 mx-auto block"
            />
          )
        }
        return (
          <input
            ref={editInputRef}
            autoFocus
            type={col.type === 'number' ? 'number' : 'text'}
            value={String(editValue ?? '')}
            onChange={e => setEditValue(col.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
            onBlur={() => { updateCell(row.id, col.id, editValue); setEditCell(null) }}
            onKeyDown={e => { if (e.key === 'Enter') { updateCell(row.id, col.id, editValue); setEditCell(null) } if (e.key === 'Escape') setEditCell(null) }}
            className="w-full text-xs border border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-zinc-500"
          />
        )
      }

      if (col.type === 'checkbox') {
        return (
          <input
            type="checkbox"
            checked={!!val}
            onChange={() => updateCell(row.id, col.id, !val)}
            className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-500 mx-auto block"
          />
        )
      }

      return (
        <span className="text-xs text-zinc-700 dark:text-zinc-300 truncate block">
          {col.type === 'select' && !val ? <span className="text-zinc-400">—</span> : String(val ?? '')}
        </span>
      )
    }

    return (
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="shrink-0 px-6 pt-4 pb-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Database</h2>
            <span className="text-xs text-zinc-400">{filteredRows.length} righe</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              value={dbFilter}
              onChange={e => setDbFilter(e.target.value)}
              placeholder="Filtra..."
              className="text-xs border border-zinc-200 dark:border-zinc-700 rounded-lg px-2.5 py-1.5 bg-transparent focus:outline-none focus:border-zinc-400 w-40 text-zinc-600 dark:text-zinc-300 placeholder-zinc-400"
            />
            <button onClick={() => setAddingColumn(true)} className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-300 dark:hover:bg-zinc-600 transition-colors">
              + Colonna
            </button>
            <button onClick={() => setAddingRow(true)} className="text-xs px-2.5 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors">
              + Riga
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-auto px-4 pb-4">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="w-8 bg-zinc-100 dark:bg-zinc-800/80 border-b border-zinc-200 dark:border-zinc-700 p-1"></th>
                {db.columns.map(col => (
                  <th
                    key={col.id}
                    style={{ minWidth: col.width, maxWidth: col.width * 2 }}
                    className="bg-zinc-100 dark:bg-zinc-800/80 border-b border-r border-zinc-200 dark:border-zinc-700 px-3 py-2 text-left text-xs font-semibold text-zinc-500 dark:text-zinc-400 select-none relative group"
                  >
                    <div className="flex items-center justify-between gap-1">
                      <button
                        onClick={() => {
                          if (dbSortCol === col.id) { setDbSortAsc(!dbSortAsc) }
                          else { setDbSortCol(col.id); setDbSortAsc(true) }
                        }}
                        className="hover:text-zinc-800 dark:hover:text-zinc-200 flex items-center gap-1"
                      >
                        {col.name}
                        {dbSortCol === col.id && <span className="text-[10px]">{dbSortAsc ? '↑' : '↓'}</span>}
                      </button>
                      <button
                        onClick={(e) => setContextMenu({ colId: col.id, x: e.clientX, y: e.clientY })}
                        className="opacity-0 group-hover:opacity-100 text-[10px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                      >
                        ⋯
                      </button>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-normal">{col.type}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map(row => (
                <tr
                  key={row.id}
                  className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <td className="border-b border-zinc-100 dark:border-zinc-800 p-1 text-center">
                    <div className="flex items-center justify-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => duplicateRow(row.id)} className="text-[10px] text-zinc-400 hover:text-zinc-600" title="Duplica">⧉</button>
                      <button onClick={() => deleteRow(row.id)} className="text-[10px] text-zinc-400 hover:text-red-500" title="Elimina">✕</button>
                    </div>
                  </td>
                  {db.columns.map(col => (
                    <td
                      key={col.id}
                      className="border-b border-r border-zinc-100 dark:border-zinc-800 px-3 py-1.5 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
                      onClick={() => {
                        setEditCell({ rowId: row.id, colId: col.id })
                        setEditValue(row.cells[col.id] ?? (col.type === 'checkbox' ? false : ''))
                        setTimeout(() => editInputRef.current?.focus(), 50)
                      }}
                    >
                      {renderCellValue(row, col)}
                    </td>
                  ))}
                </tr>
              ))}
              {addingRow && (
                <tr>
                  <td className="border-b border-zinc-100 dark:border-zinc-800 p-1"></td>
                  {db.columns.map(col => (
                    <td key={col.id} className="border-b border-r border-zinc-100 dark:border-zinc-800 px-3 py-1">
                      {col.type === 'select' ? (
                        <select
                          value={String(newRow[col.id] ?? '')}
                          onChange={e => setNewRow(r => ({ ...r, [col.id]: e.target.value }))}
                          className="w-full text-xs border-0 bg-transparent focus:outline-none text-zinc-700 dark:text-zinc-300"
                        >
                          <option value="">—</option>
                          {col.options.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : col.type === 'checkbox' ? (
                        <input
                          type="checkbox"
                          checked={!!newRow[col.id]}
                          onChange={e => setNewRow(r => ({ ...r, [col.id]: e.target.checked }))}
                          className="h-4 w-4 rounded border-zinc-300 mx-auto block"
                        />
                      ) : (
                        <input
                          type={col.type === 'number' ? 'number' : 'text'}
                          value={String(newRow[col.id] ?? '')}
                          onChange={e => setNewRow(r => ({ ...r, [col.id]: col.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value }))}
                          placeholder={col.name}
                          className="w-full text-xs border-0 bg-transparent focus:outline-none text-zinc-700 dark:text-zinc-300 placeholder-zinc-400"
                          onKeyDown={e => { if (e.key === 'Enter') confirmNewRow(); if (e.key === 'Escape') { setAddingRow(false); setNewRow({}) } }}
                        />
                      )}
                    </td>
                  ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add column modal */}
        {addingColumn && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={() => setAddingColumn(false)}>
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-700 w-80" onClick={e => e.stopPropagation()}>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">Nuova colonna</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Nome</label>
                  <input value={newColName} onChange={e => setNewColName(e.target.value)} placeholder="Es. Data" className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 bg-transparent focus:outline-none focus:border-zinc-400 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400" />
                </div>
                <div>
                  <label className="text-xs text-zinc-500 block mb-1">Tipo</label>
                  <select value={newColType} onChange={e => setNewColType(e.target.value as ColumnType)} className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 bg-transparent focus:outline-none focus:border-zinc-400 text-zinc-700 dark:text-zinc-300">
                    <option value="text">Testo</option>
                    <option value="number">Numero</option>
                    <option value="select">Selezione</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="date">Data</option>
                  </select>
                </div>
                {newColType === 'select' && (
                  <div>
                    <label className="text-xs text-zinc-500 block mb-1">Opzioni (separate da virgola)</label>
                    <input value={newColOptions} onChange={e => setNewColOptions(e.target.value)} placeholder="Alta, Media, Bassa" className="w-full text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-1.5 bg-transparent focus:outline-none focus:border-zinc-400 text-zinc-700 dark:text-zinc-300 placeholder-zinc-400" />
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <button onClick={confirmNewColumn} className="text-xs px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200">Crea</button>
                  <button onClick={() => setAddingColumn(false)} className="text-xs px-3 py-1.5 rounded-lg text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">Annulla</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Column context menu */}
        {contextMenu && (
          <div className="fixed inset-0 z-50" onClick={() => setContextMenu(null)}>
            <div
              className="absolute bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-1 w-40"
              style={{ left: contextMenu.x, top: contextMenu.y }}
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => { setDbSortCol(contextMenu.colId); setDbSortAsc(true); setContextMenu(null) }} className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300">Ordina ↑</button>
              <button onClick={() => { setDbSortCol(contextMenu.colId); setDbSortAsc(false); setContextMenu(null) }} className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300">Ordina ↓</button>
              <hr className="my-1 border-zinc-100 dark:border-zinc-700" />
              <button onClick={() => deleteColumn(contextMenu.colId)} className="w-full text-left px-3 py-1.5 text-xs rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400">Elimina colonna</button>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (!loaded) return <div className="h-screen bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center"><span className="text-zinc-400">Caricamento...</span></div>

  return (
    <div className="h-screen flex bg-zinc-50 dark:bg-zinc-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} shrink-0 bg-white dark:bg-zinc-800/50 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-200 flex flex-col overflow-hidden`}>
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center">
                <span className="text-xs font-bold text-white dark:text-zinc-900">A</span>
              </div>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">Antonio AEO</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">◀</button>
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-700/50 rounded-lg px-2 py-1.5">
            <span>🔒</span>
            <span>Locale</span>
          </div>
        </div>

        <div className="px-3 pb-2 shrink-0">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
          >
            <span>{darkMode ? '☀️' : '🌙'}</span>
            <span>{darkMode ? 'Modalità chiara' : 'Modalità scura'}</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          <p className="text-xs font-medium text-zinc-400 px-2 pt-3 pb-1 uppercase tracking-wider">📄 Pagine</p>
          <div className="px-2 py-1 mb-1">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-300 dark:text-zinc-600">
              <span>👥</span>
              <span className="uppercase tracking-wider font-medium">Workspace Team</span>
            </div>
          </div>
          {workspace?.pages.map(p => (
            <div key={p.id} className="group relative">
              {renamingPage === p.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  onChange={e => setRenameValue(e.target.value)}
                  onBlur={() => {
                    save(w => ({ ...w, pages: w.pages.map(pp => pp.id === p.id ? { ...pp, title: renameValue || pp.title } : pp) }))
                    setRenamingPage(null)
                  }}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      save(w => ({ ...w, pages: w.pages.map(pp => pp.id === p.id ? { ...pp, title: renameValue || pp.title } : pp) }))
                      setRenamingPage(null)
                    }
                  }}
                  className="w-full text-sm bg-transparent border border-zinc-300 dark:border-zinc-600 rounded px-2 py-1 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
              ) : (
                <button
                  onClick={() => save(w => ({ ...w, activePage: p.id }))}
                  className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg transition-all duration-150 ${
                    workspace?.activePage === p.id
                      ? 'bg-zinc-100 dark:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100 shadow-sm border border-zinc-200/50 dark:border-zinc-600/30'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/30 hover:text-zinc-800 dark:hover:text-zinc-200'
                  }`}
                >
                  <span className="text-xs shrink-0 relative">
                    <span
                      onClick={e => { e.stopPropagation(); setIconPicker(iconPicker === p.id ? null : p.id) }}
                      className="cursor-pointer hover:opacity-70"
                    >
                      {p.icon}
                    </span>
                    {iconPicker === p.id && (
                      <div className="absolute left-0 top-5 z-50 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-2 w-48" onClick={e => e.stopPropagation()}>
                        <div className="grid grid-cols-6 gap-0.5">
                          {pageIcons.map(ico => (
                            <button
                              key={ico}
                              onClick={() => {
                                save(w => ({ ...w, pages: w.pages.map(pp => pp.id === p.id ? { ...pp, icon: ico } : pp) }))
                                setIconPicker(null)
                              }}
                              className={`w-6 h-6 flex items-center justify-center text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 ${p.icon === ico ? 'bg-zinc-100 dark:bg-zinc-700' : ''}`}
                            >
                              {ico}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </span>
                  <span className="truncate text-left flex-1">{p.title}</span>
                </button>
              )}
              <div className="hidden group-hover:flex absolute right-1 top-1/2 -translate-y-1/2 items-center gap-0.5">
                <button onClick={() => { setRenamingPage(p.id); setRenameValue(p.title) }} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded text-zinc-400 text-xs" title="Rinomina">✎</button>
                <button onClick={() => duplicatePage(p.id)} className="p-0.5 hover:bg-zinc-200 dark:hover:bg-zinc-600 rounded text-zinc-400 text-xs" title="Duplica">⧉</button>
                {p.id !== 'page-overview' && (
                  <button onClick={() => deletePage(p.id)} className="p-0.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-zinc-400 hover:text-red-500 text-xs" title="Elimina">✕</button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-2 border-t border-zinc-200 dark:border-zinc-800 shrink-0 space-y-1">
          <button onClick={addPage} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors">
            <span>+</span>
            <span>Nuova pagina</span>
          </button>
          <button onClick={() => setSidebarOpen(false)} className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors sm:hidden">
            <span>◀</span>
            <span>Chiudi sidebar</span>
          </button>
        </div>
      </aside>

      {/* Sidebar toggle (when closed) */}
      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(true)} className="fixed top-3 left-3 z-30 p-1.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 text-sm">
          ▶
        </button>
      )}

      {/* Main content */}
      <main
        className={`flex-1 flex flex-col overflow-y-auto ${sidebarOpen ? '' : 'pl-10'}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => activePage && handleDrop(e, activePage.id)}
      >
        {dragOver && (
          <div className="fixed inset-0 z-50 bg-zinc-900/10 dark:bg-zinc-900/40 flex items-center justify-center pointer-events-none">
            <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-600 text-center">
              <p className="text-lg font-medium text-zinc-700 dark:text-zinc-300">Rilascia i file qui</p>
              <p className="text-sm text-zinc-400 mt-1">Verranno aggiunti alla pagina corrente</p>
            </div>
          </div>
        )}

        {activePage && activePage.view === 'board' ? (
          renderBoard(activePage)
        ) : activePage && activePage.view === 'database' ? (
          renderDatabase(activePage)
        ) : activePage && (
          <>
            {/* Page toolbar */}
            <div className="sticky top-0 z-10 bg-zinc-50/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 px-5 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5 text-sm">
                <span className="text-base relative">
                  <span
                    onClick={() => setIconPicker(iconPicker === activePage.id ? null : activePage.id)}
                    className="cursor-pointer hover:opacity-70"
                  >
                    {activePage.icon}
                  </span>
                  {iconPicker === activePage.id && (
                    <div className="absolute left-0 top-6 z-50 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl p-2 w-48" onClick={e => e.stopPropagation()}>
                      <div className="grid grid-cols-6 gap-0.5">
                        {pageIcons.map(ico => (
                          <button
                            key={ico}
                            onClick={() => {
                              save(w => ({ ...w, pages: w.pages.map(pp => pp.id === activePage.id ? { ...pp, icon: ico } : pp) }))
                              setIconPicker(null)
                            }}
                            className={`w-6 h-6 flex items-center justify-center text-xs rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 ${activePage.icon === ico ? 'bg-zinc-100 dark:bg-zinc-700' : ''}`}
                          >
                            {ico}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight">{activePage.title}</span>
                <span className="text-[10px] text-zinc-300 dark:text-zinc-600 uppercase tracking-wider ml-1 font-mono">{activePage.view}</span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setAddingBlock('__end__') }}
                  className="px-2.5 py-1 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  + Blocco
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-colors"
                >
                  📎
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0]
                    if (file && activePage) handleFileUpload(activePage.id, null, file)
                    e.target.value = ''
                  }}
                />
              </div>
            </div>

            {/* Blocks */}
            <div className="flex-1 px-5 py-5 max-w-3xl mx-auto w-full">
              <div className="space-y-1">
                {activePage.blocks.map(block => renderBlock(block, activePage.id))}
              </div>

              {addingBlock === '__end__' && (
                <div className="relative z-20 my-2">
                  <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-lg p-2 w-64">
                    <p className="text-xs text-zinc-400 px-2 py-1">Aggiungi blocco</p>
                    {([['heading', 'Heading'], ['subheading', 'Subheading'], ['text', 'Testo'], ['todo', 'Todo'], ['task-group', 'Gruppo task'], ['query-group', 'Gruppo query'], ['divider', 'Divisore'], ['sticky', 'Post-it']] as const).map(([type, label]) => (
                      <button
                        key={type}
                        onClick={() => addBlockToPage(activePage.id, type)}
                        className="w-full text-left px-2 py-1.5 text-sm rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                      >
                        <span className="mr-2 text-xs">{blockIcons[type]}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick add block at the bottom */}
              <button
                onClick={() => setAddingBlock('__end__')}
                className="mt-4 w-full text-left px-3 py-2 text-sm text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-lg transition-colors"
              >
                ✏️ Aggiungi un blocco... (o scrivi "/" in un blocco)
              </button>

              {/* File upload target at the bottom */}
              <div
                className={`mt-4 border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                  dragOver
                    ? 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800'
                    : 'border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600'
                }`}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); if (activePage) handleDrop(e, activePage.id) }}
              >
                <p className="text-sm text-zinc-400">📎 Trascina file qui o <button onClick={() => fileInputRef.current?.click()} className="text-zinc-600 dark:text-zinc-300 underline">carica</button></p>
              </div>
            </div>
          </>
        )}
      </main>

      {/* File target block selector modal */}
      {targetBlockForFile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={() => setTargetBlockForFile(null)}>
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-700 w-80" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">Allega file dopo il blocco</h3>
            <input
              type="file"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0]
                if (file && activePage) {
                  handleFileUpload(activePage.id, targetBlockForFile, file)
                  setTargetBlockForFile(null)
                }
              }}
              className="block w-full text-sm text-zinc-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:bg-zinc-100 dark:file:bg-zinc-700 file:text-zinc-700 dark:file:text-zinc-300"
            />
            <button onClick={() => setTargetBlockForFile(null)} className="mt-3 text-xs text-zinc-400 hover:text-zinc-600">Annulla</button>
          </div>
        </div>
      )}
    </div>
  )
}
