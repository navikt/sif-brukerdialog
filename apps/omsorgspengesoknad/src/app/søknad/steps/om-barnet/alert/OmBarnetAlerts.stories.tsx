import { StoryFn } from '@storybook/react';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import { VStack } from '@navikt/ds-react';
import IkkeSammeAdresseAlert from './IkkeSammeAdresseAlert';
import IkkeHøyereRisikoForFraværAlert from './IkkeHøyereRisikoForFraværAlert';
import IkkeKroniskEllerFunksjonshemningAlert from './IkkeKroniskEllerFuksjonshemningAlert';
import TrengerIkkeSøkeForBarnAlert from './TrengerIkkeSøkeForBarnAlert';
import AlertStoryWrapper from '../../../../../storybook/components/AlertStoryWrapper';

export default {
    title: 'Steg/OmBarnet/Alerts',
    decorators: [withIntl],
};

const Template: StoryFn = () => {
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
        </VStack>
    );
};

export const Default = Template.bind({});
