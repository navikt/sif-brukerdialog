import { Heading, Link, List } from '@navikt/ds-react';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { AppText, useAppIntl } from '../../../i18n';
import { SøknadFormFields } from './Søknadskjema';
import { søknadFormComponents } from './TypedSøknadFormComponents';

const RETT_OG_PLIKT_URL = 'https://www.nav.no/endringer#du-har-plikt-til-a-gi-nav-riktige-opplysninger';

const { ConfirmationCheckbox } = søknadFormComponents;

const SamtykkeSpørsmål = () => {
    const { text } = useAppIntl();
    return (
        <>
            <ConfirmationCheckbox
                label={text('samtykke.bekreftLabel')}
                name={SøknadFormFields.samtykker}
                validate={getCheckedValidator()}>
                <Heading level="2" size="small" spacing={true}>
                    <AppText id="samtykke.ansvar.tittel" />
                </Heading>
                <List>
                    <List.Item>
                        <AppText id="samtykke.ansvar.list.1" />
                    </List.Item>
                    <List.Item>
                        <AppText
                            id="samtykke.ansvar.list.2"
                            values={{
                                Lenke: (children) => (
                                    <Link key="lenke" href={RETT_OG_PLIKT_URL} target="_blank">
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </List.Item>
                </List>
            </ConfirmationCheckbox>
        </>
    );
};

export default SamtykkeSpørsmål;
