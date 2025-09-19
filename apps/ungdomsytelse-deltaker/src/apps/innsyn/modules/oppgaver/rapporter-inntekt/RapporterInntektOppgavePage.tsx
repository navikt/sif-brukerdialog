import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '@innsyn/utils/textUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
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
    return (
        <DefaultPageLayout
            documentTitle={getDokumentTittel(
                `Inntekt ${dateFormatter.MonthFullYear(props.oppgave.oppgavetypeData.fraOgMed)}`,
            )}>
            <RapporterInntektOppgavePart {...props} />
        </DefaultPageLayout>
    );
};

export default RapporterInntektOppgavePage;
