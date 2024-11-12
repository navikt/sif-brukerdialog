import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import FormikFileUpload from '../../../src/components/formik-file-upload/FormikFileUpload';
import StoryWrapper from '../../decorators/StoryWrapper';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';
import { Vedlegg } from '../../../src/components/formik-file-upload/useFileUploader';

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

export const Default: Story = {
    render: () => <FormikFileUpload fieldName="vedlegg" />,
    parameters: {
        msw: {
            handlers: [
                http.post(
                    'http://localhost:6006/familie/sykdom-i-familien/soknad/omsorgspenger/api/k9-brukerdialog/vedlegg',
                    async () => {
                        await delay(1500);
                        return HttpResponse.json({}, { headers: { location: `vedlegg/${uuidv4()}` } });
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
