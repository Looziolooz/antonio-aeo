# Strategia di visibilità AEO + SEO — Antonio Pileggi

**Cliente:** Antonio Pileggi — Film, digital & VHS wedding storytelling · Destination weddings in Italia / Sud Italia
**Sito:** https://www.antoniopileggi.com/ (piattaforma: Pixieset)
**Obiettivo:** aumentare la visibilità nelle ricerche tradizionali (SEO) e nelle risposte generate dall'AI (AEO/GEO), rafforzare autorità, sentiment e tono del brand, attivare un motore di recensioni e una presenza social sistematica.
**Data:** giugno 2026

---

## 1. Come stanno davvero le cose oggi (e cosa sposta l'ago)

Prima di costruire la strategia, due chiarimenti tecnici che cambiano le priorità.

**llms.txt e robots.txt — ridimensioniamo le aspettative.** A metà 2026 nessun fornitore di AI rilevante (Google, OpenAI, Anthropic, Meta, Mistral) ha confermato di *usare* il file `llms.txt` di siti esterni per citare o classificare i contenuti. Google ha dichiarato apertamente di non usarlo per la Ricerca né per le AI Overviews; l'adozione è intorno al 10% dei siti e il traffico dei crawler verso quel file è marginale (frazioni di punto percentuale). In più, Pixieset **non** consente di caricare file arbitrari nella root del dominio (come `/llms.txt`) né di riscrivere liberamente il `robots.txt`, che genera in automatico. Conclusione: `llms.txt` è oggi un gesto simbolico, non una leva. Lo trattiamo come voce a bassissima priorità (vedi §8) e investiamo le energie dove l'effetto è reale: **recensioni, dati strutturati, contenuti, coerenza di entità**.

**Cosa permette Pixieset (e cosa no).** Pixieset offre un *SEO Manager* per titoli pagina, meta description, URL e audit interni, e — solo sui piani **Website‑Pro / Suite** — l'inserimento di **codice personalizzato in header/footer** e di **blocchi embed**. Quel codice header è la chiave tecnica di tutta la parte AEO: è lì che inseriremo i **dati strutturati JSON‑LD**, la verifica di Google Search Console e l'analytics. Verifica subito su quale piano è Antonio: se non è almeno Website‑Pro, l'upgrade è il primo investimento da fare, perché senza header code metà della parte tecnica non è implementabile.

**Il principio che governa l'AEO.** I modelli linguistici (ChatGPT, Gemini, Perplexity, AI Overviews) non "classificano pagine": ricostruiscono e citano **entità**. Vengono citati i soggetti che (a) sono descritti in modo *coerente e ripetuto* in molti punti del web, (b) hanno contenuti in formato *domanda‑risposta* facilmente estraibili, e (c) godono di *validazione di terze parti* (recensioni, schede su directory autorevoli, feature editoriali). Antonio parte avvantaggiato sul punto (c): è già presente su Matrimonio.com (27 recensioni verificate), Together Journal, Loverly e MyWed — esattamente le fonti da cui le AI attingono per i fornitori di matrimoni. La strategia consiste nel rendere quell'entità **inequivocabile e citabile**.

### Diagnosi sintetica del punto di partenza
- **Tono e copy del sito:** già forti e distintivi ("atmosphere, family, memory, sense of place", "not about trends for their own sake"). Da preservare e propagare ovunque, non da riscrivere.
- **Punto debole principale:** sito "vetrina" povero di testo indicizzabile e di pagine‑risposta. Niente FAQ, niente contenuti editoriali (real wedding / guide alle location), nessun dato strutturato visibile, lingua prevalentemente inglese mentre molte query italiane restano scoperte.
- **Asset sottoutilizzati:** 12 recensioni Google + 27 su Matrimonio.com, canale YouTube VHS (@LoveOnVHS) con un angolo creativo unico, presenza multi‑directory.

---

## 2. Pilastro 1 — Recensioni e Google Business Profile (il motore di fiducia)

È la leva con il ritorno più alto sia per la SEO locale sia per le citazioni AI: le recensioni sono testo fresco, ricco di parole chiave naturali (nomi di location, "destination wedding", "fotografo matrimonio") e di segnali di sentiment che le AI leggono direttamente.

**Google Business Profile (GBP).** Antonio ha già una scheda (12 recensioni). Da completare/ottimizzare: categoria primaria "Fotografo di matrimoni", categorie secondarie (Fotografo, Servizio fotografico), area servita (Calabria, Sicilia, Puglia, Toscana, "tutta Italia"), descrizione in italiano e inglese che ripete l'entità (vedi boilerplate in §11), link al sito, orari/contatti, e soprattutto **post settimanali** (anche solo una foto + due righe) e **caricamento foto** costante. Le schede aggiornate vengono pescate molto più spesso dalle AI locali.

**Obiettivo recensioni:** passare da 12 a **30+ recensioni Google in 6 mesi**, poi mantenere un flusso costante (1–3/mese). La quantità conta, ma conta di più la *ricchezza testuale*: una recensione che nomina "matrimonio a Tropea" o "servizio in pellicola" vale doppio in ottica AEO.

**Come ottenerle senza forzature:**
- Crea un **link breve diretto** alla scheda Google ("Lascia una recensione") e inseriscilo nella firma email, nella consegna gallery Pixieset e nel messaggio di chiusura progetto.
- Chiedi **al momento giusto**: alla consegna della gallery finale, quando l'emozione è alta. Usa il template in §11 (IT/EN).
- **Suggerisci i dettagli da citare** senza scriverli tu: "se ti va, racconta dove vi siete sposati e cosa ti è rimasto del nostro modo di lavorare". Questo guida naturalmente verso recensioni ricche di parole chiave.
- **Rispondi a tutte le recensioni** (anche con poche parole): le risposte sono testo aggiuntivo indicizzabile e mostrano cura del brand.

**Non concentrare tutto su Google.** Tieni vivo anche Matrimonio.com (già fortissimo con 27 verificate) e MyWed: chiedi a coppie diverse di recensire su piattaforme diverse, così la stessa entità risulta validata su più fonti — è esattamente ciò che aumenta la fiducia delle AI.

---

## 3. Pilastro 2 — Dati strutturati / Schema JSON‑LD (la mossa AEO più sottovalutata)

I dati strutturati spiegano alle macchine *chi è* Antonio in modo machine‑readable: nome, professione, aree servite, lingue, profili social ufficiali, FAQ. È ciò che alimenta i rich result di Google e dà alle AI una "scheda anagrafica" pulita da citare. Si inserisce **una volta** nel codice header di Pixieset (piano Pro).

Trovi due blocchi pronti all'uso in **§11 — Allegato A**: uno `ProfessionalService/Photographer` per identificare l'attività e collegarla a tutti i profili (`sameAs`), e uno `FAQPage` per la pagina FAQ. 

**Avvertenza sulle recensioni nello schema:** non inserire un `aggregateRating` che somma recensioni Google + Matrimonio come se fossero raccolte sul sito — è contro le linee guida di Google e rischia penalizzazioni. La strada corretta è pubblicare sul sito alcune **testimonianze reali** (con nome e location) e marcare *quelle* con schema `Review`. Le recensioni Google restano su Google, dove fanno il loro lavoro.

---

## 4. Pilastro 3 — Contenuti e autorità (real wedding + guide alle location + voce del brand)

Qui si costruiscono insieme SEO long‑tail e AEO. Ogni contenuto deve esistere in **italiano e inglese** (le coppie straniere cercano in inglese, quelle italiane in italiano: oggi metà del mercato è scoperto).

**Tipo A — Real Wedding (storia di un matrimonio).** Una pagina per matrimonio significativo, con 15–30 foto + 400–700 parole di racconto: location, atmosfera, scelte di linguaggio visivo (digitale / 35mm / VHS). Titolo che intercetta la ricerca reale, es. *"Matrimonio a Tropea: storytelling su pellicola 35mm"* / *"Destination wedding in Puglia"*. Queste pagine catturano query di location ad alta intenzione e sono il formato che le AI amano riassumere.

**Tipo B — Guide alle location (il vero motore AEO).** Articoli evergreen che rispondono a domande che le coppie pongono letteralmente a ChatGPT/Google: *"Dove sposarsi in Calabria?"*, *"Migliori location per matrimoni a Taormina"*, *"Sposarsi in Costa degli Dei: cosa sapere"*. Antonio conosce questi posti meglio di chiunque (Tropea, Gerace, Soverato, Cittadella del Capo, Milazzo, Alberobello, Lucca, Siena, Taormina). Scrivere da fotografo locale — luce, stagioni, scorci — crea autorità tematica difficile da imitare e posiziona l'entità come riferimento del territorio.

**Tipo C — Pagine "pilastro" sul metodo.** Una pagina dedicata al **VHS/pellicola** ("Cos'è un wedding film in VHS e perché sceglierlo") che spiega l'angolo creativo unico. È il differenziatore del brand e un magnete sia per la stampa di settore sia per le citazioni AI ("fotografo che gira matrimoni in VHS in Italia" → poche entità competono).

**Voce del brand (tono e sentiment).** Mantieni la linea esistente: sobria, sensoriale, anti‑trend, centrata su atmosfera/famiglia/memoria/luogo. Regole operative: prima persona, frasi brevi, niente superlativi di marketing, racconto del *come è stato vissuto* il giorno più che della tecnica. Questo tono coerente, ripetuto su sito, directory, social e GBP, è ciò che dà al brand un "sentiment" riconoscibile che le AI restituiscono fedelmente.

**Cadenza realistica:** 1 contenuto ogni 2 settimane (alternando A, B, C, D). In 90 giorni hai ~6 pagine nuove: abbastanza per cambiare il profilo del sito da "vetrina" a "fonte autorevole".

**Tipo D — Contenuti per coppie internazionali.** Le coppie che arrivano dall'estero hanno barriere pratiche prima ancora di pensare al fotografo: documenti legali, tempi di residenza, celebrazioni civili vs religiose, pubblicazioni. Se Antonio risponde a queste domande, diventa la risorsa di riferimento prima ancora del booking. Serie di 4 guide evergreen:
1. *Getting married in Italy as a foreign couple: legal requirements*
2. *Destination wedding in Calabria: the complete guide for international couples*
3. *Best time of year for a destination wedding in Southern Italy*
4. *How to choose a wedding photographer in Italy from abroad*
Contenuti ad altissima intenzione di conversione, zero concorrenza SEO (pochissimi fotografi li hanno), posizionano Antonio come figura di fiducia. Una volta scritti, restano evergreen.

**Sistema di riciclo contenuti "uno a molti".** Ogni contenuto sorgente (real wedding, guida, FAQ) genera 8 output su 7 canali, con minimo lavoro aggiuntivo:
1. Blog post (IT+EN) — SEO
2. Carousel Instagram — social
3. Reel teaser (da foto animata) — IG/TikTok
4. Audio episodio (da NotebookLM) — YouTube/Spotify
5. Trascrizione audio — altra pagina SEO
6. 3 Pinterest pin — traffico passivo
7. Newsletter Substack — audience di proprietà
8. Post LinkedIn/Facebook — B2B
Questo risolve il collo di bottiglia del tempo di Antonio: 1 contenuto di 30 minuti diventa un mese di pubblicazione su tutti i canali.

---

## 5. Pilastro 4 — Pagina FAQ (on‑site) + schema FAQPage

Le FAQ sono il formato AEO per eccellenza: domanda esplicita + risposta autonoma di 40–60 parole, esattamente ciò che le AI estraggono e citano. Crea una pagina `/faq/` (o sezione in Contact/About), in **IT ed EN**, e marcala con lo schema `FAQPage` dell'Allegato A.

Trovi un set di **10 FAQ pronte (IT + EN)** in §11 — Allegato B. Coprono le query a più alta intenzione: aree di lavoro, lingue, cosa sono pellicola/VHS, quando prenotare, come funziona la consegna, lavoro con coppie straniere, ecc. Le risposte sono scritte per essere "citabili" così come sono.

---

## 6. Pilastro 5 — "Be everywhere" e coerenza di entità

"Be everywhere" non significa essere su molte piattaforme con contenuti scollegati: significa che **la stessa entità è descritta in modo identico ovunque**, così le macchine la riconoscono come un unico soggetto autorevole. È il lavoro meno visibile e più sottovalutato dell'AEO.

**NAP + bio coerenti.** Su tutti i 9 profili (sito, Instagram, Facebook, YouTube, Pinterest, Google, Matrimonio.com, Together Journal, Loverly, MyWed) devono coincidere: nome esatto ("Antonio Pileggi"), telefono (+39 327 9287 726), URL sito, e la **stessa bio boilerplate** (§11 — Allegato C) declinata IT/EN. Ogni profilo deve linkare il sito; il sito deve linkare ogni profilo (e questi link vanno anche nel campo `sameAs` dello schema).

**Sfrutta le directory come fonti AEO.** Matrimonio.com, Together Journal, Loverly e MyWed sono già il tuo asset più forte per le citazioni AI. Mantienile complete al 100%: bio aggiornata, portfolio recente, aree servite, recensioni. Quando un'AI risponde "fotografi di matrimonio in Sud Italia", pesca da lì.

**Entità "definita".** Da qualche parte sul sito (About) deve esserci una frase di definizione netta, in IT e EN, del tipo: *"Antonio Pileggi è un fotografo di matrimoni destination con base a Maida (Catanzaro, Calabria), specializzato in storytelling su digitale, pellicola 35mm e VHS per matrimoni in Sud Italia."* Le AI cercano proprio questa "frase di identità" per costruire la risposta. La sede a Maida è anche il dato che àncora l'entità alla SEO locale calabrese (e si lega direttamente alle query "fotografo matrimonio Catanzaro / Calabria").

---

## 7. Pilastro 6 — Social sistematici che generano discussione

Obiettivo: pubblicare con regolarità contenuti di qualità che facciano *interazione* (commenti, salvataggi, condivisioni), perché l'engagement è il segnale che spinge la distribuzione su ogni piattaforma.

**Tre pilastri di contenuto** (ruota su questi, così non resti mai senza idee):
1. **Lavoro** — foto/clip dai matrimoni, con il racconto del momento (non solo "bella foto": *perché* quella foto).
2. **Metodo & punto di vista** — il perché del digitale/pellicola/VHS, cosa significa fotografare "atmosfera e memoria", dietro le quinte. È il contenuto che costruisce autorità e tono.
3. **Territorio** — le location del Sud Italia con l'occhio del fotografo (luce, stagioni, angoli nascosti): utile, condivisibile, posiziona l'entità sul territorio.

**Formati che innescano discussione** (non chiedere "vi piace?", che non genera nulla):
- Domande di opinione vera: *"Digitale o pellicola per il vostro matrimonio? E perché"*.
- Carousel "prima/dopo" o "stesso momento, tre linguaggi" (digitale vs 35mm vs VHS) → altissimo salvataggio.
- Mini‑guide territoriali in formato lista salvabile.
- Caption che fanno una micro‑confessione o presa di posizione ("non rincorro i trend, e ti spiego perché") → invitano al commento.

**Ripartizione per piattaforma:**
- **Instagram** — cuore del brand: 3 post/settimana (mix reel + carousel) + storie quasi quotidiane. I reel "stesso momento, tre formati" sono il tuo formato killer.
- **YouTube (@LoveOnVHS)** — il differenziatore: 1–2 video/mese di wedding film in VHS, con titoli/descrizioni ottimizzati ("Wedding film VHS — [Location]"). YouTube è anche un motore di ricerca: ogni descrizione è testo indicizzabile e citabile.
- **Pinterest** — motore di scoperta evergreen e SEO‑friendly: ricicla ogni real wedding e guida location in board geolocalizzate ("Matrimoni in Calabria", "Wedding in Puglia"). Ottimo traffico passivo verso il sito.
- **Facebook** — ripubblica i contenuti chiave, utile per coppie 30–45 e per i gruppi di settore/sposi.

**Sistematicità.** Pianifica a blocchi mensili (un calendario base in §11 — Allegato E). Usa uno scheduler gratuito (Meta Business Suite per IG/FB è gratis) per non dipendere dalla disponibilità giornaliera.

---

## 8. Pilastro 7 — Pipeline B2B con planner e venue

La rete di referral professionale (planner, venue, wedding coordinator) è il canale che porta i clienti ad alto valore. Mentre il motore di reciprocità (§6) gestisce il *dopo* matrimonio, questo pilastro costruisce le relazioni *prima* — con planner e venue con cui Antonio NON ha ancora lavorato.

**Mappatura iniziale.** Lista di 20 venue/planner target in Calabria, Sicilia, Puglia, Toscana. Criteri: fascia luxury, destination-friendly, social media attivi, allineati al tono del brand.

**Pipeline di outreach (1 contatto/settimana).** Ogni settimana:
1. Identifica il contatto target della settimana
2. Prepara un messaggio personalizzato con commento su un loro lavoro recente
3. Antonio invia (10 minuti)
4. Traccia la risposta nel tracker partner

**Follow-up.** Se non risponde dopo 2 settimane, secondo tocco con un real wedding fatto in una venue simile alla loro. Terzo tocco dopo 4 settimane con un feature kit già pronto.

**Tempistica:** 20 minuti/settimana di Antonio (messaggi brevi preparati da te). In 20 settimane hai coperto l'intera mappatura iniziale.

---

## 9. Pilastro 8 — llms.txt e robots.txt: cosa fare *davvero*

Come spiegato in §1, su Pixieset non puoi gestire questi file e il loro impatto attuale è marginale. Quindi:
- **Non perdere tempo** a cercare di forzare un `llms.txt` su Pixieset. Se un giorno il sito migrasse su una piattaforma con accesso alla root (o si aggiungesse un sottodominio su hosting proprio), allora un `llms.txt` essenziale (titolo, descrizione‑entità, link alle pagine chiave) costa mezza giornata e si può aggiungere "per completezza". Non prima.
- **Ciò che ottiene lo stesso risultato, oggi, ed è permesso:** assicurarsi che il sito **non blocchi** i crawler AI (verifica che il robots.txt generato da Pixieset non abbia `Disallow` ampi), che esista e sia inviata la **sitemap** a Google Search Console, e che ogni pagina chiave abbia il **JSON‑LD** dell'Allegato A. Questo è il vero "rendere il sito leggibile dalle AI".

---

## 10. Pilastro 9 — Monitoraggio (tutto gratuito)

- **Google Search Console** (gratis) — la priorità. Verifica il dominio (via codice header Pixieset o record DNS), invia la sitemap, monitora query, impressioni, clic e pagine indicizzate. È così che misuri se i nuovi contenuti vengono trovati. *(Nota: "Google Search Console" è ciò che intendevi con "google search"; è il servizio gratuito giusto per il monitoraggio.)*
- **Google Analytics 4** (gratis) — inserito via header code: da dove arriva il traffico, cosa converte verso la pagina Contact.
- **Google Business Profile Insights** (gratis) — ricerche, chiamate, richieste indicazioni dalla scheda.
- **Tracking citazioni AI** (manuale, gratis) — una volta al mese, poni a ChatGPT, Gemini e Perplexity le query target ("fotografo matrimonio destination Sud Italia", "wedding photographer Calabria", "fotografo matrimonio VHS Italia") e annota se e come Antonio viene citato. È il modo concreto di misurare l'AEO nel tempo.

---

## 11. Allegati pronti all'uso

### Allegato A — Dati strutturati JSON‑LD (da incollare nel codice header Pixieset, piano Pro)

> Sostituisci l'URL immagine e gli URL profilo solo se cambiano. Tieni il telefono in formato internazionale senza spazi. (Sede già impostata: Maida, Catanzaro, Calabria.)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://www.antoniopileggi.com/#business",
  "name": "Antonio Pileggi — Wedding Photographer",
  "alternateName": "Antonio Pileggi Studio",
  "url": "https://www.antoniopileggi.com/",
  "image": "https://images-pw.pixieset.com/site/gjpXWw/zkE0EZ/e3545e1f-d154-4b12-a1c4-b8daae778b12-b19547a4-1500.jpg",
  "telephone": "+393279287726",
  "priceRange": "€€€",
  "description": "Fotografo di matrimoni destination in Italia e Sud Italia. Storytelling autentico su fotografia digitale, pellicola 35mm e VHS, per coppie che amano atmosfera, famiglia, memoria e senso del luogo.",
  "knowsLanguage": ["it", "en"],
  "areaServed": [
    { "@type": "AdministrativeArea", "name": "Calabria" },
    { "@type": "AdministrativeArea", "name": "Sicilia" },
    { "@type": "AdministrativeArea", "name": "Puglia" },
    { "@type": "AdministrativeArea", "name": "Toscana" },
    { "@type": "Country", "name": "Italia" }
  ],
  "founder": {
    "@type": "Person",
    "name": "Antonio Pileggi",
    "jobTitle": "Wedding Photographer"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Maida",
    "addressRegion": "Calabria",
    "addressCountry": "IT"
  },
  "sameAs": [
    "https://www.instagram.com/pileggiantonio/",
    "https://www.facebook.com/pileggiantonio",
    "https://www.youtube.com/@LoveOnVHS",
    "https://it.pinterest.com/pileggiantoniostudio/",
    "https://www.matrimonio.com/fotografo-matrimonio/antonio-pileggi--e275082",
    "https://togetherjournal.com/vendors/antonio-pileggi/",
    "https://loverly.com/vendors/antonio-pileggi-1",
    "https://mywed.com/en/photographer/pileggiantonio/"
  ]
}
</script>
```

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "In quali zone lavori come fotografo di matrimonio?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Fotografo matrimoni destination in tutta Italia, con base e specializzazione nel Sud Italia: Calabria, Sicilia e Puglia, oltre a Toscana e altre regioni su richiesta. Mi sposto volentieri dove la coppia ha scelto di sposarsi."
      }
    },
    {
      "@type": "Question",
      "name": "Cosa significa fotografia di matrimonio su pellicola e VHS?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Significa scegliere il linguaggio visivo giusto per come è stato vissuto il giorno: il digitale per chiarezza e versatilità, la pellicola 35mm per texture e atmosfera senza tempo, il VHS per una memoria più intima e nostalgica. Spesso li combino nello stesso racconto."
      }
    }
  ]
}
</script>
```
*(Nella pagina FAQ inserisci tutte e 10 le domande dell'Allegato B dentro l'array `mainEntity`, con la stessa struttura.)*

### Allegato B — 10 FAQ pronte (IT + EN)

**IT**
1. *In quali zone lavori come fotografo di matrimonio?* — Matrimoni destination in tutta Italia, con base e specializzazione nel Sud Italia (Calabria, Sicilia, Puglia), oltre a Toscana e altre regioni su richiesta.
2. *Cosa significa fotografia su digitale, pellicola e VHS?* — Scelgo il linguaggio visivo in base a come è stato vissuto il giorno: digitale, pellicola 35mm e VHS, anche combinati nello stesso racconto.
3. *Lavori con coppie straniere?* — Sì. Lavoro abitualmente con coppie italiane e internazionali; comunico in inglese e gestisco i destination wedding end‑to‑end.
4. *Quando conviene prenotare?* — Per le date più richieste (estate e weekend) conviene scrivere con largo anticipo, anche 8–12 mesi prima. Una sola coppia per data.
5. *Come si svolge il primo contatto?* — Dopo il primo messaggio ti guido personalmente nel passo successivo e condivido la brochure più in linea con i vostri piani.
6. *Offri anche il video oltre alla fotografia?* — Sì, incluso il wedding film in VHS, un formato di racconto intimo e distintivo. Ne parliamo in base al vostro progetto.
7. *Qual è il tuo stile?* — Documentario e attento all'atmosfera: famiglia, emozione e senso del luogo, lontano dai trend fini a sé stessi.
8. *Quanto costa un fotografo di matrimonio destination?* — Dipende da location, durata e formati scelti. Ti invio una brochure con le opzioni dopo una breve chiacchierata sui vostri piani.
9. *Ci si può sposare in Sud Italia anche venendo dall'estero?* — Assolutamente sì: il Sud Italia è una delle mete più belle per un destination wedding e conosco bene location e tempistiche del territorio.
10. *Cosa ricevo alla fine?* — Una gallery curata che racconta la giornata; tempi e formati di consegna te li indico in fase di accordo.

**EN**
1. *Which areas do you cover as a wedding photographer?* — Destination weddings across Italy, based in and specialised in Southern Italy (Calabria, Sicily, Puglia), plus Tuscany and other regions on request.
2. *What does digital, film and VHS photography mean?* — I choose the visual language based on how the day actually felt: digital, 35mm film and VHS, often combined in the same story.
3. *Do you work with international couples?* — Yes. I regularly work with Italian and international couples, communicate in English and handle destination weddings end‑to‑end.
4. *When should we book?* — For peak dates (summer and weekends), reach out well ahead — 8–12 months is ideal. One couple per date.
5. *How does the first contact work?* — After your first message I personally guide you through the next step and share the brochure most aligned with your plans.
6. *Do you offer video as well as photography?* — Yes, including VHS wedding film, an intimate and distinctive format. We'll discuss it based on your project.
7. *What is your style?* — Documentary and atmosphere‑driven: family, emotion and a real sense of place, away from trends for their own sake.
8. *How much does a destination wedding photographer cost?* — It depends on location, duration and the formats you choose. I'll send a brochure with options after a short chat about your plans.
9. *Can we get married in Southern Italy coming from abroad?* — Absolutely: Southern Italy is one of the most beautiful destination‑wedding regions, and I know its locations and timing well.
10. *What do we receive at the end?* — A curated gallery that tells the story of the day; delivery timing and formats are agreed upfront.

### Allegato C — Bio / boilerplate di entità (da usare identica ovunque)

**IT (breve):** Antonio Pileggi è un fotografo di matrimoni destination con base a Maida (Catanzaro, Calabria), specializzato in storytelling su fotografia digitale, pellicola 35mm e VHS. Racconta matrimoni in Calabria, Sicilia, Puglia, Toscana e in tutta Italia, per coppie italiane e internazionali che amano atmosfera, famiglia, memoria e senso del luogo.

**EN (short):** Antonio Pileggi is a destination wedding photographer based in Maida (Catanzaro, Calabria), specialising in storytelling on digital, 35mm film and VHS. He documents weddings across Calabria, Sicily, Puglia, Tuscany and all of Italy, for Italian and international couples who care about atmosphere, family, memory and a real sense of place.

### Allegato D — Template richiesta recensione (IT + EN)

**IT — alla consegna della gallery**
> Ciao [Nome], la vostra gallery è pronta 🤍 È stato un privilegio raccontare il vostro matrimonio a [Location]. Se questo lavoro vi è arrivato, mi aiuterebbe molto una vostra recensione su Google: bastano due righe su dove vi siete sposati e su cosa vi è rimasto del nostro modo di lavorare. Ecco il link diretto: [LINK GOOGLE]. Grazie di cuore.

**EN — at gallery delivery**
> Hi [Name], your gallery is ready 🤍 It was a privilege to tell the story of your wedding in [Location]. If this work resonated with you, a Google review would mean a lot — just a couple of lines about where you got married and what stayed with you about how I work. Here's the direct link: [GOOGLE LINK]. Thank you so much.

*Consiglio: crea un link breve alla scheda Google e usalo sempre identico (firma email, gallery, messaggio di chiusura).*

### Allegato E — Calendario social base (settimana tipo, ripetibile)

| Giorno | Piattaforma | Contenuto | Pilastro |
|---|---|---|---|
| Lun | Instagram | Reel "stesso momento, 3 formati" (digitale/35mm/VHS) | Metodo |
| Mar | Pinterest | Pin da ultimo real wedding → board location | Lavoro/Territorio |
| Mer | Instagram | Carousel real wedding + racconto del momento | Lavoro |
| Gio | Facebook | Ripubblicazione del contenuto migliore della settimana | Lavoro |
| Ven | Instagram | Post opinione/presa di posizione + domanda ai follower | Metodo |
| (2×/mese) | YouTube | Wedding film VHS, titolo "Wedding film VHS — [Location]" | Lavoro/Metodo |
| Quotidiano | Instagram Stories | Dietro le quinte, voto/sondaggio, anteprime | Tutti |

---

## 12. Roadmap annuale stagionale

Il piano è strutturato su 4 stagioni, non su 90gg lineari. I matrimoni sono stagionali: Antonio è in campo da maggio a ottobre e ha energia zero per contenuti. La produzione si concentra nei mesi morti (ottobre-marzo), la pubblicazione è schedulata e automatica in alta stagione.

### Ottobre — Marzo (produzione)

**Fondamenta tecniche (prima settimana):** verifica piano Pixieset (upgrade Pro se necessario), collega GSC + GA4 via header code, inserisci JSON‑LD ProfessionalService, ottimizza GBP (categorie, aree, descrizione IT/EN).

**Entità e fiducia (settimane 2–3):** uniforma NAP + bio su tutti i profili, crea pagina FAQ IT/EN + schema FAQPage, avvia motore recensioni (link breve + template nel flusso di consegna).

**Contenuti (tutto il periodo):** produci tutti i contenuti dell'anno: 4–6 Real Wedding (IT+EN), 2 guide location, 1 pagina pilastro VHS, 4 guide coppie internazionali, registrazioni audio per podcast.

**B2B pipeline:** completa la mappatura dei primi 20 contatti; inizia outreach 1/settimana.

**Sistema di riciclo:** per ogni contenuto prodotto, genera gli 8 output (blog, carousel, reel, audio, trascrizione, pin, newsletter, social).

### Aprile (pre-stagione)

- Tutti i contenuti sono stati prodotti e schedulati (social, newsletter, blog).
- Ultimo giro di recensioni richieste alle coppie dell'anno precedente.
- Attiva la newsletter con la prima edizione.
- Verifica che tutto (FAQ, schema, profili, GBP) sia allineato prima della stagione.

### Maggio — Ottobre (alta stagione)

- **Zero produzione di contenuti nuovi.** Solo:
  - Stories quotidiane (dietro le quinte, in giornata)
  - Richiesta recensioni alla consegna gallery
  - B2B follow-up (20 min/settimana)
- Tutto il resto è già schedulato e pubblicato automaticamente.
- **Settembre:** push "Now booking 2027" su tutti i canali (IG, FB, newsletter, GBP).

### Check di monitoraggio (mensile, 30 min)

- Google Search Console: query, impressioni, clic.
- GBP Insights: ricerche, chiamate, richieste indicazioni.
- Test citazioni AI manuale: le 20+ query × 5 motori × 2 lingue.
- Tracker recensioni: quante ricevute questo mese?
- B2B tracker: contatti fatti, risposte ricevute, referral ottenuti.

**Nota finale.** Le tre cose che spostano l'ago sono sempre: (1) recensioni Google, (2) dati strutturati + FAQ, (3) contenuti bilingue. Il resto amplifica. Ma ora la produzione è concentrata dove Antonio ha tempo, e l'alta stagione è coperta da ciò che è già stato seminato.
