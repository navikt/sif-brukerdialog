import React from 'react';
import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import Head from 'next/head';

interface Props {
    error?: AxiosError<unknown, any>;
}

const HentInnsynsdataFeilet: React.FunctionComponent<Props> = ({ error }) => (
    <GuidePanel poster={true} className="sm:max-w-lg m-auto">
        {error?.response?.status === 403 ? (
            <>
                <Head>
                    <title>Ingen tilgang - Dine pleiepenger</title>
                </Head>
                <Heading level="1" size="large" spacing={true}>
                    Ingen tilgang
                </Heading>
                <BodyShort>Du har ikke tilgang til denne siden.</BodyShort>
            </>
        ) : (
            <>
                <Head>
                    <title>Det oppstod en feil - Dine pleiepenger</title>
                </Head>
                <Heading level="1" size="large" spacing={true}>
                    Det oppstod en feil
                </Heading>
                <BodyShort>
                    Det oppstod en feil da vi hentet opp informasjon om deg. Vennligst prøv igjen litt senere..
                </BodyShort>
            </>
        )}
    </GuidePanel>
);

export default HentInnsynsdataFeilet;
