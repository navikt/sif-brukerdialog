import { VStack } from '@navikt/ds-react';
import { BostedVilkårOppgave } from '@sif/api/ung-brukerdialog';

import { UngInnsynText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { BostedKilde } from '../felles/BostedKilde';
import { OppgavebekreftelseTilbakemeldingInfo } from '../felles/OppgavebekreftelseTilbakemeldingInfo';
import { BostedVilkarOppgavetekst } from './BostedVilkarOppgavetekst';

interface Props {
    navn: string;
    oppgave: BostedVilkårOppgave;
    initialVisKvittering?: boolean;
}

export const BostedVilkårOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <VStack gap="space-16">
                    <BostedVilkarOppgavetekst {...oppgave.oppgavetypeData} />
                    <BostedKilde
                        kilde={oppgave.oppgavetypeData.kilde}
                        kildeFritekst={oppgave.oppgavetypeData.kildeFritekst}
                    />
                    <OppgavebekreftelseTilbakemeldingInfo frist={oppgave.frist} />
                </VStack>
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart
                beskjedFooter={
                    <BostedKilde
                        kilde={oppgave.oppgavetypeData.kilde}
                        kildeFritekst={oppgave.oppgavetypeData.kildeFritekst}
                    />
                }>
                <BostedVilkarOppgavetekst {...oppgave.oppgavetypeData} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngInnsynText id="@ungInnsyn.oppgavetype.BEKREFT_BOSTED.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
