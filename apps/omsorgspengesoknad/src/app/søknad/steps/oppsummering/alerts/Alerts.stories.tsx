import { VStack } from '@navikt/ds-react';
import { StoryFn } from '@storybook/react';
import AlertStoryWrapper from '../../../../../storybook/components/AlertStoryWrapper';
import { withIntl } from '../../../../../storybook/decorators/withIntl';
import InnsendingFeiletAlert from './InnsendingFeiletAlert';

export default {
    title: 'Steps/Oppsummering/Alerts',
    decorators: [withIntl],
};

const Template: StoryFn = () => {
    return (
        <VStack gap="8">
            <AlertStoryWrapper title="Feilmelding når innsending feiler" intlScope="innsendingFeilet.">
                <InnsendingFeiletAlert invalidParameter={[{ parameterName: 'enVerdiSomFeilet' } as any]} />
            </AlertStoryWrapper>
        </VStack>
    );
};

export const SamletDokumentstørrelse = Template.bind({});
