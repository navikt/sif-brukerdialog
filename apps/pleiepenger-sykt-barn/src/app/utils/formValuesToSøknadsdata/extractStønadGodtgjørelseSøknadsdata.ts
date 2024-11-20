import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import {
    MottarStønadGodtgjørelseVariant,
    StønadGodtgjørelseFormValues,
} from '../../types/søknad-form-values/StønadGodtgjørelseFormValues';
import { StønadGodtgjørelseSøknadsdata } from '../../types/søknadsdata/StønadGodtgjørelseSøknadsdata';

export const extractStønadGodtgjørelseSøknadsdata = (
    stønadGodtgjørelse: StønadGodtgjørelseFormValues,
): StønadGodtgjørelseSøknadsdata | undefined => {
    const { mottarStønadGodtgjørelse, mottarStønadGodtgjørelseVariant, startdato, sluttdato } = stønadGodtgjørelse;
    if (mottarStønadGodtgjørelse === YesOrNo.NO) {
        return {
            mottarStønadGodtgjørelse: false,
        };
    }

    if (mottarStønadGodtgjørelse === YesOrNo.YES) {
        switch (mottarStønadGodtgjørelseVariant) {
            case MottarStønadGodtgjørelseVariant.somVanlig:
                return {
                    mottarStønadGodtgjørelse: true,
                    mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.somVanlig,
                };
            case MottarStønadGodtgjørelseVariant.starterIPerioden:
                return startdato
                    ? {
                          mottarStønadGodtgjørelse: true,
                          mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.starterIPerioden,
                          startdato,
                      }
                    : undefined;

            case MottarStønadGodtgjørelseVariant.slutterIPerioden:
                return sluttdato
                    ? {
                          mottarStønadGodtgjørelse: true,
                          mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.slutterIPerioden,
                          sluttdato,
                      }
                    : undefined;
            case MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden:
                return startdato && sluttdato
                    ? {
                          mottarStønadGodtgjørelse: true,
                          mottarStønadGodtgjørelseVariant: MottarStønadGodtgjørelseVariant.starterOgSlutterIPerioden,
                          startdato,
                          sluttdato,
                      }
                    : undefined;
        }
    }

    return undefined;
};
