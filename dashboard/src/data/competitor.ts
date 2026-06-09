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

export const defaultCompetitorBlocks: Block[] = [
  b('cp-h', 'heading', 'Analisi Competitor — perché vengono citati e cosa manca ad Antonio'),
  b('cp-intro', 'text', 'Dati estratti dai 12 test del baseline (9 giugno 2026) incrociati con i profili pubblici dei competitor citati dalle AI. Obiettivo: capire QUALI segnali concreti fanno sì che i motori citino loro e non Antonio, e tradurli in azioni. I numeri di recensioni sono al 9 giugno 2026 e vanno riverificati prima di ogni ciclo di monitoraggio.'),
  b('cp-key', 'sticky', '💡 In una riga: Antonio non ha un problema di qualità né di percezione — sulle query di marca le AI lo descrivono benissimo e con i fatti giusti. Ha un problema di SEGNALI VERIFICABILI (recensioni, directory, feature editoriali, pagine location) che i competitor hanno e lui no.', { color: 'yellow' }),
  b('cp-d1', 'divider', ''),

  b('cp-s1h', 'subheading', 'I 6 segnali che fanno citare un fotografo dalle AI (con dati)'),
  b('cp-s1a', 'text', 'Dai test emergono due "motori di fiducia" diversi: Perplexity e ChatGPT-locale premiano il VOLUME DI RECENSIONI; Gemini premia DIRECTORY e PREMI. A monte di entrambi c\'è un sito leggibile dalle AI. Ecco i sei segnali, con esempi reali e dove sta Antonio.'),
  b('cp-s1t', 'text', `| # | Segnale | Esempio dai competitor (dati) | Antonio oggi | Motore premiato |
|---|---------|-------------------------------|--------------|-----------------|
| 1 | Volume recensioni | Molaro 296 · Cerrone 67 · Fausti 54 · Cosentino 44 (Matrimonio.com) | 12 Google · ~26 Matrimonio.com | Perplexity, ChatGPT locale |
| 2 | Directory / premi documentaristici | Cacciola: Fearless Top 10 Calabria · Santucci: Love My Dress, La Lista | Together Journal, Loverly, MyWed (no award) | Gemini |
| 3 | Feature editoriali | Santucci: Vogue, Martha Stewart Weddings | nessuna nota | tutti (autorità) |
| 4 | Sito EN-first con pagine location | Cacciola: /wedding-photographer-calabria, -sicily, -apulia, -rome · Vasapollo: /fotografo-matrimonio-catanzaro | Pixieset vetrina, IT, niente pagine location | tutti (SEO/crawl) |
| 5 | Content footprint / real wedding / microsito | Pozzer: analogfilmwedding.com + FAQ · Francioso: pagine /story/ | poco testo indicizzabile, niente blog | tutti |
| 6 | Track record raccontato | Pozzer dal 1996 · Francioso dal 1991 · Santucci film dal 2011 | non esplicitato sul sito | tutti (fiducia) |`),
  b('cp-d2', 'divider', ''),

  b('cp-s2h', 'subheading', 'Profili competitor — perché vengono citati'),

  b('cp-cac-h', 'subheading', '① Andrea Cacciola — il benchmark assoluto (Vibo Valentia, Calabria)'),
  b('cp-cac', 'text', 'Presente in 4 viste sulle query geografiche Gemini (Sud Italia EN, Calabria EN, Tropea, e il re-run). Perché lo citano: (1) Fearless Photographers Top 10 Calabria — directory-premio che Gemini pesca direttamente; (2) sito EN-first con una pagina di atterraggio per OGNI location (Calabria, Sicilia, Puglia, Reggio Calabria, Roma…) che intercetta le ricerche "wedding photographer [luogo]"; (3) testimonianze pubblicate sul sito; (4) posizionamento netto e ripetuto ("unobtrusive observer", fine art).'),
  b('cp-cac-g', 'text', '→ Cosa ha che Antonio non ha: appartenenza a Fearless + un\'architettura di pagine location in inglese. È il modello da studiare e superare sull\'angolo analogico/VHS.'),

  b('cp-san-h', 'subheading', '② Stefano Santucci — il benchmark sulla PELLICOLA (Firenze)'),
  b('cp-san', 'text', 'Il nome n.1 che ChatGPT associa a "matrimonio in pellicola in Italia" (Test 7). Perché lo citano: (1) feature su Vogue e Martha Stewart Weddings — autorità editoriale altissima, esattamente ciò che le AI ripetono; (2) identità nettissima e full-time film dal 2011 ("film & darkroom printer"); (3) directory internazionali (Love My Dress, La Lista); (4) pagine location EN (Florence on film, Tuscany).'),
  b('cp-san-g', 'text', '→ Cosa ha che Antonio non ha: feature editoriali di primissimo livello e un\'autorità da "film photographer" consolidata. NB strategico: è toscano e non fa VHS — quindi su PELLICOLA + VHS + SUD lo spazio resta aperto.'),

  b('cp-poz-h', 'subheading', '③ Mauro Pozzer — chi possiede la keyword "analog film wedding" (Vicenza)'),
  b('cp-poz', 'text', 'Citato da ChatGPT tra i più focalizzati sull\'analogico puro. Perché lo citano: (1) un microsito dedicato, analogfilmwedding.com, che possiede letteralmente la categoria; (2) contenuto verticale e profondo (FAQ, "why analog today", pellicole citate: Portra 160, Ilford XP5); (3) 30 anni di track record (studio dal 1996); (4) pagine EN per location.'),
  b('cp-poz-g', 'text', '→ Cosa ha che Antonio non ha: un asset di contenuto verticale sulla nicchia (microsito + FAQ) e una narrativa di esperienza. È il modello esatto da replicare per VHS/35mm nel Sud Italia.'),

  b('cp-fra-h', 'subheading', '④ Francioso Studios — l\'editoriale di Puglia (Ostuni)'),
  b('cp-fra', 'text', 'Presente in entrambe le esecuzioni "Southern Italy" su Gemini EN (Test 3 e 12). Perché lo citano: (1) team con 30+ anni (studio dal 1991); (2) pagine location EN (Puglia, luxury destination); (3) real wedding pubblicati nelle pagine /story/; (4) presenza su più directory (Wanderlog, Wheree, Wezoree); (5) posizionamento luxury/editoriale per coppie internazionali.'),
  b('cp-fra-g', 'text', '→ Cosa ha che Antonio non ha: real weddings pubblicati + ampiezza di directory + un sito pensato per il mercato estero.'),

  b('cp-cos-h', 'subheading', '⑤ Salvatore Cosentino — il "gemello" da battere (Catanzaro Lido)'),
  b('cp-cos', 'text', 'Citato da ChatGPT per "fotografo matrimonio Catanzaro" (Test 8), proprio dove Antonio è assente. È il confronto più scomodo: stessa provincia e STESSO identico posizionamento di Antonio — "elegante, naturale, romantico reportage senza pose costruite", "discreto ma presente", "storie piene di poesia". L\'unica differenza misurabile: 44 recensioni 5.0 su Matrimonio.com (100% consigliato) contro le ~26 di Antonio.'),
  b('cp-cos-g', 'text', '→ Cosa ha che Antonio non ha: circa 18 recensioni in più sulla stessa identica piattaforma, a parità di città e di stile. È il gap più colmabile di tutta l\'analisi — e quello che spiega da solo l\'assenza sul Test 8.'),

  b('cp-min-h', 'subheading', 'Altri nomi ricorrenti (presidi di query specifiche)'),
  b('cp-min', 'text', 'Luigi Reccia (Campania) presidia il "Southern Italy" EN; Tommaso Pugliese possiede "Tropea" (foto+video+drone, recensioni internazionali); Valerio Vasapollo presidia "Catanzaro" con una pagina location dedicata (valeriovasapollo.it/fotografo-matrimonio-catanzaro) — esempio diretto di SEO locale che Antonio non ha. Sul fronte recensioni, Perplexity premia Valeria Molaro (296), Fernando Cerrone (67) e Fausti (54).'),
  b('cp-d3', 'divider', ''),

  b('cp-s3h', 'subheading', 'Tabella gap — Antonio vs benchmark, segnale per segnale'),
  b('cp-s3t', 'text', `| Segnale | Antonio (oggi) | Benchmark | Gap | Mossa |
|---------|----------------|-----------|-----|-------|
| Recensioni Google | 12 | 35–296 | molto sotto soglia | Mossa 1: 12 → 30+ |
| Recensioni Matrimonio.com | ~26 | Cosentino 44 (stessa città) | −18 vs il "gemello" | chiederle alle ultime coppie |
| Directory / premi | Together Journal, Loverly, MyWed | Fearless (Cacciola), WPJA | assente dalle "premio" | Fearless / WPJA / This Is Reportage |
| Feature editoriali | nessuna | Santucci: Vogue, Martha Stewart | assente | submission Junebug / Wedding Sparrow |
| Sito + pagine location | Pixieset vetrina, IT | pagine EN per ogni location | assente | pagine location IT+EN + JSON-LD |
| Real wedding / contenuto | scarso | Francioso /story/, Pozzer microsito | assente | real wedding + pillar VHS/pellicola |
| Mercato inglese | poco presidiato | tutti EN-first | metà mercato scoperto | sito e profili bilingue |`),
  b('cp-d4', 'divider', ''),

  b('cp-s4h', 'subheading', 'Il confronto che fa più male: Cosentino vs Antonio'),
  b('cp-s4t', 'text', `| | Antonio Pileggi | Salvatore Cosentino |
|---|-----------------|---------------------|
| Zona | Maida (CZ) | Catanzaro Lido (CZ) |
| Posizionamento | elegante, naturale, reportage senza pose, storytelling | elegante, naturale, reportage senza pose, "storie piene di poesia" |
| Recensioni Matrimonio.com | ~26 (5.0) | 44 (5.0, 100% consigliato) |
| Citato da ChatGPT su "Catanzaro" | NO | SÌ |
| Prezzo indicato | €1.865–3.065 | da €2.200 |`),
  b('cp-s4a', 'text', 'Lettura: a parità di città, stile e rating, l\'unica variabile che li separa nella risposta AI è il NUMERO di recensioni. Non serve "essere migliori": serve avere più prove sociali sulla stessa piattaforma. Pareggiare Cosentino (≈ +18 recensioni Matrimonio.com) è l\'azione singola a più alto impatto e a costo zero.'),
  b('cp-d5', 'divider', ''),

  b('cp-s5h', 'subheading', 'Cosa manca ad Antonio per raggiungere quel livello (priorità)'),
  b('cp-s5', 'text', '1. RECENSIONI (più rapida, costo zero, massimo impatto): +18 su Matrimonio.com pareggia Cosentino; 12 → 30+ Google sblocca Perplexity. È il gap più colmabile e il più premiato dalle AI sul locale. → Mossa 1.\n2. PAGINE LOCATION BILINGUI + JSON-LD sul sito: è il segnale tecnico che hanno TUTTI i citati e Antonio no. Replica l\'architettura di Cacciola/Vasapollo ("fotografo matrimonio [luogo]" in IT ed EN). → Mossa 2.\n3. POSSEDERE LA NICCHIA VHS + pellicola + Sud con un asset verticale (pagina pillar o micro-sito stile analogfilmwedding.com): nessuno dei competitor analogici è del Sud né fa VHS — white space reale. → Mossa 3.\n4. UNA DIRECTORY-PREMIO (Fearless o This Is Reportage): è il biglietto d\'ingresso su Gemini EN, dove vincono Cacciola e Coluccio.\n5. UNA FEATURE EDITORIALE (Junebug, Wedding Sparrow): è ciò che dà a Santucci autorità trasversale su tutti i motori.\n6. MERCATO INGLESE: sito e profili bilingui per intercettare le coppie straniere — oggi metà mercato è scoperto e tutti i benchmark sono EN-first.'),
  b('cp-seq', 'sticky', '🎯 Sequenza consigliata: 1) recensioni (subito, gratis) → 2) pagine location + schema → 3) asset VHS/pellicola → 4) directory + feature. I primi due punti chiudono da soli ~80% del gap di SCOPERTA misurato nel baseline (Visibility Score 0).', { color: 'green' }),
]
