import { Alert } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { getTypedFormComponents, IntlErrorObject, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import {
    getNumberValidator,
    getRequiredFieldValidator,
    getYesOrNoValidator,
} from '@navikt/sif-common-formik-ds/lib/validation';
import ArbeidsaktivitetBlock from '../../../../components/arbeidsaktivitet-block/ArbeidsaktivitetBlock';
import { Arbeidsgiver } from '../../../../types/Arbeidsgiver';
import { ArbeidAktivitetType } from '../../../../types/Sak';
import { InfoNormalarbeidstid } from './InfoNormalarbeidstid';

interface Props {
    arbeidsgiver: Arbeidsgiver;
    parentFieldName: string;
    values: ArbeidsforholdFormValues;
}

export enum ArbeiderIPeriodenSvar {
    'somVanlig' = 'SOM_VANLIG',
    'redusert' = 'REDUSERT',
    'heltFravær' = 'HELT_FRAV\u00C6R',
}

export enum ArbeidsforholdFormField {
    erAnsatt = 'erAnsatt',
    timerPerUke = 'timerPerUke',
    arbeiderIPerioden = 'arbeiderIPerioden',
}

export interface ArbeidsforholdFormValues {
    [ArbeidsforholdFormField.erAnsatt]?: YesOrNo;
    [ArbeidsforholdFormField.timerPerUke]?: string;
    [ArbeidsforholdFormField.arbeiderIPerioden]?: ArbeiderIPeriodenSvar;
}

export const ArbeiderIPeriodenSvarTekst = {
    [ArbeiderIPeriodenSvar.heltFravær]: 'Jeg jobber ikke',
    [ArbeiderIPeriodenSvar.redusert]: 'Jeg kombinerer delvis jobb med pleiepenger',
    [ArbeiderIPeriodenSvar.somVanlig]: 'Jeg jobber som vanlig',
};

const { NumberInput, YesOrNoQuestion, RadioGroup } = getTypedFormComponents<
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
                legend={`Stemmer det at du er ansatt hos ${arbeidsgiver.navn} i perioden med pleiepenger?`}
            />
            {values.erAnsatt === YesOrNo.NO && (
                <Block margin="l" padBottom="l">
                    <Alert variant="warning">
                        Når du ikke er ansatt her lenger, må du be denne arbeidsgiveren om å sende en ny A-melding med
                        sluttdato. Dette gjør de enten via eget lønns- og personalsystem, eller via Altinn.
                    </Alert>
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
                    <FormBlock>
                        <RadioGroup
                            name={getFieldName(ArbeidsforholdFormField.arbeiderIPerioden)}
                            legend={`I perioden med pleiepenger, hvilken situasjon gjelder for deg hos ${arbeidsgiver.navn}?`}
                            validate={getArbeidIPeriodeArbeiderIPeriodenValidator(arbeidsgiver.navn)}
                            radios={[
                                {
                                    label: ArbeiderIPeriodenSvarTekst[ArbeiderIPeriodenSvar.heltFravær],
                                    value: ArbeiderIPeriodenSvar.heltFravær,
                                    'data-testid': ArbeiderIPeriodenSvar.heltFravær,
                                },
                                {
                                    label: ArbeiderIPeriodenSvarTekst[ArbeiderIPeriodenSvar.redusert],
                                    value: ArbeiderIPeriodenSvar.redusert,
                                    'data-testid': ArbeiderIPeriodenSvar.redusert,
                                },
                                {
                                    label: ArbeiderIPeriodenSvarTekst[ArbeiderIPeriodenSvar.somVanlig],
                                    value: ArbeiderIPeriodenSvar.somVanlig,
                                    'data-testid': ArbeiderIPeriodenSvar.somVanlig,
                                },
                            ]}
                        />
                    </FormBlock>
                    {values.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert && (
                        <Block margin="m">
                            <Alert variant="info">
                                Når du kombinerer delvis jobb og pleiepenger skal du registrere hvor mye jobber hver uke
                                hos {arbeidsgiver.navn} på steget &quot;Jobb i pleiepengeperioden&quot;.
                            </Alert>
                        </Block>
                    )}
                </>
            )}
        </ArbeidsaktivitetBlock>
    );
};

export default ArbeidsforholdForm;
