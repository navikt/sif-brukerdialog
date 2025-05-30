import { ReactElement } from 'react';
import { IntlShape, useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { Duration, durationToDecimalDuration, ensureDuration } from '@navikt/sif-common-utils';
import { durationTextMessages_nb } from './i18n/nb';

interface DurationTextProps {
    duration: Partial<Duration>;
    fullText?: boolean;
    hideEmptyValues?: boolean;
    type?: 'digital' | 'decimal' | 'standard';
}

type durationTextKeys = keyof typeof durationTextMessages_nb;

const getHoursString = (intl: IntlShape, hours: string, fullText?: boolean): string => {
    const key: durationTextKeys = fullText ? '@ui.durationText.full.hours' : '@ui.durationText.hours';
    return intlHelper(intl, key, { hours });
};
const getMinutesString = (intl: IntlShape, minutes: string, fullText?: boolean): string => {
    const key: durationTextKeys = fullText ? '@ui.durationText.full.minutes' : '@ui.durationText.minutes';
    return intlHelper(intl, key, { minutes });
};

export const getDurationString = (
    intl: IntlShape,
    { duration, fullText, hideEmptyValues, type = 'standard' }: DurationTextProps,
): string => {
    if (type === 'decimal') {
        const time = durationToDecimalDuration(ensureDuration(duration));
        const key: durationTextKeys = fullText ? '@ui.durationText.full.decimal' : '@ui.durationText.decimal';
        return intlHelper(intl, key, {
            time: intl.formatNumber(time, { maximumFractionDigits: 2 }),
        });
    }

    const hours = duration.hours || '0';
    const minutes = duration.minutes || '0';

    if (type === 'digital') {
        const key: durationTextKeys = fullText ? '@ui.durationText.full.digital' : '@ui.durationText.digital';
        return intlHelper(intl, key, {
            hours: hours.padStart(2, '0'),
            minutes: minutes.padStart(2, '0'),
        });
    }

    if (hideEmptyValues && (hours === '0' || minutes === '0')) {
        if (hours !== '0') {
            return getHoursString(intl, hours, fullText);
        }
        if (minutes !== '0') {
            return getMinutesString(intl, minutes, fullText);
        }
    }

    /** Hours and minutes */
    const key: durationTextKeys = fullText
        ? '@ui.durationText.full.hoursAndMinutes'
        : '@ui.durationText.hoursAndMinutes';
    return intlHelper(intl, key, { hours, minutes });
};

const DurationText = (props: DurationTextProps): ReactElement => {
    const { duration, hideEmptyValues = false, type, fullText } = props;

    const hours = duration.hours || '0';
    const minutes = duration.minutes || '0';
    const intl = useIntl();

    if (type === 'decimal' || type === 'digital') {
        return <>{getDurationString(intl, props)}</>;
    }

    const hoursString = getHoursString(intl, hours, fullText);
    const minutesString = getMinutesString(intl, minutes, fullText);

    const showHours = hideEmptyValues ? hours !== '0' || minutes === '0' : true;
    const showMinutes = hideEmptyValues ? minutes !== '0' || hours === '0' : true;
    return (
        <span>
            {showHours && <span style={{ whiteSpace: 'nowrap' }}>{hoursString}</span>}
            {` `}
            {showMinutes && <span style={{ whiteSpace: 'nowrap' }}>{minutesString}</span>}
        </span>
    );
};

export default DurationText;
