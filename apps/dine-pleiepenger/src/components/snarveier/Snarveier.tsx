import { HGrid, Heading, VStack } from '@navikt/ds-react';
import React from 'react';
import { browserEnv } from '../../utils/env';
import { Dialog, File, Task } from '@navikt/ds-icons';
import { PencilWritingIcon } from '@navikt/aksel-icons';
import SnarveiLinkPanel from '../snarvei-link-panel/SnarveiLinkPanel';

interface Props {
    title?: string;
}

const Snarveier: React.FunctionComponent<Props> = ({ title }) => {
    return (
        <VStack gap="4">
            {title ? (
                <Heading level="2" size="medium" className="text-deepblue-800">
                    {title}
                </Heading>
            ) : null}

            <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                <SnarveiLinkPanel
                    href={browserEnv.NEXT_PUBLIC_ENDRINGSDIALOG_URL}
                    icon={<PencilWritingIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                    title={'Meld fra om endringer'}
                    description={<>For endringer i arbeidstid og ferie i din søknad/&shy;pleiepengeperiode.</>}
                />
                <SnarveiLinkPanel
                    href={browserEnv.NEXT_PUBLIC_ETTERSENDELSE_PLEIEPENGER_URL}
                    icon={<File role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                    title={'Ettersend dokumenter'}
                    description={'Ettersendt legeerklæring eller andre dokumenter til din sak.'}
                />
            </HGrid>
            <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                <SnarveiLinkPanel
                    href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS}
                    icon={<Dialog role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                    title="Skriv til oss"
                    description={'Har du spørsmål til saken din eller vil melde fra om annet enn jobb og ferie?'}
                />
                <SnarveiLinkPanel
                    href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_URL}
                    icon={<Task role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                    title="Ny pleiepengesøknad"
                    description={'Ved forlengelser, nye arbeidsforhold eller større endringer i perioden.'}
                />
            </HGrid>
        </VStack>
    );
};

export default Snarveier;
