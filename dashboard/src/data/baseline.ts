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

export const defaultBaselineBlocks: Block[] = [
  b('bl-h', 'heading', 'Baseline monitoraggio AI — Giugno 2026'),
  b('bl-intro', 'text', 'La "foto del prima". Test reali eseguiti in incognito (sessione pulita, senza login) sui motori AI con le query di scoperta del protocollo. Motori coperti finora: Perplexity, Gemini e ChatGPT (Test 6-12, aggiunti il 9 giugno). Si ripete ogni 30 giorni con le stesse query per misurare la crescita.'),
  b('bl-key', 'text', '🔴 RISULTATO CHIAVE: su 12 test in 3 motori (Perplexity, Gemini, ChatGPT), Antonio NON compare in NESSUNA delle 8 query di scoperta unbranded — incluse la sua nicchia-cuore (pellicola, Test 7) e la sua stessa PROVINCIA, Catanzaro (Test 8). AEO Visibility Score di partenza = 0. Le uniche eccezioni sono tutte DI MARCA (Test 6 ChatGPT; Test 9-10 Gemini): nome, stile e regioni risultano accurati e on-brand (accuratezza fatti 1/1). Traduzione: la percezione è già vinta, ma il nome non emerge mai quando una coppia cerca senza conoscerlo — nemmeno a casa sua. È il gap che la strategia deve chiudere.'),
  b('bl-d1', 'divider', ''),

  b('bl-mh', 'subheading', 'Mappa competitiva emersa (chi viene citato al posto suo)'),
  b('bl-ma', 'text', 'Andrea Cacciola è l’entità dominante per la Calabria: citato da Gemini in TUTTE e 3 le query (Sud Italia + Calabria + Tropea), pluripremiato Fearless e descritto come "unobtrusive observer". Tommaso Pugliese possiede la query "Tropea" (2 citazioni). Insieme a Danilo Coluccio e Frank Armocida (entrambi nella directory WPJA) confermano la lezione: chi è nelle directory documentaristiche (WPJA, Fearless) viene pescato dalle AI. ChatGPT aggiunge due mappe nuove: sull\'asse PELLICOLA (Test 7) cita specialisti nazionali — Stefano Santucci (Toscana), Mauro Pozzer, Matteo Cuzzola, Fabio Betelli, nessuno calabrese; sulla PROVINCIA di Catanzaro (Test 8) cita 8 nomi locali — Valerio Vasapollo, Francesco Mazzei, Beatrice Canino, Emma Cardamone, Massimo Carlostella, Fotovideando, Salvatore Cosentino, Ettore Mirarchi — e Antonio, che ha sede proprio lì (Maida, CZ), non è tra loro.'),
  b('bl-mb', 'text', `| Pattern osservato | Cosa lo guida | Azione per Antonio |
|-------------------|---------------|--------------------|
| Perplexity (IT) cita profili con TANTE recensioni Google | Valeria Molaro 296, Cerrone 67, Fausti 54 recensioni | Mossa 1: portare le recensioni 12 → 30+ |
| Gemini (EN) cita fotografi con premi/directory (WPJA, Fearless) | Cacciola, Coluccio, Armocida, Lombardo | Entrare in WPJA / This Is Reportage / Fearless |
| Su "pellicola" ChatGPT cita già specialisti nazionali | Santucci, Pozzer, Cuzzola, Betelli — nessuno del Sud | Mossa 3 ristretta: pellicola + VHS + Sud Italia/Calabria |
| Su "Catanzaro" ChatGPT cita 8 locali, Antonio assente in casa | Vasapollo, Mazzei, Canino, Cardamone, Carlostella… | GBP + recensioni + entità locale (Maida/CZ) coerente |
| ChatGPT e Gemini descrivono bene Antonio solo da branded | col nome bastano sito + Matrimonio.com + social | Il collo di bottiglia è la scoperta, non la reputazione |
| Motori diversi, fonti diverse | Perplexity → Google reviews; Gemini → award; ChatGPT → sito/Matrimonio + local | Presidiare tutte le leve |`),
  b('bl-d2', 'divider', ''),

  b('bl-t1h', 'subheading', 'Test 1 — Perplexity — «Mi consigli dei fotografi per un matrimonio in Calabria?»'),
  b('bl-t1m', 'text', 'Data: 8 giugno 2026 · Motore: Perplexity · Lingua: IT · Modalità: incognito · Antonio citato: NO'),
  b('bl-t1n', 'text', 'Nomi consigliati dal motore:'),
  b('bl-t1t', 'text', `| Fotografo | Località | Rating | Recensioni |
|-----------|----------|--------|------------|
| Alessandro Scigliano | Cosenza | 4.9 | 40 |
| Vincenzo Covelli | Cosenza | 5.0 | 35 |
| Domenico Stumpo | Cosenza | 4.8 | 16 |
| Valeria Molaro Photos | Rende | 5.0 | 296 |
| Pasquale Minniti / Photo4U | Calabria e Sicilia | — | — |
| Domenico Pisani | Crotone | — | — |`),
  b('bl-t1a', 'text', 'Consigli del motore: per stile reportage → cercare portfolio con scatti spontanei; se la location è in prov. Cosenza → restare su fotografi di zona; chiedere sempre 3 cose prima di confermare (gallery completa, tempi di consegna, cosa include il preventivo). Premium locale: Valeria Molaro o Vincenzo Covelli. Reportage solido: Alessandro Scigliano o Pasquale Minniti.'),
  b('bl-t1f', 'text', 'Follow-up proposti dal motore: reportage a Reggio Calabria · budget contenuto/servizio essenziale · fine art costa ionica · Cosenza qualità-prezzo · disponibile a spostarsi per Tropea.'),
  b('bl-d3', 'divider', ''),

  b('bl-t2h', 'subheading', 'Test 2 — Perplexity — «Migliori fotografi di matrimonio nel Sud Italia»'),
  b('bl-t2m', 'text', 'Data: 8 giugno 2026 · Motore: Perplexity · Lingua: IT · Modalità: incognito · Antonio citato: NO'),
  b('bl-t2n', 'text', 'I nomi più forti emersi (concentrati in Campania, area Salerno):'),
  b('bl-t2t', 'text', `| Fotografo | Località | Rating | Recensioni |
|-----------|----------|--------|------------|
| Fernando Cerrone | Salerno/Campania | 5.0 | 67 |
| Un Altro Matrimonio | Polla (SA) | 5.0 | 18 |
| Fausti Fotografi | Polla (SA) | 4.8 | 54 |
| Carrano Giuseppe Fotografo | Polla (SA) | 4.9 | 16 |
| Antonietta Santomauro | Teggiano (SA) | 4.7 | 16 |`),
  b('bl-t2a', 'text', 'Il motore rimanda anche a raccolte dedicate per Calabria e Sicilia e a classifiche generali su portali wedding. Consiglio: per risultato editoriale → portfolio con luce naturale e composizione pulita; per reportage → fotografi che mostrano reportage completi; partire da professionisti della stessa regione per ridurre trasferte.'),
  b('bl-t2f', 'text', 'Follow-up proposti dal motore: shortlist solo Puglia · solo Sicilia · solo Calabria · solo Campania · confronto fra le quattro regioni.'),
  b('bl-t2note', 'text', 'Nota: nessun calabrese tra i "più forti" — Perplexity ha privilegiato i profili campani con molte recensioni Google. Conferma quanto pesi il volume recensioni.'),
  b('bl-d4', 'divider', ''),

  b('bl-t3h', 'subheading', 'Test 3 — Gemini — «Recommend a destination wedding photographer in Southern Italy»'),
  b('bl-t3m', 'text', 'Data: 8 giugno 2026 · Motore: Gemini · Lingua: EN · Modalità: incognito · Antonio citato: NO'),
  b('bl-t3t', 'text', `| Fotografo | Stile | Zona | Ideale per |
|-----------|-------|------|------------|
| Francioso Studios | Editorial, raffinato, documentaristico | Puglia & oltre | estetica timeless da editoriale luxury |
| Andrea Cacciola | Candid, emozionale ("silent narrator") | Calabria, Sicilia, Puglia | esperienza naturale e senza pose |
| Gaetano Rossi | Luxury, artistico, cinematografico | Campania/Napoli | grandi matrimoni luxury (Amalfi, Sorrento) |
| Luigi Reccia | Caldo, luminoso, gioioso | Sud Italia | storytelling romantico e vibrante |`),
  b('bl-t3a', 'text', 'Tip regionale del motore: Costa Amalfitana/Capri → serve gestire sole forte a mezzogiorno e ombre dure; Puglia/Basilicata → giocare con pietra bianca riflettente e campi dorati la sera. Chiusura: chiede regione/venue e stile (moody-cinematic vs bright-classic) per restringere.'),
  b('bl-d5', 'divider', ''),

  b('bl-t4h', 'subheading', 'Test 4 — Gemini — «Best wedding photographers in Calabria, Italy»'),
  b('bl-t4m', 'text', 'Data: 8 giugno 2026 · Motore: Gemini · Lingua: EN · Modalità: incognito · Antonio citato: NO'),
  b('bl-t4t', 'text', `| Fotografo | Note / riconoscimenti | Zona |
|-----------|------------------------|------|
| Andrea Cacciola | Fearless Awards, "unobtrusive observer" | Calabria (Tropea, Scilla) |
| Tommaso Pugliese (Wedding Tropea) | Cinematico, foto+video, recensioni internazionali | Tropea, Capo Vaticano |
| Danilo Coluccio | WPJA, documentaristico high-end, pluripremiato | Siderno (RC) |
| Frank Armocida | WPJA, documentario + paesaggio calabrese | Gioiosa Ionica (RC) |
| Nino Lombardo | Award, photojournalism (destination) | Sicilia → Calabria |
| Federico Pannacci | Romantico, high-fashion, editoriale | Toscana → Sud Italia |`),
  b('bl-t4a', 'text', 'Tip del motore per prenotare: 1) decidi stile (photojournalism vs editorial/fine-art); 2) verifica gestione luce dura del Sud (tramonto su Tirreno/Ionio); 3) logistica — i locali conoscono spot nascosti e timing. Chiusura: chiede stile o venue già scelta.'),
  b('bl-d6', 'divider', ''),

  b('bl-t5h', 'subheading', 'Test 5 — Gemini — «Fotografo per un matrimonio a Tropea»'),
  b('bl-t5m', 'text', 'Data: 8 giugno 2026 · Motore: Gemini · Lingua: IT · Modalità: incognito · Antonio citato: NO'),
  b('bl-t5t', 'text', `| Fotografo / Studio | Stile | Note |
|--------------------|-------|------|
| Andrea Cacciola | Reportage, istanti spontanei, luce naturale | Tropea, Capo Vaticano, Pizzo |
| Tommaso Pugliese | Discreto, naturale, elegante; foto+video+drone | destination Calabria, apprezzato da stranieri |
| Shotix Wedding Studio | Editoriale, cinematografico, team (2+ fotografi) | matrimoni eleganti sul mare |
| Damiano Carelli Studio | Esclusivo, d’impatto; con wedding planner locali | Tropea, valorizza il territorio |`),
  b('bl-t5a', 'text', 'Consigli del motore: 1) Stile — capire se preferisci reportage puro (scatti spontanei) o editoriale/cinematografico (guarda Instagram/sito); 2) Luce — Tropea ha luce incredibile al tramonto: chiedi un album intero di un matrimonio già fatto lì per vedere come gestiscono la luce forte del mare e le ombre del centro storico; 3) Tempistiche — muoversi 8-12 mesi prima, specie weekend maggio-settembre.'),
  b('bl-t5note', 'text', 'Cacciola compare per la 3ª volta (è il benchmark da superare). Tropea ha specialisti dedicati (Pugliese, Shotix, Carelli): è una query "di location" presidiata — il vantaggio di Antonio sta nella nicchia analogica, non nel battere i locali sul terreno generico.'),
  b('bl-d7', 'divider', ''),

  b('bl-t6h', 'subheading', 'Test 6 — ChatGPT — «Chi è Antonio Pileggi, fotografo di matrimoni?»'),
  b('bl-t6m', 'text', 'Data: 9 giugno 2026 · Motore: ChatGPT · Lingua: IT · Modalità: incognito · Tipo: branded (di marca) · Antonio citato: SÌ'),
  b('bl-t6n', 'text', 'Cosa ha risposto il motore: lo presenta come fotografo di matrimoni e ritratti, attivo in Calabria e disponibile per destination wedding in tutta Italia; "wedding storytelling" su digitale, pellicola e VHS, approccio documentaristico ed editoriale; stile "elegante, naturale e senza tempo" con influenze moda/reportage; lavora su pochi matrimoni l\'anno; servizi matrimonio/prematrimonio/postmatrimonio, album Fine Art, alta risoluzione; cita le recensioni 5/5 su Matrimonio.com (discrezione, professionalità, spontaneità). Rimanda al sito antoniopileggi.com.'),
  b('bl-t6acc', 'text', 'Accuratezza dell\'entità: ALTA. ChatGPT ha i fatti chiave corretti — Calabria, destination, digitale + pellicola + VHS, storytelling documentaristico, recensioni Matrimonio.com. Nessuna allucinazione evidente. Le affermazioni non verificabili dalla fonte ("numero limitato di matrimoni l\'anno", "senza tempo") sono plausibili e coerenti col brand. Sentiment: POSITIVO, in linea col posizionamento (autentico, elegante, spontaneo).'),
  b('bl-t6note', 'text', 'Lettura strategica: sulla query DI MARCA l\'entità è già pulita e ben raccontata — segno che le fonti pubbliche (sito + Matrimonio.com) bastano a ChatGPT per descriverlo bene QUANDO conosce già il nome. Il problema non è la percezione, è la SCOPERTA: chi non lo conosce non lo incontra (vedi Test 7 e 8). Le query branded non entrano nell\'AEO Visibility Score.'),
  b('bl-d8', 'divider', ''),

  b('bl-t7h', 'subheading', 'Test 7 — ChatGPT — «C\'è un fotografo che fotografa matrimoni in pellicola in Italia?»'),
  b('bl-t7m', 'text', 'Data: 9 giugno 2026 · Motore: ChatGPT · Lingua: IT · Modalità: incognito · Tipo: nicchia pellicola (unbranded) · Antonio citato: NO'),
  b('bl-t7n', 'text', 'Nomi consigliati dal motore (è la nicchia-cuore di Antonio — la pellicola — e lui non compare):'),
  b('bl-t7t', 'text', `| Fotografo | Posizionamento dichiarato | Zona |
|-----------|---------------------------|------|
| Stefano Santucci | Wedding photography su pellicola, fine art | Toscana / Firenze |
| Mauro Pozzer | Tra i più focalizzati sull'analogico puro | Tutta Italia |
| Matteo Cuzzola | Pellicola + reportage tradizionale | Italia |
| Fabio Betelli | Analogico, stile editoriale/documentaristico | Italia |`),
  b('bl-t7a', 'text', 'Consigli del motore: distingue fine art/editoriale (medio formato, Contax 645/Pentax 67), reportage documentario (mix pellicola+digitale) e luxury destination (Toscana, Como, Costiera — look cinematografico). Suggerisce di chiedere sempre: quanta parte è davvero scattata in pellicola, quali formati (35mm/medio formato/BN), se consegna scansioni professionali, di vedere gallerie complete. Chiude chiedendo zona e budget per restringere.'),
  b('bl-t7note', 'text', '🔴 Finding critico: è ESATTAMENTE il differenziatore di Antonio (pellicola) e ChatGPT non lo nomina, mentre cita 4 specialisti. CORREGGE però un\'assunzione del baseline: la nicchia pellicola NON è uno white space totale — esistono nomi nazionali affermati (Santucci, Pozzer su tutto l\'analogico). Lo spazio difendibile per Antonio non è «pellicola in Italia» (presidiata da toscani/nord), ma l\'intersezione PELLICOLA + VHS + SUD ITALIA/CALABRIA: nessuno dei 4 è del Sud né combina pellicola e VHS. Mossa 3 va riformulata su quell\'angolo stretto.'),
  b('bl-d9', 'divider', ''),

  b('bl-t8h', 'subheading', 'Test 8 — ChatGPT — «Consigliami un fotografo matrimonio a Catanzaro»'),
  b('bl-t8m', 'text', 'Data: 9 giugno 2026 · Motore: ChatGPT · Lingua: IT · Modalità: incognito · Tipo: area servizio / provincia di casa (unbranded) · Antonio citato: NO'),
  b('bl-t8n', 'text', 'Nomi consigliati dal motore — query sulla SUA provincia (Maida è in provincia di Catanzaro) e Antonio non compare tra gli 8:'),
  b('bl-t8t', 'text', `| Fotografo / Studio | Come lo descrive ChatGPT | Cluster |
|--------------------|--------------------------|---------|
| Valerio Vasapollo | Reportage naturale, poco impostato, molte recensioni | Reportage/emozioni |
| Francesco Mazzei | Immagini spontanee e curate, foto emozionali | Reportage/emozioni |
| Beatrice Canino | Stile moderno e creativo | Reportage/emozioni |
| Emma Cardamone | Eccellenti recensioni locali | Studi con recensioni |
| Massimo Carlostella | Studio noto a Catanzaro, professionalità | Studi con recensioni |
| Fotovideando | Servizi foto + video per matrimoni ed eventi | Studi con recensioni |
| Salvatore Cosentino | Approccio elegante, wedding storytelling | Artistico/ricercato |
| Ettore Mirarchi Films | Forte componente cinematografica | Artistico/ricercato |`),
  b('bl-t8a', 'text', 'Struttura della risposta: ChatGPT raggruppa per stile (reportage/emozioni · studi con ottime recensioni locali · artistico/ricercato) e chiude chiedendo data, budget (1.500/2.500/4.000 €), stile e zona (Catanzaro città, Soverato, Lamezia) per produrre una shortlist di 3-5. Le leve che fa emergere: recensioni locali e riconoscibilità dello studio sul territorio.'),
  b('bl-t8note', 'text', '🔴 Il finding più severo del set: Antonio è assente sulla query della SUA stessa provincia, dove vince chi ha recensioni e presenza locale (lo storytelling "elegante/artistico" — il suo terreno — è citato con Cosentino e Mirarchi). Conferma diretta della Mossa 1 (recensioni Google 12 → 30+) e dell\'urgenza di un Google Business Profile completo e di un\'entità locale coerente (Maida/Catanzaro) su sito, schema e directory. Nota: Salvatore Cosentino è il competitor più vicino al posizionamento di Antonio (storytelling elegante) — da studiare.'),
  b('bl-d10', 'divider', ''),

  b('bl-t9h', 'subheading', 'Test 9 — Gemini — «Descrivimi lo stile di Antonio Pileggi fotografo wedding»'),
  b('bl-t9m', 'text', 'Data: 9 giugno 2026 · Motore: Gemini · Lingua: IT · Modalità: incognito · Tipo: branded (stile/percezione) · Antonio citato: SÌ'),
  b('bl-t9n', 'text', 'Come Gemini descrive lo stile: «editoriale, emotivo e fortemente orientato al reportage narrativo». Tratti citati: (1) reportage/spontaneità — emozioni autentiche, gesti spontanei, connessioni reali, no pose; (2) estetica editoriale «hopeless romantic» con taglio moda/viaggio, romantica ma sofisticata; (3) mix multimediale digitale + pellicola 35mm (texture, colori caldi) + VHS (atmosfera nostalgica, imperfetta); (4) palette delicata/morbida/calda e ricerca del «sense of place» con luce naturale, borghi e paesaggi italiani. Sintesi del motore: racconto intimo, non convenzionale, che valorizza atmosfera e «imperfezioni poetiche» dei ricordi reali.'),
  b('bl-t9acc', 'text', 'Accuratezza dell\'entità: ALTA. Tutti i tratti distintivi corretti — reportage editoriale, «hopeless romantic» (claim del brand), digitale + 35mm + VHS, palette calda, sense of place. Nessuna allucinazione. Unica sfumatura: l\'ancoraggio geografico è generico («paesaggi italiani»), non specifico su Sud Italia/Calabria.'),
  b('bl-t9sent', 'text', 'Sentiment (Blocco 2 del protocollo): POSITIVO e pienamente ALLINEATO al brand. Compaiono quasi tutte le parole-target — atmosfera, autentico, pellicola/VHS, memoria/nostalgia, documentario/reportage — al posto di descrizioni generiche. Manca solo l\'aggancio «Sud Italia/Calabria» nel racconto dello stile.'),
  b('bl-t9note', 'text', 'Lettura strategica: è il secondo segnale (dopo Test 6 su ChatGPT) che sulle query DI MARCA l\'entità e il sentiment sono già ottimi e fedeli — perfino la formula «hopeless romantic» viene restituita. Conferma definitiva: la percezione è vinta, la SCOPERTA no. Micro-azione: rinforzare l\'associazione nome ↔ luogo (Maida / Catanzaro / Calabria / Sud Italia) in bio, schema e contenuti, così che lo stile venga legato anche al territorio.'),
  b('bl-d11', 'divider', ''),

  b('bl-t10h', 'subheading', 'Test 10 — Gemini — «In quali regioni lavora Antonio Pileggi fotografo?»'),
  b('bl-t10m', 'text', 'Data: 9 giugno 2026 · Motore: Gemini · Lingua: IT · Modalità: incognito · Tipo: branded (verifica fatti / Blocco 3) · Antonio citato: SÌ'),
  b('bl-t10n', 'text', 'Cosa ha risposto Gemini: lavora principalmente nel Centro e Sud Italia. Regioni elencate: Calabria (terra d\'origine — Tropea, Soverato, Gerace, Maida), Toscana (Siena, Lucca), Sicilia (Taormina, Milazzo), Puglia (Alberobello). Lo qualifica come specializzato in destination wedding (coppie straniere) e moda, disponibile su tutto il territorio nazionale e all\'estero.'),
  b('bl-t10acc', 'text', 'Accuratezza dell\'entità (Blocco 3): CORRETTA al 100%. Coincide con la risposta attesa (Calabria, Sicilia, Puglia, Toscana, tutta Italia); cita perfino Maida e dettaglia le località. Corretto anche il riferimento a moda/editoriale (background reale) e a destination/estero. Micro-imprecisione: rende «destination wedding» con «matrimoni d\'oltremare», sfumatura traduttiva non sostanziale. Punteggio accuratezza Blocco 3 finora: 1/1.'),
  b('bl-t10note', 'text', 'Lettura strategica: terzo segnale che l\'entità è pulita — Gemini ha non solo lo stile (Test 9) ma anche la GEOGRAFIA giusta, fino al comune di Maida. Prova che, noto il nome, le AI hanno i fatti corretti. Resta da trasferire questa accuratezza dalle query di marca a quelle di scoperta: le stesse località (Tropea, Taormina, Puglia) sono dove Antonio NON compare quando la coppia non lo nomina (Test 1-5, 7-8).'),
  b('bl-d12', 'divider', ''),

  b('bl-t11h', 'subheading', 'Test 11 — Gemini — «Mi consigli dei fotografi per un matrimonio in Calabria?»'),
  b('bl-t11m', 'text', 'Data: 9 giugno 2026 · Motore: Gemini · Lingua: IT · Modalità: incognito · Tipo: geografica Calabria (unbranded) · Antonio citato: NO'),
  b('bl-t11n', 'text', 'Nomi consigliati dal motore:'),
  b('bl-t11t', 'text', `| Fotografo | Stile | Zona |
|-----------|-------|------|
| Domenico itsiciliano | Cinematografico, narrativo, momenti spontanei | Reggio Calabria |
| Vincenzo Santaera | Fotogiornalismo, scatti naturali senza pose | Crotone / Catanzaro |
| Francesco Rossi | Moderno, d'impatto, colori e luce naturale | Cosenza |
| Studio Morabito | Dal classico al contemporaneo | Reggio Calabria |`),
  b('bl-t11a', 'text', 'Consigli del motore: non guardare solo il portfolio ma chiedere un matrimonio completo (gestione della luce dalla preparazione alla festa serale); valutare stile (reportage vs fine art/editoriale), budget (drone, secondo fotografo, album) ed empatia. Chiude chiedendo zona della Calabria e stile preferito.'),
  b('bl-t11note', 'text', 'Insight chiave: è la STESSA query di scoperta del Test 1 (lì Perplexity IT) ma su Gemini IT — Antonio di nuovo assente. In più, Gemini IT restituisce nomi DIVERSI dalla sua versione EN (Test 4: Cacciola, Pugliese, Coluccio, Armocida, tutti award/WPJA): in italiano pesca profili più locali e generici (itsiciliano, Santaera, Rossi, Morabito). Lezione: italiano e inglese sono due mercati con fonti diverse anche sullo stesso motore, da presidiare separatamente. La query «Calabria» è ora a 0 su 3 viste (Perplexity IT, Gemini EN, Gemini IT).'),
  b('bl-d13', 'divider', ''),

  b('bl-t12h', 'subheading', 'Test 12 — Gemini — «Recommend a destination wedding photographer in Southern Italy» (re-run del Test 3)'),
  b('bl-t12m', 'text', 'Data: 9 giugno 2026 · Motore: Gemini · Lingua: EN · Modalità: incognito · Tipo: geografica Sud Italia (unbranded, re-run) · Antonio citato: NO'),
  b('bl-t12n', 'text', 'Nomi consigliati dal motore in questa esecuzione:'),
  b('bl-t12t', 'text', `| Fotografo | Vibe | Zona / Specialità |
|-----------|------|-------------------|
| Francioso Studios | Editoriale, raffinato, autentico | Puglia (masserie, uliveti) |
| Luigi Reccia | Caldo, spontaneo, relazionale | Campania (Capri, Positano, Sorrento, Paestum) |
| Andrea Cacciola | Fine art, poetico, discreto | Calabria, Sicilia, Puglia |
| Daniela Katia | Cinematografico, morbido, atmosferico | Amalfi, Puglia (coppie internazionali) |`),
  b('bl-t12a', 'text', 'Tips del motore: controllare gallerie complete (non solo Instagram) per skin tone puliti in tutte le condizioni di luce (sole forte a mezzogiorno, interni in pietra, terrazze a lume di candela); scegliere chi ha conoscenza logistica locale (traffico Amalfi, traghetti, ritmo dei matrimoni italiani). Chiude chiedendo regione e stile preferito.'),
  b('bl-t12note', 'text', 'Re-run del Test 3 (stessa query, stesso motore/lingua) → misura l\'AFFIDABILITÀ test-retest. Nomi STABILI (in entrambe le esecuzioni): Francioso Studios, Andrea Cacciola, Luigi Reccia — sono le entità che Gemini associa saldamente al Sud Italia EN. Variazione: il 4° slot ruota (Gaetano Rossi nel Test 3 → Daniela Katia ora). Antonio assente in entrambe. Nota metodo: le risposte AI non sono deterministiche — i nomi che si ripetono sono competitor "forti", quelli che ruotano sono più deboli. Non conta come nuova query nel punteggio (è un re-run), ma conferma lo 0.'),
  b('bl-d14', 'divider', ''),

  b('bl-ah', 'subheading', 'Cosa ci dice il baseline (azioni)'),
  b('bl-aa', 'text', '1. Recensioni Google sono il biglietto d’ingresso su Perplexity E su ChatGPT-locale: i citati hanno 35–296 recensioni, Antonio 12. Sulla query «Catanzaro» (Test 8) vincono proprio i profili con recensioni locali. → Mossa 1 (12 → 30+) + Google Business Profile completo: è la leva più urgente.\n2. Le directory documentaristiche (WPJA, Fearless) sono il biglietto d’ingresso su Gemini: Cacciola, Coluccio, Armocida, Lombardo sono tutti lì. → entrare in WPJA / This Is Reportage / Fearless.\n3. CORREZIONE dal Test 7 (ChatGPT): la nicchia «pellicola» NON è uno white space totale — esistono specialisti nazionali affermati (Santucci, Pozzer, Cuzzola, Betelli), ma nessuno è del Sud né combina pellicola e VHS. → Mossa 3 va ristretta all’intersezione pellicola + VHS + Sud Italia/Calabria: è lì lo spazio davvero difendibile.\n4. Marca vs scoperta (Test 6 ChatGPT + Test 9 Gemini, vs 7-8): sulle query di marca ChatGPT e Gemini descrivono Antonio in modo accurato e on-brand (perfino «hopeless romantic» e il sense of place), ma sparisce sulla nicchia (pellicola) e sulla provincia (Catanzaro). Percezione vinta, entità pulita; manca l’aggancio nella SCOPERTA. → schema, FAQ, pagina pillar VHS/pellicola e coerenza locale (Maida/CZ) servono a far emergere il nome PRIMA che la coppia lo conosca. Unico ritocco di sentiment: legare lo stile anche al territorio (Sud Italia/Calabria), oggi assente nella descrizione di Gemini.\n5. Benchmark da studiare: Andrea Cacciola sull’asse Calabria/documentaristico (3/3 Gemini); Santucci e Pozzer sull’asse pellicola; Salvatore Cosentino sull’asse «storytelling elegante» a Catanzaro (il più vicino al posizionamento di Antonio).\n6. Italiano ≠ inglese, anche sullo stesso motore (Test 11 vs Test 4): Gemini IT consiglia profili locali generici (itsiciliano, Santaera, Rossi, Morabito), Gemini EN consiglia award/WPJA (Cacciola, Coluccio…). I due mercati vanno presidiati separatamente, con contenuti bilingue.\n7. Prossimo test: ripetere le 11 query + le query VHS/35mm a luglio 2026 su tutti e 5 i motori (mancano AI Overviews e Claude) e confrontare il punteggio.'),
]
