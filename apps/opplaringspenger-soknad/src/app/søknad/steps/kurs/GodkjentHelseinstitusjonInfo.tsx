import { Heading, ReadMore } from '@navikt/ds-react';
import { AppText, useAppIntl } from '../../../i18n';

const GodkjentHelseinstitusjonInfo = () => {
    const { text } = useAppIntl();
    return (
        <ReadMore header={text('steg.kurs.godkjentHelseinstitusjon.label')}>
            <p>
                <AppText id="steg.kurs.godkjentHelseinstitusjon.text.1" />
            </p>
            <p>
                <AppText id="steg.kurs.godkjentHelseinstitusjon.text.2" />
            </p>
            <p>
                <AppText id="steg.kurs.godkjentHelseinstitusjon.text.3" />
            </p>
            <Heading level="3" size="xsmall" as="div">
                <AppText id="steg.kurs.godkjentHelseinstitusjon.text.4" />
            </Heading>
            <p>
                <AppText id="steg.kurs.godkjentHelseinstitusjon.text.5" />
            </p>
        </ReadMore>
    );
};

export default GodkjentHelseinstitusjonInfo;
