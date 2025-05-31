import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    svarfrist: Date;
}

const OppgavebekreftelseFristInfo = ({ svarfrist }: Props) => (
    <>
        <BodyLong spacing>
            Utbetalingen av pengene blir utsatt til du svarer eller til fristen for å svare har gått ut.
        </BodyLong>
        <BodyLong spacing weight="semibold">
            Fristen for å svare er {dateFormatter.full(svarfrist)}.
        </BodyLong>
    </>
);

export default OppgavebekreftelseFristInfo;
