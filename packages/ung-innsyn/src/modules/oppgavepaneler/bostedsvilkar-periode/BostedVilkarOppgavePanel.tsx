import { BostedVilkårPeriodeOppgave } from '@sif/api/ung-brukerdialog';

import { UngUiText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { BostedVilkarPeriodeOppgavetekst } from './BostedVilkarPeriodeOppgavetekst';
import { OppgavebekreftelseTilbakemeldingInfo } from '../felles/OppgavebekreftelseTilbakemeldingInfo';
import { VStack } from '@navikt/ds-react';

interface Props {
    navn: string;
    oppgave: BostedVilkårPeriodeOppgave;
    initialVisKvittering?: boolean;
}

export const BostedVilkårOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <VStack gap="space-20">
                    <BostedVilkarPeriodeOppgavetekst {...oppgave.oppgavetypeData} />
                    <OppgavebekreftelseTilbakemeldingInfo frist={oppgave.frist} />
                </VStack>
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart>
                <BostedVilkarPeriodeOppgavetekst {...oppgave.oppgavetypeData} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngUiText id="@ungInnsyn.oppgavetype.BEKREFT_BOSTED.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
