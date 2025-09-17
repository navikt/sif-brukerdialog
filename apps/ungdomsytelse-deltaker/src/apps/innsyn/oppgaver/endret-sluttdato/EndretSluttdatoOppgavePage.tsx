import { useAppIntl } from '../../../../i18n';
import { EndretSluttdatoOppgave } from '../../../../types/Oppgave';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import { OppgavebekreftelseDevProps } from '../../components/oppgavebekreftelse/types';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel, getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../../utils/textUtils';
import EndretSluttdatoOppgavetekst from './parts/EndretSluttdatoOppgavetekst';
import NySluttdatoOppgavetekst from './parts/NySluttdatoOppgavetekst';

interface Props extends OppgavebekreftelseDevProps {
    deltakerNavn: string;
    oppgave: EndretSluttdatoOppgave;
}

export const EndretSluttdatoOppgavePage = ({ deltakerNavn, oppgave, _devKvittering }: Props) => {
    const intl = useAppIntl();
    const tekster = getOppgaveBekreftelseTekster(oppgave, intl);
    const oppsummering = getOppgaveOppsummering(oppgave);

    return (
        <DefaultPageLayout documentTitle={getDokumentTittel(tekster.sidetittel)}>
            <Oppgavebekreftelse
                tekster={tekster}
                oppsummering={oppsummering}
                oppgave={oppgave}
                deltakerNavn={deltakerNavn}
                _devKvittering={_devKvittering}>
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
