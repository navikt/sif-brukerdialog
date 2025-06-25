import { KorrigertInntektOppgave } from '@navikt/ung-common';
import { useAppIntl } from '../../../../i18n';
import Oppgavebekreftelse from '../../components/oppgavebekreftelse/Oppgavebekreftelse';
import DefaultPageLayout from '../../pages/layout/DefaultPageLayout';
import { getDokumentTittel, getOppgaveBekreftelseTekster, getOppgaveOppsummering } from '../../utils/textUtils';
import KorrigertInntektOppgavetekst from './parts/KorrigertInntektOppgavetekst';

interface Props {
    deltakerNavn: string;
    oppgave: KorrigertInntektOppgave;
}

export const KorrigertInntektOppgavePage = ({ deltakerNavn, oppgave }: Props) => {
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
                <KorrigertInntektOppgavetekst oppgave={oppgave} />
            </Oppgavebekreftelse>
        </DefaultPageLayout>
    );
};
