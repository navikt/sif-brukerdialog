import { useState } from 'react';
import { UngdomsytelseOppgavebekreftelse } from '@navikt/k9-brukerdialog-prosessering-api';
import { deltakerApiService } from '../../../api/deltakerApiService';
import { Oppgavetype } from '@navikt/ung-common';

export enum OppgaveDtoType {
    'endretSluttdato' = 'EndretSluttdatoUngdomsytelseOppgaveDTO',
    'endretStartdato' = 'EndretStartdatoUngdomsytelseOppgaveDTO',
}

export const getOppgaveDtoTypeFromOppgavetype = (type: Oppgavetype): OppgaveDtoType => {
    switch (type) {
        case Oppgavetype.BEKREFT_ENDRET_SLUTTDATO:
            return OppgaveDtoType.endretSluttdato;
        case Oppgavetype.BEKREFT_ENDRET_STARTDATO:
            return OppgaveDtoType.endretStartdato;
    }
};

export const useBesvarOppgave = () => {
    const [pending, setPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [besvart, setBesvart] = useState(false);

    const sendSvar = (svar: UngdomsytelseOppgavebekreftelse) => {
        setPending(true);
        return deltakerApiService
            .sendOppgavebekreftelse(svar)
            .then(() => {
                setBesvart(true);
            })
            .catch((error) => {
                setError('Besvar endret oppgave feiler');
                console.log(error);
            })
            .finally(() => {
                setPending(false);
            });
    };
    return { sendSvar, besvart, pending, error };
};
