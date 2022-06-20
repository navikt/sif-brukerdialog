# sif-common-forms

Fellesdialoger/skjema for sykdom i familien

# Release ny versjon til npmjs

krav: git working directory må være clean. Kode som er endret må være commitet og ligge på master på github.

```
npm run build-lib

VELG EN AV DISSE:
- npm version patch -m "Upgrade to %s"
- npm version minor -m "Upgrade to %s"
- npm version major -m "Upgrade to %s"

npm publish
```

# Kjøre dev-app som viser dialoger

```
npm run dev
```
