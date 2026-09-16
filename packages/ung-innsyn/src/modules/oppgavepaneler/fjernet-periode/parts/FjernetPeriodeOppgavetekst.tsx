import { BodyLong } from '@navikt/ds-react';
import { dateFormatter, ISODate } from '@sif/utils';

import { UngInnsynText } from '../../../../i18n';

interface Props {
    svarfrist: ISODate;
}

export const FjernetPeriodeOppgavetekst = ({ svarfrist }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <UngInnsynText id="@ungInnsyn.fjernetPeriode.oppgavetekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <UngInnsynText id="@ungInnsyn.fjernetPeriode.oppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngInnsynText id="@ungInnsyn.fjernetPeriode.oppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngInnsynText id="@ungInnsyn.fjernetPeriode.oppgavetekst.4" />
            </BodyLong>
            <BodyLong weight="semibold">
                <UngInnsynText id="@ungInnsyn.fjernetPeriode.oppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
        </>
    );
};
