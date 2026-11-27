# Brukerflyt og innhold

Dette dokumentet beskriver hva søknaden skal inneholde for brukeren. Det er fasit for migreringen, uavhengig av hvordan stegene bygges.

## Mål for søknaden

Brukeren skal kunne søke om ekstra omsorgsdager fordi brukeren er alene om omsorgen for ett eller flere barn. Søknaden skal bare gjelde barn brukeren er alene om omsorgen for.

## Brukerflyten

1. Velkomstside med informasjon om når søknaden skal brukes.
2. Steget «Om aleneomsorg for barn».
3. Steget «Tidspunkt for aleneomsorg».
4. Oppsummering med kontroll og innsending.
5. Kvittering.

## Velkomstside

Brukeren får:

- en kort forklaring av hva aleneomsorg betyr
- informasjon om at søknaden ikke skal brukes når foreldrene har avtale om delt fast bosted
- en henvisning til riktig søknad når den andre forelderen ikke kan ha tilsyn med barnet
- informasjon om mellomlagring og hva brukeren må svare på

## Om aleneomsorg for barn

Steget skal vise registrerte barn og la brukeren legge til barn som ikke er registrert i oppslaget.

Brukeren skal:

- velge minst ett barn brukeren er alene om omsorgen for
- svare om det finnes avtale om delt fast bosted
- få beskjed om at søknaden ikke gjelder barn med delt fast bosted

Det skal ikke være mulig å gå videre uten et valgt barn eller med en avtale om delt fast bosted for valgt barn.

## Tidspunkt for aleneomsorg

Steget vises for hvert barn brukeren valgte i forrige steg.

Brukeren skal oppgi om aleneomsorgen startet:

- i inneværende år eller året før, med nøyaktig dato
- to år siden eller tidligere, uten nøyaktig dato

## Oppsummering

Oppsummeringen skal vise:

- informasjon om søkeren
- hvert barn brukeren søker for
- tidspunktet for aleneomsorg for hvert barn

Brukeren må bekrefte at opplysningene er riktige før søknaden sendes inn. Feil ved innsending skal vises uten at opplysningene går tapt.

## Innsending

Innsendingen skal bruke den genererte typen `OmsorgsdagerAleneOmOmsorgenSøknad`. Payloaden skal samsvare med tekstene og valgene i skjemaflyten.

## Midlertidig mock-innhold

Det nye appskallet har ennå ingen ekte skjemafelt. Begge skjema-stegene lagrer derfor bare en midlertidig markør slik at flyten kan klikkes gjennom. Innsendingen bruker alle registrerte mock-barn med tidspunktet «to år siden eller tidligere».

Denne oppførselen er bare en teknisk test av flyten. Den skal erstattes når ekte skjemainnhold legges til.
