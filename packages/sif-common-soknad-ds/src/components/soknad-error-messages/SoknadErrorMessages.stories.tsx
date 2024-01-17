import { Meta, StoryObj } from '@storybook/react';
import SoknadErrorMessages from './SoknadErrorMessages';
import { withIntl } from '../../../storybook/decorators/withIntl';
import { withLimitedWidth } from '../../../storybook/decorators/withLimitedWidth';

const meta: Meta<typeof SoknadErrorMessages> = {
    title: 'Component/SoknadErrorMessages',
    decorators: [withIntl, withLimitedWidth],
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
