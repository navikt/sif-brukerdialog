import { BodyLong, Box, GuidePanel, Heading, Link, VStack } from '@navikt/ds-react';
import { ApplicationPage } from '@sif/soknad-ui';
import { useAppIntl } from '../i18n';
import { Søker } from '@sif/api/k9-prosessering';
import { TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import { Todo } from '../components/Todo';
interface Props {
    søker: Søker;
    tilgjengelig: TilgjengeligSøknadResponse;
}

export const KanIkkeSøkePage = ({ søker, tilgjengelig }: Props) => {
    const { text } = useAppIntl();
    const { harInnsyn, harUbehandletSøknad } = tilgjengelig;

    const renderContent = () => {
        if (harUbehandletSøknad && !harInnsyn) {
            return (
                <VStack gap="space-20">
                    <Todo>[harUbehandletSøknad && !harInnsyn]</Todo>
                    <BodyLong>
                        Vi har mottatt din søknad og den er under behandling. Du trenger ikke sende inn ny søknad.
                    </BodyLong>
                    <BodyLong>Du vil høre fra oss ...</BodyLong>
                </VStack>
            );
        } else if (!harUbehandletSøknad && harInnsyn) {
            return (
                <VStack gap="space-20">
                    <Todo>[!harUbehandletSøknad && harInnsyn]</Todo>
                    <BodyLong>Når du har fått innvilget aktivitetspenger trenger du ikke søke på nytt før ...</BodyLong>
                    <BodyLong>
                        Gå til <Link href="/innsyn">Dine aktivitetspenger</Link> for mer informasjon.
                    </BodyLong>
                </VStack>
            );
        }
        return null;
    };
    return (
        <ApplicationPage applicationTitle={text('application.title')} headerLevel="1">
            <VStack gap="space-32">
                <GuidePanel poster={true}>
                    <Box paddingBlock="space-8 space-0">
                        <Heading level="2" size="medium" spacing={true}>
                            Hei {søker.fornavn}
                        </Heading>
                        {renderContent()}
                    </Box>
                </GuidePanel>
            </VStack>
        </ApplicationPage>
    );
};
