import { VStack } from '@navikt/ds-react';
import { OppgaveStatus } from '@navikt/ung-brukerdialog-api';
import { RapporterInntektOppgave } from '@sif/api';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useAppIntl } from '../../../../i18n';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '../../../utils/textUtils';
import RapporterInntektOppgavePart from './parts/RapporterInntektOppgavePart';

export interface RapporterInntektOppgaveProps {
    navn: string;
    oppgave: RapporterInntektOppgave;
    initialKvitteringData?: RapporterInntektKvitteringData;
}

export interface RapporterInntektKvitteringData {
    harHattInntektOver0: boolean;
}

const RapporterInntektOppgavePage = (props: RapporterInntektOppgaveProps) => {
    const appIntl = useAppIntl();
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
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(props.oppgave, appIntl)}>
            <VStack gap="space-24">
                <RapporterInntektOppgavePart {...props} />
            </VStack>
        </DefaultPageLayout>
    );
};

export default RapporterInntektOppgavePage;
