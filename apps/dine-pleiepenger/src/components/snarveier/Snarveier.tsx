import { HGrid, Heading, VStack } from '@navikt/ds-react';
import React from 'react';
import { browserEnv } from '../../utils/env';
import { Dialog, File, Task } from '@navikt/ds-icons';
import { PencilWritingIcon } from '@navikt/aksel-icons';
import SnarveiLinkPanel from '../snarvei-link-panel/SnarveiLinkPanel';
import AriaText from '@navikt/sif-common-core-ds/src/atoms/aria-text/AriaText';
interface Props {
    title?: string;
}

const Snarveier: React.FunctionComponent<Props> = ({ title }) => {
    return (
        <section>
            <AriaText>
                <Heading level="2" size="medium" className="text-deepblue-800" spacing={true}>
                    Trenger du å oppdatere saken din?
                </Heading>
            </AriaText>

            <VStack gap="4">
                {title ? (
                    <Heading level="2" size="medium" className="text-deepblue-800">
                        {title}
                    </Heading>
                ) : null}

                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_ENDRINGSDIALOG_URL}
                        icon={
                            <PencilWritingIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />
                        }
                        title={'Meld fra om endringer'}
                        description={
                            'Her kan du melde fra om endringer i arbeidstid og ferie i perioden du har søkt om pleiepenger.'
                        }
                    />
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_ETTERSENDELSE_PLEIEPENGER_URL}
                        icon={<File role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title={'Ettersend dokumenter'}
                        description={
                            'Her kan du sende inn legeerklæring eller andre dokumenter til saken din om pleiepenger.'
                        }
                    />
                </HGrid>
                <HGrid gap="4" columns={{ sm: 1, md: 2 }}>
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_SKRIV_TIL_OSS}
                        icon={<Dialog role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title="Skriv til oss"
                        description={
                            'Her kan du stille spørsmål eller gi beskjed om endringer i saken din om pleiepenger.'
                        }
                    />
                    <SnarveiLinkPanel
                        href={browserEnv.NEXT_PUBLIC_PLEIEPENGER_URL}
                        icon={<Task role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />}
                        title="Ny pleiepengesøknad"
                        description={'Her kan du søke om forlenget periode med pleiepenger.'}
                    />
                </HGrid>
            </VStack>
        </section>
    );
};

export default Snarveier;
