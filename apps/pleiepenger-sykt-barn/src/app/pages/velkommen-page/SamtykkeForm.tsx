import { Button, Heading, Link } from '@navikt/ds-react';
import { useAppIntl } from '@i18n/index';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import bemHelper from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/src/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/src/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/src/validation/types';
import getLenker from '../../lenker';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import InfoList from './components/info-list/InfoList';
import { AppText } from '../../i18n';

interface Props {
    onConfirm: () => void;
}

const AppForm = getTypedFormComponents<SøknadFormField, SøknadFormValues, ValidationError>();

const bem = bemHelper('welcomingPage');

const SamtykkeForm = ({ onConfirm }: Props) => {
    const { intl, text } = useAppIntl();
    return (
        <AppForm.Form
            onValidSubmit={onConfirm}
            includeButtons={false}
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
            <FormBlock>
                <div data-testid={'welcomingPage-harForståttRettigheterOgPlikter'}>
                    <AppForm.ConfirmationCheckbox
                        label={text('page.velkommen.form.bekreftLabel')}
                        name={SøknadFormField.harForståttRettigheterOgPlikter}
                        validate={getCheckedValidator()}>
                        <Heading level="2" size="small" spacing={true}>
                            <AppText id="page.velkommen.form.ansvar.tittel" />
                        </Heading>

                        <InfoList>
                            <li>
                                <AppText id="page.velkommen.form.ansvar.list.1" />
                            </li>
                            <li>
                                <AppText
                                    id="page.velkommen.form.ansvar.list.2"
                                    values={{
                                        Lenke: (children) => (
                                            <Link href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                                                {children}
                                            </Link>
                                        ),
                                    }}
                                />
                            </li>
                        </InfoList>
                    </AppForm.ConfirmationCheckbox>
                </div>
            </FormBlock>
            <FormBlock>
                <div data-testid={'welcomingPage-begynnsøknad'}>
                    <Button variant="primary" type="submit" className={bem.element('startApplicationButton')}>
                        {text('page.velkommen.startSøknad')}
                    </Button>
                </div>
            </FormBlock>
        </AppForm.Form>
    );
};
export default SamtykkeForm;
