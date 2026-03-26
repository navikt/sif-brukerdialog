import { VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { RapporterInntektOppgave } from '@sif/api/ung-brukerdialog';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { RapporterInntektOppgavePart } from './parts/RapporterInntektOppgavePart';

export interface RapporterInntektOppgaveProps {
    navn: string;
    oppgave: RapporterInntektOppgave;
    initialKvitteringData?: RapporterInntektKvitteringData;
    onCancel: () => void;
}

export interface RapporterInntektKvitteringData {
    harHattInntektOver0: boolean;
}

export const RapporterInntektOppgavePage = (props: RapporterInntektOppgaveProps) => {
    const queryClient = useQueryClient();
    const { oppgave } = props;

    // Sjekk om oppgaven er løst men mangler rapportertInntekt-data
    const oppgaveErLøstMenManglerData =
        oppgave.status === OppgaveStatus.LØST && !oppgave.respons?.arbeidstakerOgFrilansInntekt;

    useEffect(() => {
        if (oppgaveErLøstMenManglerData) {
            // Refetch deltakelseperioder for å få oppdaterte data fra backend
            // TODO_ queryClient.refetchQueries(commonQueries.deltakelseperioder);
        }
    }, [oppgaveErLøstMenManglerData, queryClient]);

    return (
        <VStack gap="space-24">
            <RapporterInntektOppgavePart {...props} />
        </VStack>
    );
};
