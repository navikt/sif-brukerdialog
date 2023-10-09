import React from 'react';
import { useIntl } from 'react-intl';

export const useFeatureToggleIntl = () => {
  const intl = useIntl();

  const formatMessage = (id: string, values?: Record<string, unknown>) => {
    //@ts-ignore
    return intl.formatMessage({ id: id }, values);
  };
  const formatElement = (
    id: string,
    values?:
      | Record<string, string | number | boolean | {} | Date | React.ReactElement<any, any> | undefined>
      | undefined
    // @ts-ignore
  ) => intl.formatMessage({ id: id }, values);
  return { formatMessage, formatElement };
};
