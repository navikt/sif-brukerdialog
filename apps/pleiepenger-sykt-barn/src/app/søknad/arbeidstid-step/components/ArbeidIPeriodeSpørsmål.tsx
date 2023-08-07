import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/lib/components/formik-radio-group/FormikRadioGroup';
import { DateRange } from '@navikt/sif-common-utils/lib';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import { ArbeiderIPeriodenSvar, ArbeidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from '../../../types/ArbeidIPeriodeFormValues';
import { ArbeidsukeInfo } from '../../../types/ArbeidsukeInfo';
import SøknadFormComponents from '../../SøknadFormComponents';
import { ArbeidsaktivitetType } from '../ArbeidstidStep';
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
    arbeidsaktivitetType: ArbeidsaktivitetType;
    periode: DateRange;
    parentFieldName: string;
    formValues?: ArbeidIPeriodeFormValues;
    arbeiderIPeriodenAlternativer?: FormikRadioProp[];
    intlValues: ArbeidIPeriodeIntlValues;
    normalarbeidstid: number;
    info?: React.ReactNode;
}

const ArbeidIPeriodeSpørsmål: React.FunctionComponent<Props> = ({
    periode,
    parentFieldName,
    formValues,
    arbeiderIPeriodenAlternativer,
    intlValues,
    info,

    normalarbeidstid,
    arbeidsaktivitetType,
}) => {
    const intl = useIntl();
    const getFieldName = (field: ArbeidIPeriodeFormField) => `${parentFieldName}.arbeidIPeriode.${field}` as any;
    const visKunArbeidstidPerUke = skalSvarePåOmEnJobberLiktIPerioden(periode) === false;

    const visArbeidstidPerUke =
        formValues?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert &&
        (visKunArbeidstidPerUke || formValues?.erLiktHverUke === YesOrNo.NO);

    const spørsmål = getArbeidstidSpørsmålstekst(intl, arbeidsaktivitetType, intlValues);
    return (
        <>
            <SøknadFormComponents.RadioGroup
                name={getFieldName(ArbeidIPeriodeFormField.arbeiderIPerioden)}
                legend={spørsmål.arbeiderIPerioden}
                validate={getArbeidIPeriodeArbeiderIPeriodenValidator(arbeidsaktivitetType, intlValues)}
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
                                    validate={getArbeidIPeriodeErLiktHverUkeValidator(arbeidsaktivitetType, intlValues)}
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
                                        validate={getArbeidIPeriodeTimerEllerProsentValidator(
                                            arbeidsaktivitetType,
                                            intlValues
                                        )}
                                    />
                                </FormBlock>
                                {formValues.timerEllerProsent === TimerEllerProsent.PROSENT && (
                                    <FormBlock>
                                        <SøknadFormComponents.NumberInput
                                            className="arbeidstidUkeInput"
                                            name={getFieldName(ArbeidIPeriodeFormField.prosentAvNormalt)}
                                            label={spørsmål.prosentAvNormalt}
                                            data-testid="prosent-verdi"
                                            validate={getArbeidIPeriodeProsentAvNormaltValidator(
                                                arbeidsaktivitetType,
                                                intlValues
                                            )}
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
                                                arbeidsaktivitetType,
                                                intl,
                                                intlValues,
                                                normalarbeidstid
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
                                            arbeidsaktivitetType,
                                            intl,
                                            intlValues,
                                            normalarbeidstid,
                                            arbeidsuke
                                        )
                                    }
                                    arbeidsaktivitetType={arbeidsaktivitetType}
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
