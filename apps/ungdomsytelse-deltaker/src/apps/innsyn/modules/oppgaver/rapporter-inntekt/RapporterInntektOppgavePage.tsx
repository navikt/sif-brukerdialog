import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getOppgaveDokumentTittel } from '@innsyn/utils/textUtils';
import { useAppIntl } from '@shared/i18n';
import { RapporterInntektOppgave } from '@shared/types/Oppgave';

import RapporterInntektOppgavePart from './parts/RapporterInntektOppgavePart';

export interface RapporterInntektOppgaveProps {
    deltakerNavn: string;
    oppgave: RapporterInntektOppgave;
    initialKvitteringData?: RapporterInntektKvitteringData;
}

export interface RapporterInntektKvitteringData {
    harHattInntekt: boolean;
}

const RapporterInntektOppgavePage = (props: RapporterInntektOppgaveProps) => {
    const appIntl = useAppIntl();
    return (
        <DefaultPageLayout documentTitle={getOppgaveDokumentTittel(props.oppgave, appIntl)}>
            <RapporterInntektOppgavePart {...props} />
        </DefaultPageLayout>
    );
};

export default RapporterInntektOppgavePage;
