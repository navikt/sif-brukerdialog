import type { NextPage } from 'next';
import { Box, Heading } from '@navikt/ds-react';

const NotFound: NextPage = () => {
    return (
        <main className="navds-pageblock navds-pageblock--xl navds-pageblock--gutters">
            <Box padding="20">
                <div>
                    <Heading level="1" size="xlarge" spacing={true}>
                        Ikke tilgang
                    </Heading>
                </div>
            </Box>
        </main>
    );
};

export default NotFound;
