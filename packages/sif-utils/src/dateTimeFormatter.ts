import 'dayjs/locale/nb';
import 'dayjs/locale/nn';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getValidLocale } from './localeUtils';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('nb');

const compactFormatWithTime = 'DD.MM.YYYY kl. HH.mm';
const OSLO = 'Europe/Oslo';

/** Konverterer Date til norsk tid */
const oslo = (date: Date, locale?: string) => dayjs(date).tz(OSLO).locale(getValidLocale(locale));

export const dateTimeFormatter = {
    /**
     * @returns 01.01.2020 kl. 08.29
     * NB - tiden vises som Europe/Oslo
     */
    compactWithTime: (date: Date, locale?: string) => oslo(date, locale).format(compactFormatWithTime),
};
