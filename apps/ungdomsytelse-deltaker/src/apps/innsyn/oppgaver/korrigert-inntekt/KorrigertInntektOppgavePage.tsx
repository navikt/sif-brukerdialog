import { useAppIntl } from '../../../../i18n';
import { KorrigertInntektOppgave } from '../../../../types/Oppgave';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel, getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../../utils/textUtils';
import KorrigertInntektOppgavetekst from './parts/KorrigertInntektOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: KorrigertInntektOppgave;
    _devKvittering?: boolean;
}

export const KorrigertInntektOppgavePage = ({ deltakerNavn, oppgave, _devKvittering }: Props) => {
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
                <KorrigertInntektOppgavetekst oppgave={oppgave} />
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};
