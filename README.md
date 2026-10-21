# AI-stöd för patientinformation (prototyp)

En statisk HTML-sida (`index.html`) och en Netlify Function (`netlify/functions/analyze.mjs`) som anropar Claude API. API-nyckeln ligger bara på serversidan.

## Publicera på Netlify

1. Skapa en nyckel i Claude Console (console.anthropic.com).
2. Lägg mappen i ett Git-repo och koppla det till Netlify (**Add new site → Import an existing project**), eller dra hela mappen till Netlify Drop. Drop stöder funktioner endast om du deployar via Git eller Netlify CLI, så använd helst Git.
3. Gå till **Site configuration → Environment variables** och lägg till:
   - `ANTHROPIC_API_KEY` = din nyckel
   - (valfritt) `CLAUDE_MODEL` = modellnamn, standard är `claude-sonnet-5-5`
4. Deploya om. Öppna sidan och prova med knappen "Använd exempeltext".

## Köra lokalt

```
npm i -g netlify-cli
export ANTHROPIC_API_KEY=sk-ant-...
netlify dev
```

## Viktigt

- Sidan har ingen riktig inloggning. "Administratörsläge" är en demo-växel. Sätt gärna lösenordsskydd på sajten i Netlify (eller en Identity-lösning) innan du delar länken, annars kan vem som helst använda din API-nyckel och därmed din kostnad.
- Riktlinjer och ordlista sparas i webbläsaren (localStorage), inte centralt.
- Skicka bara offentlig information och avidentifierade testtexter.
