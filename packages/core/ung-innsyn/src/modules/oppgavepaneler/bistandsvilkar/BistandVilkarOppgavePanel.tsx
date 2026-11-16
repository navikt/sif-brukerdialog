import { VStack } from '@navikt/ds-react';
import { BistandVilkårOppgave } from '@sif/api/ung-brukerdialog';

import { UngInnsynText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { BistandKilde } from '../felles/BistandKilde';
import { OppgavebekreftelseTilbakemeldingInfo } from '../felles/OppgavebekreftelseTilbakemeldingInfo';
import { BistandVilkårOppgavetekst } from './BistandVilkarOppgavetekst';

interface Props {
    navn: string;
    oppgave: BistandVilkårOppgave;
    initialVisKvittering?: boolean;
}

export const BistandVilkårOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <VStack gap="space-16">
                    <BistandVilkårOppgavetekst {...oppgave.oppgavetypeData} />
                    <BistandKilde
                        kilde={oppgave.oppgavetypeData.kilde}
                        kildeFritekst={oppgave.oppgavetypeData.kildeFritekst}
                    />
                    <OppgavebekreftelseTilbakemeldingInfo frist={oppgave.frist} />
                </VStack>
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart
                beskjedFooter={
                    <BistandKilde
                        kilde={oppgave.oppgavetypeData.kilde}
                        kildeFritekst={oppgave.oppgavetypeData.kildeFritekst}
                    />
                }>
                <BistandVilkårOppgavetekst {...oppgave.oppgavetypeData} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngInnsynText id="@ungInnsyn.oppgavetype.BEKREFT_BISTAND.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
