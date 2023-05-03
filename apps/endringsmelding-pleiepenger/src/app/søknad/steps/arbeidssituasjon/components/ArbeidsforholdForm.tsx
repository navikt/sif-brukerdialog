import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { getTypedFormComponents, IntlErrorObject, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import ArbeidsaktivitetBlock from '../../../../components/arbeidsaktivitet-block/ArbeidsaktivitetBlock';
import { ArbeidAktivitetType } from '../../../../types/Sak';
import { InfoNormalarbeidstid } from './InfoNormalarbeidstid';
import { Alert } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';

interface Props {
    arbeidsgiver: Arbeidsgiver;
    parentFieldName: string;
    values: ArbeidsforholdFormValues;
}

export enum ArbeidsforholdFormField {
    erAnsatt = 'erAnsatt',
    timerPerUke = 'timerPerUke',
}

export interface ArbeidsforholdFormValues {
    [ArbeidsforholdFormField.erAnsatt]?: YesOrNo;
    [ArbeidsforholdFormField.timerPerUke]?: string;
}

const { NumberInput, YesOrNoQuestion } = getTypedFormComponents<
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
    IntlErrorObject
>();

const ArbeidsforholdForm = ({ parentFieldName, values, arbeidsgiver }: Props) => {
    const getFieldName = (field: ArbeidsforholdFormField): ArbeidsforholdFormField => {
        return `${parentFieldName}.${field}` as ArbeidsforholdFormField;
    };

    return (
        <ArbeidsaktivitetBlock
            type={ArbeidAktivitetType.arbeidstaker}
            navn={arbeidsgiver.navn}
            arbeidsgiver={arbeidsgiver}
            renderAsExpansionCard={false}>
            <YesOrNoQuestion
                name={getFieldName(ArbeidsforholdFormField.erAnsatt)}
                validate={(value) => {
                    const error = getYesOrNoValidator()(value);
                    if (error) {
                        return {
                            key: `arbeidsforhold.validation.${ArbeidsforholdFormField.erAnsatt}.${error}`,
                            keepKeyUnaltered: true,
                        };
                    }
                    return undefined;
                }}
                legend={`Stemmer det at du er ansatt hos ${arbeidsgiver.navn} i perioden med pleiepenger?`}
            />

            {values.erAnsatt === YesOrNo.NO && (
                <Block margin="l" padBottom="l">
                    <Alert variant="warning">Når dette ikke stemmer kan du</Alert>
                </Block>
            )}
            {values.erAnsatt === YesOrNo.YES && (
                <FormBlock>
                    <NumberInput
                        name={getFieldName(ArbeidsforholdFormField.timerPerUke)}
                        label={`Hvor mange timer jobber du normalt per uke hos ${arbeidsgiver.navn}?`}
                        description={<InfoNormalarbeidstid />}
                        min={0}
                        max={100}
                        width="xs"
                        maxLength={5}
                        validate={(value) => {
                            const error = getNumberValidator({ allowDecimals: true, required: true, max: 100, min: 0 })(
                                value
                            );
                            return error
                                ? {
                                      key: `arbeidsforhold.validation.${ArbeidsforholdFormField.timerPerUke}.${error}`,
                                      keepKeyUnaltered: true,
                                  }
                                : undefined;
                        }}
                    />
                </FormBlock>
            )}
        </ArbeidsaktivitetBlock>
    );
};

export default ArbeidsforholdForm;
