import { BodyShort } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { dateFormatter, dateRangeUtils, decimalDurationToDuration } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { ArbeidIPeriodeIntlValues } from '../../../../local-sif-common-pleiepenger';
import { formatTimerOgMinutter } from '../../../../local-sif-common-pleiepenger/components/timer-og-minutter/TimerOgMinutter';
import { TimerEllerProsent } from '../../../../types';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from '../../../../types/ArbeidIPeriodeFormValues';
import { ArbeidsukeInfo } from '../../../../types/ArbeidsukeInfo';
import { NormalarbeidstidSøknadsdata } from '../../../../types/søknadsdata/NormalarbeidstidSøknadsdata';
import SøknadFormComponents from '../../../SøknadFormComponents';
import {
    getArbeidIPeriodeProsentAvNormaltValidator,
    getArbeidIPeriodeTimerPerUkeISnittValidator,
} from '../../validationArbeidIPeriodeSpørsmål';

interface Props {
    arbeidsuke?: ArbeidsukeInfo;
    parentFieldName: string;
    normalarbeidstid: NormalarbeidstidSøknadsdata;
    timerEllerProsent: TimerEllerProsent;
    intlValues: ArbeidIPeriodeIntlValues;
    arbeidIPeriode: ArbeidIPeriodeFormValues;
    frilans?: boolean;
    frilansVervString?: string;
    frilansVervValideringString?: string;
}

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
    normalarbeidstid,
    frilans,
    frilansVervString,
    frilansVervValideringString,
}) => {
    const intl = useIntl();

    const getFieldName = (field: ArbeidIPeriodeFormField) => `${parentFieldName}.${field}`;

    const prosentFieldName: any = getFieldName(ArbeidIPeriodeFormField.prosentAvNormalt);
    const timerFieldName: any = getFieldName(ArbeidIPeriodeFormField.snittTimerPerUke);

    const timerNormaltString = formatTimerOgMinutter(
        intl,
        decimalDurationToDuration(normalarbeidstid.timerPerUkeISnitt)
    );

    const formatPeriode = (periode: DateRange): string =>
        `${dateFormatter.compact(periode.from)} - ${dateFormatter.compact(periode.to)}`;

    const ukenummer = arbeidsuke ? `${arbeidsuke.ukenummer}` : undefined;
    const ukedatoer = arbeidsuke ? `${formatPeriode(arbeidsuke.periode)}` : undefined;

    const getProsentLabel = () => {
        return arbeidsuke ? (
            <>
                <FormattedMessage id="arbeidIPeriode.uke.ukenummer" values={{ ukenummer }} />
                <br />
                <BodyShort as="div">
                    <FormattedMessage id="arbeidIPeriode.uke.ukedatoer" values={{ ukedatoer }} />
                </BodyShort>
            </>
        ) : frilans ? (
            intlHelper(intl, 'arbeidIPeriode.prosent.frilanser.spm', { frilansVervString })
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
                <BodyShort as="div">
                    <FormattedMessage id="arbeidIPeriode.uke.ukedatoer" values={{ ukedatoer }} />
                </BodyShort>
            </>
        ) : frilans ? (
            intlHelper(intl, 'arbeidIPeriode.timer.frilanser.spm', { frilansVervString })
        ) : (
            intlHelper(intl, 'arbeidIPeriode.timerAvNormalt.spm', {
                ...intlValues,
                timerNormaltString,
            })
        );
    };

    return (
        <FormBlock paddingBottom="l" margin={arbeidsuke ? 'm' : undefined}>
            {timerEllerProsent === TimerEllerProsent.PROSENT && (
                <SøknadFormComponents.NumberInput
                    className="arbeidstidUkeInput"
                    name={prosentFieldName}
                    label={getProsentLabel()}
                    data-testid="prosent-verdi"
                    validate={getArbeidIPeriodeProsentAvNormaltValidator(
                        intlValues,
                        arbeidsuke,
                        frilans ? frilansVervValideringString : undefined
                    )}
                    width="xs"
                    maxLength={4}
                />
            )}
            {timerEllerProsent === TimerEllerProsent.TIMER && (
                <SøknadFormComponents.NumberInput
                    className="arbeidstidUkeInput"
                    name={timerFieldName}
                    label={getTimerLabel()}
                    validate={getArbeidIPeriodeTimerPerUkeISnittValidator(
                        intl,
                        intlValues,
                        normalarbeidstid.timerPerUkeISnitt,
                        arbeidsuke,
                        frilans ? frilansVervValideringString : undefined
                    )}
                    data-testid="timer-verdi"
                    width="xs"
                    maxLength={4}
                />
            )}
        </FormBlock>
    );
};

export default ArbeidstidInput;
