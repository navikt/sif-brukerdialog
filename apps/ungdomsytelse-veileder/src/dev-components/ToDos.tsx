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
                comment: [
                    { type: 'checked', text: 'Bruk begrensninger som kommer på deltaker' },
                    { type: 'checked', text: 'Maks startdato er 6 måneder fra dagens dato/første dato' },
                    { type: 'checked', text: 'Min startdato er 6 måneder før dagens dato/første dato' },
                    {
                        type: 'checked',
                        text: 'Backend må implementere at perioden må være gyldig i henhold til lovverket',
                    },
                    { type: 'checked', text: 'Ulik i Q' },
                ],
            };
        case ToDoKeys.begrenseOppslagPåDeltaker:
            return {
                title: 'Filtrere personer?',
                text: 'Skal det være noen begrensning på hvilke personer som kan søkes opp?',
                comment: [
                    { type: 'checked', text: 'Tilgangskontroll på backend' },
                    { type: 'checked', text: 'Håndtere 403 feil - skjermet bruker' },
                    { type: 'checked', text: 'Håndtere 404 feil - deltaker ikke funnet' },
                    {
                        type: 'checked',
                        text: 'Aldersbegrensning skal være med - fom 18 tom 29, men innmeldingsperiode skal vises',
                    },
                ],
            };
        case ToDoKeys.antallDagerBrukt:
            return {
                title: 'Todo',
                text: 'Hvordan skal vi vise disse, og hvor kommer informasjonen fra?',
                comment: [{ text: 'Denne tas ikke med i MVP', type: 'checked' }],
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
                comment: [{ text: 'Skjules hvis søknad ikke er mottatt', type: 'checked' }],
            };
        case ToDoKeys.bekreftEndrePeriode:
            return {
                title: 'Bekrefte endring?',
                text: 'Skal veileder måtte bekrefte endringen?',
                comment: [
                    {
                        text: 'Endringen oppsummeres - vises hva dato var og hva ny dato er. Veileder må bekrefte endringen.',
                        type: 'checked',
                    },
                ],
            };
        case ToDoKeys.historikk:
            return {
                title: 'Historikk?',
                text: 'Skal vi vise historikk på deltakelsen? Hva kan vi vise i så fall?',
                comment: [{ text: 'Ingen historikk i første omgang', type: 'checked' }],
            };
        case ToDoKeys.handlinger:
            return {
                title: 'Hvilke handlinger er tilgjengelig?',
                text: 'Hva kan endres og hvilke begrensninger er det underveis i deltakelsen.',
                comment: [
                    { text: 'Før deltaker har søkt - sette sluttdato må skille seg fra endre', type: 'checked' },
                    { text: 'Deltakelse blir ikke låst', type: 'checked' },
                    { text: 'Skal ikke kunne sette sluttdato før deltaker har søkt', type: 'checked' },
                    {
                        text: 'Kan slettes før deltaker har søkt, veileder må rydde opp. Uavklart om hvordan oppgaven på Min Side håndteres.',
                        type: 'checked',
                    },
                    {
                        text: 'Ved slett - dialog som informerer veileder om hva dette innebærer og hva som må gjøres.',
                        type: 'checked',
                    },
                    {
                        text: 'Det skal ikke være noen begrensning på når deltakerperioden er passert. Dvs. startdato og sluttdato kan fortsatt endre seg',
                        type: 'checked',
                    },
                ],
            };
        default:
            return undefined;
    }
};
