import React from 'react';
import { useIntl } from 'react-intl';

export const useFeatureToggleIntl = () => {
    const intl = useIntl();

    const formatMessage = (id: string, values?: Record<string, unknown>) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return intl.formatMessage({ id: id }, values);
    };
    const formatElement = (
        id: string,
        values?:
            | Record<string, string | number | boolean | object | Date | React.ReactElement<any, any> | undefined>
            | undefined,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
    ) => intl.formatMessage({ id: id }, values);
    return { formatMessage, formatElement };
};
