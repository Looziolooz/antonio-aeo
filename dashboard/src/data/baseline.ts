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
  b('bl-intro', 'text', 'La "foto del prima". Test reali eseguiti in incognito (sessione pulita, senza login) sui motori AI con le query di scoperta del protocollo. Si ripete ogni 30 giorni con le stesse query per misurare la crescita.'),
  b('bl-key', 'text', '🔴 RISULTATO CHIAVE: Antonio Pileggi NON compare in NESSUNA delle 5 risposte. AEO Visibility Score di partenza = 0 sulle query testate. È esattamente il gap che la strategia deve chiudere.'),
  b('bl-d1', 'divider', ''),

  b('bl-mh', 'subheading', 'Mappa competitiva emersa (chi viene citato al posto suo)'),
  b('bl-ma', 'text', 'Andrea Cacciola è l’entità dominante per la Calabria: citato da Gemini in TUTTE e 3 le query (Sud Italia + Calabria + Tropea), pluripremiato Fearless e descritto come "unobtrusive observer". Tommaso Pugliese possiede la query "Tropea" (2 citazioni). Insieme a Danilo Coluccio e Frank Armocida (entrambi nella directory WPJA) confermano la lezione: chi è nelle directory documentaristiche (WPJA, Fearless) viene pescato dalle AI.'),
  b('bl-mb', 'text', `| Pattern osservato | Cosa lo guida | Azione per Antonio |
|-------------------|---------------|--------------------|
| Perplexity (IT) cita profili con TANTE recensioni Google | Valeria Molaro 296, Cerrone 67, Fausti 54 recensioni | Mossa 1: portare le recensioni 12 → 30+ |
| Gemini (EN) cita fotografi con premi/directory (WPJA, Fearless) | Cacciola, Coluccio, Armocida, Lombardo | Entrare in WPJA / This Is Reportage / Fearless |
| NESSUNO è posizionato su pellicola/VHS | white space totale sulla nicchia | Mossa 3: possedere la categoria VHS/35mm |
| Motori diversi, fonti diverse | Perplexity → Google reviews; Gemini → award/editoriali | Presidiare entrambe le leve |`),
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

  b('bl-ah', 'subheading', 'Cosa ci dice il baseline (azioni)'),
  b('bl-aa', 'text', '1. Recensioni Google sono il biglietto d’ingresso su Perplexity: i citati hanno 35–296 recensioni, Antonio 12. → Mossa 1 (12 → 30+).\n2. Le directory documentaristiche (WPJA, Fearless) sono il biglietto d’ingresso su Gemini: Cacciola, Coluccio, Armocida, Lombardo sono tutti lì. → entrare in WPJA / This Is Reportage / Fearless.\n3. Nessun competitor è posizionato su pellicola/VHS: white space totale. → Mossa 3, possedere la categoria, è la via più rapida a una citazione difendibile.\n4. Andrea Cacciola è il benchmark diretto: citato in 3 query su 3 da Gemini (Calabria, documentaristico, premi). Studiare cosa lo rende citabile e superarlo sulla nicchia analogica.\n5. Prossimo test: ripetere queste 5 query + le query di nicchia (VHS/35mm) a luglio 2026 e confrontare il punteggio.'),
]
