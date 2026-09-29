import { VStack } from '@navikt/ds-react';
import MessagesList from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';
import { StoryFn } from '@storybook/react-vite';

import AlertStoryWrapper from '../../../../../storybook/components/AlertStoryWrapper';
import ShadowBox from '../../../../../storybook/components/ShadowBox';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { storybookIntlUtils } from '../../../../../storybook/utils/intlUtils';
import IkkeHøyereRisikoForFraværAlert from './IkkeHøyereRisikoForFraværAlert';
import IkkeKroniskEllerFunksjonshemningAlert from './IkkeKroniskEllerFuksjonshemningAlert';
import IkkeSammeAdresseAlert from './IkkeSammeAdresseAlert';
import VedtakForBarnInfo from './VedtakForBarnInfo';

export default {
    title: 'Steps/OmBarnet/Alerts',
    decorators: [withIntl],
};
const { getScopedIntlKeys } = storybookIntlUtils;
const Template: StoryFn = () => {
    const messages = storybookIntlUtils.getIntlMessagesFromKeys(getScopedIntlKeys('steg.omBarnet.alert.'));
    return (
        <VStack gap="space-32">
            <AlertStoryWrapper title="Ikke høyere risiko for fravær">
                <IkkeHøyereRisikoForFraværAlert />
            </AlertStoryWrapper>
            <AlertStoryWrapper title="Ikke kronisk eller funksjonshemning">
                <IkkeKroniskEllerFunksjonshemningAlert />
            </AlertStoryWrapper>
            <AlertStoryWrapper title="Ikke samme adresse">
                <IkkeSammeAdresseAlert />
            </AlertStoryWrapper>
            <AlertStoryWrapper title="Trenger ikke søke for barn">
                <VedtakForBarnInfo barnetsFornavn="Per" vedtak={{ erTidsbegrenset: false }} />
            </AlertStoryWrapper>
            <ShadowBox>
                <MessagesList messages={messages} />
            </ShadowBox>
        </VStack>
    );
};

export const Default = Template.bind({});
