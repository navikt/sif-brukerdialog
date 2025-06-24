import { EndretSluttdatoOppgave } from '@navikt/ung-common';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import { getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../../utils/textUtils';
import { useAppIntl } from '../../../../i18n';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import EndretSluttdatoOppgavetekst from './parts/EndretSluttdatoOppgavetekst';
import NySluttdatoOppgavetekst from './parts/NySluttdatoOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: EndretSluttdatoOppgave;
}

export const EndretSluttdatoOppgavePage = ({ deltakerNavn, oppgave }: Props) => {
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
                {oppgave.oppgavetypeData.forrigeSluttdato ? (
                    <EndretSluttdatoOppgavetekst
                        endretDato={oppgave.oppgavetypeData.nySluttdato}
                        svarfrist={oppgave.frist}
                    />
                ) : (
                    <NySluttdatoOppgavetekst
                        endretDato={oppgave.oppgavetypeData.nySluttdato}
                        svarfrist={oppgave.frist}
                    />
                )}
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};
