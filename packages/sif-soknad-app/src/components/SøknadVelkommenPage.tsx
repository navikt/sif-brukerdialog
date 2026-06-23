import { StartPage } from '@sif/soknad-ui/pages';
import { PropsWithChildren, ReactNode } from 'react';

import { useStartSøknad } from '../hooks/useStartSøknad';

interface SøknadVelkommenPageProps {
    title: string;
    guide: {
        navn: string;
        content: ReactNode;
    };
    isPending?: boolean;
}

export const SøknadVelkommenPage = ({
    title,
    guide,
    isPending = false,
    children,
}: PropsWithChildren<SøknadVelkommenPageProps>) => {
    const { startSøknad } = useStartSøknad();

    return (
        <StartPage
            title={title}
            guide={guide}
            isPending={isPending}
            onStart={async (harForståttRettigheterOgPlikter) => {
                await startSøknad({ harForståttRettigheterOgPlikter });
            }}>
            {children}
        </StartPage>
    );
};
