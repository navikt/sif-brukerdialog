import { BodyLong, Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { DateRange } from '@navikt/sif-common-formik-ds';
import ArbeidssituasjonAnsatt, { AnsattFormData } from './ArbeidssituasjonAnsatt';
import { AppText } from '../../../../i18n';

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
                {ansatt_arbeidsforhold.length > 0 && (
                    <AppText
                        id={'steg.arbeidssituasjon.veileder.medArbeidsgiver'}
                        values={{ antall: ansatt_arbeidsforhold.length }}
                    />
                )}
                {ansatt_arbeidsforhold.length === 0 && (
                    <AppText id="steg.arbeidssituasjon.veileder.ingenArbeidsgiverFunnet" />
                )}
                <p>
                    <AppText id={'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver'} />
                </p>
            </BodyLong>
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
