import { OmBarnetSøknadsdata } from '@app/types/Soknadsdata';
import { RegistrertBarn } from '@sif/api/k9-prosessering';
import { YesOrNo } from '@sif/rhf';
import dayjs from 'dayjs';

import { ANNET_BARN, OmBarnetFormValues } from './types';

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
    data: Partial<OmBarnetFormValues>,
    registrerteBarn: RegistrertBarn[],
): OmBarnetSøknadsdata | undefined => {
    const { barnetSøknadenGjelder, sammeAdresse, kroniskEllerFunksjonshemming } = data;

    if (!sammeAdresse || !kroniskEllerFunksjonshemming) return undefined;

    const erKronisk = kroniskEllerFunksjonshemming === YesOrNo.YES;
    const høyereRisikoForFravær =
        erKronisk && data.høyereRisikoForFravær !== undefined ? data.høyereRisikoForFravær === YesOrNo.YES : undefined;
    const høyereRisikoForFraværBeskrivelse = høyereRisikoForFravær ? data.høyereRisikoForFraværBeskrivelse : undefined;

    if (barnetSøknadenGjelder === ANNET_BARN || registrerteBarn.length === 0) {
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

export const getMinDatoForBarnetsFødselsdato = (): Date => {
    // April 1 dette år
    const today = dayjs();
    const frist = dayjs(today).set('month', 3).set('date', 1);

    return today.isBefore(frist)
        ? today.subtract(19, 'year').startOf('year').toDate()
        : today.subtract(18, 'year').startOf('year').toDate();
};

export const isBarnOver18år = (fødselsdato: Date | string): boolean => {
    const dato18år = dayjs(fødselsdato).add(18, 'year');

    // Siden det kan gis ekstra dager opp til 3 måneder tilbake i tid fra søknadsdato brukes det 1. april året etter det kalenderåret barnet fylte 18 år som frist.
    const frist = dato18år.add(1, 'year').set('month', 3).set('date', 1);

    return dayjs().isSame(frist) || dayjs().isAfter(frist);
};
