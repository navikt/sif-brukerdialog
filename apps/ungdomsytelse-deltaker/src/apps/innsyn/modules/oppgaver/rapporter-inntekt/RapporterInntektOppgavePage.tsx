import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { OppgaveStatus } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { commonQueries } from '@shared/api/queries/commonQueries';
import { useAppIntl } from '@shared/i18n';
import { RapporterInntektOppgave } from '@shared/types/Oppgave';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import Skyra from '../../../../../components/skyra/Skyra';
import RapporterInntektOppgavePart from './parts/RapporterInntektOppgavePart';

export interface RapporterInntektOppgaveProps {
    deltakerNavn: string;
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
        oppgave.status === OppgaveStatus.LØST && !oppgave.oppgavetypeData.rapportertInntekt;

    useEffect(() => {
        if (oppgaveErLøstMenManglerData) {
            // Refetch deltakelseperioder for å få oppdaterte data fra backend
            queryClient.refetchQueries(commonQueries.deltakelseperioder);
        }
    }, [oppgaveErLøstMenManglerData, queryClient]);

    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(props.oppgave, appIntl)}>
            <RapporterInntektOppgavePart {...props} />
            <div>
                <Skyra slug="arbeids-og-velferdsetaten-nav/ungdomsprorgramytelsen-rapportere-inntekt" />
            </div>
        </DefaultPageLayout>
    );
};

export default RapporterInntektOppgavePage;
