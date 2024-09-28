import { VStack } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';
import SamtykkeForm from '../../modules/samtykke-form/SamtykkeForm';
import SoknadVelkommenGuide from './SoknadVelkommenGuide';
import VelkommenPageHeader from './VelkommenPageHeader';

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
            <VStack gap="8">
                <VelkommenPageHeader title={title} />

                <SoknadVelkommenGuide title={text('@soknad.velkommenGuide.tittel', { navn: guide.navn })}>
                    {guide.content}
                </SoknadVelkommenGuide>

                <div>{children}</div>

                <SamtykkeForm variant="vanlig" onValidSubmit={onStartSøknad} submitButtonLabel={submitButtonLabel} />
            </VStack>
        </Page>
    );
};

export default SoknadVelkommenPage;
