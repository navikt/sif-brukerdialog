'use client';
import { BodyLong, Box, Heading } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import Link from 'next/link';

interface Props {
    frist?: Date;
}

const Svarfrist: React.FunctionComponent<Props> = ({ frist }) => {
    return (
        <Box>
            <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                Saksbehandlingstid
            </Heading>
            <BodyLong as="div" className="bg-deepblue-100 pt-4 pl-6 pr-6 pb-6 rounded">
                {frist ? (
                    <p className="mb-2">
                        Du kan forvente svar innen: <br />
                        <span className="block font-bold first-letter:uppercase">
                            {dateFormatter.dayDateMonthYear(frist)}
                        </span>
                    </p>
                ) : (
                    <p className="mb-2">TODO: Skrive tekst for når vi ikke får noen dato fra backend</p>
                )}
                <>
                    <Link
                        href="https://www.nav.no/saksbehandlingstider"
                        className="text-deepblue-80 decoration-1 underline hover:no-underline">
                        Se saksbehandlingstider
                    </Link>
                </>
            </BodyLong>
        </Box>
    );
};

export default Svarfrist;
