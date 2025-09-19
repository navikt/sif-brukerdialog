import { OppgavebekreftelseDevProps } from '@innsyn/modules/oppgavebekreftelse/types';
import DefaultPageLayout from '@innsyn/pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '@innsyn/utils/textUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { RapporterInntektOppgave } from '@shared/types/Oppgave';

import RapporterInntektOppgavePart from './parts/RapporterInntektOppgavePart';

interface Props extends OppgavebekreftelseDevProps {
    deltakerNavn: string;
    oppgave: RapporterInntektOppgave;
}

const RapporterInntektOppgavePage = ({ oppgave, deltakerNavn, _devKvittering }: Props) => {
    return (
        <DefaultPageLayout
            documentTitle={getDokumentTittel(
                `Inntekt ${dateFormatter.MonthFullYear(oppgave.oppgavetypeData.fraOgMed)}`,
            )}>
            <RapporterInntektOppgavePart
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                _devKvittering={_devKvittering}
            />
        </DefaultPageLayout>
    );
};

export default RapporterInntektOppgavePage;
