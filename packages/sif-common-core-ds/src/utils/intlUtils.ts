import { FormatNumberOptions, IntlShape } from 'react-intl';
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
        number: (value: number, options?: FormatNumberOptions) => intl.formatNumber(value, options),
        date: (date: Date, format: IntlDateFormat) => {
            return intl.formatDate(date, intlDateFormats[format]);
        },
        locale: intl.locale,
    };
}

export default intlHelper;
