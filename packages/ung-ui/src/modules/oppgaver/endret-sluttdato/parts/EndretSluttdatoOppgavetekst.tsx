import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface Props {
    endretDato: Date;
    svarfrist: Date;
}

export const EndretSluttdatoOppgavetekst = ({ endretDato, svarfrist }: Props) => {
    const formatertDato = <span className="text-nowrap">{dateFormatter.full(endretDato)}</span>;
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <UngUiText
                    id="endretSluttdato.oppgavetekst.1"
                    values={{ formatertDato, strong: (content: ReactNode) => <strong>{content}</strong> }}
                />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="endretSluttdato.oppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="endretSluttdato.oppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="endretSluttdato.oppgavetekst.4" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <UngUiText id="endretSluttdato.oppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngUiText id="endretSluttdato.oppgavetekst.5" values={{ formatertDato }} />
            </BodyLong>
        </>
    );
};
