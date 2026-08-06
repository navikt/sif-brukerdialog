import { BodyLong, List } from '@navikt/ds-react';
import { dateFormatter, ISODate } from '@sif/utils';

import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOpphørOppgave } from '@sif/api/ung-brukerdialog';
import { UngUiText, useUngUiIntl } from '../../../../i18n';
import Fritekst from '../../../../components/fritekst/Fritekst';
import { Sitat } from '@navikt/sif-common-ui';

type Props = BostedVilkårOpphørOppgave['oppgavetypeData'] & {
    frist: ISODate;
};
export const BostedVilkarOpphorOppgavePanelOppgavetekst = ({
    frist,
    erBosattITrondheim,
    fom,
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
}: Props) => {
    const { locale, text } = useUngUiIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    return (
        <>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.tekst.1" />
            </BodyLong>
            <BodyLong spacing as="div">
                <List>
                    <List.Item>Fra og med: {dateFormatter.dayDateShortMonthYear(fom, locale)}</List.Item>
                    <List.Item>
                        Er bosatt i Trondheim: {erBosattITrondheim ? text('@ungInnsyn.Ja') : text('@ungInnsyn.Nei')}
                    </List.Item>
                    <List.Item>Årsak: {ikkeOppfyltÅrsak}</List.Item>
                    {ikkeOppfyltÅrsak === BostedsvilkårIkkeOppfyltÅrsak.ANNET && (
                        <List.Item>
                            Beskrivelse:
                            <Sitat>
                                <Fritekst text={ikkeOppfyltÅrsakFritekstbeskrivelse} />
                            </Sitat>
                        </List.Item>
                    )}
                </List>
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
