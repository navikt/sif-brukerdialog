import { dateFormatter } from '@navikt/sif-common-utils';
import RapporterInntektOppgave from './parts/RapporterInntektOppgave';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel } from '../../utils/textUtils';

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
            <RapporterInntektOppgave oppgave={oppgave} deltakerNavn={deltakerNavn} />
        </DefaultPageLayout>
    );
};

export default RapporterInntektOppgavePage;
