import 'dayjs/locale/nb';
import 'dayjs/locale/nn';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

import { getValidLocale } from '.';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

const compactFormatWithTime = 'DD.MM.YYYY kl. HH.mm';
const OSLO = 'Europe/Oslo';

/** For UTC-timestamps fra backend — konverterer til norsk tid */
const oslo = (date: Date, locale?: string) => dayjs(date).tz(OSLO).locale(getValidLocale(locale));

export const dateTimeFormatter = {
    /**
     * @returns 01.01.2020 kl. 08.29
     * NB: Kun for UTC-timestamps fra backend — konverterer til Europe/Oslo
     */
    compactWithTime: (date: Date, locale?: string) => oslo(date, locale).format(compactFormatWithTime),
};
