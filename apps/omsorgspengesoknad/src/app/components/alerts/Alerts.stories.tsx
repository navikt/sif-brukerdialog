import { VStack } from '@navikt/ds-react';
import { StoryFn } from '@storybook/react';
import AlertStoryWrapper from '../../../storybook/components/AlertStoryWrapper';
import { withIntl } from '../../../storybook/decorators/withIntl';
import AdvarselSamletDokumentstørrelse from './AdvarselSamletDokumentstørrelse';

export default {
    title: 'Components/Alerts',
    decorators: [withIntl],
};

const Template: StoryFn = () => {
    return (
        <VStack gap="8">
            <AlertStoryWrapper
                title="Samlet størrelse på vedlegg er for stor"
                intlScope="dokumenter.advarsel.totalstørrelse">
                <AdvarselSamletDokumentstørrelse />
            </AlertStoryWrapper>
        </VStack>
    );
};

export const SamletDokumentstørrelse = Template.bind({});
