import { BodyLong } from '@navikt/ds-react';
import { dateFormatter, DateRange, dateRangeFormatter } from '@navikt/sif-common-utils';

import { UngUiText, useUngUiIntl } from '../../../../i18n';

interface Props {
    frist: Date;
    periode: DateRange;
    erBosattITrondheim: boolean;
}
export const BostedVilkarOppgavePanelOppgavetekst = ({ frist, periode, erBosattITrondheim }: Props) => {
    const { locale } = useUngUiIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    return (
        <>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOppgave.tekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText
                    id="@ungInnsyn.bostedVilkårOppgave.tekst.1b"
                    values={{
                        periode: dateRangeFormatter.getDateRangeText(periode, locale, { compact: false }),
                        erBosattITrondheim: erBosattITrondheim ? 'Ja' : 'Nei',
                    }}
                />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOppgave.tekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOppgave.tekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOppgave.tekst.4" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <UngUiText id="@ungInnsyn.bostedVilkårOppgave.tekst.5" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngUiText id="@ungInnsyn.bostedVilkårOppgave.tekst.6" />
            </BodyLong>
        </>
    );
};
