import { BodyShort, Heading, VStack } from '@navikt/ds-react';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import Fødselsnummer from '../../../atoms/Fødselsnummer';
import InfoBox from '../../../atoms/InfoBox';
import DiskresjonskoderTags from '../../../components/diskresjonskode-tag/DiskresjonskoderTags';
import { Deltaker } from '../../../types/Deltaker';

interface Props {
    copyFnrEnabled?: boolean;
    deltaker: Deltaker;
}

const DeltakerInfo = ({ deltaker, copyFnrEnabled = true }: Props) => {
    const alder = dayjs().diff(dayjs(deltaker.fødselsdato), 'year');
    return (
        <VStack gap="space-16">
            <Heading level="2" size="medium">
                Om Deltaker
            </Heading>
            <InfoBox>
                <VStack gap="space-16">
                    <dl className="ungDefinitionList">
                        <dt>Navn:</dt>
                        <dd>{formatName(deltaker.navn)}</dd>
                        <dt>Fødselsnummer:</dt>
                        <dd>
                            <Fødselsnummer fnr={deltaker.deltakerIdent} copyEnabled={copyFnrEnabled} />
                        </dd>
                        <dt>Fødselsdato:</dt>
                        <dd>
                            <VStack gap="space-12">
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
            </InfoBox>
        </VStack>
    );
};

export default DeltakerInfo;
