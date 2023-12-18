import { Heading } from '@navikt/ds-react';
import * as React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import './validationErrorList.scss';

interface ValidationErrorInfo {
    info: string;
    example?: string;
}

export type ValidationErrors = {
    [key: string]: ValidationErrorInfo;
};

interface Props {
    errors: ValidationErrors;
    title: string;
}

const ValidationErrorList = ({ errors, title }: Props) => {
    return (
        <Block margin="xl">
            {title && (
                <Heading level="4" size="small">
                    {title}
                </Heading>
            )}
            <Block margin="m">
                <table className="validationErrorList">
                    <thead>
                        <tr>
                            <th>Feil</th>
                            <th>Beskrivelse</th>
                            <th>Eksempel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(errors).map((key) => {
                            return (
                                <tr key={key}>
                                    <th>
                                        <code>{key}</code>
                                    </th>
                                    <td key="info">{errors[key].info}</td>
                                    <td key="example">{errors[key].example}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Block>
        </Block>
    );
};

export default ValidationErrorList;
