export enum ToDoKeys {
    begrenseOppslagPåDeltaker = 'begrenseOppslagPåDeltaker',
    gyldigPeriodeForDeltakelser = 'gyldigPeriodeForDeltakelser',
    antallDagerBrukt = 'antallDagerBrukt',
    endreStartdato = 'endreStartdato',
    endreSluttdato = 'endreSluttdato',
    erDeltakerInformert = 'erDeltakerInformert',
    bekreftEndrePeriode = 'bekreftEndrePeriode',
    historikk = 'historikk',
    handlinger = 'handlinger',
}

interface ToDo {
    text: string;
    title?: string;
    comment?: Array<Comment | string>;
}

interface Comment {
    text: string;
    type?: 'checked';
}

export const getToDo = (todo: ToDoKeys): ToDo | undefined => {
    switch (todo) {
        case ToDoKeys.gyldigPeriodeForDeltakelser:
            return {
                title: 'Datobegrensning',
                text: 'Hva er datobegrensningene, og hvor skal gyldig periode for deltakelse hentes fra?',
                // comment: 'Disse hardkodes i frontend til å begynne med',
            };
        case ToDoKeys.begrenseOppslagPåDeltaker:
            return {
                title: 'Filtrere personer?',
                text: 'Skal det være noen begrensning på hvilke personer som kan søkes opp?',
                // comment: 'Ingen begrensning i første omgang',
            };
        case ToDoKeys.antallDagerBrukt:
            return {
                title: 'Todo',
                text: 'Hvordan skal vi vise disse, og hvor kommer informasjonen fra?',
                // comment: 'Ingen begrensning i første omgang',
            };
        case ToDoKeys.endreStartdato:
            return {
                title: 'Begrensning startdato?',
                text: 'Hva er begrensningene for å endre startdato, og endrer disse seg i løpet av perioden?',
                comment: [
                    'Skal datoen alltid kunne settes til første gyldig dato?',
                    'Hva når bruker har vært i programmet i flere måneder,',
                    'Hva når deltakelsen er ferdig?',
                    'Hvor kommer begrensningen fra? Hardkodes i dialog, eller fra backend?',
                ],
            };
        case ToDoKeys.endreSluttdato:
            return {
                title: 'Begrensning sluttdato?',
                text: 'Hva er dato-begrensningene for sluttdatoen?',
                // comment: 'Ingen begrensning i første omgang',
            };
        case ToDoKeys.erDeltakerInformert:
            return {
                title: 'Skal dette spørsmålet være med?',
                text: 'Skal vi ta med dette spørsmålet? Dette lagres ikke noe sted.',
                // comment: 'Ingen begrensning i første omgang',
            };
        case ToDoKeys.bekreftEndrePeriode:
            return {
                title: 'Bekrefte endring?',
                text: 'Skal veileder måtte bekrefte endringen?',
                // comment: 'Ingen begrensning i første omgang',
            };
        case ToDoKeys.historikk:
            return {
                title: 'Historikk?',
                text: 'Skal vi vise historikk på deltakelsen? Hva kan vi vise i så fall?',
                // comment: 'Ingen begrensning i første omgang',
            };
        case ToDoKeys.handlinger:
            return {
                title: 'Hvilke handlinger er tilgjengelig?',
                text: 'Hva kan endres og hvilke begrensninger er det underveis i deltakelsen.',
                comment: [
                    'Før deltaker har søkt',
                    'Underveis',
                    'Etter at deltakelsen er over',
                    'Skal en deltakelse bli låst?',
                ],
            };
        default:
            return undefined;
    }
};
