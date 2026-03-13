import { ApplicationPage } from '@sif/soknad/pages';

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
