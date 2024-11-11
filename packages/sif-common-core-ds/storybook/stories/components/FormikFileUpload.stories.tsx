import { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { http, HttpResponse } from 'msw';
import { v4 as uuidv4 } from 'uuid';
import FormikFileUpload from '../../../src/components/formik-file-upload/FormikFileUpload';
import StoryWrapper from '../../decorators/StoryWrapper';
import { withFormikWrapper } from '../../decorators/withFormikWrapper';

const meta: Meta<typeof FormikFileUpload> = {
    component: FormikFileUpload,
    title: 'Component/FormikFileUpload',
    decorators: [
        withFormikWrapper,
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
    render: () => <FormikFileUpload fieldName="abc" />,
    parameters: {
        msw: {
            handlers: [
                http.post(
                    'http://localhost:6006/familie/sykdom-i-familien/soknad/omsorgspenger/api/k9-brukerdialog/vedlegg',
                    async () => {
                        await delay(500);
                        return HttpResponse.json({}, { headers: { location: `vedlegg/${uuidv4()}` } });
                    },
                ),
            ],
        },
    },
};
