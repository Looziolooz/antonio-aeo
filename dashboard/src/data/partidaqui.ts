import type { Block } from './types'

function b(id: string, type: Block['type'], content: string, extra: Partial<Block> = {}): Block {
  return {
    id,
    type,
    content,
    done: false,
    comments: [],
    fileName: '',
    fileData: '',
    fileType: '',
    collapsed: false,
    children: [],
    ...extra,
  }
}

export const defaultPartiDaQuiBlocks: Block[] = [
  b('pq-h', 'heading', 'Parti da qui — indice generale e kickoff'),
  b('pq-intro', 'text', 'Il punto di partenza del progetto: collega tutti i documenti e dà la checklist concreta dei primi 10-14 giorni. Regola: niente resta sospeso. La priorità #1 è una sola — far compilare ad Antonio il Questionario Discovery, perché sblocca tutto il resto (oggi il piano è ottimo ma tarato su ipotesi).'),
  b('pq-d1', 'divider', ''),

  b('pq-maph', 'subheading', 'Mappa dei documenti (cosa trovi e dove)'),
  b('pq-map1', 'text', `STRATEGIA
| Documento | A cosa serve |
|-----------|--------------|
| Overview | Sintesi della strategia AEO/SEO |
| Strategia AEO | I 9 pilastri in dettaglio |
| Business Plan | Piano 12 mesi: obiettivi, KPI, budget, ROI |
| Spunti dal Review | Raccomandazioni del review CEO (wedge, category ownership, guardrail) |
| Query AI | Il protocollo di monitoraggio (le domande da fare alle AI) |`),
  b('pq-map2', 'text', `RISORSE
| Documento | A cosa serve |
|-----------|--------------|
| Strumenti AI | Pomelli, Flow, NotebookLM e simili |
| Toolkit | Strumenti gratuiti per ricerca, tecnica, contenuti |
| Guida AEO | Setup Claude Desktop + Cowork per Antonio |
| Parole Chiave | Keyword IT/EN ad alto valore per i contenuti |
| Glossario | Tutte le sigle e i termini spiegati |`),
  b('pq-map3', 'text', `COMMUNITY E GRUPPI · MONITORAGGIO · OPERATIVO · SPAZIO LIBERO
| Documento | A cosa serve |
|-----------|--------------|
| Gruppi Reddit / Altre Piattaforme / 50+ Community | Dove presidiare (be-everywhere) |
| Baseline AI — Giu 2026 | La "foto del prima": Antonio = 0 citazioni AI |
| Cronoprogramma / Database | Kanban e tabella dei task |
| Piano Operativo / Reciprocità Partner | Chi fa cosa (Lorenzo/Antonio) + motore partner |
| Questionario Discovery | I numeri e gli obiettivi reali di Antonio (DA COMPILARE per primo) |
| Claude Cowork / Post-it | Esecuzione con l'AI + note libere |`),
  b('pq-d2', 'divider', ''),

  b('pq-ordh', 'subheading', 'Ordine di lettura consigliato'),
  b('pq-ord', 'text', 'Per Antonio (cliente): Parti da qui → Questionario Discovery (compilalo) → Business Plan → Guida AEO (per installare Claude). Per Lorenzo (consulente): Parti da qui → Spunti dal Review → Strategia AEO → Piano Operativo → Baseline AI.'),
  b('pq-d3', 'divider', ''),

  b('pq-kh', 'subheading', 'Checklist — primi 10-14 giorni'),
  b('pq-ktg', 'task-group', 'Kickoff (in ordine)', {
    children: [
      b('pq-k1', 'todo', 'GATE — Antonio compila il Questionario Discovery (numeri, ABV reale, obiettivi, piano Pixieset). Sblocca tutto il resto.'),
      b('pq-k2', 'todo', 'Verificare il piano Pixieset: è Website-Pro/Suite? Se no, decidere l’upgrade (serve per header code = schema/GSC/GA4).'),
      b('pq-k3', 'todo', 'Accessi: Antonio aggiunge Lorenzo su GBP, Google Search Console, GA4, editor Pixieset e profili (via Metricool).'),
      b('pq-k4', 'todo', 'Baseline: collegare GA4 + GSC e completare il test citazioni AI (già avviato in Baseline AI).'),
      b('pq-k5', 'todo', 'GBP: categoria primaria "Fotografo di matrimoni", aree servite, descrizione IT/EN, primo post.'),
      b('pq-k6', 'todo', 'NAP + bio boilerplate identici sui 10 profili (sito, IG, FB, YT, Pinterest, Google, Matrimonio.com, Together, Loverly, MyWed).'),
      b('pq-k7', 'todo', 'Schema JSON-LD ProfessionalService nell’header (se Pixieset Pro) + validazione col Rich Results Test.'),
      b('pq-k8', 'todo', 'Pagina FAQ IT/EN + schema FAQPage (10 domande).'),
      b('pq-k9', 'todo', 'Motore recensioni: link breve Google + template; Antonio chiede alle ultime 5 coppie.'),
      b('pq-k10', 'todo', 'GDPR: raccogliere il consenso scritto delle coppie alla pubblicazione (sblocca real wedding e testimonianze).'),
    ],
  }),
  b('pq-d4', 'divider', ''),

  b('pq-gaph', 'subheading', 'I buchi noti da chiudere (dal review onesto)'),
  b('pq-gap', 'text', `| # | Gap | Stato |
|---|-----|-------|
| 1 | Dati reali di partenza (numeri, ABV, obiettivi, Pixieset) | → Questionario Discovery (in corso) |
| 2 | Conversione e offerta (pacchetti, cattura contatti, processo risposta, CRM/nurture) | da costruire (Playbook conversione) |
| 3 | Esecuzione: nulla ancora realizzato sul sito vivo (schema, FAQ, real wedding…) | da fare dopo il gate Pixieset |
| 4 | GDPR e diritti d'immagine (consensi, privacy, cookie, newsletter) | da strutturare |
| 5 | Analisi concorrenza vera (chi presidia film/destination in Calabria/Italia) | parziale (vedi Baseline AI) |
| 6 | Identità visiva + pagina storia/About personale | da definire |
| 7 | Attribuzione ("come ci hai conosciuto?" + UTM sistematici) | da impostare |
| 8 | Indice unico + kickoff | ✓ questa pagina |`),
  b('pq-note', 'text', 'Il difetto strutturale da tenere a mente: finora la strategia è quasi tutta "a monte" (farsi trovare). Il valore vero è "a valle" (trasformare le richieste in prenotazioni). Dopo la discovery, la priorità è il Playbook conversione.'),
]
