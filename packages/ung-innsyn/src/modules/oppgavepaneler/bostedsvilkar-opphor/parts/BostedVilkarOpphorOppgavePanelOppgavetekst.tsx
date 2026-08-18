import { BodyLong, VStack } from '@navikt/ds-react';
import { dateFormatter, ISODate } from '@sif/utils';

import { BostedsvilkårIkkeOppfyltÅrsak } from '@navikt/ung-brukerdialog-api';
import { BostedVilkårOpphørOppgave } from '@sif/api/ung-brukerdialog';
import { UngUiText } from '../../../../i18n';
import { OppgavebekreftelseTilbakemeldingInfo } from '../../felles/OppgavebekreftelseTilbakemeldingInfo';
import Fritekst from '../../../../components/fritekst/Fritekst';

type Props = BostedVilkårOpphørOppgave['oppgavetypeData'] & {
    frist: ISODate;
};

export const BostedVilkarOpphorOppgavePanelOppgavetekst = ({
    frist,
    fom,
    ikkeOppfyltÅrsak,
    ikkeOppfyltÅrsakFritekstbeskrivelse,
}: Props) => {
    const getOpphørÅrsakTekst = () => {
        const formatertFom = dateFormatter.full(fom);
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
                    <>
                        <BodyLong>
                            <UngUiText id="@ungInnsyn.bostedVilkårOpphørOppgave.ANNET" values={{ fom: formatertFom }} />
                        </BodyLong>
                        <BodyLong>
                            <Fritekst text={ikkeOppfyltÅrsakFritekstbeskrivelse} />
                        </BodyLong>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <VStack gap="space-20">
            {getOpphørÅrsakTekst()}
            <OppgavebekreftelseTilbakemeldingInfo frist={frist} />
        </VStack>
    );
};
