import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    id: string;
    value?: Record<string, string | number | boolean | null | undefined | Date | React.ReactElement<any>>;
}

const basicHtmlTagRenderers = {
    li: (value: string | React.ReactNode) => <li>{value}</li>,
    strong: (value: string | React.ReactNode) => <strong>{value}</strong>,
    p: (value: string | React.ReactNode) => <p>{value}</p>,
    em: (value: string | React.ReactNode) => <em>{value}</em>,
};

const FormattedHtmlMessage = ({ id, value }: Props) => (
    <FormattedMessage id={id} values={{ ...value, ...basicHtmlTagRenderers }} />
);

export default FormattedHtmlMessage;
