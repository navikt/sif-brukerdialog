import { Box, Heading, VStack } from '@navikt/ds-react';
import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useFormikContext } from 'formik';
import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import FormikFileUpload from '../../../src/components/formik-file-upload/FormikFileUpload';
import { Vedlegg } from '../../../src/types/Vedlegg';
import StoryWrapper from '../../decorators/StoryWrapper';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';

const meta: Meta<typeof FormikFileUpload> = {
    component: FormikFileUpload,
    title: 'Component/FormikFileUpload',
    decorators: [
        (Story) =>
            withFormikWrapper(Story, {
                parameters: {
                    formik: {
                        initialValues: {
                            vedlegg: exampleFiles,
                        },
                    },
                },
            }),
        (Story) => (
            <StoryWrapper>
                <Story />
            </StoryWrapper>
        ),
    ],
};

export default meta;

type Story = StoryObj<typeof FormikFileUpload>;

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Example = () => {
    const { values } = useFormikContext<any>();
    return (
        <VStack gap="6">
            <FormikFileUpload fieldName="vedlegg" label="Last opp dokumenter" useDefaultDescription={true} />
            <Box>
                <Heading level="2" size="xsmall">
                    FormikValues
                </Heading>
                <pre style={{ fontSize: '.8rem' }}>{JSON.stringify(values, null, 2)}</pre>
            </Box>
        </VStack>
    );
};

export const Default: Story = {
    render: () => {
        return <Example />;
    },
    parameters: {
        msw: {
            handlers: [
                http.post(
                    'http://localhost:6006/familie/sykdom-i-familien/soknad/omsorgspenger/api/k9-brukerdialog/vedlegg',
                    async () => {
                        await delay(1000);
                        return HttpResponse.json({}, { headers: { location: `vedlegg/${uuidv4()}` } });
                    },
                ),
                http.delete(
                    'http://localhost:6006/familie/sykdom-i-familien/soknad/omsorgspenger/api/k9-brukerdialog/vedlegg/*',
                    async () => {
                        await delay(20);
                        return HttpResponse.json({});
                    },
                ),
            ],
        },
    },
};

const filePdf = new File(['abc'.repeat(100000)], 'document.pdf');
const fileJpg = new File(['abc'.repeat(500000)], 'document.doc');
const exampleFiles: Vedlegg[] = [
    { file: filePdf, error: false, pending: false, uploaded: true },
    { file: fileJpg, error: true, reasons: ['fileType'], uploaded: false, pending: false },
];
