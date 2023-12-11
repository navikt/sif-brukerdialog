'use client';
import { BodyShort, Box, Heading, Link } from '@navikt/ds-react';
import React from 'react';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import { browserEnv } from '../../utils/env';

interface Props {
    frist?: Date;
}

const Svarfrist: React.FunctionComponent<Props> = ({ frist }) => {
    return (
        <Box>
            <Heading size="medium" level="2" className="text-deepblue-800" spacing={true}>
                Saksbehandlingstid
            </Heading>
            <BodyShort as="div" className="bg-deepblue-100 pt-4 pl-6 pr-6 pb-6 rounded">
                {frist ? (
                    <p className="mb-2">
                        Du kan forvente svar innen: <br />
                        <span className="block font-bold first-letter:uppercase">
                            {dateFormatter.dayDateMonthYear(frist)}
                        </span>
                    </p>
                ) : (
                    <p className="mb-2">Forventet behandlingstid er 6 uker fra vi fikk søknaden din.</p>
                )}

                <Link variant="neutral" href={browserEnv.NEXT_PUBLIC_SAKBEHANDLINGSTID_INFO_URL}>
                    Les mer om saksbehandlingstid
                </Link>
            </BodyShort>
        </Box>
    );
};

export default Svarfrist;
