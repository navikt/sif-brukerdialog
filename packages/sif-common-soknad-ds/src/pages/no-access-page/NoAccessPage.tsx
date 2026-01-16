import { Box, Link } from '@navikt/ds-react';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';

import SoknadHeader from '../../components/soknad-header/SoknadHeader';
import { useSoknadIntl } from '../../hooks/useSoknadIntl';
import { SoknadText } from '../../i18n/soknad.messages';

interface Props {
    papirskjemaUrl?: string;
    kontaktOssUrl?: string;
}
const IkkeTilgangPage = ({ papirskjemaUrl, kontaktOssUrl = 'https://www.nav.no/kontaktoss' }: Props) => {
    const { text } = useSoknadIntl();
    return (
        <Page
            className="ikkeTilgangPage"
            title={text('application.title')}
            topContentRenderer={() => <SoknadHeader title={text('application.title')} />}>
            <Box marginBlock="10">
                <SifGuidePanel poster={true}>
                    {papirskjemaUrl ? (
                        <>
                            <p>
                                <SoknadText id="@soknad.page.noAccessPage.tekst" />
                            </p>
                            {papirskjemaUrl && (
                                <Link href={papirskjemaUrl} target="_blank">
                                    <SoknadText id="@soknad.page.noAccessPage.lastNed" />
                                </Link>
                            )}
                        </>
                    ) : (
                        <p>
                            <SoknadText
                                id="@soknad.page.noAccessPage.kontaktoss"
                                values={{
                                    lenke: (content: React.ReactNode) => <Link href={kontaktOssUrl}>{content}</Link>,
                                }}
                            />
                        </p>
                    )}
                </SifGuidePanel>
            </Box>
        </Page>
    );
};

export default IkkeTilgangPage;
