/* eslint-disable react/display-name */
import React from 'react';
import { FormattedMessage } from 'react-intl';

interface Props {
    id: string;
    value?: Record<string, string | number | boolean | null | undefined | Date>;
}

const basicHtmlTagRenderers = {
    li: (value: string) => <li>{value}</li>,
    strong: (value: string) => <strong>{value}</strong>,
    p: (value: string) => <p>{value}</p>,
    em: (value: string) => <em>{value}</em>,
};

const FormattedHtmlMessage = ({ id, value }: Props) => (
    <FormattedMessage id={id} values={{ ...value, ...basicHtmlTagRenderers }} />
);

export default FormattedHtmlMessage;
