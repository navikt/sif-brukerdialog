import type { OmOmsorgenForBarnSøknadsdata } from '@app/types/Soknadsdata';
import type { RegistrertBarn } from '@sif/api/k9-brukerdialog-prosessering';
import { YesOrNo } from '@sif/rhf';
import type { AnnetBarn } from '@sif/soknad-forms';
import { dateFormatter, formatName, getDagensDatoIOslo, type ISODate } from '@sif/utils';

import type { OmOmsorgenForBarnFormValues } from './types';

type Barn = RegistrertBarn | AnnetBarn;

const erRegistrertBarn = (barn: Barn): barn is RegistrertBarn => 'aktørId' in barn;

const getBarnId = (barn: Barn): string => (erRegistrertBarn(barn) ? barn.aktørId : barn.fnr);

export const toOmOmsorgenForBarnFormValues = (
    lagretData: OmOmsorgenForBarnSøknadsdata | undefined,
): OmOmsorgenForBarnFormValues =>
    lagretData
        ? { ...lagretData, avtaleOmDeltBosted: YesOrNo.NO }
        : { annetBarn: [], harAleneomsorgFor: [], avtaleOmDeltBosted: YesOrNo.UNANSWERED };

export const toOmOmsorgenForBarnSøknadsdata = ({
    annetBarn = [],
    harAleneomsorgFor = [],
    avtaleOmDeltBosted,
}: OmOmsorgenForBarnFormValues): OmOmsorgenForBarnSøknadsdata | undefined => {
    if (harAleneomsorgFor.length === 0 || avtaleOmDeltBosted !== YesOrNo.NO) {
        return undefined;
    }
    return { annetBarn, harAleneomsorgFor };
};

/** Fjerner valg for barn som ikke lenger finnes, f.eks. etter at et lagt-til barn er slettet eller endret. */
export const fjernValgForUkjenteBarn = (barnIder: string[], barn: Barn[]): string[] =>
    barnIder.filter((id) => barn.some((barnet) => getBarnId(barnet) === id));

export const getMinDateForAnnetBarn = (): ISODate => {
    const currentYear = Number(getDagensDatoIOslo().slice(0, 4));
    const minYear = String(currentYear - 19).padStart(4, '0');
    return `${minYear}-01-01` as ISODate;
};

export const getBarnOptions = (
    barn: Barn[],
    formatLabel: (dato: string, navn: string) => string,
): Array<{ label: string; value: string }> =>
    barn.map((barnet) => ({
        label: formatLabel(
            dateFormatter.compact(barnet.fødselsdato),
            erRegistrertBarn(barnet) ? formatName(barnet.fornavn, barnet.etternavn) : barnet.navn,
        ),
        value: getBarnId(barnet),
    }));
