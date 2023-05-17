import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { getTypedFormComponents, IntlErrorObject, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import {
    getNumberValidator,
    getRequiredFieldValidator,
    getYesOrNoValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import { ArbeidAktivitetType, Arbeidsgiver } from '@types';
import ArbeidsaktivitetBlock from '../../../../components/arbeidsaktivitet-block/ArbeidsaktivitetBlock';
import IkkeAnsattMelding from '../../../../components/ikke-ansatt-melding/IkkeAnsattMelding';
import { InfoNormalarbeidstid } from './InfoNormalarbeidstid';

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

export const getArbeidIPeriodeArbeiderIPeriodenValidator =
    (navn: string) =>
    (value: any): IntlErrorObject | undefined => {
        const error = getRequiredFieldValidator()(value);
        return error
            ? {
                  key: `validation.arbeidIPeriode.arbeider.${error}`,
                  keepKeyUnaltered: true,
                  values: {
                      navn,
                  },
              }
            : error;
    };
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
                            values: {
                                navn: arbeidsgiver.navn,
                            },
                        };
                    }
                    return undefined;
                }}
                legend={`Stemmer det at du er ansatt hos ${arbeidsgiver.navn} i perioden du har søkt pleiepenger?`}
            />
            {values.erAnsatt === YesOrNo.NO && (
                <Block margin="l" padBottom="l">
                    <IkkeAnsattMelding />
                </Block>
            )}
            {values.erAnsatt === YesOrNo.YES && (
                <>
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
                                const error = getNumberValidator({
                                    allowDecimals: true,
                                    required: true,
                                    max: 100,
                                    min: 0,
                                })(value);
                                return error
                                    ? {
                                          key: `arbeidsforhold.validation.${ArbeidsforholdFormField.timerPerUke}.${error}`,
                                          keepKeyUnaltered: true,
                                          values: {
                                              navn: arbeidsgiver.navn,
                                          },
                                      }
                                    : undefined;
                            }}
                        />
                    </FormBlock>
                </>
            )}
        </ArbeidsaktivitetBlock>
    );
};

export default ArbeidsforholdForm;
