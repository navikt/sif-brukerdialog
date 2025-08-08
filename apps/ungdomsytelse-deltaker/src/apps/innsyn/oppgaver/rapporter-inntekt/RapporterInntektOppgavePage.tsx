import { dateFormatter } from '@navikt/sif-common-utils';
import { RapporterInntektOppgave } from '../../../../types/Oppgave';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '../../utils/textUtils';
import RapporterInntektOppgavePart from './parts/RapporterInntektOppgavePart';

interface Props {
    deltakerNavn: string;
    oppgave: RapporterInntektOppgave;
}

const RapporterInntektOppgavePage = ({ oppgave, deltakerNavn }: Props) => {
    return (
        <DefaultPageLayout
            documentTitle={getDokumentTittel(
                `Inntekt ${dateFormatter.MonthFullYear(oppgave.oppgavetypeData.fraOgMed)}`,
            )}>
            <RapporterInntektOppgavePart oppgave={oppgave} deltakerNavn={deltakerNavn} />
        </DefaultPageLayout>
    );
};

export default RapporterInntektOppgavePage;
