/* eslint-disable max-len */
import { nattevåkOgBeredskapMessages_nb } from './nb';

export const nattevåkOgBeredskapMessages_nn: Record<keyof typeof nattevåkOgBeredskapMessages_nb, string> = {
    'step.nattevåkOgBeredskap.pageTitle': 'Pleiepengesøknad - nattvake og beredskap',
    'step.nattevåkOgBeredskap.stepTitle': 'Nattvake og beredskap',
    'step.nattevåkOgBeredskap.stepIndicatorLabel': 'Nattvake og beredskap',

    'steg.nattevåkOgBeredskap.veileder':
        'No treng me å vite om du på grunn av barnet sin sjukdom må vere vaken om natta, eller vere i beredskap for barnet i pleiepengeperioden. Om nokon av desse situasjonane gjer at du ikkje kan gå på jobb, skal pleiepengane som hovudregel ikkje graderast, sjølv om barnet er i eit omsorgstilbod på dagtid.',

    'steg.nattevåkOgBeredskap.nattevåk.sectionTittel': 'Nattevake',
    'steg.nattevåkOgBeredskap.nattevåk.veileder':
        'I nokre tilfelle gjer barnet sin sjukdom at du må vere vaken om natta for å pleie eller ha tilsyn med barnet. Om pleie- eller tilsynsbehovet om natta er vesentleg større enn det som er vanleg for friske barn, kan det gå ut over moglegheita til å jobbe fordi du må sove på dagtid.',

    'steg.nattevåkOgBeredskap.nattevåk.spm':
        'Gjer barnet sin sjukdom at du må vere vaken om nettene, slik at du ikkje kan gå på jobb?',

    'steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn.tittel':
        'Korleis svarer eg når eg pleier fleire barn samtidig?',

    'steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn':
        'Du skal svare «ja» om minst eitt av barna sin sjukdom gjer at du må vere vaken om natta eller i beredskap, og derfor ikkje kan gå på jobb.',

    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.spm':
        'No treng me ei skildring av korleis barnet sin sjukdom gjev eit pleie- eller tilsynsbehov om nettene.',

    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.tittel': 'Svar på desse spørsmåla:',

    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.1':
        'Kva pleie- eller tilsynsoppgåver må du gjere om natta på grunn av barnet sin sjukdom?',

    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.2':
        'Kva er grunnen til at barnet vaknar eller blir vekt om natta?',

    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.3':
        'Kor mange gongar og kor lenge må du vanlegvis vere vaken i løpet av ei natt?',
    'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.4': 'Kor mange netter per veke må du vanlegvis vere vaken?',

    'steg.nattevåkOgBeredskap.beredskap.veileder':
        'I nokre tilfelle kan barnet sin sjukdom gjere at du må vere i beredskap eller vere tilgjengeleg i dei timane der barnet er i eit omsorgstilbod. Det kan til dømes vere om barnet treng at du er til stades i omsorgstilbodet, eller at du må vere tilgjengeleg for å dra dit på kort varsel, slik at du ikkje kan jobbe.',

    'steg.nattevåkOgBeredskap.beredskap.spm':
        'Gjer barnet sin sjukdom at du må vere i beredskap, slik at du må vere borte frå jobb?',

    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.spm':
        'No treng me ei skildring av korleis barnet sin sjukdom gjer at du må vere i beredskap.',

    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.tittel': 'Svar på desse spørsmåla:',

    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.1':
        'Kva slags situasjonar som er knytte til barnet sin sjukdom gjer at du må vere i beredskap?',

    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.2':
        'Om du må vere tilgjengeleg på kort varsel: Kor ofte blir du kontakta, og kor ofte må du dra dit barnet er?',

    'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.3':
        'Må du vere i beredskap i heile perioden du søker om pleiepengar, eller er det berre i delar av perioden?',

    'validation.harNattevåk.yesOrNoIsUnanswered':
        'Du må svare ja eller nei på om barnet sin sjukdom gjer at du må vere vaken om natta.',

    'validation.harNattevåk_ekstrainfo.stringHasNoValue': 'Du må skildre kva som gjer at du må vere vaken om natta.',
    'validation.harNattevåk_ekstrainfo.stringIsTooLong': 'Skildringa kan vere på maks 1000 teikn.',
    'validation.harNattevåk_ekstrainfo.stringHasInvalidCharacters':
        'Skildringa av nattevåk inneheld ugyldige teikn. Ugyldige teikn kan til dømes vere emojar, spesialteikn som « », §, @, eller skjulte formateringsteikn som innrykk, tabulatorar og listeformatering. Dette kan mellom anna oppstå dersom tekst vert kopiert frå andre stader. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',

    'validation.harBeredskap.yesOrNoIsUnanswered': 'Du må svare ja eller nei på om du må vere i beredskap.',

    'validation.harBeredskap_ekstrainfo.stringHasNoValue':
        'Du må gje ei skildring av kva som gjer at du må vere i beredskap.',
    'validation.harBeredskap_ekstrainfo.stringIsTooLong':
        'Du har brukt for mange teikn i skildringa di. Teksten kan ikkje innehalde fleire enn 1000 teikn.',
    'validation.harBeredskap_ekstrainfo.stringHasInvalidCharacters':
        'Skildringa av beredskap inneheld ugyldige teikn. Ugyldige teikn kan til dømes vere emojar, spesialteikn som « », §, @, eller skjulte formateringsteikn som innrykk, tabulatorar og listeformatering. Dette kan mellom anna oppstå dersom tekst vert kopiert frå andre stader. Du kan prøve å skrive inn teksten på nytt direkte i feltet.',
};
