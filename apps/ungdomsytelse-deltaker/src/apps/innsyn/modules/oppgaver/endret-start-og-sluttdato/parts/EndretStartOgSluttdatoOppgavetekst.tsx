import { BodyLong } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';
import { ReactNode } from 'react';

interface Props {
    frist: Date;
    nyPeriode: DateRange;
}
const EndretStartOgSluttdatoOppgavetekst = ({ frist, nyPeriode }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    const fom = <span className="text-nowrap">{dateFormatter.full(nyPeriode.from)}</span>;
    const tom = <span className="text-nowrap">{dateFormatter.full(nyPeriode.to)}</span>;

    return (
        <>
            <BodyLong spacing>
                <AppText id="endretStartOgSluttdato.tekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <AppText
                    id="endretStartOgSluttdato.tekst.2"
                    values={{
                        fom,
                        tom,
                        strong: (content: ReactNode) => <strong>{content}</strong>,
                    }}
                />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="endretStartOgSluttdato.tekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="endretStartOgSluttdato.tekst.4" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="endretStartOgSluttdato.tekst.5" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <AppText id="endretStartOgSluttdato.tekst.6" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <AppText
                    id="endretStartOgSluttdato.tekst.7"
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

export default EndretStartOgSluttdatoOppgavetekst;
