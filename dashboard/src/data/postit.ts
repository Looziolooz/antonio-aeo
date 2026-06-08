import type { Block } from './types'

export const defaultPostitBlocks: Block[] = [
  { id: 'pt-h', type: 'heading', content: 'Post-it — idee, promemoria e note veloci', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-intro', type: 'text', content: 'Usa i Post-it per appunti veloci, idee da condividere, promemoria di squadra. Aggiungine di nuovi con il bottone "+ Post-it" o scrivendo "/" in un blocco.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-note1', type: 'sticky', content: 'Prossimo traguardo: 30 recensioni Google entro 3 mesi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'yellow' },
  { id: 'pt-note2', type: 'sticky', content: 'Chiedere ad Antonio le foto del matrimonio Tropea per il prossimo real wedding', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'pink' },
  { id: 'pt-note3', type: 'sticky', content: 'Verificare citazioni AI su Gemini e Perplexity — protocollo AEO', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'blue' },
  { id: 'pt-note4', type: 'sticky', content: 'Contattare Villa Rosa per reciprocità link — preparare feature kit', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'green' },
  { id: 'pt-note5', type: 'sticky', content: 'Scrivere guida "Dove sposarsi in Costa degli Dei" — bozza IT/EN', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'purple' },
  { id: 'pt-note6', type: 'sticky', content: 'Preparare scaletta episodio pilota NotebookLM + registro podcast', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'orange' },
  { id: 'pt-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-team', type: 'subheading', content: 'Spazio team — note e aggiornamenti condivisi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'pt-team1', type: 'sticky', content: '👤 Antonio: la prossima settimana carico le foto del matrimonio in Puglia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'blue' },
  { id: 'pt-team2', type: 'sticky', content: '👤 Consulente: monitoraggio AEO completato — visibility score migliorato del 15%', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'green' },
  { id: 'pt-team3', type: 'sticky', content: '👤 Cowork: report mensile pronto in 04-report/report-2026-06.md — da revisionare', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], color: 'purple' },
]
