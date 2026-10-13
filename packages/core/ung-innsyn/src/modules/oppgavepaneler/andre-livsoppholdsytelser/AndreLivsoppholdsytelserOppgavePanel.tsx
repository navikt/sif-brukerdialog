import { VStack } from '@navikt/ds-react';
import { AndreLivsoppholdsytelserOppgave } from '@sif/api/ung-brukerdialog';

import { UngInnsynText } from '../../../i18n';
import { Oppgavebekreftelse } from '../../oppgavebekreftelse/Oppgavebekreftelse';
import { AndreLivsoppholdsytelserKilde } from '../felles/AndreLivsoppholdsytelserKilde';
import { OppgavebekreftelseTilbakemeldingInfo } from '../felles/OppgavebekreftelseTilbakemeldingInfo';
import { AndreLivsoppholdsytelserOppgavetekst } from './AndreLivsoppholdsytelserOppgavetekst';

interface Props {
    navn: string;
    oppgave: AndreLivsoppholdsytelserOppgave;
    initialVisKvittering?: boolean;
}

export const AndreLivsoppholdsytelserOppgavePanel = ({ navn, oppgave, initialVisKvittering }: Props) => {
    return (
        <Oppgavebekreftelse oppgave={oppgave} navn={navn} initialVisKvittering={initialVisKvittering}>
            <Oppgavebekreftelse.Ubesvart>
                <VStack gap="space-16">
                    <AndreLivsoppholdsytelserOppgavetekst {...oppgave.oppgavetypeData} />
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
                <AndreLivsoppholdsytelserOppgavetekst {...oppgave.oppgavetypeData} />
            </Oppgavebekreftelse.Besvart>

            <Oppgavebekreftelse.Kvittering>
                <UngInnsynText id="@ungInnsyn.oppgavetype.BEKREFT_ANDRE_LIVSOPPHOLDSYTELSER.kvitteringTekst" />
            </Oppgavebekreftelse.Kvittering>
        </Oppgavebekreftelse>
    );
};
