import { IntlShape } from 'react-intl';

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
        html: (id: Keys, values?: any): React.ReactNode => {
            return intl.formatMessage({ id }, values);
        },
    };
}

export default intlHelper;
