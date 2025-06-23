import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    svarfrist: Date;
}

const KorrigertInntektOppgavetekst = ({ svarfrist }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;
    return (
        <>
            <BodyLong as="div">TODO</BodyLong>

            <BodyLong spacing weight="semibold">
                Fristen for å svare er {formatertFrist}.
            </BodyLong>
        </>
    );
};

export default KorrigertInntektOppgavetekst;
