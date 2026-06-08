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

export const defaultSpuntiBlocks: Block[] = [
  b('sp-h', 'heading', 'Spunti dal Review CEO — raccomandazioni strategiche (giugno 2026)'),
  b('sp-intro', 'text', 'Output del review /plan-ceo-review in modalità SELECTIVE EXPANSION. La strategia è stata tenuta come baseline e irrobustita; sono state aggiunte 4 espansioni e 5 guardrail. Verifica landscape AEO 2026 inclusa: i tre pilastri (recensioni, schema/FAQ, contenuti bilingue) sono confermati dai dati di mercato.'),
  b('sp-d1', 'divider', ''),

  b('sp-1h', 'subheading', 'Approccio scelto: Ruthless Wedge'),
  b('sp-1a', 'text', 'Concentrare l’off-season sulle 3 mosse a più alta leva e più rapide alla citazione, sequenziando il resto a fase 2. Le 3 mosse: (1) motore recensioni + GBP, (2) schema JSON-LD + FAQ + coerenza entità, (3) possedere la categoria VHS/pellicola. Volume contenuti, B2B e social sistematici → fase 2.'),

  b('sp-2h', 'subheading', 'La mossa 10x: Category Ownership (VHS/pellicola)'),
  b('sp-2a', 'text', 'Non competere nella corsa affollata "fotografo matrimonio Calabria" (50+ rivali). Diventare l’entità di riferimento che DEFINISCE la categoria "wedding film in VHS / 35mm in Italia", in IT ed EN, così che ogni AI che spiega la categoria citi Antonio. ~2x sforzo (riframing + concentrazione di asset già esistenti: @LoveOnVHS, expertise), 10x posizionamento. Concretamente: una cornerstone "Cos’è un wedding film in VHS" (pagina + YouTube fissato + FAQ) costruita per essere citata (frase-definizione iniziale, blocchi domanda-risposta da 40–60 parole).'),

  b('sp-3h', 'subheading', '4 espansioni accettate'),
  b('sp-3tg', 'task-group', '4 espansioni accettate (entrano nello scope)', {
    children: [
      b('sp-3a', 'todo', 'E1 — Cornerstone categoria VHS/35mm (vedi mossa 10x): pagina definitoria IT/EN + YouTube fissato + FAQ.'),
      b('sp-3b', 'todo', 'E2 — Reddit/Quora: presenza autentica (~3-5 thread/mese in r/weddingphotography, r/destinationweddings, forum IT, Quora). Perplexity pesca molto da Reddit. Mai link-drop: link solo nella bio profilo.'),
      b('sp-3c', 'todo', 'E3 — Estrai dalle 39 recensioni esistenti (12 Google + 27 Matrimonio.com) le frasi più ricche → testimonianze on-site (nome+location) con schema Review. Richiede consenso GDPR scritto.'),
      b('sp-3d', 'todo', 'E4 — Dashboard come command center (dead-simple): 3 viste — tracker recensioni (12→30), pipeline contenuti, log mensile AEO score. Niente automazioni finché la versione manuale non si dimostra utile.'),
    ],
  }),

  b('sp-4h', 'subheading', '5 guardrail anti-fallimento silenzioso'),
  b('sp-4tg', 'task-group', '5 guardrail (fold-in nel wedge)', {
    children: [
      b('sp-4a', 'todo', 'Audit trimestrale NAP/entità su tutte le 10 proprietà (chiude il fallimento silenzioso #1: un profilo modificato → entità frammentata → le AI si confondono).'),
      b('sp-4b', 'todo', 'Validare ogni blocco JSON-LD nel Rich Results Test PRIMA di pubblicarlo su Pixieset.'),
      b('sp-4c', 'todo', 'Consenso GDPR scritto ed esplicito da ogni coppia prima di ripubblicare nome+location come testimonianza (E3).'),
      b('sp-4d', 'todo', 'Gate di buon senso sulla richiesta recensione: non inviarla alle coppie con esperienza negativa; un solo follow-up (non insistere).'),
      b('sp-4e', 'todo', 'Playbook di continuità (una pagina) + handoff via dashboard, così il motore sopravvive se il consulente si ferma (single-point-of-failure).'),
    ],
  }),

  b('sp-5h', 'subheading', 'Gate-zero: piano Pixieset + fallback'),
  b('sp-5a', 'text', 'Prima di programmare qualsiasi lavoro di schema/GSC/GA4: verificare che Antonio sia su Pixieset Website-Pro/Suite. Se NON lo è, il livello header-code è BLOCCATO. Fallback che parte comunque (senza header): ottimizzazione GBP, coerenza NAP/bio sulle 10 proprietà, testo FAQ on-page (senza schema). Gli elementi header-dependent aspettano la decisione di upgrade.'),

  b('sp-6h', 'subheading', 'Monitoraggio ri-stimato'),
  b('sp-6a', 'text', 'Il "30 min/mese" del protocollo è sottostimato per l’intera matrice. Stima reale: baseline Mese 0 (Blocchi 1-5, 20+ query × 5 motori × 2 lingue ≈ 200+ check) ~3-4 ore; sottoinsieme mensile reattivo (solo Blocco 1 visibilità + Blocco 3 accuratezza) ~60-90 min; re-baseline completa trimestrale ~3-4 ore. Il logger dashboard copre il sottoinsieme mensile, non l’intera matrice ogni mese.'),

  b('sp-7h', 'subheading', 'Correzioni dal review'),
  b('sp-7a', 'text', '• Profili: sono 10, non 9 (sito, Instagram, Facebook, YouTube, Pinterest, Google/GBP, Matrimonio.com, Together Journal, Loverly, MyWed). Lo schema sameAs ne porta 8 (esclude sito e GBP).\n• Numeri recensioni: 39 = pool per le testimonianze (12 Google + 27 Matrimonio); il target del motore recensioni è SOLO Google (12 → 30+).\n• GBP: l’ottimizzazione Google Business Profile è parte della Mossa 1, non un dettaglio (Gemini prioritizza i GBP).\n• Baseline Mese 0: è un deliverable nominato, non implicito — è la "foto del prima".'),

  b('sp-8h', 'subheading', 'Modello operativo (deciso)'),
  b('sp-8a', 'text', 'Collaborazione privata. Lorenzo = consulente/collaboratore indipendente di Antonio (Savant Media NON coinvolta). Ibrido a guida-consulente: il consulente cura setup tecnico, monitoraggio, drafting contenuti, setup Reddit/Quora, dashboard; Antonio scatta, approva, fornisce voce autentica e materia prima, invia le richieste di recensione alla consegna gallery. Entrambi hanno tempo limitato → focus wedge + dashboard dead-simple + pre-produzione stagionale sono portanti.'),

  b('sp-9h', 'subheading', 'Prerequisiti da risolvere prima'),
  b('sp-9tg', 'task-group', 'Prerequisiti (gate prima del build)', {
    children: [
      b('sp-9a', 'todo', 'Piano Pixieset (GATE-ZERO): verificare Website-Pro/Suite prima di qualsiasi lavoro schema/GSC/GA4.'),
      b('sp-9b', 'todo', 'Consenso ripubblicazione recensioni (GDPR) prima di E3.'),
      b('sp-9c', 'todo', 'Baseline funnel (richieste/anno, tasso di chiusura, valore medio) — opzionale, declinato in review: serve a capire se il collo di bottiglia è scoperta o conversione.'),
    ],
  }),

  b('sp-10h', 'subheading', 'Fase 2 / differiti'),
  b('sp-10a', 'text', 'Cherry-pick differiti (disponibili su richiesta): reframe Social-as-AEO (caption/descrizioni come Q&A citabili); elevazione del funnel EN coppie internazionali (valore più alto, meno concorrenza). Fase 2 sequenziata: volume contenuti oltre le cornerstone, pipeline B2B venue/planner, social sistematizzato completo, motore di riciclo "uno a molti", newsletter. Declinati: soglia decisionale a 3 mesi; cattura baseline funnel.'),
]
