import type { Block } from './types'

export const defaultBlocks: Block[] = [
  { id: 'b-h', type: 'heading', content: 'Strategia di visibilità AEO + SEO — Antonio Pileggi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-info', type: 'text', content: 'Sito: antoniopileggi.com (Pixieset) · Base: Maida (CZ), Calabria · Nicchia: destination wedding, storytelling digitale + 35mm + VHS · Data: giugno 2026', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-risks', type: 'sticky', content: '⚠️ Rischi AI da presidiare: Pomelli, Flow/Veo e NotebookLM sono strumenti Google Labs sperimentali — possono cambiare o chiudere senza preavviso. Mai usare AI per simulare foto di matrimonio (sarebbe la fine del brand documentarista). Trasparenza sui contenuti AI = coerenza col brand.', color: 'pink', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-d1', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s1h', type: 'subheading', content: '1. Situazione attuale', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s1a', type: 'text', content: 'llms.txt non è usato da nessun AI provider (Google, OpenAI, ecc.) a metà 2026. Pixieset non permette file arbitrari nella root. Ignorare. Le tre leve reali: recensioni, dati strutturati, contenuti editoriali bilingue.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s1b', type: 'text', content: 'Punti di forza attuali: tono brand già forte, 12 recensioni Google + 27 su Matrimonio.com, presenza su Together Journal/Loverly/MyWed, canale YouTube @LoveOnVHS. Punto debole: sito vetrina povero di testo indicizzabile, nessuna FAQ, nessun dato strutturato, metà mercato (ITALIANO) scoperto.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-d2', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2h', type: 'subheading', content: '2. Pilastro 1 — Recensioni e GBP (motore di fiducia)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2a', type: 'text', content: 'Obiettivo: 12 → 30+ recensioni Google in 6 mesi (1-3/mese). Le recensioni sono il formato AEO più potente: testo fresco con keyword naturali (location, "destination wedding") che le AI leggono direttamente.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2b', type: 'text', content: 'Azione: completare GBP (categorie, aree, descrizione IT/EN, foto, post settimanali). Link breve recensioni in firma email + consegna gallery. Chiedere al momento giusto (consegna finale). Suggerire dettagli da citare ("racconta dove vi siete sposati e cosa ti è rimasto"). Rispondere a tutte le recensioni.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2c', type: 'text', content: 'Tenere vivo anche Matrimonio.com (27 recensioni) e MyWed. Validazione su fonti multiple aumenta fiducia AI.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s2-kpi', type: 'text', content: 'KPI: 30+ recensioni Google in 6 mesi · GBP Insights: +50% ricerche in 3 mesi · Rating medio ≥ 4.8 · Risposta al 100% delle recensioni entro 48h', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s3h', type: 'subheading', content: '3. Pilastro 2 — Dati strutturati JSON-LD (mossa AEO)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s3a', type: 'text', content: 'I dati strutturati danno alle AI una "scheda anagrafica" pulita: nome, professione, aree, lingue, profili social. Si inserisce nell\'header Pixieset (piano Website-Pro). Due blocchi: ProfessionalService/Photographer (con sameAs di tutti i 9 profili) e FAQPage (nella pagina FAQ).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s3b', type: 'text', content: 'Attenzione: non inserire aggregateRating che somma recensioni Google + Matrimonio — vietato dalle linee guida Google. Pubblicare testimonianze reali sul sito con schema Review.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s3-kpi', type: 'text', content: 'KPI: Rich Results Test: 0 errori · JSON-LD installato e validato entro settimana 2 · Niente errori strutturati in GSC dopo 30 giorni', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s4h', type: 'subheading', content: '4. Pilastro 3 — Contenuti e autorità', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s4a', type: 'text', content: 'Ogni contenuto in ITALIANO e INGLESE. Tre tipi: (A) Real Wedding — pagina per matrimonio, 15-30 foto + 400-700 parole; (B) Guide location — articoli evergreen "Dove sposarsi in Calabria?", "Migliori location Taormina"; (C) Pagina pilastro VHS — "Cos\'è un wedding film in VHS e perché sceglierlo".', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s4b', type: 'text', content: 'Voce del brand: prima persona, frasi brevi, niente superlativi di marketing, racconto del vissuto più che della tecnica. Questo dà un "sentiment" riconoscibile che le AI restituiscono fedelmente. Cadenza: 1 contenuto ogni 2 settimane (alternando A, B, C, D).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s4c', type: 'text', content: 'Tipo D — Contenuti per coppie internazionali. Guide evergreen che rispondono alle barriere pratiche per chi si sposa in Italia dall\'estero. 4 guide: (1) Getting married in Italy as a foreign couple: legal requirements; (2) Destination wedding in Calabria: complete guide; (3) Best time of year for a destination wedding in Southern Italy; (4) How to choose a wedding photographer in Italy from abroad. Zero concorrenza SEO, altissima intenzione di conversione.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s4d', type: 'text', content: 'Sistema di riciclo "uno a molti" — ogni contenuto sorgente genera 8 output: (1) Blog post IT+EN; (2) Carousel IG; (3) Reel teaser; (4) Audio NotebookLM; (5) Trascrizione audio; (6) 3 Pinterest pin; (7) Newsletter Substack; (8) Post LinkedIn/Facebook. 1 contenuto di 30 minuti → un mese di pubblicazione su 7 canali.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s4-kpi', type: 'text', content: 'KPI: 6 contenuti pubblicati in 3 mesi (IT+EN) · 1 guida location ogni 6 settimane · Pagina VHS live entro settimana 8 · Guide internazionali: 4 entro mese 6 · Backlink: +5 da venue/planner in 3 mesi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s5h', type: 'subheading', content: '5. Pilastro 4 — Pagina FAQ + schema FAQPage', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s5a', type: 'text', content: 'Le FAQ sono il formato AEO per eccellenza: domanda esplicita + risposta autonoma. Le AI estraggono e citano direttamente. Creare pagina /faq IT e EN con 10 domande (aree, formati, coppie straniere, quando prenotare, stile, costi, ecc.) marcate con schema FAQPage. Risposte scritte per essere "citabili" così come sono.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s5-kpi', type: 'text', content: 'KPI: FAQPage live entro settimana 4 · 10 domande IT + 10 EN · Validazione Rich Results superata · Le FAQ appaiono come rich snippet in ricerca entro 30 giorni', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s6h', type: 'subheading', content: '6. Pilastro 5 — "Be everywhere" e coerenza entità', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s6a', type: 'text', content: 'NAP + bio identici su tutti i 9 profili (sito, IG, FB, YT, Pinterest, Google, Matrimonio.com, Together Journal, Loverly, MyWed). Stessa bio boilerplate IT/EN. Il sito deve linkare ogni profilo (e viceversa, nel sameAs dello schema).', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s6b', type: 'text', content: 'Frase di identità netta in About: "Antonio Pileggi è un fotografo di matrimoni destination con base a Maida (Catanzaro, Calabria), specializzato in storytelling su digitale, pellicola 35mm e VHS per matrimoni in Sud Italia." Le AI cercano proprio questa frase.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s6-kpi', type: 'text', content: 'KPI: 9/9 profili con bio IT/EN identica entro settimana 4 · sameAs funzionanti nello schema · Test entità AI: fatti corretti al 100% (Blocco 3 del monitoraggio)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s7h', type: 'subheading', content: '7. Pilastro 6 — Social sistematici', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s7a', type: 'text', content: 'Tre pilastri contenuto: (1) Lavoro — foto/clip con racconto del perché; (2) Metodo — perché digitale/pellicola/VHS, dietro le quinte; (3) Territorio — location Sud Italia con occhio del fotografo.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s7b', type: 'text', content: 'IG: 3 post/settimana (reel + carousel) + storie. YT: 1-2 video/mese wedding film VHS. Pinterest: ricicla real wedding in board geolocalizzate. FB: ripubblica contenuti chiave. Usa Meta Business Suite (gratis) per schedulare.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s7-kpi', type: 'text', content: 'KPI: 3 post/settimana IG · 1-2 video/mese YT · Pinterest: 5 board attive · Social programmati via Metricool/Meta entro settimana 6 · Engagement rate: +20% in 3 mesi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s7bh', type: 'subheading', content: '8. Pilastro 7 — Pipeline B2B con planner e venue', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s7ba', type: 'text', content: 'La rete di referral professionale è il canale che porta i clienti ad alto valore. Mentre il motore di reciprocità gestisce il dopo-matrimonio, questo pilastro costruisce le relazioni prima — con planner e venue target con cui Antonio NON ha ancora lavorato.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s7bb', type: 'text', content: 'Mappatura: lista di 20 venue/planner target in Calabria, Sicilia, Puglia, Toscana (fascia luxury, destination-friendly). Outreach: 1 contatto/settimana con messaggio personalizzato (Antonio: 10 min). Follow-up: se non risponde in 2 settimane, secondo tocco con real wedding in venue simile; terzo tocco con feature kit.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s7b-kpi', type: 'text', content: 'KPI: 20 contatti mappati entro mese 2 · 1 outreach/settimana costante · Tracking risposte su tracker partner · Rate di risposta >40% in 3 mesi', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s8h', type: 'subheading', content: '9. Pilastro 8 — llms.txt e robots.txt (cosa fare davvero)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s8a', type: 'text', content: 'Su Pixieset non puoi caricare file arbitrari. Non perdere tempo. Invece: verifica che robots.txt non blocchi crawler AI, invia sitemap a GSC, e aggiungi JSON-LD su ogni pagina chiave. Questo è il vero "rendere il sito leggibile dalle AI".', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s8b', type: 'text', content: '⚠️ Piano B Pixieset: se il piano Website-Pro non bastasse per inserire header code (JSON-LD, GSC, GA4, Clarity), le alternative sono: (1) sottodominio blog.wordpress.com o Substack per contenuti editoriali; (2) aggiungere una pagina statica HTML via Pixieset Custom Page (dove supportato) per FAQ/schema; (3) come extrema ratio, migrare a una piattaforma con controllo header come Squarespace o WordPress.org. Valutare in settimana 1 appena verificato il piano.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s8-kpi', type: 'text', content: 'KPI: Sitemap inviata a GSC entro settimana 1 · robots.txt verificato (nessun blocco) · JSON-LD installato e validato · Se Website-Pro non disponibile: alternativa decisa entro settimana 2', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-s9h', type: 'subheading', content: '10. Pilastro 9 — Monitoraggio (gratuito)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s9a', type: 'text', content: 'GSC (query/impressioni/clic), GA4 (traffico), GBP Insights (ricerche/chiamate). Tracking citazioni AI manuale: una volta al mese chiedi a ChatGPT, Gemini e Perplexity le query target e annota se Antonio viene citato.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-s9-kpi', type: 'text', content: 'KPI: Report mensile AEO (GSC+GA4+test AI) regolare dal mese 3 · Citazioni AI su query unbranded: da 0% a >50% in 6 mesi · AEO Visibility Score: crescita mese su mese · Niente allucinazioni sui fatti base (accuratezza 100%)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },

  { id: 'b-d3', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-rd', type: 'heading', content: 'Roadmap annuale stagionale', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-rd-intro', type: 'text', content: 'Il piano è strutturato su 4 stagioni: produzione in bassa stagione (ott-mar), pre-stagione (apr), alta stagione (mag-ott, zero produzione). Il ritmo segue il calendario dei matrimoni, non un trimestre arbitrario.', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  {
    id: 'b-todo-s1', type: 'task-group', content: 'Ottobre–Marzo — Produzione (tutto il grosso)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-st1', type: 'todo', content: 'Fondamenta tecniche (settimana 1): verifica piano Pixieset, collega GSC + GA4, inserisci JSON-LD, ottimizza GBP', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], cardId: 'bc-f1' },
      { id: 'b-st2', type: 'todo', content: 'Entità e fiducia (settimane 2-3): uniforma NAP + bio su 9 profili, crea FAQ IT/EN + schema, avvia motore recensioni', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], cardId: 'bc-e1' },
      { id: 'b-st3', type: 'todo', content: 'Contenuti (tutto il periodo): produci 4-6 Real Wedding (IT+EN), 2 guide location, pagina VHS, 4 guide coppie internazionali, audio podcast', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], cardId: 'bc-c1' },
      { id: 'b-st4', type: 'todo', content: 'B2B pipeline: mappa 20 contatti target, inizia outreach 1/settimana', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [], cardId: 'bc-b2b' },
      { id: 'b-st5', type: 'todo', content: 'Sistema di riciclo: per ogni contenuto prodotto, genera 8 output su 7 canali', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-s2', type: 'task-group', content: 'Aprile — Pre-stagione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-st6', type: 'todo', content: 'Tutto schedulato (social, newsletter, blog) — zero da creare in alta stagione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st7', type: 'todo', content: 'Ultimo giro recensioni alle coppie dell\'anno precedente', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st8', type: 'todo', content: 'Attiva newsletter con prima edizione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st9', type: 'todo', content: 'Verifica finale: FAQ, schema, profili, GBP — tutto allineato', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-s3', type: 'task-group', content: 'Maggio–Ottobre — Alta stagione (zero produzione)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-st10', type: 'todo', content: 'Stories quotidiane (dietro le quinte, in giornata)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st11', type: 'todo', content: 'Richiesta recensioni alla consegna gallery', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st12', type: 'todo', content: 'B2B follow-up: 20 min/settimana', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st13', type: 'todo', content: 'Settembre: push "Now booking 2027" su IG, FB, newsletter, GBP', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-s4', type: 'task-group', content: 'Check mensile (30 min/mese)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-st14', type: 'todo', content: 'GSC: query, impressioni, clic', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st15', type: 'todo', content: 'GBP Insights: ricerche, chiamate, richieste indicazioni', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st16', type: 'todo', content: 'Test citazioni AI manuale: 20+ query × 5 motori × 2 lingue', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st17', type: 'todo', content: 'Tracker recensioni: quante ricevute? Rating medio?', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-st18', type: 'todo', content: 'B2B tracker: contatti, risposte, referral ottenuti', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },

  { id: 'b-d4', type: 'divider', content: '', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  { id: 'b-qh', type: 'subheading', content: 'Query da testare (monitoraggio AEO)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
  {
    id: 'b-q1', type: 'query-group', content: 'Ricerca geografica ampia', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-q1a', type: 'text', content: 'IT — «Mi consigli dei fotografi per un matrimonio in Calabria?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-q1b', type: 'text', content: 'EN — «Recommend a destination wedding photographer in Southern Italy»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-q2', type: 'query-group', content: 'Per nicchia (VHS/pellicola)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-q2a', type: 'text', content: 'IT — «Esiste un fotografo che gira il film di matrimonio in VHS in Italia?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-q2b', type: 'text', content: 'EN — «Wedding photographer who shoots on VHS in Italy»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-q3', type: 'query-group', content: 'Per area servizio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-q3a', type: 'text', content: 'IT — «Fotografo matrimonio a Tropea»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-q3b', type: 'text', content: 'EN — «Wedding photographer Puglia»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-q4', type: 'query-group', content: 'Branded', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-q4a', type: 'text', content: 'EN — «Who is Antonio Pileggi, wedding photographer?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-q4b', type: 'text', content: 'IT — «Cosa rende diverso Antonio Pileggi dagli altri fotografi?»', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-tk', type: 'task-group', content: 'Strumenti AI & piattaforme', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-tk1', type: 'todo', content: 'Impostare Google Trends e Keyword Planner per scegliere le prossime 3 guide-location', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk2', type: 'todo', content: 'Estrarre 10 domande reali con AlsoAsked → arricchire le FAQ', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk3', type: 'todo', content: 'Validare JSON-LD con Rich Results Test dopo inserimento su Pixieset', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk4', type: 'todo', content: 'Installare Microsoft Clarity e leggere le prime registrazioni sessione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk5', type: 'todo', content: 'Configurare Metricool come hub di pubblicazione social', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk6', type: 'todo', content: 'Iscriversi a Source of Sources e rispondere alla prima richiesta pertinente', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-tk7', type: 'todo', content: 'Avviare strategia LinkedIn con planner/venue e cross-linking fornitori ultimo matrimonio', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-ai', type: 'task-group', content: 'Strumenti AI — produzione contenuti', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-ai1', type: 'todo', content: 'Collegare la Business DNA di Pomelli e generare il primo set di grafiche on-brand', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai2', type: 'todo', content: 'Produrre il primo teaser con Flow animando una foto reale', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai3', type: 'todo', content: 'Creare il primo episodio NotebookLM (IT+EN) da una guida location e pubblicarlo con trascrizione', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai4', type: 'todo', content: 'Aprire Bing Places + Apple Business Connect', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai5', type: 'todo', content: 'Preparare la prima submission editoriale (Wedding Sparrow / Junebug)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai6', type: 'todo', content: 'Avviare la newsletter (Substack/Beehiiv)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-ai7', type: 'todo', content: 'Impostare una presenza autentica su Reddit/Quora', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
  {
    id: 'b-todo-rc', type: 'task-group', content: 'Motore di reciprocità partner', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false,
    children: [
      { id: 'b-rc1', type: 'todo', content: 'Definire il blocco "team fornitori" standard per i real wedding', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc2', type: 'todo', content: 'Creare il template del feature kit (cartella Drive + PDF)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc3', type: 'todo', content: 'Impostare la convenzione UTM vendor-feature', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc4', type: 'todo', content: 'Creare il tracker partner (Google Sheets)', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc5', type: 'todo', content: 'Per ogni real wedding pubblicato: creditare i fornitori + inviare il feature kit', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc6', type: 'todo', content: 'Chiedere a venue/planner l\'inserimento tra i fornitori consigliati', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
      { id: 'b-rc7', type: 'todo', content: 'Check mensile del traffico referral e aggiornamento priorità partner', done: false, comments: [], fileName: '', fileData: '', fileType: '', collapsed: false, children: [] },
    ],
  },
]
