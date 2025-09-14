import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import Head from 'next/head';

interface Props {
    error?: AxiosError<unknown, any>;
}

const HentInnsynsdataFeilet = ({ error }: Props) => {
    const status = error?.response?.status;
    return (
        <GuidePanel poster={true} className="sm:max-w-lg m-auto">
            {status !== undefined && [403, 451].includes(status) ? (
                <>
                    <Head>
                        <title>Ingen tilgang - Dine pleiepenger for sykt barn</title>
                    </Head>
                    <Heading level="1" size="large" spacing={true}>
                        Ingen tilgang
                    </Heading>
                    <BodyShort>Du har ikke tilgang til denne siden.</BodyShort>
                </>
            ) : (
                <>
                    <Head>
                        <title>Det oppstod en feil - Dine pleiepenger for sykt barn</title>
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
};

export default HentInnsynsdataFeilet;
