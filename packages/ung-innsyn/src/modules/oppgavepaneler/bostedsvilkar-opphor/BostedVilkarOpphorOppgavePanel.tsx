import { BostedVilkårOpphørOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { dateFormatter } from '@sif/utils';
import { VStack } from '@navikt/ds-react';
import { BostedVilkarOpphorOppgavetekst } from './BostedVilkarOpphorOppgavetekst';
import { OppgavebekreftelseTilbakemeldingInfo } from '../felles/OppgavebekreftelseTilbakemeldingInfo';

interface Props {
    navn: string;
    oppgave: BostedVilkårOpphørOppgave;
    initialVisKvittering?: boolean;
}

export const BostedVilkårOpphørOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    const formatertFom = dateFormatter.full(oppgave.oppgavetypeData.fom);
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <VStack gap="space-20">
                    <BostedVilkarOpphorOppgavetekst {...oppgave.oppgavetypeData} />
                    <OppgavebekreftelseTilbakemeldingInfo frist={oppgave.frist} />
                </VStack>
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <BostedVilkarOpphorOppgavetekst {...oppgave.oppgavetypeData} />
                {/* <UngUiText
                    id="@ungInnsyn.bostedVilkårOpphørOppgave.oppsummering"
                    values={{
                        strong: (content: ReactNode) => <strong>{content}</strong>,
                        fom: formatertFom,
                    }}
                /> */}
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungInnsyn.oppgavetype.BEKREFT_BOSTED_OPPHØR.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
