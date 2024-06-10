import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import { ApplicationPictogram } from '../application-pictogram/ApplicationPictogram';
import SamtykkeForm from '../../modules/samtykke-form/SamtykkeForm';
import VelkommenGuide from './VelkommenGuide';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';

interface Props {
    pageTitle: string;
    soknadTitle: string;
    guide: {
        title: string;
        content: React.ReactNode;
    };
    children: React.ReactNode;
    onStartSøknad: () => void;
}

const SoknadVelkommenPage = ({ pageTitle, soknadTitle, onStartSøknad, guide, children }: Props) => {
    return (
        <Page title={pageTitle}>
            <VStack as="main" gap="8">
                <Stack
                    gap="6"
                    direction={{ sm: 'row-reverse', lg: 'row' }}
                    justify={{ sm: 'space-between', lg: 'start' }}
                    wrap={false}>
                    <Show above="sm">
                        <ApplicationPictogram />
                    </Show>
                    <VStack gap="1">
                        <Heading level="1" size="large">
                            {soknadTitle}
                        </Heading>
                    </VStack>
                </Stack>

                <VelkommenGuide title={guide.title}>{guide.content}</VelkommenGuide>

                {children}

                <SamtykkeForm variant="enkel" onValidSubmit={onStartSøknad} />
            </VStack>
        </Page>
    );
};

export default SoknadVelkommenPage;
