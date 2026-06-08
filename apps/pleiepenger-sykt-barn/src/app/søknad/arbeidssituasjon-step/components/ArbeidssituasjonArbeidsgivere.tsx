import { VStack } from '@navikt/ds-react';
import { SifAppKeys } from '@navikt/sif-app-register';
import { HentArbeidsforholdFeiletInfo } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';

import { SøknadFormField, SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import ArbeidssituasjonAnsatt from './ArbeidssituasjonAnsatt';
import ArbeidssituasjonArbeidsgivereIntro from './info/ArbeidssituasjonArbeidsgivereIntro';

interface Props {
    søknadsperiode: DateRange;
    hentArbeidsgivereFeilet: boolean;
}

const ArbeidssituasjonArbeidsgivere = ({ søknadsperiode, hentArbeidsgivereFeilet }: Props) => {
    const {
        values: { ansatt_arbeidsforhold },
    } = useFormikContext<SøknadFormValues>();
    return hentArbeidsgivereFeilet ? (
        <HentArbeidsforholdFeiletInfo app={SifAppKeys.PleiepengerSyktBarn} />
    ) : (
        <>
            <VStack gap="space-24">
                <ArbeidssituasjonArbeidsgivereIntro antallArbeidsforhold={ansatt_arbeidsforhold.length} />
                <VStack gap="space-16">
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
