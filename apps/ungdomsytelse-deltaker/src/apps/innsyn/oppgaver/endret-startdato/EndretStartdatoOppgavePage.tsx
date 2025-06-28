import { useAppIntl } from '../../../../i18n';
import { EndretStartdatoOppgave } from '../../../../types/Oppgave';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel, getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../../utils/textUtils';
import EndretStartdatoOppgavetekst from './parts/EndretStartdatoOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: EndretStartdatoOppgave;
}

export const EndretStartdatoOppgavePage = ({ deltakerNavn, oppgave }: Props) => {
    const intl = useAppIntl();
    const tekster = getOppgaveBekreftelseTekster(oppgave, intl);
    const oppsummering = getOppgaveOppsummering(oppgave);

    return (
        <DefaultPageLayout documentTitle={getDokumentTittel(tekster.sidetittel)}>
            <Oppgavebekreftelse
                tekster={tekster}
                oppsummering={oppsummering}
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}>
                <EndretStartdatoOppgavetekst
                    endretDato={oppgave.oppgavetypeData.nyStartdato}
                    svarfrist={oppgave.frist}
                />
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};
