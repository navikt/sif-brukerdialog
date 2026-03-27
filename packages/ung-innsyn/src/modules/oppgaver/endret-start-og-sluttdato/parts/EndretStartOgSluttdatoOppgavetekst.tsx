import { BodyLong } from '@navikt/ds-react';
import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateFormatter } from '@navikt/sif-common-utils';
import { ReactNode } from 'react';

import { UngUiText } from '../../../../i18n';

interface Props {
    frist: Date;
    nyPeriode: DateRange;
}
export const EndretStartOgSluttdatoOppgavetekst = ({ frist, nyPeriode }: Props) => {
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    const fom = <span className="text-nowrap">{dateFormatter.full(nyPeriode.from)}</span>;
    const tom = <span className="text-nowrap">{dateFormatter.full(nyPeriode.to)}</span>;

    return (
        <>
            <BodyLong spacing>
                <UngUiText id="@ungUi.endretStartOgSluttdato.tekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText
                    id="@ungUi.endretStartOgSluttdato.tekst.2"
                    values={{
                        fom,
                        tom,
                        strong: (content: ReactNode) => <strong>{content}</strong>,
                    }}
                />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungUi.endretStartOgSluttdato.tekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungUi.endretStartOgSluttdato.tekst.4" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungUi.endretStartOgSluttdato.tekst.5" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <UngUiText id="@ungUi.endretStartOgSluttdato.tekst.6" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngUiText
                    id="@ungUi.endretStartOgSluttdato.tekst.7"
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
