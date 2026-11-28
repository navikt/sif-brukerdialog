import { RegistrertBarn, Søker } from '@sif/api/k9-brukerdialog-prosessering';
import { formatName } from '@sif/utils';

import { prefixBarnId } from '../steps/tidspunkt-for-aleneomsorg/tidspunktForAleneomsorgStegUtils';
import { TidspunktForAleneomsorg } from '../steps/tidspunkt-for-aleneomsorg/types';
import { SøknadApiData } from '../types/SoknadApiData';
import { Søknadsdata } from '../types/Soknadsdata';
import { SøknadStepId } from '../types/SoknadStepId';

interface SoknadsdataToSoknadDTOParams {
    søker: Søker;
    registrerteBarn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
    språk: string;
}

export const soknadsdataToSoknadDTO = ({
    søker,
    registrerteBarn,
    søknadsdata,
    språk,
}: SoknadsdataToSoknadDTOParams): Omit<SøknadApiData, 'harBekreftetOpplysninger'> | undefined => {
    const omOmsorgenForBarn = søknadsdata[SøknadStepId.OM_OMSORGEN_FOR_BARN];
    const tidspunktForAleneomsorg = søknadsdata[SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG];

    if (!omOmsorgenForBarn || !tidspunktForAleneomsorg) {
        return undefined;
    }

    const getTidspunkt = (id: string) => {
        const tidspunkt = tidspunktForAleneomsorg.aleneomsorgTidspunkt[prefixBarnId(id)];
        if (!tidspunkt?.tidspunktForAleneomsorg) {
            return undefined;
        }
        if (tidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE && !tidspunkt.dato) {
            return undefined;
        }
        return tidspunkt;
    };

    const valgteAnnetBarn = omOmsorgenForBarn.annetBarn.filter((barn) =>
        omOmsorgenForBarn.harAleneomsorgFor.includes(barn.fnr),
    );
    const valgteRegistrerteBarn = registrerteBarn.filter((barn) =>
        omOmsorgenForBarn.harAleneomsorgFor.includes(barn.aktørId),
    );
    const harGyldigeTidspunkt = [...valgteAnnetBarn, ...valgteRegistrerteBarn].every((barnet) =>
        getTidspunkt('fnr' in barnet ? barnet.fnr : barnet.aktørId),
    );
    if (!harGyldigeTidspunkt) {
        return undefined;
    }

    const barn = [
        ...valgteAnnetBarn.map((barnet) => {
            const tidspunkt = getTidspunkt(barnet.fnr)!;
            return {
                navn: barnet.navn,
                identitetsnummer: barnet.fnr,
                fødselsdato: barnet.fødselsdato,
                tidspunktForAleneomsorg: tidspunkt.tidspunktForAleneomsorg!,
                dato:
                    tidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                        ? tidspunkt.dato
                        : undefined,
                type: barnet.type ?? 'ANNET',
            } as const;
        }),
        ...valgteRegistrerteBarn.map((barnet) => {
            const tidspunkt = getTidspunkt(barnet.aktørId)!;
            return {
                aktørId: barnet.aktørId,
                navn: formatName(barnet),
                tidspunktForAleneomsorg: tidspunkt.tidspunktForAleneomsorg!,
                dato:
                    tidspunkt.tidspunktForAleneomsorg === TidspunktForAleneomsorg.SISTE_2_ÅRENE
                        ? tidspunkt.dato
                        : undefined,
                type: 'FRA_OPPSLAG',
            } as const;
        }),
    ];

    if (barn.length === 0) {
        return undefined;
    }

    return {
        søkerNorskIdent: søker.fødselsnummer,
        språk,
        harForståttRettigheterOgPlikter: søknadsdata.harForståttRettigheterOgPlikter === true,
        barn,
    };
};
