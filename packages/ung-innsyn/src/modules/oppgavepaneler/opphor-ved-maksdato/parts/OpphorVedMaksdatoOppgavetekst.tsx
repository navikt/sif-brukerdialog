import { BodyLong } from '@navikt/ds-react';
import { dateFormatter, ISODate } from '@sif/utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface Props {
    sisteDag: ISODate;
    svarfrist: ISODate;
}

export const OpphorVedMaksdatoOppgavetekst = ({ sisteDag, svarfrist }: Props) => {
    const formatertDato = <span className="text-nowrap">{dateFormatter.full(sisteDag)}</span>;
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(svarfrist)}</span>;

    return (
        <>
            <BodyLong spacing>
                <UngUiText
                    id="@ungInnsyn.opphorVedMaksdato.oppgavetekst.1"
                    values={{ formatertDato, strong: (content: ReactNode) => <strong>{content}</strong> }}
                />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.opphorVedMaksdato.oppgavetekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.opphorVedMaksdato.oppgavetekst.3" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <UngUiText id="@ungInnsyn.opphorVedMaksdato.oppgavetekst.svarfrist" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngUiText id="@ungInnsyn.opphorVedMaksdato.oppgavetekst.5" values={{ formatertDato }} />
            </BodyLong>
        </>
    );
};
