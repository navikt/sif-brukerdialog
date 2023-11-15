import { GuidePanel, Heading } from '@navikt/ds-react';
import EmptyPage from '../components/layout/empty-page/EmptyPage';
import { FormattedMessage } from 'react-intl';

export default function IngenTilgangPage() {
    return (
        <GuidePanel poster={true} className="max-w-2xl mx-auto">
            <Heading level="1" size="large" spacing>
                <FormattedMessage id="page.ikkeTilgang.title" />
            </Heading>
            <FormattedMessage id="page.ikkeTilgang.content" />
        </GuidePanel>
    );
}

IngenTilgangPage.getLayout = (page) => {
    return <EmptyPage>{page}</EmptyPage>;
};
