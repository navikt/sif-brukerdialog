import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { AppText } from '@shared/i18n';

interface Props {
    sluttdato: Date;
    svarfrist: Date;
}

const MeldUtOppgavetekst = ({ sluttdato, svarfrist }: Props) => {
    const formatertDato = <span className="text-nowrap">{dateFormatter.full(sluttdato)}</span>;
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <AppText
                    id="meldtUt.oppgavetekst.1"
                    values={{ formatertDato, strong: (content) => <strong>{content}</strong> }}
                />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="meldtUt.oppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="meldtUt.oppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="meldtUt.oppgavetekst.4" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <AppText id="meldtUt.oppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <AppText id="meldtUt.oppgavetekst.5" values={{ formatertDato }} />
            </BodyLong>
        </>
    );
};

export default MeldUtOppgavetekst;
