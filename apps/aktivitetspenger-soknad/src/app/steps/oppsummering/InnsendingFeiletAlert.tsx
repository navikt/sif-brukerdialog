import { List, LocalAlert, ReadMore } from '@navikt/ds-react';
import { InvalidParameterViolation } from '@sif/api';

import { AppText, useAppIntl } from '@app/i18n';

interface Props {
    invalidParameters: InvalidParameterViolation[];
}

export const InnsendingFeiletAlert = ({ invalidParameters }: Props) => {
    const { text } = useAppIntl();

    return (
        <LocalAlert status="error">
            <LocalAlert.Header>
                <LocalAlert.Title>
                    <AppText id="oppsummeringSteg.innsendingFeilet.tittel" />
                </LocalAlert.Title>
            </LocalAlert.Header>
            <LocalAlert.Content>
                <p>
                    <AppText id="oppsummeringSteg.innsendingFeilet.tekst.generell.1" />
                </p>
                {invalidParameters.length > 0 && (
                    <ReadMore header={text('oppsummeringSteg.innsendingFeilet.merInformasjon.header')}>
                        <List>
                            {invalidParameters.map((invalidParameter) => (
                                <List.Item key={`${invalidParameter.parameterName}-${invalidParameter.reason}`}>
                                    {invalidParameter.reason}
                                </List.Item>
                            ))}
                        </List>
                    </ReadMore>
                )}
                <p>
                    <AppText
                        id="oppsummeringSteg.innsendingFeilet.tekst.generell.2"
                        values={{ Telefon: (value) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span> }}
                    />
                </p>
            </LocalAlert.Content>
        </LocalAlert>
    );
};
