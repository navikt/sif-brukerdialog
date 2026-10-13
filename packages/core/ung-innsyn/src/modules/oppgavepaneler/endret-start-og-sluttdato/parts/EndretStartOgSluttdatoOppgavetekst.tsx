import { BodyLong } from '@navikt/ds-react';
import { dateFormatter, DateRange, ISODate } from '@sif/utils';
import { ReactNode } from 'react';

import { UngInnsynText } from '../../../../i18n';

interface Props {
    frist: ISODate;
    nyPeriode: DateRange;
}
export const EndretStartOgSluttdatoOppgavetekst = ({ frist, nyPeriode }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    const fom = <span className="text-nowrap">{dateFormatter.full(nyPeriode.from)}</span>;
    const tom = <span className="text-nowrap">{dateFormatter.full(nyPeriode.to)}</span>;

    return (
        <>
            <BodyLong spacing>
                <UngInnsynText id="@ungInnsyn.endretStartOgSluttdato.tekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <UngInnsynText
                    id="@ungInnsyn.endretStartOgSluttdato.tekst.2"
                    values={{
                        fom,
                        tom,
                        strong: (content: ReactNode) => <strong>{content}</strong>,
                    }}
                />
            </BodyLong>
            <BodyLong spacing>
                <UngInnsynText id="@ungInnsyn.endretStartOgSluttdato.tekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngInnsynText id="@ungInnsyn.endretStartOgSluttdato.tekst.4" />
            </BodyLong>
            <BodyLong spacing>
                <UngInnsynText id="@ungInnsyn.endretStartOgSluttdato.tekst.5" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <UngInnsynText id="@ungInnsyn.endretStartOgSluttdato.tekst.6" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngInnsynText
                    id="@ungInnsyn.endretStartOgSluttdato.tekst.7"
                    values={{
                        fom,
                        tom,
                        strong: (content: ReactNode) => <strong>{content}</strong>,
                    }}
                />
            </BodyLong>
        </>
    );
};
