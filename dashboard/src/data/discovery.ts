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

export const defaultDiscoveryBlocks: Block[] = [
  b('ds-h', 'heading', 'Questionario di discovery — Antonio'),
  b('ds-intro', 'text', 'A cosa serve: raccogliere i numeri e gli obiettivi reali, così il piano smette di basarsi su ipotesi (oggi ABV, prenotazioni e priorità sono stimate). Compilabile in ~30 minuti. Risposte secche, anche approssimative: "non lo so" è una risposta valida e utile. Compila la colonna Risposta cliccando sulla tabella.'),
  b('ds-key', 'text', '⭐ Le 4 risposte che sbloccano tutto: (1) valore medio per matrimonio, (2) quante richieste/prenotazioni all’anno oggi, (3) piano Pixieset attuale, (4) quanti matrimoni vuoi fare e a che prezzo.'),
  b('ds-d1', 'divider', ''),

  b('ds-ah', 'subheading', 'A. Numeri attuali — traffico e richieste'),
  b('ds-at', 'text', `| Domanda | Risposta |
|---------|----------|
| Quante richieste di contatto ricevi al mese (media)? | |
| Quante diventano prenotazioni (in un anno)? | |
| Da dove arrivano i clienti oggi? (passaparola, Matrimonio.com, Instagram, Google, planner…) | |
| Sai quante visite ha il sito al mese? (anche a spanne, o "non so") | |
| Hai già Google Analytics o Search Console attivi? | |`),

  b('ds-bh', 'subheading', 'B. Economia'),
  b('ds-bt', 'text', `| Domanda | Risposta |
|---------|----------|
| Valore medio reale di un matrimonio (€)? | |
| Range prezzi dei pacchetti (da € a €)? | |
| Quanti matrimoni fai all’anno oggi? | |
| Qual è la tua capacità massima realistica (quanti ne puoi fare)? | |
| Il video/VHS è incluso o costa a parte? | |`),

  b('ds-ch', 'subheading', 'C. Obiettivi di business (i più importanti)'),
  b('ds-ct', 'text', `| Domanda | Risposta |
|---------|----------|
| Quanti matrimoni vuoi fare all’anno (target)? | |
| A che prezzo medio vorresti arrivare? | |
| In quali regioni vuoi crescere? (Calabria, Sicilia, Puglia, Toscana, estero…) | |
| Che % di coppie estere vorresti rispetto alle italiane? | |
| Entro quando vuoi vedere risultati (orizzonte)? | |
| C’è un tipo di matrimonio/cliente che NON vuoi più? | |`),

  b('ds-dh', 'subheading', 'D. Sito e tecnica'),
  b('ds-dt', 'text', `| Domanda | Risposta |
|---------|----------|
| Che piano Pixieset hai? (Free / Personal / Website-Pro / Suite — non so) | |
| Chi gestisce il sito oggi? | |
| Hai accesso al "codice header" del sito? (o sai chi ce l’ha) | |
| Hai un dominio personalizzato (antoniopileggi.com) collegato? | |
| La scheda Google Business è rivendicata e gestita da te? | |`),

  b('ds-eh', 'subheading', 'E. Asset e contenuti'),
  b('ds-et', 'text', `| Domanda | Risposta |
|---------|----------|
| Quanti matrimoni recenti hai pronti da pubblicare (con foto)? | |
| Per quanti hai (o puoi avere) il consenso scritto delle coppie? | |
| Hai già una brochure/listino prezzi? | |
| Quali social gestisci attivamente e chi li cura? | |
| Hai un canale YouTube/VHS attivo? (@LoveOnVHS) | |
| Quante recensioni hai oggi e su quali piattaforme? | |`),

  b('ds-fh', 'subheading', 'F. Offerta e processo di risposta'),
  b('ds-ft', 'text', `| Domanda | Risposta |
|---------|----------|
| Come è strutturata oggi l’offerta? (pacchetti? su misura?) | |
| Quando arriva una richiesta, cosa fai? (rispondi come/quando) | |
| In quanto tempo rispondi di solito? | |
| Fai una call/incontro prima di preventivare? | |
| Hai dei template di risposta o scrivi ogni volta da zero? | |`),

  b('ds-gh', 'subheading', 'G. Vincoli e preferenze'),
  b('ds-gt', 'text', `| Domanda | Risposta |
|---------|----------|
| Quanto tempo a settimana puoi dedicare al marketing? | |
| C’è un budget per strumenti (es. Pixieset Pro, Claude)? | |
| Cosa NON vuoi fare per nessun motivo? | |
| C’è qualcosa che hai già provato e non ha funzionato? | |`),
  b('ds-d2', 'divider', ''),

  b('ds-end', 'text', 'Una volta compilato: con questi dati ricalibriamo Business Plan (ABV e obiettivi reali), sciogliamo il gate Pixieset, e tariamo il Playbook conversione (prezzi, pacchetti, processo). Senza, restiamo su ipotesi.'),
]
