import { Meta, StoryObj } from '@storybook/react';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withPageWidth } from '../../../storybook/decorators/withPageWidth';
import SoknadErrorMessages from './SoknadErrorMessages';

const meta: Meta<typeof SoknadErrorMessages> = {
    title: 'Component/SoknadErrorMessages',
    decorators: [withIntl, withPageWidth],
};

export default meta;

type Story = StoryObj<typeof SoknadErrorMessages>;

export const Default: Story = {
    name: 'ApplicationUnavailable',
    render: () => <SoknadErrorMessages.ApplicationUnavailable />,
};
export const GeneralApplicationError: Story = {
    name: 'GeneralApplicationError',
    render: () => <SoknadErrorMessages.GeneralApplicationError />,
};
export const GeneralSoknadError: Story = {
    name: 'GeneralSoknadError',
    render: () => <SoknadErrorMessages.GeneralSoknadError />,
};
export const MissingApiDataError: Story = {
    name: 'MissingApiDataError',
    render: () => <SoknadErrorMessages.MissingApiDataError />,
};
export const MissingSoknadDataError: Story = {
    name: 'MissingSoknadDataError',
    render: () => <SoknadErrorMessages.MissingSoknadDataError />,
};
export const UnknownRoute: Story = {
    name: 'UnknownRoute',
    render: () => <SoknadErrorMessages.UnknownRoute />,
};
