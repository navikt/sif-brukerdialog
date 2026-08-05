import { BodyLong } from '@navikt/ds-react';
import { dateFormatter, ISODate } from '@sif/utils';

import { UngUiText, useUngUiIntl } from '../../../../i18n';
import { BostedVilkårOpphørOppgave } from '@sif/api/ung-brukerdialog';

type Props = BostedVilkårOpphørOppgave['oppgavetypeData'] & {
    frist: ISODate;
};
export const BostedVilkarOpphorOppgavePanelOppgavetekst = ({
    frist,
    erBosattITrondheim,
    fom,
    // ikkeOppfyltÅrsak,
    // ikkeOppfyltÅrsakFritekstbeskrivelse,
}: Props) => {
    const { locale } = useUngUiIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    return (
        <>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.tekst.1" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText
                    id="@ungInnsyn.bostedVilkårOpphørOppgave.tekst.1b"
                    values={{
                        fom: dateFormatter.dayDateShortMonthYear(fom, locale),
                        erBosattITrondheim: erBosattITrondheim ? 'Ja' : 'Nei',
                    }}
                />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.tekst.2" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.tekst.3" />
            </BodyLong>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.tekst.4" />
            </BodyLong>
            <BodyLong spacing weight="semibold">
                <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.tekst.5" values={{ formatertFrist }} />
            </BodyLong>
            <BodyLong>
                <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.tekst.6" />
            </BodyLong>
        </>
    );
};
