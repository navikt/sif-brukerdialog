import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';

interface Props {
    svarfrist: Date;
}

const FjernetPeriodeOppgavetekst = ({ svarfrist }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <AppText id="fjernetPeriode.oppgavetekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="fjernetPeriode.oppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="fjernetPeriode.oppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="fjernetPeriode.oppgavetekst.4" />
            </BodyLong>
            <BodyLong weight="semibold">
                <AppText id="fjernetPeriode.oppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
        </>
    );
};

export default FjernetPeriodeOppgavetekst;
