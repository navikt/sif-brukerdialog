import { Alert, List } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { InvalidParameter } from '../../../../types/InvalidParameter';
import { AppText } from '../../../../i18n';

interface Props {
    invalidParameter: InvalidParameter[];
}

const isHøyereRisikoForFraværBeskrivelseFeil = (feil: string): boolean =>
    feil.includes('høyereRisikoForFraværBeskrivelse');

const renderFeilmelding = (invalidParameter: InvalidParameter) => {
    const erBeskrivelseFeil = isHøyereRisikoForFraværBeskrivelseFeil(invalidParameter);
    return (
        <>
            {erBeskrivelseFeil ? (
                <List>
                    <List.Item>
                        <AppText id="innsendingFeilet.tekst.høyereRisikoForFraværBeskrivelseFeil" />
                    </List.Item>
                </List>
            ) : (
                <p>
                    <AppText id="innsendingFeilet.tekst.generell.1" />
                </p>
            )}
            <p>
                <AppText id="innsendingFeilet.tekst.generell.2" />
            </p>
            <p>
                <AppText id="innsendingFeilet.tekst.generell.3" />
            </p>
            <p>
                <AppText
                    id="innsendingFeilet.tekst.generell.3"
                    values={{ Telefon: (value) => <span style={{ whiteSpace: 'nowrap' }}>{value}</span> }}
                />
            </p>

            {!erBeskrivelseFeil && (
                <ExpandableInfo title="Detaljert info (teknisk)">
                    <p style={{ wordBreak: 'break-word' }}>{invalidParameter}</p>
                </ExpandableInfo>
            )}
        </>
    );
};

const InnsendingFeiletAlert: React.FunctionComponent<Props> = ({ invalidParameter }) => {
    return (
        <FormBlock>
            <Alert variant="error">
                <p style={{ marginTop: '.2em' }}>
                    <AppText id="innsendingFeilet.tittel" />
                </p>
                {renderFeilmelding(invalidParameter[0])}
            </Alert>
        </FormBlock>
    );
};

export default InnsendingFeiletAlert;
