import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import Fødselsnummer from '../../../atoms/Fødselsnummer';
import InfoBox from '../../../atoms/InfoBox';
import DiskresjonskoderTags from '../../../components/diskresjonskode-tag/DiskresjonskoderTags';
import { Deltaker } from '../../../types/Deltaker';

interface Props {
    skjulHeader?: boolean;
    copyFnrEnabled?: boolean;
    deltaker: Deltaker;
}

const DeltakerInfo = ({ deltaker, skjulHeader, copyFnrEnabled = true }: Props) => {
    const alder = dayjs().diff(dayjs(deltaker.fødselsdato), 'year');
    return (
        <VStack gap="4">
            {!skjulHeader && (
                <Heading level="2" size="medium">
                    Om Deltaker
                </Heading>
            )}
            <InfoBox>
                {/* <HGrid gap="4" columns={{ sm: 1, md: 'auto 1fr' }}> */}
                <VStack gap="4">
                    <dl className="ungDefinitionList">
                        <dt>Navn:</dt>
                        <dd>{formatName(deltaker.navn)}</dd>
                        <dt>Fødselsnummer:</dt>
                        <dd>
                            <Fødselsnummer fnr={deltaker.deltakerIdent} copyEnabled={copyFnrEnabled} />
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
                        {deltaker.diskresjonskoder.length > 0 && (
                            <>
                                <dt>Diskresjonskoder:</dt>
                                <dd>
                                    <DiskresjonskoderTags koder={deltaker.diskresjonskoder} />
                                </dd>
                            </>
                        )}
                    </dl>
                </VStack>
                {/* <VStack gap="2">
                        <Heading size="small" level="3">
                            Metadata om deltaker (kun for test)
                        </Heading>
                        <dl className="ungDefinitionList">
                            <dt>Første mulige innmeldingsdato:</dt>
                            <dd>{dateFormatter.compact(deltaker.førsteMuligeInnmeldingsdato)}</dd>
                            <dt>Siste mulige innmeldingsdato:</dt>
                            <dd>{dateFormatter.compact(deltaker.sisteMuligeInnmeldingsdato)}</dd>
                        </dl>
                    </VStack> */}
                {/* </HGrid> */}
            </InfoBox>
        </VStack>
    );
};

export default DeltakerInfo;
