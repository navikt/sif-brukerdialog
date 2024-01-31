import { IntlShape } from 'react-intl';
import { IntlDateFormat, intlDateFormats } from '@navikt/sif-common-utils/src/intlDateFormats';

const intlHelper = (
    intl: IntlShape,
    id: string,
    value?: Record<string, string | number | boolean | null | undefined | Date>,
): string => intl.formatMessage({ id }, value);

export function typedIntlHelper<Keys extends string>(intl: IntlShape) {
    return {
        text: (id: Keys, values?: any): string => {
            return intl.formatMessage({ id }, values);
        },
        date: (date: Date, format: IntlDateFormat) => {
            return intl.formatDate(date, intlDateFormats[format]);
        },
    };
}

export default intlHelper;
