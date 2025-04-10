import { Heading, Link, List } from '@navikt/ds-react';
import { getCheckedValidator } from '@navikt/sif-validation';
import { AppText, useAppIntl } from '../../../../../i18n';
import { SøknadFormFields } from '../SøknadForm';
import { søknadFormComponents } from '../TypedSøknadFormComponents';

const RETT_OG_PLIKT_URL = 'https://www.nav.no/endringer#du-har-plikt-til-a-gi-nav-riktige-opplysninger';

const { ConfirmationCheckbox } = søknadFormComponents;

interface Props {
    disabled?: boolean;
}

const SamtykkeSpørsmål = ({ disabled }: Props) => {
    const { text } = useAppIntl();
    return (
        <>
            <ConfirmationCheckbox
                label={text('samtykke.bekreftLabel')}
                name={SøknadFormFields.samtykker}
                validate={getCheckedValidator()}
                disabled={disabled}>
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
                    <List.Item>
                        <AppText id="samtykke.ansvar.list.3" />
                    </List.Item>
                </List>
            </ConfirmationCheckbox>
        </>
    );
};

export default SamtykkeSpørsmål;
