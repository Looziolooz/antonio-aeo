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

export const defaultKeywordsBlocks: Block[] = [
  b('kw-h', 'heading', 'Parole chiave ad alto valore (IT + EN) — per i contenuti'),
  b('kw-intro', 'text', 'Estratte da strategia, protocollo monitoraggio e baseline AI. Dove usarle: titolo pagina, H1/H2, meta description, alt-text immagini, FAQ, descrizione GBP, caption social, descrizioni YouTube. Regola: UNA keyword primaria per pagina, inserita in modo naturale — mai keyword stuffing.'),
  b('kw-leg', 'text', 'Priorità: 🟢 alto valore / bassa concorrenza (attacca subito) · 🟡 medio · 🔵 alta concorrenza (gioco lungo). Il baseline AI ha mostrato che i competitor presidiano le query geografiche generiche, mentre la nicchia pellicola/VHS è white space totale → lì stanno le 🟢.'),
  b('kw-d1', 'divider', ''),

  b('kw-1h', 'subheading', '1. Nicchia pellicola / VHS — il white space (massima priorità)'),
  b('kw-1it', 'text', `ITALIANO
| Keyword | Intento | Priorità | Dove usarla |
|---------|---------|----------|-------------|
| fotografo matrimonio in pellicola | scoperta nicchia | 🟢 | cornerstone VHS, FAQ, GBP |
| wedding film in VHS | scoperta nicchia | 🟢 | cornerstone VHS, YouTube, FAQ |
| video matrimonio in VHS | scoperta nicchia | 🟢 | YouTube @LoveOnVHS, servizi |
| fotografo matrimonio 35mm | scoperta nicchia | 🟢 | real wedding 35mm, About |
| matrimonio analogico | scoperta nicchia | 🟢 | cornerstone, caption social |
| matrimonio su pellicola Sud Italia | nicchia + geo | 🟢 | cornerstone, guide |`),
  b('kw-1en', 'text', `ENGLISH
| Keyword | Intent | Priority | Where to use |
|---------|--------|----------|--------------|
| VHS wedding film Italy | niche discovery | 🟢 | cornerstone EN, YouTube |
| 35mm film wedding photographer Italy | niche discovery | 🟢 | About EN, portfolio |
| analog wedding photographer Italy | niche discovery | 🟢 | cornerstone EN |
| film wedding photographer Southern Italy | niche + geo | 🟢 | cornerstone, FAQ EN |
| VHS wedding videographer Italy | niche discovery | 🟢 | YouTube, services |`),

  b('kw-2h', 'subheading', '2. Geografiche / location (alta intenzione)'),
  b('kw-2it', 'text', `ITALIANO
| Keyword | Intento | Priorità | Dove usarla |
|---------|---------|----------|-------------|
| fotografo matrimonio Maida | locale (ancora entità) | 🟢 | GBP, About (sede) |
| fotografo matrimonio Catanzaro | locale | 🟢 | GBP, About |
| fotografo matrimonio Costa degli Dei | alta intenzione | 🟡 | guida location |
| dove sposarsi in Calabria | informazionale | 🟡 | guida evergreen |
| sposarsi a Tropea | informazionale | 🟡 | guida Tropea |
| fotografo matrimonio Tropea | alta intenzione | 🔵 | real wedding Tropea |
| fotografo matrimonio Calabria | alta intenzione | 🔵 | guida, GBP |
| fotografo matrimonio Sud Italia | ampia | 🔵 | overview/About |`),
  b('kw-2en', 'text', `ENGLISH
| Keyword | Intent | Priority | Where to use |
|---------|--------|----------|--------------|
| getting married in Calabria | informational | 🟢 | EN guide foreign couples |
| destination wedding photographer Southern Italy | high value | 🟡 | About EN, landing |
| wedding photographer Puglia / Sicily | geo | 🟡 | regional guides |
| wedding photographer Tropea | high intent | 🔵 | real wedding EN |
| wedding photographer Calabria | high intent | 🔵 | location guide |`),

  b('kw-3h', 'subheading', '3. Destination / coppie internazionali (alto valore, bassa concorrenza)'),
  b('kw-3en', 'text', `ENGLISH (mercato più scoperto, alta conversione)
| Keyword | Intent | Priority | Where to use |
|---------|--------|----------|--------------|
| getting married in Italy as a foreign couple | decision/legal | 🟢 | EN guide |
| destination wedding in Calabria (complete guide) | high value | 🟢 | EN guide |
| best time for a destination wedding in Southern Italy | informational | 🟢 | EN guide |
| how to choose a wedding photographer in Italy from abroad | decision | 🟢 | EN guide |
| intimate wedding / elopement Italy | niche-adjacent | 🟡 | services EN |`),

  b('kw-4h', 'subheading', '4. Stile / categoria'),
  b('kw-4t', 'text', `| Italiano | English | Priorità |
|----------|---------|----------|
| fotografo documentaristico matrimonio | documentary wedding photographer | 🟡 |
| reportage di matrimonio | reportage wedding photography | 🟡 |
| fotografo fine art matrimonio | fine art wedding photographer | 🟡 |
| storytelling di matrimonio | wedding storytelling | 🟢 |
| fotografo matrimonio autentico | candid wedding photographer | 🟢 |`),

  b('kw-5h', 'subheading', '5. Vocabolario di brand / entità (sentiment — ripetere ovunque)'),
  b('kw-5t', 'text', `| Italiano | English |
|----------|---------|
| atmosfera | atmosphere |
| famiglia | family |
| memoria | memory |
| senso del luogo | sense of place |
| autentico | authentic |
| analogico | analog |
| intimo | intimate |
| senza tempo | timeless |`),
  b('kw-5n', 'text', 'Sono le parole che le AI devono restituire descrivendo Antonio (vedi protocollo, Blocco 2 sentiment). Vanno ripetute in modo coerente su sito, GBP, directory, caption e descrizioni — è ciò che costruisce il "sentiment" riconoscibile dell’entità.'),
  b('kw-d2', 'divider', ''),

  b('kw-6h', 'subheading', 'Mappatura keyword → contenuto (una primaria per pagina)'),
  b('kw-6t', 'text', `| Contenuto | Keyword primaria IT | Keyword primaria EN |
|-----------|---------------------|---------------------|
| Cornerstone VHS/pellicola | wedding film in VHS | VHS wedding film Italy |
| About / frase d’identità | fotografo matrimonio destination pellicola e VHS Sud Italia | destination wedding photographer film & VHS Southern Italy |
| Guida location Calabria | dove sposarsi in Calabria | getting married in Calabria |
| Real wedding Tropea | fotografo matrimonio Tropea | wedding photographer Tropea |
| Guida coppie internazionali | — | getting married in Italy as a foreign couple |
| GBP | fotografo di matrimoni Catanzaro / Maida | — |
| YouTube (per video) | wedding film VHS — [location] | VHS wedding film — [location] |`),

  b('kw-7h', 'subheading', 'Long-tail / domande (per FAQ e guide — formato AEO)'),
  b('kw-7t', 'text', 'IT: «C’è un fotografo che gira matrimoni in VHS in Italia?» · «Esiste un fotografo che fotografa matrimoni in pellicola in Italia?» · «Quanto costa un fotografo di matrimonio destination?» · «Quando prenotare il fotografo di matrimonio?» · «Ci si può sposare in Sud Italia venendo dall’estero?»\nEN: «Wedding photographer who shoots on VHS in Italy» · «35mm film wedding photographer in Italy» · «How much does a destination wedding photographer cost?» · «When should we book our wedding photographer?» · «Can we get married in Southern Italy coming from abroad?»'),
  b('kw-note', 'text', 'Validazione consigliata prima di scrivere: controlla volumi e varianti con Google Keyword Planner / Trends / AlsoAsked (vedi Toolkit) e aggiorna le priorità con i dati reali.'),
]
