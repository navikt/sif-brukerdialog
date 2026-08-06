import { GuidePanel, VStack } from '@navikt/ds-react';
import { DateRange } from '@sif/utils';

import { RegelverkOgInnsynReadMore } from '../../../../components/readmore/RegelverkOgInnsynReadMore';
import { getLovLenker } from '../../oppgaveLovverk';
import { RapporterInntektForm } from '../../../forms/rapporter-inntekt-form/RapporterInntektForm';
import { RapporterInntektKvitteringData, RapporterInntektOppgaveProps } from '../RapporterInntektOppgavePanel';
import { RapporterInntektOppgavetekst } from './RapporterInntektOppgavetekst';

interface Props extends RapporterInntektOppgaveProps {
    periode: DateRange;
    måned: string;
    setKvitteringData: (data: RapporterInntektKvitteringData) => void;
}

export const RapporterInntektUbesvart = ({ oppgave, navn, periode, måned, setKvitteringData }: Props) => {
    return (
        <VStack gap="space-40">
            <GuidePanel>
                <VStack gap="space-16">
                    <RapporterInntektOppgavetekst
                        navn={navn}
                        periode={periode}
                        svarfrist={oppgave.frist}
                        gjelderDelerAvMåned={oppgave.oppgavetypeData.gjelderDelerAvMåned}
                    />
                    <RegelverkOgInnsynReadMore ytelsetype={oppgave.ytelsetype} lenker={getLovLenker(oppgave)} />
                </VStack>
            </GuidePanel>
            <RapporterInntektForm
                oppgaveYtelsetype={oppgave.oppgaveYtelsetype}
                måned={måned}
                oppgaveReferanse={oppgave.oppgaveReferanse}
                onSuccess={(harRapportertInntekt) => setKvitteringData({ harHattInntektOver0: harRapportertInntekt })}
            />
        </VStack>
    );
};
