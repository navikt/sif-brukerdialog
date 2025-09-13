import { Box, Tabs, VStack } from '@navikt/ds-react';
import JSONView from 'react-json-view';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { TypedFormikWrapper, YesOrNo } from '@navikt/sif-common-formik-ds';
import { flatten } from 'flat';
import FormValidationErrorMessages from '../../../../storybook/components/validation-error-messages/ValidationErrorMessages';
import MedlemskapForm, { MedlemskapFormErrors, MedlemskapFormValues } from '../form/MedlemskapForm';
import { medlemskapFormMessages } from '../i18n';
import MedlemskapSummary from '../summary/MedlemskapSummary';
import { MedlemskapApiData } from '../types';

const initialValues: MedlemskapFormValues = {
    harBoddUtenforNorgeSiste12Mnd: YesOrNo.UNANSWERED,
    skalBoUtenforNorgeNeste12Mnd: YesOrNo.UNANSWERED,
    utenlandsoppholdSiste12Mnd: [],
    utenlandsoppholdNeste12Mnd: [],
};

const medlemskapApiData: MedlemskapApiData = {
    harBoddIUtlandetSiste12Mnd: true,
    skalBoIUtlandetNeste12Mnd: true,
    utenlandsoppholdSiste12Mnd: [
        {
            fraOgMed: '2021-01-01',
            tilOgMed: '2021-02-01',
            landnavn: 'Sverige',
            landkode: 'SE',
        },
        {
            fraOgMed: '2021-03-01',
            tilOgMed: '2021-04-01',
            landnavn: 'Danmark',
            landkode: 'DK',
        },
    ],
    utenlandsoppholdNeste12Mnd: [
        {
            fraOgMed: '2022-01-01',
            tilOgMed: '2022-02-01',
            landnavn: 'Sverige',
            landkode: 'SE',
        },
    ],
};

const MedlemskapFormExample = () => {
    return (
        <Tabs defaultValue="form">
            <VStack gap="4">
                <Tabs.List>
                    <Tabs.Tab value="form" label="MedlemskapForm" />
                    <Tabs.Tab value="summary" label="MedlemskapSummary" />
                    <Tabs.Tab value="messages" label="Tekster" />
                    <Tabs.Tab value="validationMessages" label="Valideringsmeldinger" />
                    <Tabs.Tab value="apiData" label="ApiData" />
                </Tabs.List>
                <Tabs.Panel value="form" style={{ maxWidth: '50rem' }}>
                    <Box padding="10">
                        <TypedFormikWrapper<MedlemskapFormValues>
                            initialValues={initialValues}
                            onSubmit={() => {}}
                            renderForm={({ values }) => {
                                return <MedlemskapForm isSubmitting={false} medlemskapInfoUrl="sdf" values={values} />;
                            }}
                        />
                    </Box>
                </Tabs.Panel>
                <Tabs.Panel value="summary">
                    <MedlemskapSummary medlemskap={medlemskapApiData} />
                </Tabs.Panel>
                <Tabs.Panel value="messages">
                    <MessagesPreview messages={medlemskapFormMessages} showExplanation={false} />
                </Tabs.Panel>
                <Tabs.Panel value="validationMessages">
                    <FormValidationErrorMessages
                        validationErrorIntlKeys={{
                            ...flatten(MedlemskapFormErrors),
                        }}
                        formName="medlemskapForm"
                        intlMessages={medlemskapFormMessages}
                    />
                </Tabs.Panel>
                <Tabs.Panel value="apiData">
                    <JSONView
                        src={medlemskapApiData}
                        style={{ fontSize: '.8rem', padding: '1rem' }}
                        theme="ashes"
                        displayDataTypes={false}
                        displayObjectSize={false}
                        shouldCollapse={false}
                    />
                </Tabs.Panel>
            </VStack>
        </Tabs>
    );
};

export default MedlemskapFormExample;
