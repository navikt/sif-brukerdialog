# Brukergrensesnitt for ft-inntektsmelding-frontend

For å bruke npm trenger du ha `node` installert.
Vi anbefaler at du bruker [asdf](https://asdf-vm.com/) slik at du automatisk kjører nødvendige pakker på støttet versjon.
`asdf` vil sette riktige versjoner for diverse pakker som trengs i dette repoet. Se `.tool-versions` i rot-folderen.

Etter at Node er installert kjører du følgende kommandoer for å starte:

```bash
npm install
npm run dev
```

## Logge inn med idporten i dev

Du kan utvikle appen på to forskjellige domener, for foreldrepenger og k9-ytelser:

https://arbeidsgiver.intern.dev.nav.no/fp-im-dialog
https://arbeidsgiver.intern.dev.nav.no/k9-im-dialog

Gå inn på den du ønsker å jobbe med, og l

- Velg BankID
- Fødselsnummer: 10107400090
- Velg BankID med kodebrikke eller BankID med app – det har ikke noe å si
- Legg inn engangskode: otp
- Legg inn BankID passord: qwer1234
