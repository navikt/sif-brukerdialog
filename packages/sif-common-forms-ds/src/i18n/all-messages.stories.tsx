import { StoryFn } from '@storybook/react-vite';
import MessagesPreview from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesPreview';
import { withIntl } from '../../storybook/decorators/withIntl';
import { formsMessages } from './forms.messages';

export default {
    title: 'i18N/Alle tekster',
    decorators: [withIntl],
};

const Template: StoryFn = () => (
    <MessagesPreview showExplanation={false} messages={formsMessages} showMissingTextSummary={true} />
);
export const Default = Template.bind({});

Default.args = {};

Default.parameters = {};
