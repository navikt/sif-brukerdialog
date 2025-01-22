import { BodyLong, Heading, ReadMore, VStack } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { DateRange } from '@navikt/sif-common-formik-ds';
import ArbeidssituasjonAnsatt, { AnsattFormData } from './ArbeidssituasjonAnsatt';
import { AppText } from '../../../../i18n';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    ansatt_arbeidsforhold: AnsattFormData[];
    parentFieldName: string;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonArbeidsgivere = ({ ansatt_arbeidsforhold, søknadsperiode, parentFieldName }: Props) => (
    <>
        <Block>
            <Heading level="2" size="medium">
                <AppText id="steg.arbeidssituasjon.tittel" />
            </Heading>
        </Block>
        <Block margin="m">
            <BodyLong as="div">
                <VStack gap="2" marginBlock="0 8">
                    {ansatt_arbeidsforhold.length > 0 && (
                        <AppText
                            id={'steg.arbeidssituasjon.veileder.medArbeidsgiver'}
                            values={{ antall: ansatt_arbeidsforhold.length }}
                        />
                    )}
                    {ansatt_arbeidsforhold.length === 0 && (
                        <AppText id="steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet" />
                    )}
                    <ReadMore header="Min arbeidsgiver vises ikke">
                        <AppText id={'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver'} />
                    </ReadMore>
                </VStack>
            </BodyLong>
        </Block>
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
