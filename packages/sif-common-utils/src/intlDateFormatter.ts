import { IntlShape } from 'react-intl';
import { IntlDateFormat, intlDateFormats } from './intlDateFormats';

export function intlDateFormatter(intl: IntlShape, date: Date, format: IntlDateFormat) {
    return intl.formatDate(date, intlDateFormats[format]);
}
