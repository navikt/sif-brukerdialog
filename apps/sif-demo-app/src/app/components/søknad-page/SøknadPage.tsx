import { ApplicationPage } from '@rammeverk';

interface Props {
    documentTitle?: string;
    children: React.ReactNode;
}

export function SøknadPage({ documentTitle, children }: Props) {
    return (
        <ApplicationPage documentTitle={documentTitle} applicationTitle="Aktivitetspenger">
            {children}
        </ApplicationPage>
    );
}
