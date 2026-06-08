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

export const defaultCommunityWeddingBlocks: Block[] = [
  b('cw-h', 'heading', '50+ community e piattaforme internazionali per matrimoni in Italia — Antonio Pileggi'),
  b('cw-intro', 'text', 'Come usare questa lista (importante): sono piattaforme reali e note, ma verifica sempre URL, pagina di submission e regole attuali prima di agire (cambiano spesso). Non tutte accettano proposte non sollecitate; alcune sono directory a pagamento, altre editoriali con submission gratuita o a invito. Non puntarle tutte: scegli per coerenza col posizionamento (film/pellicola/VHS, fine-art, documentaristico, destination Sud Italia), parti da poche di prestigio e presidiale bene. Regola d’oro: si entra per mostrare lavoro autentico o dare valore, mai spam.'),
  b('cw-leg', 'text', '⭐ = particolarmente in linea col brand di Antonio (fine-art / film / documentaristico / destination Italia).'),
  b('cw-d1', 'divider', ''),

  b('cw-ah', 'subheading', 'A. Italia / destination Italia (pubblico internazionale)'),
  b('cw-atg', 'task-group', 'A. Italia / destination Italia', {
    children: [
      b('cw-a1', 'todo', 'junebugweddings.com ⭐ — categoria "Italy", directory fornitori + submission real wedding; pubblico globale.'),
      b('cw-a2', 'todo', 'weddingsitaly.com — portale destination Italy, trend e location.'),
      b('cw-a3', 'todo', 'weddingitaly.com — blog/agenzia con real wedding e guide regionali.'),
      b('cw-a4', 'todo', 'exclusiveitalyweddings.com — inspiration e real wedding luxury in Italia.'),
      b('cw-a5', 'todo', 'theknotinitaly.it — agenzia/blog destination Italy molto seguito.'),
      b('cw-a6', 'todo', 'italianweddingcircle.com — blog + directory di fornitori per matrimoni in Italia.'),
      b('cw-a7', 'todo', 'bespoke-bride.com — hub destination con sezione Italia/Mediterraneo.'),
      b('cw-a8', 'todo', 'matrimonio.com — grande portale italiano (Antonio ha già un profilo: tienilo al massimo).'),
      b('cw-a9', 'todo', 'love4wed.com — destination nel Mediterraneo (Italia/Grecia), pubblico internazionale.'),
      b('cw-a10', 'todo', 'wedinspire.com ⭐ — destination weddings in Europa con forte focus Italia.'),
    ],
  }),

  b('cw-bh', 'subheading', 'B. Editoriali fine-art / film (submission di real wedding)'),
  b('cw-btg', 'task-group', 'B. Editoriali fine-art / film', {
    children: [
      b('cw-b11', 'todo', 'weddingsparrow.com ⭐ — fine-art e film, molto selettivo: perfetto per il suo stile.'),
      b('cw-b12', 'todo', 'magnoliarouge.com ⭐ — fine-art, luce naturale, romantico/senza tempo.'),
      b('cw-b13', 'todo', 'togetherjournal.com ⭐ — minimal, fine-art (profilo esistente: spingi nuove submission).'),
      b('cw-b14', 'todo', 'stylemepretty.com — il classico fine-art, enorme pubblico.'),
      b('cw-b15', 'todo', 'greenweddingshoes.com — creativo, artistico, indie/boho-chic.'),
      b('cw-b16', 'todo', 'ruffledblog.com — editoriale, stylish.'),
      b('cw-b17', 'todo', 'oncewed.com — fine-art, vintage e DIY raffinato.'),
      b('cw-b18', 'todo', '100layercake.com — design, colore, "wow" curato.'),
      b('cw-b19', 'todo', 'caratsandcake.com — inspiration + discovery fornitori.'),
      b('cw-b20', 'todo', 'overthemoon.com — luxury/fashion editoriale (fondato da una firma Vogue).'),
      b('cw-b21', 'todo', 'wedluxe.com — luxury, styling drammatico, couture.'),
      b('cw-b22', 'todo', 'insideweddings.com — alto di gamma, anche rivista cartacea.'),
      b('cw-b23', 'todo', 'thelane.com ⭐ — luxury/fashion, sensibilità editoriale ed europea.'),
      b('cw-b24', 'todo', 'hellomay.com.au ⭐ — fine-art (Australia), molto in linea con l’estetica film.'),
      b('cw-b25', 'todo', 'polkadotwedding.com — fine-art/contemporaneo (Australia).'),
    ],
  }),

  b('cw-ch', 'subheading', 'C. Destination & luxury internazionali'),
  b('cw-ctg', 'task-group', 'C. Destination & luxury', {
    children: [
      b('cw-c26', 'todo', 'destinationido.com — dedicato ai destination wedding, valorizza il processo.'),
      b('cw-c27', 'todo', 'bridalmusings.com — internazionale, destination-friendly.'),
      b('cw-c28', 'todo', 'frenchweddingstyle.com — Europa/destination, estetica raffinata.'),
      b('cw-c29', 'todo', 'chicvintagebrides.com — vintage/fine-art, internazionale.'),
      b('cw-c30', 'todo', 'aisleperfect.com — inspiration e fornitori, destination.'),
      b('cw-c31', 'todo', 'elegantwedding.ca — luxury (Canada), pubblico nordamericano verso l’Europa.'),
      b('cw-c32', 'todo', 'intimateweddings.com ⭐ — elopement e matrimoni intimi (in linea col suo taglio).'),
      b('cw-c33', 'todo', 'weddingsutra.com — India: coppie indiane che si sposano in Italia (luxury rilevante).'),
      b('cw-c34', 'todo', 'wedmegood.com — India, grande portale per destination indiane.'),
    ],
  }),

  b('cw-dh', 'subheading', 'D. UK / Europa (coppie che scelgono l’Italia)'),
  b('cw-dtg', 'task-group', 'D. UK / Europa', {
    children: [
      b('cw-d35', 'todo', 'lovemydress.net ⭐ — tra i blog UK più grandi, spesso destination Italia.'),
      b('cw-d36', 'todo', 'rockmywedding.co.uk — grande community UK di coppie.'),
      b('cw-d37', 'todo', 'rocknrollbride.com — alternativo/editoriale (UK), pubblico fedele.'),
      b('cw-d38', 'todo', 'bohoweddings.com — boho/fine-art (UK).'),
      b('cw-d39', 'todo', 'whimsicalwonderlandweddings.com — UK, real wedding e fornitori.'),
      b('cw-d40', 'todo', 'englishweddingblog.com — UK, destination incluse.'),
      b('cw-d41', 'todo', 'hitched.co.uk — grande directory UK (gruppo The Knot Worldwide).'),
      b('cw-d42', 'todo', 'guidesforbrides.co.uk — directory storica UK.'),
      b('cw-d43', 'todo', 'bridebook.com — pianificazione UK con directory fornitori.'),
    ],
  }),

  b('cw-eh', 'subheading', 'E. Directory fornitori e piattaforme di pianificazione (categorie Italia)'),
  b('cw-etg', 'task-group', 'E. Directory fornitori / pianificazione', {
    children: [
      b('cw-e44', 'todo', 'zankyou.com (zankyou.it) ⭐ — forte in Italia/Europa/America Latina, pubblico internazionale.'),
      b('cw-e45', 'todo', 'theknot.com — il più grande negli USA (gruppo The Knot Worldwide).'),
      b('cw-e46', 'todo', 'weddingwire.com — directory internazionale (stesso gruppo).'),
      b('cw-e47', 'todo', 'bodas.net — Spagna (stesso gruppo: coppie spagnole verso l’Italia).'),
      b('cw-e48', 'todo', 'mariages.net — Francia (stesso gruppo: coppie francesi verso l’Italia).'),
      b('cw-e49', 'todo', 'zola.com — pianificazione + directory (USA).'),
      b('cw-e50', 'todo', 'withjoy.com — siti di nozze + directory (USA).'),
      b('cw-e51', 'todo', 'easyweddings.com.au — Australia, directory e contenuti.'),
    ],
  }),

  b('cw-fh', 'subheading', 'F. Community e directory per fotografi (documentaristico / film / fine-art)'),
  b('cw-ftg', 'task-group', 'F. Community fotografi', {
    children: [
      b('cw-f52', 'todo', 'fearlessphotographers.com ⭐ — premi e directory, emozione e momenti autentici.'),
      b('cw-f53', 'todo', 'wpja.com ⭐ — Wedding Photojournalist Association: directory di riferimento del reportage.'),
      b('cw-f54', 'todo', 'thisisreportage.com ⭐ — reportage puro, "nulla in posa": su misura per lui.'),
      b('cw-f55', 'todo', 'ispwp.com ⭐ — premi e directory tra i più riconosciuti al mondo.'),
      b('cw-f56', 'todo', 'inspiration-photographers.com ⭐ — community fine-art/storytelling.'),
      b('cw-f57', 'todo', 'lookslikefilm.com ⭐ — community con estetica "film": perfetta per il suo look.'),
      b('cw-f58', 'todo', 'mywed.com — directory internazionale (profilo esistente).'),
      b('cw-f59', 'todo', 'wezoree.com — inspiration + directory fotografi destination.'),
      b('cw-f60', 'todo', '500px.com / behance.net / flickr.com / vsco.co — portfolio e scoperta (vsco.co molto "film").'),
    ],
  }),
  b('cw-d2', 'divider', ''),

  b('cw-knh', 'subheading', 'Nota sul gruppo "The Knot Worldwide"'),
  b('cw-kn', 'text', 'Matrimonio.com (IT), Bodas.net (ES), Mariages.net (FR), Hitched.co.uk (UK), WeddingWire e The Knot (USA) fanno parte dello stesso ecosistema: un profilo curato e recensioni su questi raggiunge coppie di più Paesi che scelgono l’Italia. Vale la pena tenerli coerenti tra loro.'),

  b('cw-ph', 'subheading', 'Da dove partire (per coerenza, non dispersione)'),
  b('cw-pa', 'text', '• Prestigio on-brand: weddingsparrow.com, magnoliarouge.com, togetherjournal.com, thisisreportage.com, wpja.com, lookslikefilm.com.\n• Destination Italia / pubblico estero: junebugweddings.com (Italy), wedinspire.com, zankyou.it, love4wed.com.\n• Mercati esteri chiave: lovemydress.net (UK), bodas.net/mariages.net (ES/FR), weddingsutra.com (India luxury).\nAttivane poche alla volta, con la stessa identità e una submission del miglior matrimonio reale completo di team fornitori. Misura il referral in GA4 e traccia chi pubblica/linka davvero, come per il motore di reciprocità.'),
]
