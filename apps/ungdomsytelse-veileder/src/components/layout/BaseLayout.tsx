import { BodyShort, Page } from '@navikt/ds-react';

interface Props {
    children?: React.ReactNode;
}

const BaseLayout = ({ children }: Props) => (
    <Page>
        <header className="bg-limegreen-500 text-white p-3 pl-8 pr-8 ">
            <BodyShort size="large">Veilder - Ungdomsytelse</BodyShort>
        </header>
        <main className="pt-4">{children}</main>
    </Page>
);

export default BaseLayout;
