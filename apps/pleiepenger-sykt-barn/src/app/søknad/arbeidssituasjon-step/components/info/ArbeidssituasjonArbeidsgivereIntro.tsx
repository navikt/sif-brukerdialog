import React from 'react';
import { useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { AppText } from '../../../../i18n';

interface Props {
    antallArbeidsforhold: number;
}

const ArbeidssituasjonArbeidsgivereIntro: React.FunctionComponent<Props> = ({ antallArbeidsforhold }) => {
    const intl = useIntl();
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
            <ExpandableInfo title={intlHelper(intl, 'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver.tittel')}>
                <p>
                    <AppText id={'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver'} />
                </p>
            </ExpandableInfo>
        </>
    );
};

export default ArbeidssituasjonArbeidsgivereIntro;
