import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';

interface Props {
    antallArbeidsforhold: number;
}

const ArbeidssituasjonArbeidsgivereIntro: React.FunctionComponent<Props> = ({ antallArbeidsforhold }) => {
    const intl = useIntl();
    return (
        <>
            <p>
                {antallArbeidsforhold > 0 && (
                    <FormattedMessage
                        id={'steg.arbeidssituasjon.veileder.medArbeidsgiver'}
                        values={{ antall: antallArbeidsforhold }}
                    />
                )}
                {antallArbeidsforhold === 0 && (
                    <FormattedMessage id="steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet" />
                )}
            </p>
            <ExpandableInfo title={intlHelper(intl, 'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver.tittel')}>
                <p>
                    <FormattedMessage id={'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver'} />
                </p>
            </ExpandableInfo>
        </>
    );
};

export default ArbeidssituasjonArbeidsgivereIntro;
