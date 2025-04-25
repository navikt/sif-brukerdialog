import type { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withVeilederContext } from '../../../storybook/decorators/withVeilederContext';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import ApiErrorInfo from './ApiErrorInfo';
import { withDarkBg } from '../../../storybook/decorators/withDarkBg';
import { ApiError, ApiErrorType } from '@navikt/ung-common';
import { AxiosError } from 'axios';

const meta: Meta<typeof ApiErrorInfo> = {
    component: ApiErrorInfo,
    title: 'Components/ApiErrorInfo',
    parameters: {},
    decorators: [withPageWidth, withDarkBg, withIntl, withVeilederContext],
};
export default meta;

type Story = StoryObj<typeof ApiErrorInfo>;

const axiosError: AxiosError = {
    name: 'AxiosError',
    message: 'Request failed with status code 500',
    code: '500',
    request: {},
    response: {
        data: { message: 'Internal Server Error' },
        status: 500,
        statusText: 'Internal Server Error',
        headers: {},
        config: {} as any,
    },
    isAxiosError: true,
    toJSON: () => ({}),
};

const error: ApiError = {
    message: 'Feilmelding',
    type: ApiErrorType.NetworkError,
    originalError: axiosError,
    context: 'Context',
};

export const Default: Story = {
    render: () => <ApiErrorInfo apiError={error} />,
};
