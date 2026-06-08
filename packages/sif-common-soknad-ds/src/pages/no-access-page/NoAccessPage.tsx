import { BodyLong, Box, Heading, Link } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { useIntl } from 'react-intl';

import SoknadHeader from '../../components/soknad-header/SoknadHeader';
import { SoknadText } from '../../i18n/soknad.messages';

interface Props<IntlKeys extends string = string> {
    tittelIntlKey: IntlKeys;
    variant?: 'forenklet' | 'vanlig'; // Forenklet viser bare teksten at en ikke har tilgang
    papirskjemaUrl?: string;
    kontaktOssUrl?: string;
}
const NoAccessPage = <IntlKeys extends string = string>({
    tittelIntlKey,
    variant = 'vanlig',
    papirskjemaUrl,
    kontaktOssUrl = 'https://www.nav.no/kontaktoss',
}: Props<IntlKeys>) => {
    const { formatMessage } = useIntl();
    const tittel = formatMessage({ id: tittelIntlKey });
    const renderContent = () => {
        if (variant === 'forenklet') {
            return (
                <BodyLong>
                    <SoknadText id="@soknad.page.noAccessPage.forenklet" />
                </BodyLong>
            );
        }
        if (papirskjemaUrl) {
            return (
                <>
                    <BodyLong>
                        <SoknadText id="@soknad.page.noAccessPage.tekst" />
                    </BodyLong>
                    <Link href={papirskjemaUrl} target="_blank" rel="noopener noreferrer">
                        <SoknadText id="@soknad.page.noAccessPage.lastNed" />
                    </Link>
                </>
            );
        }
        return (
            <BodyLong>
                <SoknadText
                    id="@soknad.page.noAccessPage.kontaktoss"
                    values={{
                        lenke: (content: React.ReactNode) => <Link href={kontaktOssUrl}>{content}</Link>,
                    }}
                />
            </BodyLong>
        );
    };
    return (
        <Page title={tittel} topContentRenderer={() => <SoknadHeader title={tittel} />}>
            <Box marginBlock="space-40">
                <SifGuidePanel poster={true}>
                    <Box marginBlock="space-16">
                        <Heading level="1" size="large" spacing>
                            <SoknadText id="@soknad.page.noAccessPage.tittel" />
                        </Heading>
                        {renderContent()}
                    </Box>
                </SifGuidePanel>
            </Box>
        </Page>
    );
};

export default NoAccessPage;
