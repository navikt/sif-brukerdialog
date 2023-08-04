import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { useFormikContext } from 'formik';
import { SøknadFormField, SøknadFormValues } from '../../../types/_SøknadFormValues';
import ArbeidssituasjonAnsatt from './ArbeidssituasjonAnsatt';
import ArbeidssituasjonArbeidsgivereIntro from './info/ArbeidssituasjonArbeidsgivereIntro';

interface Props {
    søknadsperiode: DateRange;
}

const ArbeidssituasjonArbeidsgivere: React.FunctionComponent<Props> = ({ søknadsperiode }) => {
    const {
        values: { ansatt_arbeidsforhold },
    } = useFormikContext<SøknadFormValues>();
    return (
        <>
            <FormBlock>
                <ArbeidssituasjonArbeidsgivereIntro antallArbeidsforhold={ansatt_arbeidsforhold.length} />
            </FormBlock>
            {ansatt_arbeidsforhold.map((forhold, index) => (
                <FormBlock key={forhold.arbeidsgiver.id}>
                    <ArbeidssituasjonAnsatt
                        arbeidsforhold={forhold}
                        parentFieldName={`${SøknadFormField.ansatt_arbeidsforhold}.${index}`}
                        søknadsperiode={søknadsperiode}
                    />
                </FormBlock>
            ))}
        </>
    );
};

export default ArbeidssituasjonArbeidsgivere;
