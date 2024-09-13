import { Meta, StoryFn } from '@storybook/react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { libMessages } from './index';
import KvitteringPage from '../pages/kvittering/KvitteringPage';
import { withIntl } from '../../storybook/decorators/withIntl';

export default {
    title: 'i18N/Lib tekster',
    decorators: [withIntl],
} as Meta<typeof KvitteringPage>;

const Template: StoryFn = () => (
    <MessagesPreview showExplanation={false} messages={libMessages} showMissingTextSummary={true} />
);
export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
