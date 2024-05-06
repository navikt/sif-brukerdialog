import React from 'react';
import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { DateRange } from '@navikt/sif-common-utils';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import {
    ArbeiderIPeriodenSvar,
    ArbeidIPeriodeIntlValues,
    ArbeidsforholdType,
} from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import {
    ArbeidIPeriodeFormField,
    ArbeidIPeriodeFormValues,
} from '../../../types/søknad-form-values/ArbeidIPeriodeFormValues';
import { ArbeidsukeInfo } from '../../../types/ArbeidsukeInfo';
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

const ArbeidIPeriodeSpørsmål: React.FunctionComponent<Props> = ({
    periode,
    parentFieldName,
    formValues,
    arbeiderIPeriodenAlternativer,
    intlValues,
    info,
    normalarbeidstid,
    arbeidsforholdType,
    arbeiderIPeriodenDescription,
}) => {
    const { intl } = useAppIntl();
    const getFieldName = (field: ArbeidIPeriodeFormField) => `${parentFieldName}.arbeidIPeriode.${field}` as any;
    const visKunArbeidstidPerUke = skalSvarePåOmEnJobberLiktIPerioden(periode) === false;

    const visArbeidstidPerUke =
        formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert &&
        (visKunArbeidstidPerUke || formValues?.erLiktHverUke === YesOrNo.NO);

    const spørsmål = getArbeidstidSpørsmålstekst(intl, arbeidsforholdType, intlValues);
    return (
        <>
            <SøknadFormComponents.RadioGroup
                name={getFieldName(ArbeidIPeriodeFormField.arbeiderIPerioden)}
                legend={spørsmål.arbeiderIPerioden}
                validate={getArbeidIPeriodeArbeiderIPeriodenValidator(intlValues)}
                description={arbeiderIPeriodenDescription}
                radios={
                    arbeiderIPeriodenAlternativer || [
                        {
                            label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke'),
                            value: ArbeiderIPeriodenSvar.heltFravær,
                        },
                        {
                            label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert'),
                            value: ArbeiderIPeriodenSvar.redusert,
                        },
                        {
                            label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig'),
                            value: ArbeiderIPeriodenSvar.somVanlig,
                        },
                    ]
                }
            />
            {formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert && (
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
                        {info}
                        {visKunArbeidstidPerUke === false && (
                            <FormBlock>
                                <SøknadFormComponents.YesOrNoQuestion
                                    name={getFieldName(ArbeidIPeriodeFormField.erLiktHverUke)}
                                    legend={spørsmål.erLiktHverUke}
                                    validate={getArbeidIPeriodeErLiktHverUkeValidator(intlValues)}
                                    labels={{
                                        yes: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.ja`),
                                        no: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.nei`),
                                    }}
                                />
                            </FormBlock>
                        )}
                        {visKunArbeidstidPerUke === false && formValues?.erLiktHverUke === YesOrNo.YES && (
                            <>
                                <FormBlock>
                                    <SøknadFormComponents.RadioGroup
                                        name={getFieldName(ArbeidIPeriodeFormField.timerEllerProsent)}
                                        legend={spørsmål.timerEllerProsent}
                                        radios={[
                                            {
                                                label: intlHelper(intl, `arbeidIPeriode.timerEllerProsent.prosent`),
                                                value: TimerEllerProsent.PROSENT,
                                                'data-testid': TimerEllerProsent.PROSENT,
                                            },
                                            {
                                                label: intlHelper(intl, `arbeidIPeriode.timerEllerProsent.timer`),
                                                value: TimerEllerProsent.TIMER,
                                                'data-testid': TimerEllerProsent.TIMER,
                                            },
                                        ]}
                                        validate={getArbeidIPeriodeTimerEllerProsentValidator(intlValues)}
                                    />
                                </FormBlock>
                                {formValues.timerEllerProsent === TimerEllerProsent.PROSENT && (
                                    <FormBlock>
                                        <SøknadFormComponents.NumberInput
                                            className="arbeidstidUkeInput"
                                            name={getFieldName(ArbeidIPeriodeFormField.prosentAvNormalt)}
                                            label={spørsmål.prosentAvNormalt}
                                            data-testid="prosent-verdi"
                                            validate={getArbeidIPeriodeProsentAvNormaltValidator(intlValues)}
                                            width="xs"
                                            maxLength={4}
                                        />
                                    </FormBlock>
                                )}
                                {formValues.timerEllerProsent === TimerEllerProsent.TIMER && (
                                    <FormBlock>
                                        <SøknadFormComponents.NumberInput
                                            className="arbeidstidUkeInput"
                                            name={getFieldName(ArbeidIPeriodeFormField.snittTimerPerUke)}
                                            label={spørsmål.snittTimerPerUke}
                                            validate={getArbeidIPeriodeSnittTimerPerUkeValidator(
                                                intl,
                                                intlValues,
                                                normalarbeidstid,
                                            )}
                                            data-testid="timer-verdi"
                                            width="xs"
                                            maxLength={4}
                                        />
                                    </FormBlock>
                                )}
                            </>
                        )}
                        {visArbeidstidPerUke && (
                            <FormBlock>
                                <ArbeidstidEnkeltuker
                                    parentFieldName={getFieldName(ArbeidIPeriodeFormField.arbeidsuker)}
                                    label={spørsmål.arbeidsuker}
                                    periode={periode}
                                    arbeidIPeriode={formValues}
                                    timerPerUkeValidator={(arbeidsuke: ArbeidsukeInfo) =>
                                        getArbeidIPeriodeSnittTimerEnArbeidsukeValidator(
                                            intl,
                                            intlValues,
                                            normalarbeidstid,
                                            arbeidsuke,
                                        )
                                    }
                                    arbeidsforholdType={arbeidsforholdType}
                                />
                            </FormBlock>
                        )}
                    </ResponsivePanel>
                </FormBlock>
            )}
        </>
    );
};

export default ArbeidIPeriodeSpørsmål;
