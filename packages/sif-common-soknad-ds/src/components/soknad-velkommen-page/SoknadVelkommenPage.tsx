import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';
import SamtykkeForm from '../../modules/samtykke-form/SamtykkeForm';
import { ApplicationPictogram } from '../application-pictogram/ApplicationPictogram';
import SoknadVelkommenGuide from './SoknadVelkommenGuide';

interface Props {
    title: string;
    guide: {
        navn: string;
        content: React.ReactNode;
    };
    children: React.ReactNode;
    onStartSøknad: () => void;
}

const SoknadVelkommenPage = ({ title, onStartSøknad, guide, children }: Props) => {
    const { text } = useSoknadIntl();
    return (
        <Page title={title}>
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
                            {title}
                        </Heading>
                    </VStack>
                </Stack>

                <SoknadVelkommenGuide title={text('scs.velkommenGuide.tittel', { navn: guide.navn })}>
                    {guide.content}
                </SoknadVelkommenGuide>

                <div>{children}</div>

                <SamtykkeForm variant="vanlig" onValidSubmit={onStartSøknad} />
            </VStack>
        </Page>
    );
};

export default SoknadVelkommenPage;
