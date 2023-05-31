import React from 'react';
import { FormattedMessage, IntlShape } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidsforholdFormValues } from '../../../types/ArbeidsforholdFormValues';
import ArbeidssituasjonAnsatt from './ArbeidssituasjonAnsatt';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';

interface Props {
    ansatt_arbeidsforhold: ArbeidsforholdFormValues[];
    parentFieldName: string;
    søknadsperiode: DateRange;
    intl: IntlShape;
}

const ArbeidssituasjonArbeidsgivere: React.FunctionComponent<Props> = ({
    ansatt_arbeidsforhold,
    søknadsperiode,
    parentFieldName,
    intl,
}) => (
    <>
        <Block>
            <p>
                {ansatt_arbeidsforhold.length > 0 && (
                    <FormattedMessage
                        id={'steg.arbeidssituasjon.veileder.medArbeidsgiver'}
                        values={{ antall: ansatt_arbeidsforhold.length }}
                    />
                )}
                {ansatt_arbeidsforhold.length === 0 && (
                    <FormattedMessage id="steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet" />
                )}
            </p>
            <ExpandableInfo title={intlHelper(intl, 'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver.tittel')}>
                <p>
                    <FormattedMessage id={'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver'} />
                </p>
            </ExpandableInfo>
        </Block>
        {ansatt_arbeidsforhold.length > 0 && (
            <>
                {ansatt_arbeidsforhold.map((forhold, index) => (
                    <FormBlock key={forhold.arbeidsgiver.id}>
                        <ArbeidssituasjonAnsatt
                            arbeidsforhold={forhold}
                            parentFieldName={`${parentFieldName}.${index}`}
                            søknadsperiode={søknadsperiode}
                        />
                    </FormBlock>
                ))}
            </>
        )}
    </>
);

export default ArbeidssituasjonArbeidsgivere;
