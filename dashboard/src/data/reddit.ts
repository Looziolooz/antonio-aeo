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

export const defaultRedditBlocks: Block[] = [
  b('rd-h', 'heading', 'Gruppi Reddit + raccomandazioni — Antonio Pileggi'),
  b('rd-intro', 'text', 'A cosa serve: una lista operativa dei subreddit giusti per il posizionamento di Antonio (destination, Maida/Sud Italia, pellicola 35mm e VHS, coppie IT/EN), con per ciascuno cosa fare e cosa non fare. Questi gruppi non servono a promuoversi, ma a rispondere da esperto: è così che si ottiene il doppio ritorno — autorità presso le coppie e citazioni dalle AI (Reddit è tra le fonti più citate da Google AI Overviews e ChatGPT).'),
  b('rd-warn', 'text', '⚠️ Verifica sempre le regole (sidebar/wiki) di ogni gruppo prima di scrivere: cambiano, e diversi subreddit vietano del tutto l’autopromozione dei fornitori.'),
  b('rd-d1', 'divider', ''),

  b('rd-ah', 'subheading', 'A. Dove ci sono le coppie — autorità + AEO (rispondi, non promuovere)'),
  b('rd-atg', 'task-group', 'A. Sub delle coppie (solo valore, MAI portfolio)', {
    children: [
      b('rd-a1', 'todo', 'r/weddingplanning — il più grande bacino di coppie in pianificazione. Fai: come scegliere il fotografo, pellicola vs digitale, quando prenotare, cosa aspettarsi nella consegna. Non fare: linkare il portfolio o proporti.'),
      b('rd-a2', 'todo', 'r/destinationwedding — cuore del posizionamento: coppie (spesso estere) verso l’Italia. Fai: logistica destination (permessi, stagioni, meteo, location Sud Italia), local vs fotografo portato da casa. Non fare: promo.'),
      b('rd-a3', 'todo', 'r/BigBudgetBrides — fascia alta, il suo segmento luxury. Fai: cosa giustifica un budget fotografia alto, copertura multi-day, film + video; tono curato. Non fare: vendere/listino.'),
      b('rd-a4', 'todo', 'r/wedding — generalista molto ampio. Fai: valore del racconto autentico e analogico, esperienze. Non fare: spam.'),
      b('rd-a5', 'todo', 'r/weddingvideography — l’angolo film/VHS/video. Fai: wedding film, cosa significa girare in VHS, formati e perché sceglierli.'),
    ],
  }),

  b('rd-bh', 'subheading', 'B. Nicchia pellicola/VHS — il differenziatore (qui spesso si PUÒ mostrare il lavoro)'),
  b('rd-btg', 'task-group', 'B. Sub pellicola/VHS (lavoro reale benvenuto)', {
    children: [
      b('rd-b1', 'todo', 'r/AnalogCommunity e r/analog — community forti su pellicola. Fai: scatti reali su pellicola (matrimoni dove le regole lo permettono), pellicole usate, scelte tecniche.'),
      b('rd-b2', 'todo', 'r/35mm — specifico per il suo formato. Fai: condividi 35mm, ragiona di resa, grana, atmosfera.'),
      b('rd-b3', 'todo', 'r/AnalogVideo e r/VHS — pochissimi fotografi di matrimonio li presidiano. Fai: clip dei wedding film in VHS. Angolo a concorrenza quasi nulla, alto "wow", rafforza l’entità "fotografo che gira matrimoni in VHS in Italia" (utile lato AI).'),
      b('rd-b4', 'todo', 'r/cinematography — taglio cinematografico. Fai: discussioni estetiche/tecniche sul look dei film.'),
    ],
  }),

  b('rd-ch', 'subheading', 'C. Locale / geografico — coppie estere che cercano il Sud Italia'),
  b('rd-ctg', 'task-group', 'C. Sub locali (competenza territoriale)', {
    children: [
      b('rd-c1', 'todo', 'r/ItalyTravel — coppie e viaggiatori che chiedono dell’Italia. Fai: rispondi da local su Calabria, Tropea, Costa degli Dei, quando venire, location e tempistiche. Non fare: promo diretta.'),
      b('rd-c2', 'todo', 'r/italy — generalista italiano, regole severe sul self-promo. Fai: valore locale, consigli; menzione del lavoro solo se davvero pertinente.'),
      b('rd-c3', 'todo', 'r/Calabria — territorio diretto. Fai: zone, borghi, spiagge, periodi migliori; sei di Maida, è il tuo campo.'),
      b('rd-c4', 'todo', 'r/Sicily — mete destination vicine (Taormina, ecc.). Fai: location e logistica siciliane.'),
    ],
  }),

  b('rd-dh', 'subheading', 'D. Colleghi / fornitori — networking e referral (non clienti)'),
  b('rd-dtg', 'task-group', 'D. Sub colleghi/fornitori (networking)', {
    children: [
      b('rd-d1a', 'todo', 'r/wedding_vendors — uno dei pochi che ammette i fornitori. Fai: portfolio (regole permettendo), confronto, relazioni e referral.'),
      b('rd-d2a', 'todo', 'r/weddingphotography — mix colleghi e coppie. Fai: reputazione di settore, critiche costruttive, networking.'),
      b('rd-d3a', 'todo', 'r/photography e r/AskPhotography — community ampie. Fai: rispondi a domande tecniche, costruisci reputazione; il link sta nel profilo.'),
    ],
  }),
  b('rd-d2', 'divider', ''),

  b('rd-rh', 'subheading', 'Regole d’ingaggio (checklist anti-ban)'),
  b('rd-rtg', 'task-group', 'Regole anti-ban', {
    children: [
      b('rd-r1', 'todo', 'Storia prima di tutto: 2–4 settimane di sola partecipazione genuina prima di qualsiasi accenno a te stesso. Un account nuovo che promuove viene bannato subito.'),
      b('rd-r2', 'todo', 'Valore reale e specifico: rispondi con conoscenza concreta (Calabria, permessi, pellicola/VHS), non con genericità.'),
      b('rd-r3', 'todo', 'Link nel profilo, non nei commenti.'),
      b('rd-r4', 'todo', 'Rapporto ~10:1 tra contributi utili e qualsiasi accenno promozionale.'),
      b('rd-r5', 'todo', 'Trasparenza: quando dai un parere da addetto ai lavori, dichiara che sei un fotografo.'),
      b('rd-r6', 'todo', 'Mai portfolio nei sub delle coppie (r/weddingplanning, r/destinationwedding, r/BigBudgetBrides): lì si risponde e basta.'),
      b('rd-r7', 'todo', 'Leggi le regole di OGNI sub prima di postare; alcuni vietano del tutto i vendor.'),
      b('rd-r8', 'todo', 'Niente trucchi: nessun account multiplo, voti finti o DM promozionali non richiesti.'),
      b('rd-r9', 'todo', 'Un sub alla volta: meglio essere una presenza riconosciuta in 3–4 gruppi che invisibile in dodici.'),
    ],
  }),

  b('rd-ph', 'subheading', 'Da dove iniziare (priorità)'),
  b('rd-pa', 'text', 'Tre cluster dove Antonio ha più da guadagnare e meno concorrenza:\n1. Nicchia VHS/pellicola — r/AnalogCommunity, r/VHS, r/35mm: mostra l’unicità e può condividere lavoro reale.\n2. Destination + locale — r/destinationwedding, r/ItalyTravel, r/Calabria: competenza territoriale difficile da imitare.\n3. Networking — r/wedding_vendors: relazioni e referral.\nGli altri si aggiungono man mano che cresce la sua presenza.'),

  b('rd-mh', 'subheading', 'Come misurare se funziona'),
  b('rd-ma', 'text', '• Traffico referral da reddit.com in GA4 (e comportamento in Microsoft Clarity).\n• Comparsa nelle citazioni AI nel tempo (test del protocollo domande-AI).\n• Contatti che menzionano Reddit o che arrivano dal profilo.'),
]
