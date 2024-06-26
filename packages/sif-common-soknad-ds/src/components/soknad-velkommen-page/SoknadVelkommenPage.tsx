import { Heading, Show, Stack, VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';
import SamtykkeForm from '../../modules/samtykke-form/SamtykkeForm';
import { ApplicationPictogram } from '../application-pictogram/ApplicationPictogram';
import SoknadVelkommenGuide from './SoknadVelkommenGuide';

interface Props {
    /** Tittel på søknad/app */
    title: string;
    /** Intro-guide */
    guide: {
        /** Søkers navn */
        navn: string;
        /** Innhold i guide */
        content: React.ReactNode;
    };
    /** Innhold under guide */
    children: React.ReactNode;
    /** Label på start knapp */
    submitButtonLabel?: string;
    /** Ved gyldig samtykkeform subnmit */
    onStartSøknad: () => void;
}

const SoknadVelkommenPage = ({ title, onStartSøknad, guide, submitButtonLabel, children }: Props) => {
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

                <SamtykkeForm variant="vanlig" onValidSubmit={onStartSøknad} submitButtonLabel={submitButtonLabel} />
            </VStack>
        </Page>
    );
};

export default SoknadVelkommenPage;
