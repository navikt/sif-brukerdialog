import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { useFormikContext } from 'formik';
import { SøknadFormField, SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
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
            <ArbeidssituasjonArbeidsgivereIntro antallArbeidsforhold={ansatt_arbeidsforhold.length} />

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
