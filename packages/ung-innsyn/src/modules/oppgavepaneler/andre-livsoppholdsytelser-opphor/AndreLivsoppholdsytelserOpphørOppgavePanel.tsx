import { AndreLivsoppholdsytelserOpphørOppgave } from '@sif/api/ung-brukerdialog';

import { UngInnsynText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { VStack } from '@navikt/ds-react';
import { OppgavebekreftelseTilbakemeldingInfo } from '../felles/OppgavebekreftelseTilbakemeldingInfo';
import { AndreLivsoppholdsytelserKilde } from '../felles/AndreLivsoppholdsytelserKilde';
import { AndreLivsoppholdsytelserOpphørOppgavetekst } from './AndreLivsoppholdsytelserOpphørOppgavetekst';

interface Props {
    navn: string;
    oppgave: AndreLivsoppholdsytelserOpphørOppgave;
    initialVisKvittering?: boolean;
}

export const AndreLivsoppholdsytelserOpphørOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <VStack gap="space-16">
                    <AndreLivsoppholdsytelserOpphørOppgavetekst {...oppgave.oppgavetypeData} />
                    <AndreLivsoppholdsytelserKilde
                        kilde={oppgave.oppgavetypeData.kilde}
                        kildeFritekst={oppgave.oppgavetypeData.kildeFritekst}
                    />
                    <OppgavebekreftelseTilbakemeldingInfo frist={oppgave.frist} />
                </VStack>
            </Oppgavebekreftelse.Ubesvart>

            <Oppgavebekreftelse.Besvart
                beskjedFooter={
                    <AndreLivsoppholdsytelserKilde
                        kilde={oppgave.oppgavetypeData.kilde}
                        kildeFritekst={oppgave.oppgavetypeData.kildeFritekst}
                    />
                }>
                <VStack gap="space-20">
                    <AndreLivsoppholdsytelserOpphørOppgavetekst {...oppgave.oppgavetypeData} />
                </VStack>
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngInnsynText id="@ungInnsyn.oppgavetype.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER_OPPHØR.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
