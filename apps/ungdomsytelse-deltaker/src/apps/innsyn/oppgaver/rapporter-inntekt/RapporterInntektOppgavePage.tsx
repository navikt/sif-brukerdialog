import { dateFormatter } from '@navikt/sif-common-utils';
import RapporterInntektOppgave from './parts/RapporterInntektOppgave';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';

interface Props {
    deltakerNavn: string;
    oppgave: RapporterInntektOppgave;
}

const RapporterInntektOppgavePage = ({ oppgave, deltakerNavn }: Props) => {
    return (
        <DefaultPageLayout
            documentTitle={`Inntekt ${dateFormatter.MonthFullYear(oppgave.oppgavetypeData.fraOgMed)} - Din ungdomsprogramytelse`}>
            <RapporterInntektOppgave oppgave={oppgave} deltakerNavn={deltakerNavn} />
        </DefaultPageLayout>
    );
};

export default RapporterInntektOppgavePage;
