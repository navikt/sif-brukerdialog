import { EndretStartdatoOppgave } from '@navikt/ung-common';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import { getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../../utils/textUtils';
import { useAppIntl } from '../../../../i18n';
import EndretStartdatoOppgavetekst from './parts/EndretStartdatoOppgavetekst';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';

interface Props {
    deltakerNavn: string;
    oppgave: EndretStartdatoOppgave;
}

export const EndretStartdatoOppgavePage = ({ deltakerNavn, oppgave }: Props) => {
    const intl = useAppIntl();
    const tekster = getOppgaveBekreftelseTekster(oppgave, intl);
    const oppsummering = getOppgaveOppsummering(oppgave);

    return (
        <DefaultPageLayout documentTitle={`${tekster.sidetittel} - Din ungdomsprogramytelse`}>
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
