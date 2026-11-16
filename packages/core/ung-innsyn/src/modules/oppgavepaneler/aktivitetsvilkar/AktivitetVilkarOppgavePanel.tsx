import { VStack } from '@navikt/ds-react';
import { AktivitetVilkårOppgave } from '@sif/api/ung-brukerdialog';

import { UngInnsynText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { AktivitetKilde } from '../felles/AktivitetKilde';
import { OppgavebekreftelseTilbakemeldingInfo } from '../felles/OppgavebekreftelseTilbakemeldingInfo';
import { AktivitetVilkårOppgavetekst } from './AktivitetVilkarOppgavetekst';

interface Props {
    navn: string;
    oppgave: AktivitetVilkårOppgave;
    initialVisKvittering?: boolean;
}

export const AktivitetVilkårOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <VStack gap="space-16">
                    <AktivitetVilkårOppgavetekst {...oppgave.oppgavetypeData} />
                    <AktivitetKilde
                        kilde={oppgave.oppgavetypeData.kilde}
                        kildeFritekst={oppgave.oppgavetypeData.kildeFritekst}
                    />
                    <OppgavebekreftelseTilbakemeldingInfo frist={oppgave.frist} />
                </VStack>
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart
                beskjedFooter={
                    <AktivitetKilde
                        kilde={oppgave.oppgavetypeData.kilde}
                        kildeFritekst={oppgave.oppgavetypeData.kildeFritekst}
                    />
                }>
                <AktivitetVilkårOppgavetekst {...oppgave.oppgavetypeData} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngInnsynText id="@ungInnsyn.oppgavetype.BEKREFT_AKTIVITET.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
