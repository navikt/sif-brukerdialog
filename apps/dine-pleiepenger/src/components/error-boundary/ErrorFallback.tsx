import { Box, GuidePanel } from '@navikt/ds-react';
import { ReactElement } from 'react';

const ErrorFallback = (): ReactElement => {
    return (
        <Box padding={{ xs: 'space-16', sm: 'space-24' }}>
            <GuidePanel>
                Beklager! En uventet feil har oppstått. Sannsynligvis jobber vi med saken allerede, men ta kontakt med
                oss hvis det ikke har løst seg til i morgen.
            </GuidePanel>
        </Box>
    );
};

export default ErrorFallback;
