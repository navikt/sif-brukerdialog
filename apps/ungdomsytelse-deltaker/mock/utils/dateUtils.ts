// Feiler pga ts og playwright

import dayjs from 'dayjs';

const ISODateFormat = 'YYYY-MM-DD';
export const dateToISODate = (date: dayjs.ConfigType): string => dayjs(date).format(ISODateFormat);
