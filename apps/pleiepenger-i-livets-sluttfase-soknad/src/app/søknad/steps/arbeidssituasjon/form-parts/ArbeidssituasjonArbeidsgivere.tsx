import { BodyLong, VStack } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { AppText } from '../../../../i18n';
import ArbeidssituasjonAnsatt, { AnsattFormData } from './ArbeidssituasjonAnsatt';

interface Props {
    ansatt_arbeidsforhold: AnsattFormData[];
    parentFieldName: string;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonArbeidsgivere = ({ ansatt_arbeidsforhold, søknadsperiode, parentFieldName }: Props) => (
    <VStack gap="8">
        <BodyLong as="div">
            {ansatt_arbeidsforhold.length > 0 && (
                <AppText
                    id="steg.arbeidssituasjon.veileder.medArbeidsgiver"
                    values={{ antall: ansatt_arbeidsforhold.length }}
                />
            )}
            {ansatt_arbeidsforhold.length === 0 && (
                <AppText id="steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet" />
            )}
            <p>
                <AppText id="steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver" />
            </p>
        </BodyLong>

        {ansatt_arbeidsforhold.map((forhold, index) => (
            <div key={forhold.arbeidsgiver.id}>
                <ArbeidssituasjonAnsatt
                    arbeidsforhold={forhold}
                    parentFieldName={`${parentFieldName}.${index}`}
                    søknadsperiode={søknadsperiode}
                />
            </div>
        ))}
    </VStack>
);

export default ArbeidssituasjonArbeidsgivere;
