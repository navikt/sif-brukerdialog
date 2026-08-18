import { BodyLong, List } from '@navikt/ds-react';
import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { dateRangeFormatter, ISODate } from '@sif/utils';

import { BostedVilkårPeriodeOppgave } from '@sif/api/ung-brukerdialog';
import { UngUiText, useUngUiIntl } from '../../../../i18n';
import { Sitat } from '@navikt/sif-common-ui';
import Fritekst from '../../../../components/fritekst/Fritekst';
import { OppgavebekreftelseTilbakemeldingInfo } from '../../felles/OppgavebekreftelseTilbakemeldingInfo';

type Props = BostedVilkårPeriodeOppgave['oppgavetypeData'] & {
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

    return (
        <>
            <BodyLong spacing>
                <UngUiText id="@ungInnsyn.bostedVilkårPeriodeOppgave.tekst.1" />
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
                    )}
                </List>
            </BodyLong>
            <OppgavebekreftelseTilbakemeldingInfo frist={frist} />
        </>
    );
};
