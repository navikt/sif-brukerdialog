import { useAppIntl } from '@i18n/index';
import { BodyLong, VStack } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';

import { AppText } from '../../../../i18n';

interface Props {
    antallArbeidsforhold: number;
}

const ArbeidssituasjonArbeidsgivereIntro = ({ antallArbeidsforhold }: Props) => {
    const { text } = useAppIntl();
    return (
        <VStack gap="space-8">
            <BodyLong>
                {antallArbeidsforhold > 0 && (
                    <AppText
                        id="steg.arbeidssituasjon.veileder.medArbeidsgiver"
                        values={{ antall: antallArbeidsforhold }}
                    />
                )}
                {antallArbeidsforhold === 0 && <AppText id="steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet" />}
            </BodyLong>
            <ExpandableInfo title={text('steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver.tittel')}>
                <BodyLong>
                    <AppText id="steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver" />
                </BodyLong>
            </ExpandableInfo>
        </VStack>
    );
};

export default ArbeidssituasjonArbeidsgivereIntro;
