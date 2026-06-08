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

export const defaultPiattaformeBlocks: Block[] = [
  b('pf-h', 'heading', 'Altre piattaforme per audience e visibilità — Antonio Pileggi'),
  b('pf-intro', 'text', 'Filo conduttore: coerenza prima di copertura. Meglio poche piattaforme presidiate bene, con la stessa voce, lo stesso aspetto e una cadenza sostenibile, che tante presìdi a metà. Niente spam: su ognuna si entra per dare valore o mostrare lavoro autentico. Si aggiungono a quanto già previsto (social, directory wedding, editoriali fine-art, Reddit/Quora, newsletter).'),
  b('pf-d1', 'divider', ''),

  b('pf-1h', 'subheading', '1. Premi e directory di fotografia documentaristica / reportage — la leva più on-brand'),
  b('pf-1a', 'text', 'L’aggiunta più forte: premia esattamente ciò che fa (momenti veri, atmosfera, racconto). Directory di membri dove coppie e planner cercano + contest periodici: prestigio, badge, backlink autorevoli, scoperta e citazioni AI (fonti che le AI considerano attendibili).'),
  b('pf-1tg', 'task-group', 'Directory documentaristiche (membership a pagamento)', {
    children: [
      b('pf-1d1', 'todo', 'WPJA — Wedding Photojournalist Association: dal 2002, directory di riferimento del documentario/reportage, contest mensili giudicati da fotogiornalisti.'),
      b('pf-1d2', 'todo', 'This Is Reportage: showcase del miglior reportage ("nulla in posa"), Reportage Awards (frame) e Story Awards (serie) — il taglio "storia" è perfetto per lui.'),
      b('pf-1d3', 'todo', 'Fearless Photographers: piattaforma globale che premia creatività ed emozione autentica.'),
      b('pf-1d4', 'todo', 'ISPWP: contest e directory tra i più riconosciuti al mondo.'),
    ],
  }),
  b('pf-1n', 'text', 'Coerenza/no-spam: invii solo i frame documentaristici migliori. Nota onesta: richiedono membership annuale a pagamento — alto ritorno per prestigio/backlink/directory. Partire con UNA (This Is Reportage o WPJA, le più in linea), aggiungere le altre se rende.'),

  b('pf-2h', 'subheading', '2. TikTok — l’estetica VHS/pellicola è nativa qui'),
  b('pf-2a', 'text', 'Il look analogico e nostalgico funziona organicamente, senza ads, e intercetta coppie giovani in pianificazione. Pubblicare: clip di atmosfera, "stesso momento in 3 formati" (digitale/35mm/VHS), dietro le quinte, micro-racconti. Coerenza: estetica riconoscibile e cadenza regolare > quantità; mostri il modo di vedere, non un’offerta. Stessa bio e handle.'),

  b('pf-3h', 'subheading', '3. Vimeo — la casa "premium" dei suoi film'),
  b('pf-3a', 'text', 'Per i wedding film (e i pezzi VHS) Vimeo è percepito più curato di YouTube, con pubblico di addetti ai lavori, planner e coppie esigenti; gli Staff Picks danno visibilità. Vetrina curata dei film migliori, alta qualità, descrizioni ottimizzate (location, "wedding film VHS"). Pochi film, scelti bene. Affianca YouTube, non lo sostituisce.'),

  b('pf-4h', 'subheading', '4. Gallerie editoriali aggiuntive (per submission)'),
  b('pf-4tg', 'task-group', 'Editoriali aggiuntivi (oltre Junebug/Wedding Sparrow/Magnolia Rouge/Together Journal/Loverly)', {
    children: [
      b('pf-4a', 'todo', 'Style Me Pretty — fine-art classico, enorme pubblico.'),
      b('pf-4b', 'todo', 'Green Wedding Shoes — creativo, artistico, indie/boho.'),
      b('pf-4c', 'todo', 'Ruffled — editoriale, stylish.'),
      b('pf-4d', 'todo', 'Once Wed — fine-art, vintage e DIY raffinato.'),
    ],
  }),
  b('pf-4n', 'text', 'Coerenza/no-spam: si invia il miglior matrimonio reale completo (con team fornitori), non scatti sparsi. Stessa leva editoriale, su più testate.'),

  b('pf-5h', 'subheading', '5. Ospite nei podcast di settore'),
  b('pf-5a', 'text', 'Essere intervistato su podcast wedding/fotografia porta audience e autorità in modo non spammoso (sei invitato) e di solito lascia un backlink nelle note dell’episodio. Proponiti con un angolo raro: "il fotografo che racconta i matrimoni del Sud Italia in pellicola e VHS". L’unicità rende facile dire sì.'),

  b('pf-6h', 'subheading', '6. Threads e Bluesky — social testuali emergenti (presenza leggera)'),
  b('pf-6a', 'text', 'Spazi più giovani dove sono migrate community di fotografi; la conversazione testuale aiuta la scoperta. Riusa il tuo punto di vista (stessi temi di Instagram/newsletter), partecipa. Stessa voce; bassa priorità, da attivare solo se sostenibile.'),

  b('pf-7h', 'subheading', '7. Flipboard / Medium — sindacazione dei contenuti (opzionale)'),
  b('pf-7a', 'text', 'Seconda vita agli articoli (guide-location, pezzo VHS): ripubblicare su Medium (con link canonico al sito) o curare una rivista su Flipboard amplia la scoperta. Contenuto editoriale vero, non riassunti promozionali; sempre con rimando al sito.'),
  b('pf-d2', 'divider', ''),

  b('pf-rh', 'subheading', 'La regola di coerenza (che tiene insieme tutto)'),
  b('pf-ra', 'text', '• Stessa identità ovunque: nome, bio boilerplate IT/EN, handle, aspetto. È ciò che fa riconoscere l’entità a persone e AI.\n• Cadenza sostenibile: un contenuto sorgente ogni due settimane che si declina sulle piattaforme — non dieci profili abbandonati.\n• Valore o lavoro autentico, mai pitch: su ogni piattaforma entri per mostrare il tuo modo di vedere o per aiutare, non per vendere.'),

  b('pf-ph', 'subheading', 'Priorità (da dove partire)'),
  b('pf-pa', 'text', '1. Una directory documentaristica (This Is Reportage o WPJA) — prestigio + backlink + scoperta, on-brand.\n2. TikTok — reach organica con la sua estetica, a costo zero.\n3. Vimeo — casa premium dei film.\n4. Le altre (editoriali aggiuntivi, podcast, Threads/Bluesky, Medium) si aggiungono man mano, senza disperdersi.'),

  b('pf-ch', 'subheading', 'Come si collega al resto'),
  b('pf-ca', 'text', 'Tutte alimentano gli stessi obiettivi del marketing plan: audience (TikTok, Vimeo, podcast), autorità e backlink (directory documentaristiche, editoriali, podcast), entità e citazioni AI (directory autorevoli, presenza coerente). Regola: attivarne una alla volta e presidiarla davvero prima di passare alla successiva.'),
]
