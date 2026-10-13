import { BodyLong, Box, GlobalAlert } from '@navikt/ds-react';
import { ReactNode } from 'react';

interface Props {
    /** Vises som «Demo – {appTitle}». Uten appTitle vises kun «Demo». */
    appTitle?: string;
    /** Erstatter standardteksten om fiktive data. */
    children?: ReactNode;
}

export const DemoInfoAlert = ({ appTitle, children }: Props) => (
    <Box marginInline="auto" marginBlock="space-24" paddingInline={{ xs: 'space-8', sm: 'space-16' }} maxWidth="704px">
        <GlobalAlert status="announcement" style={{ maxWidth: '100%' }}>
            <GlobalAlert.Header>
                <GlobalAlert.Title>{appTitle ? `Demo – ${appTitle}` : 'Demo'}</GlobalAlert.Title>
            </GlobalAlert.Header>
            <GlobalAlert.Content>
                {children ?? (
                    <BodyLong as="div">
                        All informasjon og data som brukes i denne demoen er fiktive. Ingenting sendes videre til andre
                        systemer.
                    </BodyLong>
                )}
            </GlobalAlert.Content>
        </GlobalAlert>
    </Box>
);
