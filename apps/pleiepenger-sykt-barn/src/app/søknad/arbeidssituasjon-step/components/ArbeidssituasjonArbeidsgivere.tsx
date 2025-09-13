import React from 'react';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { SøknadFormField, SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import ArbeidssituasjonAnsatt from './ArbeidssituasjonAnsatt';
import ArbeidssituasjonArbeidsgivereIntro from './info/ArbeidssituasjonArbeidsgivereIntro';
import { VStack } from '@navikt/ds-react';

interface Props {
    søknadsperiode: DateRange;
}

const ArbeidssituasjonArbeidsgivere: React.FunctionComponent<Props> = ({ søknadsperiode }) => {
    const {
        values: { ansatt_arbeidsforhold },
    } = useFormikContext<SøknadFormValues>();
    return (
        <>
            <VStack gap="6">
                <ArbeidssituasjonArbeidsgivereIntro antallArbeidsforhold={ansatt_arbeidsforhold.length} />
                <VStack gap="4">
                    {ansatt_arbeidsforhold.map((forhold, index) => (
                        <div key={forhold.arbeidsgiver.id}>
                            <ArbeidssituasjonAnsatt
                                arbeidsforhold={forhold}
                                parentFieldName={`${SøknadFormField.ansatt_arbeidsforhold}.${index}`}
                                søknadsperiode={søknadsperiode}
                            />
                        </div>
                    ))}
                </VStack>
            </VStack>
        </>
    );
};

export default ArbeidssituasjonArbeidsgivere;
