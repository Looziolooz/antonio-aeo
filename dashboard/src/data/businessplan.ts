import type { Block } from './types'

// Helper: builds a fully-typed Block with sensible defaults so the page data
// below stays readable. `extra` carries children for task/query groups.
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

export const defaultBusinessPlanBlocks: Block[] = [
  b('bp-h', 'heading', 'Marketing Plan operativo — Antonio Pileggi (orizzonte 12 mesi)'),
  b('bp-meta', 'text', 'Attività: fotografo di matrimoni destination · Maida (Catanzaro, Calabria) · digitale, pellicola 35mm, VHS · coppie italiane e internazionali. Periodo: 12 mesi (Q1–Q4). Approccio: crescita organica AEO/SEO a costo quasi nullo, esecuzione potenziata con Claude Cowork. Documenti collegati: Strategia AEO/SEO, Strumenti AI, Toolkit gratuito, Motore reciprocità partner, Piano operativo a due, Protocollo monitoraggio AI.'),
  b('bp-d1', 'divider', ''),

  b('bp-1h', 'subheading', '1. Executive summary'),
  b('bp-1a', 'text', 'Obiettivo: aumentare la visibilità di Antonio nelle ricerche tradizionali e nelle risposte delle AI, rafforzare autorità e reputazione, e convertire questa visibilità in richieste qualificate e prenotazioni. La leva non è la pubblicità a pagamento ma un sistema organico — recensioni, dati strutturati, contenuti editoriali bilingue, coerenza di entità, reciprocità con i partner e social sistematici — i cui costi-strumento sono quasi nulli e i cui asset (contenuti, backlink, recensioni) si accumulano nel tempo. Con un valore medio per matrimonio nel range di settore 2026 (€3.500–€8.000), basta 1 prenotazione aggiuntiva all’anno per ripagare l’intero piano, e l’obiettivo realistico è di +2/3.'),
  b('bp-d2', 'divider', ''),

  b('bp-2h', 'subheading', '2. Posizionamento e target'),
  b('bp-2a', 'text', 'Posizionamento: fotografo destination di fascia alta, con un linguaggio distintivo (digitale + pellicola + VHS) e un’identità precisa: atmosfera, famiglia, memoria, senso del luogo. Forte radicamento territoriale nel Sud Italia, con base a Maida.'),
  b('bp-2b', 'text', 'Target primario: coppie (italiane ed estere) che organizzano matrimoni destination in Calabria, Sicilia, Puglia, Toscana; sensibili all’autenticità e al racconto, non al "trend".'),
  b('bp-2c', 'text', 'Target B2B: wedding planner e venue di lusso (canale di referral ad alto valore). Vantaggio difendibile: nicchia pellicola/VHS + autorità locale calabrese a bassa concorrenza.'),
  b('bp-d3', 'divider', ''),

  b('bp-3h', 'subheading', '3. Obiettivi SMART (12 mesi)'),
  b('bp-3t', 'text', `| # | Obiettivo | Baseline (Mese 0) | Target 6 mesi | Target 12 mesi |
|---|-----------|-------------------|---------------|----------------|
| O1 | Recensioni Google | 12 | 30+ | 40+ |
| O2 | Sessioni organiche al sito (GA4) | da rilevare | +40% | +80–100% |
| O3 | Richieste di contatto qualificate | da rilevare | +1–2/mese | +2–3/mese |
| O4 | Visibilità AI (query in cui è citato) | baseline col protocollo | 3+ | 6+ |
| O5 | Backlink/feature editoriali | ~directory attuali | +3 | +6 |
| O6 | Prenotazioni attribuibili (KPI economico) | — | — | +2 / +3 |`),
  b('bp-3n', 'text', 'O2, O3 e O4 vanno agganciati alla baseline rilevata nel Mese 0 (Search Console, GA4, Microsoft Clarity, protocollo domande-AI). Senza baseline non c’è ROI dimostrabile: è il primo passo.'),
  b('bp-d4', 'divider', ''),

  b('bp-4h', 'subheading', '4. Strategia in sintesi (gli 8 pilastri)'),
  b('bp-4a', 'text', '1. Recensioni + Google Business Profile — motore di fiducia e di citazioni AI.\n2. Dati strutturati (schema) + FAQ — rende l’entità leggibile da Google e dalle AI.\n3. Contenuti editoriali bilingue — real wedding, guide-location, pagina pilastro VHS.\n4. Coerenza di entità / be-everywhere — NAP e bio identici sui profili, directory complete.\n5. Motore di reciprocità partner — crediti fornitori + feature kit → backlink e referral.\n6. Social sistematici — 3 pilastri di contenuto, calendario, formati che generano discussione.\n7. Strumenti AI gratuiti — Pomelli, Flow, NotebookLM, e toolkit free per produrre di più, meglio.\n8. Monitoraggio — GSC, GA4, Clarity + test mensile citazioni AI.'),
  b('bp-4n', 'text', 'Dettaglio operativo nei documenti collegati (Strategia AEO, Toolkit, Reciprocità, Piano operativo, Protocollo).'),
  b('bp-d5', 'divider', ''),

  b('bp-5h', 'subheading', '5. KPI dashboard'),
  b('bp-5t', 'text', `| KPI | Strumento di misura | Cadenza |
|-----|---------------------|---------|
| Recensioni Google (numero + sentiment) | Google Business Profile | Mensile |
| Sessioni organiche, sorgenti, conversioni a Contact | GA4 | Mensile |
| Query, impressioni, clic, posizione media | Search Console | Mensile |
| Comportamento sul sito / drop-off | Microsoft Clarity | Mensile |
| Citazioni AI (query target IT/EN) | Protocollo domande-AI | Mensile |
| Backlink in arrivo | Ahrefs Webmaster Tools / GSC | Mensile |
| Traffico referral partner (campagna vendor-feature) | GA4 (UTM) | Mensile |
| Richieste qualificate e prenotazioni | CRM/foglio + Antonio | Mensile |`),
  b('bp-d6', 'divider', ''),

  b('bp-6h', 'subheading', '6. Budget (12 mesi)'),
  b('bp-6a', 'text', 'La quasi totalità degli strumenti è gratuita; i costi "duri" sono minimi. La voce variabile principale è il compenso di consulenza, che decide Lorenzo.'),
  b('bp-6t', 'text', `| Voce | Tipo | Costo annuo indicativo | Note |
|------|------|------------------------|------|
| Claude Pro (motore Cowork) | Hard | ~€240 | Esecuzione contenuti/report; ~€20/mese |
| Upgrade Pixieset (Website-Pro) | Hard | ~€200 | Sblocca header code (schema, GSC, analytics). Verifica piano/prezzo |
| Canva Pro (opzionale) | Opzionale | ~€110 | Solo se serve per connettore/grafiche avanzate |
| GSC, GA4, Clarity, Trends, AlsoAsked, NotebookLM, Flow, Metricool, Meta Suite, SoS, LinkedIn, DaVinci, Audacity, Pinterest… | Gratis | €0 | Il cuore operativo |
| Subtotale strumenti | | ~€440–€550 | ≈ €37–€46/mese |
| Meta Ads (opzionale, stagionale) | Opzionale | €0 → €600–€1.800 | Solo per spinte mirate ("Now booking"); spesa con gate umano |
| Compenso consulenza (Lorenzo) | Variabile | da definire | Tipicamente a retainer mensile; voce principale |`),
  b('bp-6n', 'text', 'Lettura: al netto della consulenza, gestire l’intero impianto costa quanto un paio di caffè a settimana. È un piano deliberatamente capital-light: l’investimento vero è tempo e metodo, non spesa pubblicitaria.'),
  b('bp-d7', 'divider', ''),

  b('bp-7h', 'subheading', '7. Modello ROI'),
  b('bp-7a', 'text', 'Assunzioni (da validare con i dati reali di Antonio): valore medio per matrimonio (ABV) ipotesi prudente €4.500 (riferimenti settore 2026: destination esperto in Italia ~€3.500–€8.000/giorno, luxury oltre €10.000 — Antonio inserisce il dato reale). Costo annuo del piano: strumenti ~€500 + eventuale consulenza; esempio €5.000/anno totali. Funnel illustrativo: più visibilità → più richieste qualificate → più prenotazioni (i tassi vanno misurati).'),
  b('bp-7b', 'text', 'Break-even: con ABV €4.500 e costo totale €5.000, il break-even è ~1,1 matrimoni aggiuntivi/anno. Sui soli strumenti (~€500) basta circa il 10% di un singolo matrimonio. Soglia bassissima per un’attività di questo valore unitario.'),
  b('bp-7t', 'text', `Scenari a 12 mesi (costo totale ipotizzato €5.000):

| Scenario | Prenotazioni agg. | Ricavo agg. (ABV €4.500) | Netto | ROI |
|----------|-------------------|--------------------------|-------|-----|
| Conservativo | +1 | €4.500 | ~−€500 (≈ pareggio) | ~0% (ma asset costruiti) |
| Atteso | +3 | €13.500 | +€8.500 | ~170% |
| Ottimistico | +5 | €22.500 | +€17.500 | ~350% |`),
  b('bp-7c', 'text', 'Valore non monetario: gli asset prodotti — recensioni, contenuti evergreen, backlink editoriali, entità pulita per le AI — non si consumano: continuano a generare visibilità negli anni successivi, abbassando il costo di acquisizione nel tempo. È un investimento che compone.'),
  b('bp-7n', 'text', 'Nota di onestà: questi numeri sono un modello, non una promessa. Servono a (a) mostrare che la soglia di convenienza è molto bassa e (b) dare ad Antonio un metro per giudicare i risultati reali rispetto alle assunzioni.'),
  b('bp-d8', 'divider', ''),

  b('bp-8h', 'subheading', '8. Timeline 12 mesi'),
  b('bp-8a', 'text', 'Q1 — Fondamenta + entità. Setup tecnico (Pixieset Pro, GSC, GA4, Clarity, schema), GBP ottimizzato, coerenza entità sui profili, pagina FAQ, avvio motore recensioni. Baseline completa (incl. protocollo AI). Output: la macchina è leggibile e misurabile.'),
  b('bp-8b', 'text', 'Q2 — Contenuti + reciprocità. Primi real wedding e guide-location bilingue, pagina VHS, avvio social con Metricool, feature kit partner e prime richieste di reciprocità. Primo report trimestrale. Output: il sito diventa fonte autorevole.'),
  b('bp-8c', 'text', 'Q3 — Scaling + autorità. Ritmo editoriale a regime (1 contenuto/2 settimane declinato su audio/video/grafiche), prime submission editoriali (Wedding Sparrow/Junebug), relazioni B2B su LinkedIn, uso pieno degli strumenti AI. Output: backlink e citazioni AI in crescita.'),
  b('bp-8d', 'text', 'Q4 — Misura + ottimizzazione. Confronto annuale dei KPI vs baseline, doppio sulle leve che hanno reso, decisione (eventuale) su un layer di Meta Ads stagionale per "Now booking". Output: bilancio e piano anno 2.'),
  b('bp-d9', 'divider', ''),

  b('bp-9h', 'subheading', '9. Governance e cadenza'),
  b('bp-9a', 'text', 'Ruoli: Cowork esegue (bozze, ricerca, report), Lorenzo dirige e approva, Antonio fornisce materia prima, voce, recensioni e relazioni. Check mensile (30 min): report KPI → 3 priorità del mese successivo. Business review trimestrale: confronto con baseline e obiettivi, ricalibrazione.'),
  b('bp-d10', 'divider', ''),

  b('bp-10h', 'subheading', '10. Rischi e assunzioni'),
  b('bp-10a', 'text', '• Vincoli di piattaforma (Pixieset): controllo tecnico limitato; mitigato con header code (piano Pro) e dati strutturati.\n• Dipendenza dalla materia prima: il collo di bottiglia è la consegna di foto/storie/fornitori da parte di Antonio; mitigato con cartella condivisa e flusso semplice.\n• Recensioni: richiedono l’azione personale di Antonio; vanno chieste con costanza (mai fabbricate).\n• Cambi di algoritmo/AI: l’ecosistema AEO è giovane e muta; mitigato puntando su fondamentali durevoli (autorità, recensioni, entità) e sul monitoraggio mensile.\n• Stagionalità: la domanda wedding è stagionale; calendario editoriale e ads sincronizzati con i picchi.\n• Ads a pagamento (se attivati): rischio spesa/ban se gestiti male; mitigato con gate umano, connettore ufficiale e nessun cambio brusco di budget.\n• ROI: basato su assunzioni (ABV, conversioni) da validare con i dati reali nei primi mesi.'),
]
