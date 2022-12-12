import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter, dateRangeUtils } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ArbeidsukeInfo } from '../ArbeidsukeInfo';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues, TimerEllerProsent } from './ArbeidIPeriodeFormValues';
import { ArbeidIPeriodeIntlValues } from './arbeidstidPeriodeIntlValuesUtils';
import { BodyShort } from '@navikt/ds-react';

interface Props {
    arbeidsuke?: ArbeidsukeInfo;
    parentFieldName: string;
    timerEllerProsent: TimerEllerProsent;
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

const ArbeidstidInput: React.FunctionComponent<Props> = ({
    arbeidsuke,
    parentFieldName,
    timerEllerProsent,
    intlValues,
}) => {
    const intl = useIntl();

    const getFieldName = (field: ArbeidIPeriodeFormField) => `${parentFieldName}.${field}`;

    const prosentFieldName: any = getFieldName(ArbeidIPeriodeFormField.prosentAvNormalt);
    const timerFieldName: any = getFieldName(ArbeidIPeriodeFormField.snittTimerPerUke);

    const formatPeriode = (periode: DateRange): string =>
        `${dateFormatter.compact(periode.from)} - ${dateFormatter.compact(periode.to)}`;

    const ukenummer = arbeidsuke ? `${arbeidsuke.ukenummer}` : undefined;
    const ukedatoer = arbeidsuke ? `${formatPeriode(arbeidsuke.periode)}` : undefined;

    const getProsentLabel = () => {
        return arbeidsuke ? (
            <>
                <FormattedMessage id="arbeidIPeriode.uke.ukenummer" values={{ ukenummer }} />
                <br />

                <FormattedMessage id="arbeidIPeriode.uke.ukedatoer" values={{ ukedatoer }} />
            </>
        ) : (
            intlHelper(
                intl,
                arbeidsuke ? 'arbeidIPeriode.prosentAvNormalt.uke.spm' : 'arbeidIPeriode.prosentAvNormalt.spm',
                intlValues
            )
        );
    };

    const getTimerLabel = () => {
        return arbeidsuke ? (
            <>
                <FormattedMessage id="arbeidIPeriode.uke.ukenummer" values={{ ukenummer }} />
                <br />
                <BodyShort>
                    <FormattedMessage id="arbeidIPeriode.uke.ukedatoer" values={{ ukedatoer }} />
                </BodyShort>
            </>
        ) : (
            intlHelper(intl, 'arbeidIPeriode.timerAvNormalt.spm', {
                ...intlValues,
            })
        );
    };

    // const getTimerSuffix = () => {
    //     if (arbeidsuke && arbeidsuke.arbeidsdagerPeriode) {
    //         return `timer (${getArbeidsdagerIUkeTekst(arbeidsuke.arbeidsdagerPeriode)})`;
    //     }
    //     return 'timer';
    // };

    // const getProsentSuffix = () => {
    //     if (arbeidsuke && arbeidsuke.arbeidsdagerPeriode) {
    //         return `prosent av normalt (${getArbeidsdagerIUkeTekst(arbeidsuke.arbeidsdagerPeriode)})`;
    //     }
    //     return `prosent av normalt`;
    // };

    return (
        <FormBlock paddingBottom="l" margin={arbeidsuke ? 'm' : undefined}>
            {timerEllerProsent === TimerEllerProsent.PROSENT && (
                <NumberInput
                    className="arbeidstidUkeInput"
                    name={prosentFieldName}
                    label={getProsentLabel()}
                    data-testid="prosent-verdi"
                    width="xs"
                    maxLength={4}
                />
            )}
            {timerEllerProsent === TimerEllerProsent.TIMER && (
                <NumberInput
                    className="arbeidstidUkeInput"
                    name={timerFieldName}
                    label={getTimerLabel()}
                    data-testid="timer-verdi"
                    width="xs"
                    maxLength={4}
                />
            )}
        </FormBlock>
    );
};

export default ArbeidstidInput;
