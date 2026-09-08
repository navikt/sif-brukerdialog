import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import { InnsynInfoBox } from '@sif/ung-innsyn/components';
import React from 'react';
import { AppText } from '../../i18n';
import getLenker from '../../lenker';

interface Props {
    erFørstegangssøknad?: boolean;
}

export const SøknadMottattInfo = ({ erFørstegangssøknad }: Props) => (
    <InnsynInfoBox>
        <VStack gap="space-16">
            <Heading level="2" size="small">
                <AppText id="soknadMottattInfo.tittel" />
            </Heading>
            <BodyLong>
                <AppText
                    id="soknadMottattInfo.info.1"
                    values={{
                        Lenke: (chunks: React.ReactNode) => <Link href={getLenker().behandlingstider}>{chunks}</Link>,
                    }}
                />
            </BodyLong>
            {erFørstegangssøknad && (
                <BodyLong>
                    <AppText
                        id="soknadMottattInfo.info.2"
                        values={{
                            Lenke: (chunks: React.ReactNode) => (
                                <Link href={getLenker().aktivitetspenger}>{chunks}</Link>
                            ),
                        }}
                    />
                </BodyLong>
            )}
        </VStack>
    </InnsynInfoBox>
);
