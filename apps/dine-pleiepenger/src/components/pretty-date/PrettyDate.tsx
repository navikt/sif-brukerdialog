import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

require('dayjs/locale/nb');

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

type FormatType = 'date' | 'dateAndTime' | 'dayDateAndTime' | 'dayDateAndTimeShort' | 'dateShort';

interface Props {
    date: string | Date;
    format?: FormatType;
    useNorwegianTime?: boolean;
}

const getFormatString = (format: FormatType): string => {
    switch (format) {
        case 'date':
            return 'D. MMMM YYYY';
        case 'dateShort':
            return 'DD.MM.YYYY';
        case 'dateAndTime':
            return 'D. MMMM YYYY, [kl.] HH:mm';
        case 'dayDateAndTime':
            return 'dddd D. MMMM YYYY, [kl.] HH:mm';
        case 'dayDateAndTimeShort':
            return 'DD.MM.YYYY, [kl.] HH:mm';
    }
};

export const getPrettyDate = (date: Date | string, format: FormatType = 'date'): string => {
    return dayjs(date).format(getFormatString(format));
};

export const getPrettyDateNorwegianTime = (date: Date | string, format: FormatType = 'date'): string => {
    return dayjs(date).tz('Europe/Oslo').format(getFormatString(format));
};

const PrettyDate = ({ date, format = 'date', useNorwegianTime }: Props) => (
    <span>{useNorwegianTime ? getPrettyDate(date, format) : getPrettyDateNorwegianTime(date, format)}</span>
);

export default PrettyDate;
