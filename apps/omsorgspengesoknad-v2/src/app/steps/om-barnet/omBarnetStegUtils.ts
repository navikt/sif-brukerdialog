import { BarnSammeAdresse } from '@app/types/BarnSammeAdresse';
import { OmBarnetSøknadsdata } from '@app/types/Soknadsdata';
import { RegistrertBarn } from '@sif/api/k9-prosessering';
import { YesOrNo } from '@sif/rhf';

import { ANNET_BARN, OmBarnetFormFields, OmBarnetFormValues } from './types';

export const toOmBarnetFormValues = (søknadsdata: OmBarnetSøknadsdata | undefined): Partial<OmBarnetFormValues> => {
    if (!søknadsdata) return {};

    const felles = {
        sammeAdresse: søknadsdata.sammeAdresse,
        kroniskEllerFunksjonshemming: søknadsdata.kroniskEllerFunksjonshemming ? YesOrNo.YES : YesOrNo.NO,
        høyereRisikoForFravær:
            søknadsdata.høyereRisikoForFravær !== undefined
                ? søknadsdata.høyereRisikoForFravær
                    ? YesOrNo.YES
                    : YesOrNo.NO
                : undefined,
        høyereRisikoForFraværBeskrivelse: søknadsdata.høyereRisikoForFraværBeskrivelse,
    };

    if (søknadsdata.type === 'registrertBarn') {
        return {
            ...felles,
            barnetSøknadenGjelder: søknadsdata.registrertBarn.aktørId,
        };
    }

    return {
        ...felles,
        barnetSøknadenGjelder: ANNET_BARN,
        barnetsFødselsnummer: søknadsdata.barnetsFødselsnummer,
        barnetsFødselsdato: søknadsdata.barnetsFødselsdato,
        barnetsNavn: søknadsdata.barnetsNavn,
        søkersRelasjonTilBarnet: søknadsdata.søkersRelasjonTilBarnet,
    };
};

export const toOmBarnetSøknadsdata = (
    data: OmBarnetFormValues,
    registrerteBarn: RegistrertBarn[],
): OmBarnetSøknadsdata | undefined => {
    const { barnetSøknadenGjelder, sammeAdresse, kroniskEllerFunksjonshemming } = data;

    if (!sammeAdresse || !kroniskEllerFunksjonshemming) return undefined;

    const erKronisk = kroniskEllerFunksjonshemming === YesOrNo.YES;
    const høyereRisikoForFravær =
        erKronisk && data.høyereRisikoForFravær !== undefined ? data.høyereRisikoForFravær === YesOrNo.YES : undefined;
    const høyereRisikoForFraværBeskrivelse = høyereRisikoForFravær ? data.høyereRisikoForFraværBeskrivelse : undefined;

    if (barnetSøknadenGjelder === ANNET_BARN) {
        const { barnetsFødselsnummer, barnetsFødselsdato, barnetsNavn, søkersRelasjonTilBarnet } = data;
        if (!barnetsFødselsnummer || !barnetsFødselsdato || !barnetsNavn || !søkersRelasjonTilBarnet) return undefined;
        return {
            type: 'annetBarn',
            barnetsFødselsnummer,
            barnetsFødselsdato,
            barnetsNavn,
            søkersRelasjonTilBarnet,
            sammeAdresse,
            kroniskEllerFunksjonshemming: erKronisk,
            høyereRisikoForFravær,
            høyereRisikoForFraværBeskrivelse,
        };
    }

    const barn = registrerteBarn.find((b) => b.aktørId === barnetSøknadenGjelder);
    if (!barn || !sammeAdresse) return undefined;

    return {
        type: 'registrertBarn',
        registrertBarn: barn,
        sammeAdresse,
        kroniskEllerFunksjonshemming: erKronisk,
        høyereRisikoForFravær,
        høyereRisikoForFraværBeskrivelse,
    };
};

export const getSammeAdresseOptions = (): Array<{ value: BarnSammeAdresse; label: string }> => [
    { value: BarnSammeAdresse.JA, label: 'Ja' },
    { value: BarnSammeAdresse.JA_DELT_BOSTED, label: 'Ja, men med delt bosted' },
    { value: BarnSammeAdresse.NEI, label: 'Nei' },
];

export const getOmBarnetDefaultValues = (): Partial<OmBarnetFormValues> => ({
    [OmBarnetFormFields.barnetsFødselsdato]: '',
    [OmBarnetFormFields.barnetsFødselsnummer]: '',
    [OmBarnetFormFields.barnetsNavn]: '',
});
