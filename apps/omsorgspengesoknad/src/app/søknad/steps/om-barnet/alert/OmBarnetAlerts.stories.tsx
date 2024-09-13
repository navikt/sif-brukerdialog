import { StoryFn } from '@storybook/react';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { VStack } from '@navikt/ds-react';
import IkkeSammeAdresseAlert from './IkkeSammeAdresseAlert';
import IkkeHøyereRisikoForFraværAlert from './IkkeHøyereRisikoForFraværAlert';
import IkkeKroniskEllerFunksjonshemningAlert from './IkkeKroniskEllerFuksjonshemningAlert';
import TrengerIkkeSøkeForBarnAlert from './TrengerIkkeSøkeForBarnAlert';
import AlertStoryWrapper from '../../../../../storybook/components/AlertStoryWrapper';
import { storybookIntlUtils } from '../../../../../storybook/utils/intlUtils';
import MessagesList from '@navikt/sif-common-core-ds/src/dev-utils/intl/messages-preview/MessagesList';
import ShadowBox from '../../../../../storybook/components/ShadowBox';

export default {
    title: 'Steps/OmBarnet/Alerts',
    decorators: [withIntl],
};
const { getScopedIntlKeys } = storybookIntlUtils;
const Template: StoryFn = () => {
    const messages = storybookIntlUtils.getIntlMessagesFromKeys(getScopedIntlKeys('steg.omBarnet.alert.'));
    return (
        <VStack gap="8">
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
                <TrengerIkkeSøkeForBarnAlert barnetsFornavn="Per" />
            </AlertStoryWrapper>
            <ShadowBox>
                <MessagesList messages={messages} />
            </ShadowBox>
        </VStack>
    );
};

export const Default = Template.bind({});
