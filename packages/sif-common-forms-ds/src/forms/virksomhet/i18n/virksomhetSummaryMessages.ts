const nb = {
    '@forms.virksomhet.summary.tittel': 'Næringsvirksomhet som du har lagt inn:',
    '@forms.virksomhet.summary.navn': 'Navn',
    '@forms.virksomhet.summary.næringstype': 'Næringstype',
    '@forms.virksomhet.summary.varigEndring.dato': 'Dato for varig endring',
    '@forms.virksomhet.summary.varigEndring.næringsinntekt': 'Næringsinntekt etter endring',
    '@forms.virksomhet.summary.varigEndring.beskrivelse': 'Beskrivelse av endring',
    '@forms.virksomhet.summary.ikkeRegnskapsfører': 'Har ikke regnskapsfører.',
    '@forms.virksomhet.summary.tidsinfo.avsluttet': 'Startet: {fraOgMed}, avsluttet: {tilOgMed}.',
    '@forms.virksomhet.summary.tidsinfo.pågående': 'Startet: {fraOgMed} (er pågående).',
    '@forms.virksomhet.summary.fisker.påBladB': 'på Blad B',
    '@forms.virksomhet.summary.fisker.ikkePåBladB': 'ikke på Blad B',
    '@forms.virksomhet.summary.registrertILand': 'Registrert i: {land}',
    '@forms.virksomhet.summary.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',
    '@forms.virksomhet.summary.yrkesaktiv.jaStartetDato': 'Ja, ble yrkesaktiv {dato}',
    '@forms.virksomhet.summary.næringsinntekst': 'Næringsinntekt:',
    '@forms.virksomhet.summary.regnskapsfører.header': 'Regnskapsfører',
    '@forms.virksomhet.summary.regnskapsfører.info': 'Ja, {navn}, telefon {telefon}',
};

const nn: Record<keyof typeof nb, string> = {
    '@forms.virksomhet.summary.tittel': 'Næringsverksemd som du har lagt inn:',
    '@forms.virksomhet.summary.navn': 'Namn',
    '@forms.virksomhet.summary.næringstype': 'Næringstype',
    '@forms.virksomhet.summary.varigEndring.dato': 'Dato for varig endring',
    '@forms.virksomhet.summary.varigEndring.næringsinntekt': 'Næringsinntekt etter endring',
    '@forms.virksomhet.summary.varigEndring.beskrivelse': 'Beskriving av endring',
    '@forms.virksomhet.summary.ikkeRegnskapsfører': 'Har ikkje rekneskapsførar.',
    '@forms.virksomhet.summary.tidsinfo.avsluttet': 'Starta: {fraOgMed}, avslutta: {tilOgMed}.',
    '@forms.virksomhet.summary.tidsinfo.pågående': 'Starta: {fraOgMed} (er pågåande).',
    '@forms.virksomhet.summary.fisker.påBladB': 'på Blad B',
    '@forms.virksomhet.summary.fisker.ikkePåBladB': 'ikkje på Blad B',
    '@forms.virksomhet.summary.registrertILand': 'Registrert i: {land}',
    '@forms.virksomhet.summary.registrertILand.orgnr': ' (organisasjonsnummer {orgnr})',
    '@forms.virksomhet.summary.yrkesaktiv.jaStartetDato': 'Ja, vart yrkesaktiv {dato}',
    '@forms.virksomhet.summary.næringsinntekst': 'Næringsinntekt:',
    '@forms.virksomhet.summary.regnskapsfører.header': 'Rekneskapsførar',
    '@forms.virksomhet.summary.regnskapsfører.info': 'Ja, {namn}, telefon {telefon}',
};

export const virksomhetSummaryMessages = {
    nb,
    nn,
};
