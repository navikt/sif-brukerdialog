import React from 'react';
import EmptyPage from '../layout/empty-page/EmptyPage';
import { BodyShort, GuidePanel, Heading } from '@navikt/ds-react';
import { AxiosError } from 'axios';

interface Props {
    error: AxiosError<unknown, any>;
}

const HentBrukerFeilet: React.FunctionComponent<Props> = ({ error }) => (
    <EmptyPage>
        <GuidePanel poster={true}>
            {error.response?.status === 403 ? (
                <>
                    <Heading level="1" size="large" spacing={true}>
                        Ingen tilgang
                    </Heading>
                    <BodyShort>Du har ikke tilgang til denne siden.</BodyShort>
                </>
            ) : (
                <>
                    <Heading level="1" size="large" spacing={true}>
                        Det oppstod en feil
                    </Heading>
                    <BodyShort>
                        Det oppstod en feil da vi hentet opp informasjon om deg. Vennligst prøv igjen litt senere..
                    </BodyShort>
                </>
            )}
        </GuidePanel>
    </EmptyPage>
);

export default HentBrukerFeilet;
