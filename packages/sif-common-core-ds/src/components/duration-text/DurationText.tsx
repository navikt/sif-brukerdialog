import { IntlShape, useIntl } from 'react-intl';
import { Duration, durationToDecimalDuration, ensureDuration } from '@navikt/sif-common-utils';
import intlHelper from '../../utils/intlUtils';

interface DurationTextProps {
    duration: Partial<Duration>;
    fullText?: boolean;
    hideEmptyValues?: boolean;
    type?: 'digital' | 'decimal' | 'standard';
}

const getHoursString = (intl: IntlShape, hours: string, fullText?: boolean): string => {
    return intlHelper(intl, `durationText${fullText ? '.full' : ''}.hours`, { hours });
};
const getMinutesString = (intl: IntlShape, minutes: string, fullText?: boolean): string => {
    return intlHelper(intl, `durationText${fullText ? '.full' : ''}.minutes`, { minutes });
};

export const getDurationString = (
    intl: IntlShape,
    { duration, fullText, hideEmptyValues, type = 'standard' }: DurationTextProps,
): string => {
    const intlKeyPrefix = `durationText${fullText ? '.full' : ''}`;

    if (type === 'decimal') {
        const time = durationToDecimalDuration(ensureDuration(duration));
        return intlHelper(intl, `${intlKeyPrefix}.decimal`, {
            time: intl.formatNumber(time, { maximumFractionDigits: 2 }),
        });
    }

    const hours = duration.hours || '0';
    const minutes = duration.minutes || '0';

    if (type === 'digital') {
        return intlHelper(intl, `${intlKeyPrefix}.digital`, {
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

    return intlHelper(intl, `${intlKeyPrefix}.hoursAndMinutes`, { hours, minutes });
};

const DurationText = (props: DurationTextProps): JSX.Element => {
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
