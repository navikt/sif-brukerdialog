import { BodyLong, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@sif/utils';

import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOpphørOppgave } from '@sif/api/ung-brukerdialog';
import { UngUiText } from '../../../i18n';
import Fritekst from '../../../components/fritekst/Fritekst';

type Props = BostedVilkårOpphørOppgave['oppgavetypeData'];

export const BostedVilkarOpphorOppgavetekst = ({
    fom,
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
}: Props) => {
    const formatertFom = dateFormatter.compact(fom);

    switch (ikkeOppfyltÅrsak) {
        case BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSATTADRESSE_I_TRONDHEIM:
            return (
                <BodyLong>
                    <UngUiText
                        id="@ungInnsyn.bostedVilkårOpphørOppgave.IKKE_BOSATTADRESSE_I_TRONDHEIM"
                        values={{ fom: formatertFom }}
                    />
                </BodyLong>
            );
        case BostedsvilkårIkkeOppfyltÅrsak.IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM:
            return (
                <BodyLong>
                    <UngUiText
                        id="@ungInnsyn.bostedVilkårOpphørOppgave.IKKE_BOSTEDSADRESSE_OG_IKKE_FOLKEREGISTRERT_I_TRONDHEIM"
                        values={{ fom: formatertFom }}
                    />
                </BodyLong>
            );
        case BostedsvilkårIkkeOppfyltÅrsak.STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM:
            return (
                <BodyLong>
                    <UngUiText
                        id="@ungInnsyn.bostedVilkårOpphørOppgave.STUDIE_ELLER_ARBEIDSSTED_UTENFOR_TRONDHEIM"
                        values={{ fom: formatertFom }}
                    />
                </BodyLong>
            );
        case BostedsvilkårIkkeOppfyltÅrsak.ANNET:
            return (
                <VStack gap="space-20">
                    <BodyLong>
                        <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.ANNET" values={{ fom: formatertFom }} />
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
