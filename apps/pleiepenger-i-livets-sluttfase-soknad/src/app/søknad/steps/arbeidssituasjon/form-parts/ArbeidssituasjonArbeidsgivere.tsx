import { FormattedMessage } from 'react-intl';
import ArbeidssituasjonAnsatt, { AnsattFormData } from './ArbeidssituasjonAnsatt';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { Heading } from '@navikt/ds-react';

interface Props {
    ansatt_arbeidsforhold: AnsattFormData[];
    parentFieldName: string;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonArbeidsgivere = ({ ansatt_arbeidsforhold, søknadsperiode, parentFieldName }: Props) => (
    <>
        <Block>
            <Heading level="2" size="large">
                <FormattedMessage id="steg.arbeidssituasjon.tittel" />
            </Heading>
        </Block>
        <Block margin="m">
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
            <p>
                <FormattedMessage id={'steg.arbeidssituasjon.veileder.manglerDetArbeidsgiver'} />
            </p>
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
