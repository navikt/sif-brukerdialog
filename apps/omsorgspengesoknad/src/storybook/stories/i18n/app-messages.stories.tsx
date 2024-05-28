import { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import KvitteringPage from '../../../app/pages/kvittering/KvitteringPage';
import { withIntl } from '../../decorators/withIntl';
import { appMessages } from '../../../app/i18n/appMessages';

export default {
    title: 'i18N/App-tekster',
    decorators: [withIntl],
} as Meta<typeof KvitteringPage>;

const Template: StoryFn = () => (
    <MessagesPreview showExplanation={false} messages={appMessages} showMissingTextSummary={true} />
);
export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
