import { Box, Heading } from '@navikt/ds-react';
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
        <Box marginBlock="space-40 space-0">
            {title && (
                <Heading level="4" size="small">
                    {title}
                </Heading>
            )}
            <Box marginBlock="space-24">
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
            </Box>
        </Box>
    );
};

export default ValidationErrorList;
