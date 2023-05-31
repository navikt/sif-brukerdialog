import { InnsendtSøknadInnhold } from '../../types/InnsendtSøknad';
import { SøknadFormField, SøknadFormValues } from '../../types/SøknadFormValues';
import { booleanToYesOrNo } from '../booleanToYesOrNo';

type NattevåkOgBeredskapFormValues = Pick<
    SøknadFormValues,
    | SøknadFormField.harNattevåk
    | SøknadFormField.harNattevåk_ekstrainfo
    | SøknadFormField.harBeredskap
    | SøknadFormField.harBeredskap_ekstrainfo
>;

export const extractNattevåkOgBeredskapFormValues = ({
    nattevåk,
    beredskap,
}: Pick<InnsendtSøknadInnhold, 'beredskap' | 'nattevåk'>): NattevåkOgBeredskapFormValues => {
    const harBeredskap = beredskap !== undefined && beredskap.beredskap === true;
    const harNattevåk = nattevåk !== undefined && nattevåk.harNattevåk === true;
    return {
        harBeredskap: booleanToYesOrNo(harBeredskap),
        harBeredskap_ekstrainfo: beredskap?.tilleggsinformasjon,
        harNattevåk: booleanToYesOrNo(harNattevåk),
        harNattevåk_ekstrainfo: nattevåk?.tilleggsinformasjon,
    };
};
