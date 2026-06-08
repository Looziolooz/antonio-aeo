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

export const defaultGlossarioBlocks: Block[] = [
  b('gl-h', 'heading', 'Glossario — tutte le sigle e i termini spiegati'),
  b('gl-intro', 'text', 'Significato in parole semplici di ogni sigla e termine usato nei documenti del progetto. Se trovi una parola che non capisci, è probabilmente qui.'),
  b('gl-d1', 'divider', ''),

  b('gl-1h', 'subheading', 'AEO / SEO e motori di ricerca AI'),
  b('gl-1t', 'text', `| Termine | Significato |
|---------|-------------|
| SEO | Search Engine Optimization — ottimizzare il sito per apparire nei risultati di Google (ricerca tradizionale). |
| AEO | Answer Engine Optimization — farsi citare dalle AI (ChatGPT, Gemini, ecc.) quando rispondono a una domanda. È il cuore di questo progetto. |
| GEO | Generative Engine Optimization — sinonimo di AEO: ottimizzare per i motori "generativi" (AI). |
| LLM | Large Language Model — il "cervello" delle AI come ChatGPT, Gemini, Claude. |
| AI Overviews / AI Mode | La risposta scritta dall'AI che Google mostra in cima alla ricerca. |
| Entità | Come le AI "vedono" Antonio: un soggetto preciso con fatti collegati (chi è, dove lavora, cosa fa). L'obiettivo è renderla chiara e coerente. |
| Sentiment | La percezione/tono che le AI associano a un nome (positivo, neutro, le parole che usano per descriverlo). |
| AEO Visibility Score | Il punteggio di partenza che misura quanto Antonio appare nelle risposte AI. Oggi = 0; conta la sua crescita. |`),

  b('gl-2h', 'subheading', 'Analytics e misurazione (strumenti Google e simili)'),
  b('gl-2t', 'text', `| Sigla | Significato |
|-------|-------------|
| GA4 | Google Analytics 4 — strumento gratuito che mostra quanti visitatori arrivano al sito, da dove e cosa fanno. |
| GSC | Google Search Console — strumento gratuito che mostra per quali ricerche compare il sito su Google (query, clic, posizione). |
| GBP | Google Business Profile — la "scheda Google" dell'attività (quella con mappa, recensioni, orari). Fondamentale per la SEO locale. |
| GBP Insights | Le statistiche della scheda Google: quante ricerche, chiamate, richieste di indicazioni. |
| Clarity | Microsoft Clarity — strumento gratuito che registra come i visitatori si muovono sul sito (heatmap). |
| Heatmap | "Mappa di calore": mostra dove i visitatori cliccano e guardano di più su una pagina. |
| Core Web Vitals | Le metriche di Google sulla velocità/qualità tecnica di una pagina. |
| CTR | Click-Through Rate — percentuale di persone che cliccano dopo aver visto un risultato. |
| KPI | Key Performance Indicator — gli indicatori-chiave che si misurano per capire se la strategia funziona. |
| Baseline | La misura di partenza ("foto del prima") con cui si confrontano i risultati futuri. |
| Incognito | Finestra del browser senza cronologia/login: serve a misurare la realtà, non i propri risultati personalizzati. |`),

  b('gl-3h', 'subheading', 'Dati strutturati e tecnica del sito'),
  b('gl-3t', 'text', `| Termine | Significato |
|---------|-------------|
| NAP | Name, Address, Phone — Nome, Indirizzo, Telefono. Devono essere identici ovunque online, così le AI riconoscono che è la stessa attività. |
| Schema / Schema.org | Il "vocabolario" standard per descrivere i dati a Google e alle AI in modo che le macchine li capiscano. |
| JSON-LD | Il formato tecnico (un blocco di codice) con cui si scrivono i dati strutturati nell'header del sito. |
| ProfessionalService | Il tipo di schema che descrive l'attività (fotografo): nome, aree, lingue, profili. |
| FAQPage | Il tipo di schema per le pagine di domande/risposte: è il formato che le AI amano citare. |
| Review | Il tipo di schema per le testimonianze reali pubblicate sul sito. |
| aggregateRating | Il campo schema con la media voti. ATTENZIONE: vietato sommare recensioni Google + Matrimonio come se fossero raccolte sul sito (penalità Google). |
| sameAs | Il campo schema che collega tutti i profili ufficiali (Instagram, YouTube, directory…) alla stessa entità. |
| header code | Codice inserito nell'intestazione del sito (su Pixieset serve il piano Website-Pro). È lì che vanno schema, GSC e analytics. |
| sitemap | La "mappa" di tutte le pagine del sito, inviata a Google per farle trovare e indicizzare. |
| robots.txt | File che dice ai crawler cosa possono visitare. Va verificato che non blocchi i crawler AI. |
| llms.txt | File pensato per le AI: oggi quasi nessun motore lo usa (adozione ~10%), quindi è a bassissima priorità. |
| alt-text | Testo alternativo che descrive un'immagine: utile per accessibilità e per farsi trovare. |
| meta description | Il breve testo descrittivo di una pagina che appare nei risultati di ricerca. |
| H1 / H2 | I titoli e sottotitoli di una pagina (gerarchia dei contenuti). |`),

  b('gl-4h', 'subheading', 'Business e metriche economiche'),
  b('gl-4t', 'text', `| Sigla | Significato |
|-------|-------------|
| ROI | Return on Investment — ritorno sull'investimento: quanto rende il piano rispetto a quanto costa. |
| ABV | Average Booking Value — valore medio di una prenotazione (qui ipotizzato ~€4.500 a matrimonio). |
| KPI | Indicatore-chiave da monitorare (recensioni, sessioni, richieste, prenotazioni…). |
| Break-even | Punto di pareggio: quante prenotazioni servono perché il piano ripaghi i suoi costi (qui ~1,1/anno). |
| B2B | Business to Business — rapporti tra professionisti (es. wedding planner e venue), non con i clienti finali. |
| CRM | Customer Relationship Management — sistema/foglio per gestire contatti e clienti. |
| UTM | Parametri aggiunti a un link per tracciare in GA4 da dove arriva il traffico (es. campagna vendor-feature). |
| Capital-light | Approccio a basso investimento di denaro: si investe tempo e metodo, non spesa pubblicitaria. |`),

  b('gl-5h', 'subheading', 'Fotografia, stili e formati'),
  b('gl-5t', 'text', `| Termine | Significato |
|---------|-------------|
| VHS | Video Home System — il formato video analogico anni '80/'90, nostalgico. Il differenziatore unico di Antonio (canale @LoveOnVHS). |
| 35mm | Pellicola fotografica analogica 35 millimetri: texture e atmosfera "senza tempo". |
| Analogico | Pellicola/VHS (non digitale): look autentico e nostalgico. |
| Destination wedding | Matrimonio organizzato in una località diversa da dove vivono gli sposi (spesso coppie estere in Italia). |
| Real wedding | Tipo di contenuto: il racconto fotografico di un matrimonio reale (foto + testo). |
| Wedding film | Il video/film del matrimonio (qui anche in VHS). |
| Reportage / Documentaristico | Stile spontaneo, momenti "rubati", niente pose forzate. |
| Fine-art / Editoriale | Stile curato, romantico, "da rivista", composizione studiata. |
| Elopement | Matrimonio molto intimo, con pochissimi invitati (a volte solo la coppia). |`),

  b('gl-6h', 'subheading', 'Directory, premi e community'),
  b('gl-6t', 'text', `| Termine | Significato |
|---------|-------------|
| Directory | Elenco/portale di professionisti dove coppie e planner cercano (es. Matrimonio.com, MyWed). Le AI le considerano fonti affidabili. |
| WPJA | Wedding Photojournalist Association — la directory di riferimento del fotogiornalismo di matrimonio (a pagamento, alto prestigio). |
| ISPWP | International Society of Professional Wedding Photographers — premi e directory riconosciuti a livello mondiale. |
| This Is Reportage / Fearless | Directory/premi per reportage e momenti autentici: perfette per lo stile di Antonio. |
| Backlink | Un link verso il sito di Antonio da un altro sito autorevole: aumenta credibilità e visibilità. |
| Referral | Traffico/clienti che arrivano "su segnalazione" (da un partner, una directory, Reddit…). |
| Subreddit | Una community tematica su Reddit (es. r/destinationwedding). |
| Perplexity / Gemini / ChatGPT / Claude / Copilot | I principali motori AI testati nel monitoraggio. |`),

  b('gl-7h', 'subheading', 'Strumenti e piattaforme citati'),
  b('gl-7t', 'text', `| Strumento | A cosa serve |
|-----------|--------------|
| Pixieset | La piattaforma del sito di Antonio. Il piano "Website-Pro" sblocca l'header code (necessario per schema/analytics). |
| Claude Cowork | L'AI usata per eseguire il lavoro (bozze, ricerche, report). |
| Pomelli | AI per generare grafiche coerenti col brand (Business DNA). |
| Flow | AI per animare foto reali in brevi teaser/clip. |
| NotebookLM | AI di Google per creare episodi audio (podcast) dai contenuti scritti. |
| Metricool / Meta Business Suite | Strumenti (gratuiti) per programmare i post social. |
| Source of Sources (SoS) | Servizio per ricevere richieste dei giornalisti e ottenere PR/backlink. |
| Substack / Beehiiv | Piattaforme per creare e inviare la newsletter. |
| Rich Results Test | Strumento Google per verificare che il JSON-LD sia scritto correttamente prima di pubblicarlo. |
| AlsoAsked / Keyword Planner / Trends | Strumenti per scoprire le domande e le parole chiave reali delle coppie. |`),

  b('gl-8h', 'subheading', 'Contenuti, marketing e termini del piano'),
  b('gl-8t', 'text', `| Termine | Significato |
|---------|-------------|
| Cornerstone (pagina pilastro) | La pagina principale e definitiva su un tema (es. "Cos'è un wedding film in VHS"), costruita per essere citata. |
| White space | Spazio di mercato libero: una nicchia dove nessun concorrente è posizionato (qui: pellicola/VHS). |
| Wedge ("cuneo") | Strategia che concentra gli sforzi su poche mosse ad alta leva, invece di fare tutto insieme. |
| Long-tail | Parole chiave lunghe e specifiche (es. "fotografo matrimonio in VHS in Calabria"): meno volume ma altissima intenzione. |
| Keyword stuffing | Riempire un testo di parole chiave in modo innaturale: da evitare, viene penalizzato. |
| Boilerplate | Un testo standard riutilizzabile identico ovunque (es. la bio di Antonio). |
| Uno a molti | Sistema per cui 1 contenuto sorgente genera 8 output su più canali, con poco lavoro extra. |
| GDPR | Regolamento europeo sulla privacy: serve il consenso scritto prima di pubblicare nome+località di una coppia. |
| Gate-zero | Il prerequisito bloccante #1 (qui: verificare il piano Pixieset prima di iniziare la parte tecnica). |
| CTA | Call To Action — l'invito all'azione (es. "Lascia una recensione", "Scrivici"). |`),
  b('gl-note', 'text', 'Manca un termine? Aggiungilo qui sotto creando un nuovo blocco testo, o segnalalo e lo inserisco.'),
]
