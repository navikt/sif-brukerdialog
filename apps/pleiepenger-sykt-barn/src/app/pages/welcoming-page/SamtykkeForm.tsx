import { Button, Heading, Link } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import bemHelper from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getTypedFormComponents } from '@navikt/sif-common-formik-ds';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { ValidationError } from '@navikt/sif-common-formik-ds/lib/validation/types';
import getLenker from '../../lenker';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import InfoList from './components/info-list/InfoList';

interface Props {
    onConfirm: () => void;
}

const AppForm = getTypedFormComponents<SøknadFormField, SøknadFormValues, ValidationError>();

const bem = bemHelper('welcomingPage');

const SamtykkeForm = ({ onConfirm }: Props) => {
    const intl = useIntl();
    return (
        <AppForm.Form
            onValidSubmit={onConfirm}
            includeButtons={false}
            formErrorHandler={getIntlFormErrorHandler(intl, 'validation')}>
            <FormBlock>
                <div data-testid={'welcomingPage-harForståttRettigheterOgPlikter'}>
                    <AppForm.ConfirmationCheckbox
                        label={intlHelper(intl, 'page.velkommen.form.bekreftLabel')}
                        name={SøknadFormField.harForståttRettigheterOgPlikter}
                        validate={getCheckedValidator()}>
                        <Heading level="2" size="small" spacing={true}>
                            <FormattedMessage id="page.velkommen.form.ansvar.tittel" />
                        </Heading>

                        <InfoList>
                            <li>
                                <FormattedMessage id="page.velkommen.form.ansvar.list.1" />
                            </li>
                            <li>
                                <FormattedMessage id="page.velkommen.form.ansvar.list.2.1" />{' '}
                                <Link href={getLenker(intl.locale).rettOgPlikt} target="_blank">
                                    <FormattedMessage id="page.velkommen.form.ansvar.list.2.2" />
                                </Link>
                            </li>
                        </InfoList>
                    </AppForm.ConfirmationCheckbox>
                </div>
            </FormBlock>
            <FormBlock>
                <div data-testid={'welcomingPage-begynnsøknad'}>
                    <Button variant="primary" type="submit" className={bem.element('startApplicationButton')}>
                        {intlHelper(intl, 'welcomingPage.begynnsøknad')}
                    </Button>
                </div>
            </FormBlock>
        </AppForm.Form>
    );
};
export default SamtykkeForm;
