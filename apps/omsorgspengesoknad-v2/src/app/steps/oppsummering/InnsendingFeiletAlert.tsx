import { List, LocalAlert } from '@navikt/ds-react';
import { InvalidParameterViolation } from '@sif/api';

import { AppText } from '../../i18n';

interface Props {
    invalidParameters: InvalidParameterViolation[];
}

const renderFeilmelding = (invalidParameter: InvalidParameterViolation) => {
    const erBeskrivelseFeil = invalidParameter.parameterName === 'høyereRisikoForFraværBeskrivelse';

    return (
        <>
            {erBeskrivelseFeil ? (
                <List>
                    <List.Item>
                        <AppText id="oppsummeringSteg.innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil" />
                    </List.Item>
                </List>
            ) : (
                <p>
                    <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.1" />
                </p>
            )}
            <p>
                <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.2" />
            </p>
            <p>
                <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.3" />
            </p>
            <p>
                <AppText
                    id="oppsummeringSteg.innsendingFeilet.tekst.generell.4"
                    values={{ Telefon: (value) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span> }}
                />
            </p>
        </>
    );
};

export const InnsendingFeiletAlert = ({ invalidParameters }: Props) => {
    return (
        <LocalAlert status="error">
            <LocalAlert.Header>
                <LocalAlert.Title>
                    <AppText id="oppsummeringSteg.innsendingFeilet.tittel" />
                </LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>{renderFeilmelding(invalidParameters[0])}</LocalAlert.Content>
        </LocalAlert>
    );
};
