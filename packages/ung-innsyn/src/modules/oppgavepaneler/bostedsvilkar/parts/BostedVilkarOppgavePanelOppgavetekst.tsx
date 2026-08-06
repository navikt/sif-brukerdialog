import { BodyLong, List } from '@navikt/ds-react';
import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { dateFormatter, dateRangeFormatter, ISODate } from '@sif/utils';

import { BostedVilkårOppgave } from '@sif/api/ung-brukerdialog';
import { UngUiText, useUngUiIntl } from '../../../../i18n';
import { Sitat } from '@navikt/sif-common-ui';
import Fritekst from '../../../../components/fritekst/Fritekst';

type Props = BostedVilkårOppgave['oppgavetypeData'] & {
    frist: ISODate;
};

export const BostedVilkarOppgavePanelOppgavetekst = ({
    frist,
    periode,
    erBosattITrondheim,
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
}: Props) => {
    const { locale, text } = useUngUiIntl();
    const formatertFrist = <span className="text-nowrap">{dateFormatter.full(frist)}</span>;
    return (
        <>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårOppgave.tekst.1" />
            </BodyLong>
            <BodyLong spacing as="div">
                <List>
                    <List.Item>
                        Periode: {dateRangeFormatter.getDateRangeText(periode, locale, { compact: false })}
                    </List.Item>
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
                    )}{' '}
                </List>
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
