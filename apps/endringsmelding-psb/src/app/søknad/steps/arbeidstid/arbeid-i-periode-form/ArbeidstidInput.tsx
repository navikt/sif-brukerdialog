import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getNumberValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { dateRangeUtils } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import { TimerEllerProsent } from '../../../../types/TimerEllerProsent';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from './ArbeidIPeriodeFormValues';
import { ArbeidIPeriodeIntlValues } from './arbeidstidPeriodeIntlValuesUtils';

dayjs.extend(isoWeek);

interface Props {
    timerEllerProsent: TimerEllerProsent;
    maksTimer: number;
    intlValues: ArbeidIPeriodeIntlValues;
    arbeidIPeriode: ArbeidIPeriodeFormValues;
}

const { NumberInput } = getTypedFormComponents<ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues, ValidationError>();

export const søkerKunHeleUker = (periode: DateRange): boolean => {
    return (
        dayjs(periode.from).isoWeekday() === 1 &&
        dayjs(periode.to).isoWeekday() >= 5 &&
        dateRangeUtils.getNumberOfDaysInDateRange(periode) >= 5
    );
};

const ArbeidstidInput: React.FunctionComponent<Props> = ({ timerEllerProsent, intlValues, maksTimer }) => {
    const intl = useIntl();

    const getProsentLabel = () => {
        return intlHelper(intl, 'arbeidIPeriode.prosentAvNormalt.spm', intlValues);
    };

    const getTimerLabel = () => {
        return intlHelper(intl, 'arbeidIPeriode.timerAvNormalt.spm', {
            ...intlValues,
        });
    };

    return (
        <FormBlock paddingBottom="l">
            {timerEllerProsent === TimerEllerProsent.PROSENT && (
                <NumberInput
                    className="arbeidstidUkeInput"
                    name={ArbeidIPeriodeFormField.prosentAvNormalt}
                    label={getProsentLabel()}
                    data-testid="prosent-verdi"
                    width="xs"
                    maxLength={4}
                />
            )}
            {timerEllerProsent === TimerEllerProsent.TIMER && (
                <NumberInput
                    className="arbeidstidUkeInput"
                    name={ArbeidIPeriodeFormField.snittTimerPerUke}
                    label={getTimerLabel()}
                    data-testid="timer-verdi"
                    width="xs"
                    maxLength={4}
                    validate={getNumberValidator({ min: 0, max: maksTimer })}
                />
            )}
        </FormBlock>
    );
};

export default ArbeidstidInput;
