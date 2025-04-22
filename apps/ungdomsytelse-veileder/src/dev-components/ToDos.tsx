export enum ToDoKeys {
    begrenseOppslagPåDeltaker = 'begrenseOppslagPåDeltaker',
    henteGyldigPeriodeForDeltakelser = 'henteGyldigPeriodeForDeltakelser',
}

export const getToDo = (todo: ToDoKeys) => {
    switch (todo) {
        case ToDoKeys.henteGyldigPeriodeForDeltakelser:
            return <>Hente gyldig periode for deltakelse fra backend og bruke den i registreringsskjemaet.</>;
        case ToDoKeys.begrenseOppslagPåDeltaker:
            return <>Skal det være noen begrensning på hvilke personer som kan søkes opp?</>;
        default:
            return null;
    }
};
