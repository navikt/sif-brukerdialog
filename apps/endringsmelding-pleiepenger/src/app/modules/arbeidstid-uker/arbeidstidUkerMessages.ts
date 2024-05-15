const nb = {
    'arbeidstidUker.editButton.endreValgteUker.title': 'Endre valgte uker',
    'arbeidstidUker.editButton.endreEnkeltuke.title': 'Endre uke {ukenummer} ({tidsrom})',
    'arbeidstidUker.editButton.endreEnkeltuke.label': 'Endre arbeidstid',
    'arbeidstidUker.visMer.visFlereUker.label': 'Vis flere uker',
    'arbeidstidUker.visMer.visAlleUker.label': 'Vis alle uker',
    'arbeidstidUkeListe.heading': 'Uke {ukenummer}',
    'arbeidstidUkeTabell.aria.velgUke': 'Velg uke',
    'arbeidstidUkeTabell.aria.uke': 'Uke',
    'arbeidstidUkeTabell.velgAlleUker.cb': 'Velg alle uker i tabellen',
    'arbeidstidUkeTabell.header.uke': 'Uke',
    'arbeidstidUkeTabell.header.dato': 'Dato',
    'arbeidstidUkeTabell.header.normalt.title': 'Normalt',
    'arbeidstidUkeTabell.header.normalt.tooltip': 'Hvor mye du jobber normalt når du ikke har pleiepenger',
    'arbeidstidUkeTabell.header.arbeidstid.title': 'I perioden',
    'arbeidstidUkeTabell.header.arbeidstid.tooltip': 'Hvor mye du jobber i pleiepengeperioden',
    'arbeidstidUkeTabell.header.endre': 'Endre',
    'arbeidstidUkeTabell.compact.uke': 'Uke {ukenummer}',
    'arbeidstidUkeTabell.compact.normalarbeidstid': 'Normal arbeidstid: <Varighet></Varighet>',
    'endreUkerFooter.endreButton.label': 'Endre valgte uker',
    'endreUkerFooter.velgUkerFørst.melding': 'Du må velge uker først',
    'endreUkerHeader.cb.endreFlereSamtidig.label': 'Jeg ønsker å endre flere uker samtidig',
    'endreUkerHeader.korteUker.melding':
        'Korte uker, altså ikke hele uker, eller uker med ferie må endres hver for seg.',
};

const nn: Record<keyof typeof nb, string> = { ...nb };

export const arbeidstidUkerMessages = { nb, nn };
