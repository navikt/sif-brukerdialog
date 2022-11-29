import { Alert, BodyLong, Button, Heading } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { SIFCommonPageKey, useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import FormattedHtmlMessage from '@navikt/sif-common-core-ds/lib/components/formatted-html-message/FormattedHtmlMessage';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import {
    getTypedFormComponents,
    UnansweredQuestionsInfo,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds/lib';
import intlFormErrorHandler from '@navikt/sif-common-formik-ds/lib/validation/intlFormErrorHandler';
import { StepId } from '../../types/StepId';
import { getSøknadStepRoute } from '../../utils/søknadRoutesUtils';
import FormBlock from '@navikt/sif-common-core-ds/lib/components/form-block/FormBlock';
import { useNavigate } from 'react-router-dom';

enum PageFormField {
    'harKroniskSyktBarn' = 'harKroniskSyktBarn',
}

interface PageFormValues {
    [PageFormField.harKroniskSyktBarn]: YesOrNo;
}

const PageForm = getTypedFormComponents<PageFormField, PageFormValues, ValidationError>();

const IntroPage = () => {
    const intl = useIntl();
    const initialValues = {};
    useLogSidevisning(SIFCommonPageKey.intro);
    const navigate = useNavigate();
    return (
        <Page title="Introside">
            <Heading level="1" size="large" spacing={true}>
                <FormattedMessage id="introPage.stegTittel" />
            </Heading>
            <Block margin="xl">
                <SifGuidePanel>
                    <BodyLong>
                        <p style={{ marginTop: 0 }}>
                            <FormattedHtmlMessage id="introPage.intro.1.html" />
                        </p>
                        <p>
                            <FormattedHtmlMessage id="introPage.intro.1.2" />
                        </p>
                        <div>
                            <FormattedMessage id="introPage.intro.2" />
                            <ul className="infoList">
                                <li>
                                    <FormattedMessage id="introPage.intro.2.1" />
                                </li>
                                <li>
                                    <FormattedMessage id="introPage.intro.2.2" />
                                </li>
                                <li>
                                    <FormattedMessage id="introPage.intro.2.3" />
                                </li>
                            </ul>
                        </div>
                    </BodyLong>
                </SifGuidePanel>
                <FormBlock>
                    <PageForm.FormikWrapper
                        onSubmit={() => null}
                        initialValues={initialValues}
                        renderForm={({ values }) => {
                            const showNotAllQuestionsAnsweredMessage = values.harKroniskSyktBarn === undefined;
                            return (
                                <PageForm.Form
                                    includeButtons={false}
                                    formErrorHandler={intlFormErrorHandler(intl, 'introForm')}
                                    noButtonsContentRenderer={
                                        showNotAllQuestionsAnsweredMessage
                                            ? () => (
                                                  <UnansweredQuestionsInfo>
                                                      <FormattedMessage id="page.form.ubesvarteSpørsmålInfo" />
                                                  </UnansweredQuestionsInfo>
                                              )
                                            : undefined
                                    }>
                                    <PageForm.YesOrNoQuestion
                                        name={PageFormField.harKroniskSyktBarn}
                                        legend={intlHelper(intl, 'introPage.spm.kroniskEllerFunksjonshemmende')}
                                    />
                                    {values[PageFormField.harKroniskSyktBarn] === YesOrNo.NO && (
                                        <Block margin="xl">
                                            <Alert variant="info">
                                                <p
                                                    data-cy="harIkkeKroniskSyktBarn"
                                                    style={{ marginTop: 0, marginBottom: 0 }}>
                                                    <FormattedHtmlMessage id="introPage.info.harIkkeKroniskSyktBarn.html" />
                                                </p>
                                            </Alert>
                                        </Block>
                                    )}
                                    {values[PageFormField.harKroniskSyktBarn] === YesOrNo.YES && (
                                        <Block margin="xl" textAlignCenter={true}>
                                            <Button
                                                variant="primary"
                                                type="button"
                                                onClick={() => {
                                                    navigate(getSøknadStepRoute(StepId.VELKOMMEN));
                                                }}>
                                                <FormattedMessage id="introPage.tilSøknad.lenketekst" />
                                            </Button>
                                        </Block>
                                    )}
                                </PageForm.Form>
                            );
                        }}
                    />
                </FormBlock>
            </Block>
        </Page>
    );
};

export default IntroPage;
