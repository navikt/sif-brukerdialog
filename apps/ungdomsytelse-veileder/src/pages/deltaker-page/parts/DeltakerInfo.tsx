import { Deltaker, formaterNavn } from '@navikt/ung-common';
import SectionContainer from '../../../components/section-container/SectionContainer';
import { dateFormatter } from '@navikt/sif-common-utils';
import Fødselsnummer from '../../../atoms/Fødselsnummer';
import { HGrid, VStack } from '@navikt/ds-react';
import dayjs from 'dayjs';

interface Props {
    deltaker: Deltaker;
}

const DeltakerInfo = ({ deltaker }: Props) => {
    const alder = dayjs().diff(dayjs(deltaker.fødselsdato), 'year');
    return (
        <SectionContainer header="Om deltaker">
            <HGrid gap="4" columns={{ sm: 1, md: '1fr 1fr' }}>
                <VStack gap="4">
                    <dl className="deltakerInfoList">
                        <dt>Navn:</dt>
                        <dd>{formaterNavn(deltaker.navn)}</dd>
                        <dt>Fødselsnummer:</dt>
                        <dd>
                            <Fødselsnummer fnr={deltaker.deltakerIdent} copyEnabled={true} />
                        </dd>
                        <dt>Fødselsdato:</dt>
                        <dd>
                            {dateFormatter.compact(deltaker.fødselsdato)} ({alder} år)
                        </dd>
                    </dl>
                </VStack>
                <VStack gap="4">
                    <dl className="deltakerInfoList">
                        <dt>Første mulige innmeldingsdato:</dt>
                        <dd>{dateFormatter.compact(deltaker.førsteMuligeInnmeldingsdato)}</dd>
                        <dt>Siste mulige innmeldingsdato:</dt>
                        <dd>{dateFormatter.compact(deltaker.sisteMuligeInnmeldingsdato)}</dd>
                    </dl>
                </VStack>
            </HGrid>
        </SectionContainer>
    );
};

export default DeltakerInfo;
