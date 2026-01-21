import { ReactNode } from 'react';
import Banner from '../banner/Banner';
import { Box } from '@navikt/ds-react';

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <Box className="min-h-container" background="neutral-moderate">
            <Banner />
            <div className="px-4 md:px-12">
                <main className="max-w-255 mx-auto pb-8">{children}</main>
            </div>
        </Box>
    );
};

export default Container;
