import { StoryFn } from '@storybook/react';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { withIntl } from '../../storybook/decorators/withIntl';
import { componentMessages } from './componentMessages';

export default {
    title: 'i18N/Komponent-tekster',
    decorators: [withIntl],
};

const Template: StoryFn = () => (
    <MessagesPreview showExplanation={false} messages={componentMessages} showMissingTextSummary={true} />
);
export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
