import { BodyLong } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface Props {
    frist: Date;
    startdato: Date;
}
export const EndretStartdatoOppgavetekst = ({ frist, startdato }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    const formatertDato = <span className="text-nowrap">{dateFormatter.full(startdato)}</span>;
    return (
        <>
            <BodyLong spacing>
                <UngUiText
                    id="endretStartdato.tekst.1"
                    values={{ formatertDato, strong: (content: ReactNode) => <strong>{content}</strong> }}
                />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="endretStartdato.tekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="endretStartdato.tekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="endretStartdato.tekst.4" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <UngUiText id="endretStartdato.tekst.5" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngUiText id="endretStartdato.tekst.6" values={{ formatertDato }} />
            </BodyLong>
        </>
    );
};
