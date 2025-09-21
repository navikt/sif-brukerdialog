import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import { AppText } from '@shared/i18n';

interface Props {
    endretDato: Date;
    svarfrist: Date;
}

const MeldUtOppgavetekst = ({ endretDato, svarfrist }: Props) => {
    const formatertDato = <span className="text-nowrap">{dateFormatter.full(endretDato)}</span>;
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <AppText
                    id="endretSluttdato.meldUtOppgavetekst.1"
                    values={{ formatertDato, strong: (content) => <strong>{content}</strong> }}
                />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="endretSluttdato.meldUtOppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="endretSluttdato.meldUtOppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="endretSluttdato.meldUtOppgavetekst.4" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <AppText id="endretSluttdato.meldUtOppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong spacing>
                <AppText id="endretSluttdato.meldUtOppgavetekst.5" values={{ formatertDato }} />
            </BodyLong>
        </>
    );
};

export default MeldUtOppgavetekst;
