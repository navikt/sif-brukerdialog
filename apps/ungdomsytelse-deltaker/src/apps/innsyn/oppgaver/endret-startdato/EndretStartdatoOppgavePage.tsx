import { useAppIntl } from '../../../../i18n';
import { EndretStartdatoOppgave } from '../../../../types/Oppgave';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import { OppgavebekreftelseDevProps } from '../../components/oppgavebekreftelse/types';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel, getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../../utils/textUtils';
import EndretStartdatoOppgavetekst from './parts/EndretStartdatoOppgavetekst';

interface Props extends OppgavebekreftelseDevProps {
    deltakerNavn: string;
    oppgave: EndretStartdatoOppgave;
}

export const EndretStartdatoOppgavePage = ({ deltakerNavn, oppgave, _devKvittering }: Props) => {
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
                <EndretStartdatoOppgavetekst
                    endretDato={oppgave.oppgavetypeData.nyStartdato}
                    svarfrist={oppgave.frist}
                />
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};
