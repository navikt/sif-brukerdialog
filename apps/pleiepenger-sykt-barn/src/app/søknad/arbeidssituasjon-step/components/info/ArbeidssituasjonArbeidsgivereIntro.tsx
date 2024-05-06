import React from 'react';
import { useAppIntl } from '@i18n/index';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { AppText } from '../../../../i18n';

interface Props {
    antallArbeidsforhold: number;
}

const ArbeidssituasjonArbeidsgivereIntro: React.FunctionComponent<Props> = ({ antallArbeidsforhold }) => {
    const { text } = useAppIntl();
    return (
        <>
            <p>
                {antallArbeidsforhold > 0 && (
                    <AppText
                        id={'steg.arbeidssituasjon.veileder.medArbeidsgiver'}
                        values={{ antall: antallArbeidsforhold }}
                    />
                )}
                {antallArbeidsforhold === 0 && <AppText id="steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet" />}
            </p>
            <ExpandableInfo title={text('steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver.tittel')}>
                <p>
                    <AppText id={'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver'} />
                </p>
            </ExpandableInfo>
        </>
    );
};

export default ArbeidssituasjonArbeidsgivereIntro;
