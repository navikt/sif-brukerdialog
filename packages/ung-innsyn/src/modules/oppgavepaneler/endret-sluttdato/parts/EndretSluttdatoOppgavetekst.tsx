import { BodyLong } from '@navikt/ds-react';
import { dateFormatter, ISODate } from '@sif/utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface Props {
    endretDato: ISODate;
    frist: ISODate;
}

export const EndretSluttdatoOppgavetekst = ({ endretDato, frist: svarfrist }: Props) => {
    const formatertDato = <span className="text-nowrap">{dateFormatter.full(endretDato)}</span>;
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <UngUiText
                    id="@ungInnsyn.endretSluttdato.oppgavetekst.1"
                    values={{ formatertDato, strong: (content: ReactNode) => <strong>{content}</strong> }}
                />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.endretSluttdato.oppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.endretSluttdato.oppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.endretSluttdato.oppgavetekst.4" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <UngUiText id="@ungInnsyn.endretSluttdato.oppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngUiText id="@ungInnsyn.endretSluttdato.oppgavetekst.5" values={{ formatertDato }} />
            </BodyLong>
        </>
    );
};
