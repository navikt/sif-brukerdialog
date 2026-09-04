import { BodyLong, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@sif/utils';

import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { BostedVilkårPeriodeOppgave } from '@sif/api/ung-brukerdialog';
import { UngInnsynText } from '../../../i18n';
import Fritekst from '../../../components/fritekst/Fritekst';

type Props = BostedVilkårPeriodeOppgave['oppgavetypeData'];

export const BostedVilkarPeriodeOppgavetekst = ({
    periode,
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
}: Props) => {
    const formatertFom = dateFormatter.compact(periode.from);
    const formatertTom = dateFormatter.compact(periode.to);
    const periodeTekst = `${formatertFom} - ${formatertTom}`;
    switch (ikkeOppfyltÅrsak) {
        case BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM:
            return (
                <BodyLong>
                    <UngInnsynText
                        id="@ungInnsyn.bostedVilkårPeriodeOppgave.IKKE_BOSATTADRESSE_I_TRONDHEIM"
                        values={{ periode: periodeTekst }}
                    />
                </BodyLong>
            );
        case BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM:
            return (
                <BodyLong>
                    <UngInnsynText
                        id="@ungInnsyn.bostedVilkårPeriodeOppgave.IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM"
                        values={{ periode: periodeTekst }}
                    />
                </BodyLong>
            );
        case BostedsvilkårIkkeOppfyltÅrsak.STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM:
            return (
                <BodyLong>
                    <UngInnsynText
                        id="@ungInnsyn.bostedVilkårPeriodeOppgave.STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM"
                        values={{ periode: periodeTekst }}
                    />
                </BodyLong>
            );
        case BostedsvilkårIkkeOppfyltÅrsak.ANNET:
            return (
                <VStack gap="space-20">
                    <BodyLong>
                        <UngInnsynText
                            id="@ungInnsyn.bostedVilkårPeriodeOppgave.ANNET"
                            values={{ periode: periodeTekst }}
                        />
                    </BodyLong>
                    <BodyLong>
                        <Fritekst text={ikkeOppfyltÅrsakFritekstbeskrivelse} />
                    </BodyLong>
                </VStack>
            );
        default:
            return null;
    }
};
