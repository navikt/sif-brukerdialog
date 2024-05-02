const nb = {
    'info.normalarbeidstid.tittel': 'Hva menes med normalt?',
    'info.normalarbeidstid.tekst.1':
        'Med <q>normalt</q> mener vi hvor mye du jobber når du ikke har fravær på grunn av pleiepenger. Det er altså normalarbeidstiden din før du starter med pleiepenger som vi er ute etter.',
    'info.normalarbeidstid.tekst.2':
        'Hvis du mottar ytelse fra NAV (for eksempel foreldrepenger eller sykepenger) opplyser du om det som var din normale arbeidstid før du startet å motta ytelsen.',

    'arbeidsforhold.normalTimer.info.tittel': 'Hva om jeg jobber turnus eller varierende?',
    'arbeidsforhold.normalTimer.info.turnus':
        'Når du jobber turnus, eller har annen varierende arbeidstid, oppgir du et snitt per uke.',
    'arbeidsforhold.normalTimer.info.turnus.tittel': 'Slik regner du ut et snitt når du jobber turnus',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.1':
        'Du regner ut snittet ved å legge sammen antall timer du jobber totalt i hele turnusperioden din, og deler det med antall uker som turnusperioden din består av.',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.2': 'Eksempel:',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.3':
        'Du har en turnus som går over 3 uker. Den første uka jobber du 20 timer, den andre 40 timer og den tredje uka jobber du 15 timer. Da legger du sammen antall timer du har jobbet og deler med antall uker i turnusperioden din.',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4': 'Da blir regnestykket slik i dette eksempelet:',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4a': '20 timer + 40 timer + 15 timer = 75 timer',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.4b':
        'Så deler du antall timer med antall uker i turnusperioden din: 75 / 3 = 25',
    'arbeidsforhold.normalTimer.info.turnus.avsnitt.5':
        'Du jobber altså i snitt 25 timer per uke, og det er dette tallet du oppgir.',

    'arbeidsforhold.frilanser.normalTimer.info.utbetalingNav.tittel': 'Jeg har en ytelse fra NAV som frilanser nå',
    'arbeidsforhold.frilanser.normalTimer.info.utbetalingNav.info':
        'Når du har en ytelse fra NAV som frilanser nå, oppgir du det som var den normale arbeidstiden din før du begynte med ytelsen. En ytelse kan for eksempel være foreldrepenger eller sykepenger.',
    'arbeidsforhold.sn.normalTimer.info.utbetalingNav.tittel':
        'Jeg har en ytelse fra NAV som selvstendig næringsdrivende nå',
    'arbeidsforhold.sn.normalTimer.info.utbetalingNav.info':
        'Når du har en ytelse fra NAV som selvstendig næringsdrivende nå, oppgir du det som var den normale arbeidstiden din før du begynte med ytelsen. En ytelse kan for eksempel være foreldrepenger eller sykepenger.',

    'arbeidsforhold.normalTimer.info.varierende.tittel': 'Slik regner du ut et snitt ved varierende arbeidstid',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.1':
        'Du regner ut et snitt ved å legge sammen antall timer du totalt har jobbet de siste 12 ukene og deler det med 12. Hvis du ikke har jobbet i 12 uker, regner du ut snittet på samme måte ved å bruke de ukene du har jobbet.',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.2': 'Eksempel når du har jobbet de siste 12 ukene:',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.3':
        'De siste 12 ukene har du jobbet 250 timer. Da deler du antall timer du har jobbet med 12: 250 timer / 12 uker = 20,8',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.4':
        'Du jobber altså i snitt 20,8 timer per uke, og det er dette tallet du oppgir.',

    'arbeidsforhold.normalTimer.info.varierende.avsnitt.5':
        'Slik regner du ut et snitt når du har jobbet mindre enn 12 uker:',
    'arbeidsforhold.normalTimer.info.varierende.avsnitt.6':
        'Da deler du antall timer med antall uker du har jobbet. Hvis du for eksempel har jobbet i 7 uker, så deler du antall timer du har jobbet med 7.',

    'arbeidsforhold.normalTimer.info.utbetalingFraNAV.tittel': 'Hva om jeg får utbetaling fra NAV nå?',
    'arbeidsforhold.normalTimer.info.utbetalingFraNAV.avsnitt.1':
        'Hvis du for eksempel får foreldrepenger eller sykepenger i dette arbeidsforholdet nå, registrerer du det om var den normale arbeidstiden din før du begynte å få denne utbetalingen fra NAV.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const infoNormalarbeidstid = {
    nb,
    nn,
};
