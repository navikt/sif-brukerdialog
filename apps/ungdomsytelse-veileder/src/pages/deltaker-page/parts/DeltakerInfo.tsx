import { BodyShort, Heading, HGrid, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltaker, formaterNavn } from '@navikt/ung-common';
import dayjs from 'dayjs';
import Fødselsnummer from '../../../atoms/Fødselsnummer';
import InfoBox from '../../../atoms/InfoBox';

interface Props {
    deltaker: Deltaker;
}

const DeltakerInfo = ({ deltaker }: Props) => {
    const alder = dayjs().diff(dayjs(deltaker.fødselsdato), 'year');
    return (
        <VStack gap="4">
            <Heading level="2" size="medium">
                Om Deltaker
            </Heading>
            <InfoBox>
                <HGrid gap="4" columns={{ sm: 1, md: '1fr 1fr' }}>
                    <VStack gap="4">
                        <dl className="ungDefinitionList">
                            <dt>Navn:</dt>
                            <dd>{formaterNavn(deltaker.navn)}</dd>
                            <dt>Fødselsnummer:</dt>
                            <dd>
                                <Fødselsnummer fnr={deltaker.deltakerIdent} copyEnabled={true} />
                            </dd>
                            <dt>Fødselsdato:</dt>
                            <dd>
                                <VStack gap="3">
                                    <span>
                                        {dateFormatter.compact(deltaker.fødselsdato)} ({alder} år)
                                    </span>
                                    {dayjs(deltaker.fødselsdato).isSame(dayjs(), 'day') && (
                                        <BodyShort as="span">🎉 Bursdag i dag 🎉</BodyShort>
                                    )}
                                </VStack>
                            </dd>
                        </dl>
                    </VStack>
                    <VStack gap="2">
                        <Heading size="small" level="3">
                            Metadata om deltaker (kun for test)
                        </Heading>
                        <dl className="ungDefinitionList">
                            <dt>Første mulige innmeldingsdato:</dt>
                            <dd>{dateFormatter.compact(deltaker.førsteMuligeInnmeldingsdato)}</dd>
                            <dt>Siste mulige innmeldingsdato:</dt>
                            <dd>{dateFormatter.compact(deltaker.sisteMuligeInnmeldingsdato)}</dd>
                        </dl>
                    </VStack>
                </HGrid>
            </InfoBox>
        </VStack>
    );
};

export default DeltakerInfo;
