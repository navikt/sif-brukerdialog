import React from 'react';
import { useAppIntl } from '@i18n/index';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText } from '../../../../i18n';
import { BodyLong, VStack } from '@navikt/ds-react';

interface Props {
    antallArbeidsforhold: number;
}

const ArbeidssituasjonArbeidsgivereIntro: React.FunctionComponent<Props> = ({ antallArbeidsforhold }) => {
    const { text } = useAppIntl();
    return (
        <VStack gap="2">
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
