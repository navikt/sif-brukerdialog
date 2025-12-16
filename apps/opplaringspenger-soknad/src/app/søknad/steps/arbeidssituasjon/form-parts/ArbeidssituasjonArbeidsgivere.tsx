import { BodyLong, ReadMore, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { AppText } from '../../../../i18n';
import ArbeidssituasjonAnsatt, { AnsattFormData } from './ArbeidssituasjonAnsatt';
import HentArbeidsforholdFeiletInfo from '../../../../components/hent-arbeidsforhold-feilet-info/HentArbeidsforholdFeiletInto';

interface Props {
    ansatt_arbeidsforhold: AnsattFormData[];
    parentFieldName: string;
    søknadsperiode: DateRange;
    error?: boolean;
}

const ArbeidssituasjonArbeidsgivere = ({ ansatt_arbeidsforhold, søknadsperiode, parentFieldName, error }: Props) => (
    <>
        <BodyLong as="div">
            {error ? (
                <HentArbeidsforholdFeiletInfo />
            ) : (
                <VStack gap="2" marginBlock="0 8">
                    {ansatt_arbeidsforhold.length > 0 && (
                        <AppText
                            id="steg.arbeidssituasjon.veileder.medArbeidsgiver"
                            values={{ antall: ansatt_arbeidsforhold.length }}
                        />
                    )}
                    {ansatt_arbeidsforhold.length === 0 && (
                        <AppText id="steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet" />
                    )}

                    <ReadMore header="Min arbeidsgiver vises ikke">
                        <AppText id="steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver" />
                    </ReadMore>
                </VStack>
            )}
        </BodyLong>
        {ansatt_arbeidsforhold.length > 0 && (
            <VStack gap="6">
                {ansatt_arbeidsforhold.map((forhold, index) => (
                    <FormLayout.Panel key={forhold.arbeidsgiver.id}>
                        <ArbeidssituasjonAnsatt
                            arbeidsforhold={forhold}
                            parentFieldName={`${parentFieldName}.${index}`}
                            søknadsperiode={søknadsperiode}
                        />
                    </FormLayout.Panel>
                ))}
            </VStack>
        )}
    </>
);

export default ArbeidssituasjonArbeidsgivere;
