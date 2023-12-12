import { IntlShape } from 'react-intl';

export const intlHelper = (
    intl: IntlShape,
    id: string,
    value?: Record<string, string | number | boolean | null | undefined | Date>,
): string => intl.formatMessage({ id }, value);
