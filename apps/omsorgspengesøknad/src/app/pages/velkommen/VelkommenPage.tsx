import { Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { getTypedFormComponents, ValidationError } from '@navikt/sif-common-formik-ds/lib';
import { getCheckedValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import getLenker from '../../lenker';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { SøknadRoutes } from '../../types/SøknadRoutes';
import OmSøknaden from './OmSøknaden';
import VelkommenGuide from './VelkommenGuide';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import getIntlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';

export enum VelkommenFormFields {
    harForståttRettigheterOgPlikter = 'harForståttRettigheterOgPlikter',
}

export interface VelkommenFormValues {
    [VelkommenFormFields.harForståttRettigheterOgPlikter]: boolean;
}

const { FormikWrapper, Form, ConfirmationCheckbox } = getTypedFormComponents<
    VelkommenFormFields,
    VelkommenFormValues,
    ValidationError
>();

const VelkommenPage = () => {
    const intl = useIntl();
    const {
        state: { søker },
        dispatch,
    } = useSøknadContext();

    const startSøknad = () => {
        dispatch(actionsCreator.startSøknad());
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.OM_BARNET));
    };
    return (
        <Page title={intlHelper(intl, 'page.velkommen.sidetittel')}>
            <VelkommenGuide navn={søker.fornavn} />

            <OmSøknaden />

            <FormikWrapper
                initialValues={{ harForståttRettigheterOgPlikter: false }}
                onSubmit={startSøknad}
                renderForm={() => (
                    <Form
                        includeButtons={true}
                        submitButtonLabel="Start søknad"
                        formErrorHandler={getIntlFormErrorHandler(intl, 'page.velkommen')}>
                        <FormBlock>
                            <ConfirmationCheckbox
                                label={
                                    <span data-testid="bekreft-label">
                                        {intlHelper(intl, 'page.velkommen.form.bekreftLabel')}
                                    </span>
                                }
                                name={VelkommenFormFields.harForståttRettigheterOgPlikter}
                                validate={getCheckedValidator()}>
                                <Heading level="2" size="small">
                                    <strong>
                                        <FormattedMessage id="page.velkommen.form.ansvar.tittel" />
                                    </strong>
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
                            </ConfirmationCheckbox>
                        </FormBlock>
                    </Form>
                )}
            />
        </Page>
    );
};

export default VelkommenPage;
