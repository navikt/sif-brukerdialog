import { useAppIntl } from '@i18n/index';
import { FormikRadioProp, YesOrNo } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import React from 'react';

import {
    ArbeiderIPeriodenSvar,
    ArbeidIPeriodeIntlValues,
    ArbeidsforholdType,
} from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import { ArbeidsukeInfo } from '../../../types/ArbeidsukeInfo';
import {
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
} from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';
import { getArbeidstidSpørsmålstekst } from '../utils/arbeidIPeriodeTekstUtils';
import { skalSvarePåOmEnJobberLiktIPerioden } from '../utils/arbeidstidStepUtils';
import {
    getArbeidIPeriodeArbeiderIPeriodenValidator,
    getArbeidIPeriodeErLiktHverUkeValidator,
    getArbeidIPeriodeProsentAvNormaltValidator,
    getArbeidIPeriodeSnittTimerEnArbeidsukeValidator,
    getArbeidIPeriodeSnittTimerPerUkeValidator,
    getArbeidIPeriodeTimerEllerProsentValidator,
} from '../validationArbeidIPeriodeSpørsmål';
import ArbeidstidEnkeltuker from './ArbeidstidEnkeltuker';

interface Props {
    arbeidsforholdType: ArbeidsforholdType;
    periode: DateRange;
    parentFieldName: string;
    formValues?: ArbeidIPeriodeFormValues;
    arbeiderIPeriodenAlternativer?: FormikRadioProp[];
    intlValues: ArbeidIPeriodeIntlValues;
    normalarbeidstid: number;
    info?: React.ReactNode;
    arbeiderIPeriodenDescription?: React.ReactNode;
}

const ArbeidIPeriodeSpørsmål = ({
    periode,
    parentFieldName,
    formValues,
    arbeiderIPeriodenAlternativer,
    intlValues,
    info,
    normalarbeidstid,
    arbeidsforholdType,
    arbeiderIPeriodenDescription,
}: Props) => {
    const appIntl = useAppIntl();
    const { text } = appIntl;
    const getFieldName = (field: ArbeidIPeriodeFormField) => `${parentFieldName}.arbeidIPeriode.${field}` as any;
    const visKunArbeidstidPerUke = skalSvarePåOmEnJobberLiktIPerioden(periode) === false;

    const visArbeidstidPerUke =
        formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert &&
        (visKunArbeidstidPerUke || formValues?.erLiktHverUke === YesOrNo.NO);

    const spørsmål = getArbeidstidSpørsmålstekst(appIntl, arbeidsforholdType, intlValues);

    return (
        <FormLayout.Questions>
            <SøknadFormComponents.RadioGroup
                name={getFieldName(ArbeidIPeriodeFormField.arbeiderIPerioden)}
                legend={spørsmål.arbeiderIPerioden}
                validate={getArbeidIPeriodeArbeiderIPeriodenValidator(intlValues)}
                description={arbeiderIPeriodenDescription}
                radios={
                    arbeiderIPeriodenAlternativer || [
                        {
                            label: text('arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke'),
                            value: ArbeiderIPeriodenSvar.heltFravær,
                        },
                        {
                            label: text('arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert'),
                            value: ArbeiderIPeriodenSvar.redusert,
                        },
                        {
                            label: text('arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig'),
                            value: ArbeiderIPeriodenSvar.somVanlig,
                        },
                    ]
                }
            />

            {formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert && (
                <FormLayout.Panel bleedTop={true}>
                    <FormLayout.Questions>
                        <div>{info}</div>
                        {visKunArbeidstidPerUke === false && (
                            <SøknadFormComponents.YesOrNoQuestion
                                name={getFieldName(ArbeidIPeriodeFormField.erLiktHverUke)}
                                legend={spørsmål.erLiktHverUke}
                                validate={getArbeidIPeriodeErLiktHverUkeValidator(intlValues)}
                                labels={{
                                    yes: text(`arbeidIPeriode.erLiktHverUke.ja`),
                                    no: text(`arbeidIPeriode.erLiktHverUke.nei`),
                                }}
                            />
                        )}
                        {visKunArbeidstidPerUke === false && formValues?.erLiktHverUke === YesOrNo.YES && (
                            <>
                                <SøknadFormComponents.RadioGroup
                                    name={getFieldName(ArbeidIPeriodeFormField.timerEllerProsent)}
                                    legend={spørsmål.timerEllerProsent}
                                    radios={[
                                        {
                                            label: text(`arbeidIPeriode.timerEllerProsent.prosent`),
                                            value: TimerEllerProsent.PROSENT,
                                            'data-testid': TimerEllerProsent.PROSENT,
                                        },
                                        {
                                            label: text(`arbeidIPeriode.timerEllerProsent.timer`),
                                            value: TimerEllerProsent.TIMER,
                                            'data-testid': TimerEllerProsent.TIMER,
                                        },
                                    ]}
                                    validate={getArbeidIPeriodeTimerEllerProsentValidator(intlValues)}
                                />

                                {formValues.timerEllerProsent === TimerEllerProsent.PROSENT && (
                                    <SøknadFormComponents.NumberInput
                                        className="arbeidstidUkeInput"
                                        name={getFieldName(ArbeidIPeriodeFormField.prosentAvNormalt)}
                                        label={spørsmål.prosentAvNormalt}
                                        data-testid="prosent-verdi"
                                        validate={getArbeidIPeriodeProsentAvNormaltValidator(intlValues)}
                                        width="xs"
                                        maxLength={4}
                                    />
                                )}
                                {formValues.timerEllerProsent === TimerEllerProsent.TIMER && (
                                    <SøknadFormComponents.NumberInput
                                        className="arbeidstidUkeInput"
                                        name={getFieldName(ArbeidIPeriodeFormField.snittTimerPerUke)}
                                        label={spørsmål.snittTimerPerUke}
                                        validate={getArbeidIPeriodeSnittTimerPerUkeValidator(
                                            appIntl,
                                            intlValues,
                                            normalarbeidstid,
                                        )}
                                        data-testid="timer-verdi"
                                        width="xs"
                                        maxLength={5}
                                    />
                                )}
                            </>
                        )}
                        {visArbeidstidPerUke && (
                            <ArbeidstidEnkeltuker
                                parentFieldName={getFieldName(ArbeidIPeriodeFormField.arbeidsuker)}
                                label={spørsmål.arbeidsuker}
                                periode={periode}
                                arbeidIPeriode={formValues}
                                timerPerUkeValidator={(arbeidsuke: ArbeidsukeInfo) =>
                                    getArbeidIPeriodeSnittTimerEnArbeidsukeValidator(
                                        appIntl,
                                        intlValues,
                                        normalarbeidstid,
                                        arbeidsuke,
                                    )
                                }
                                arbeidsforholdType={arbeidsforholdType}
                            />
                        )}
                    </FormLayout.Questions>
                </FormLayout.Panel>
            )}
        </FormLayout.Questions>
    );
};

export default ArbeidIPeriodeSpørsmål;
