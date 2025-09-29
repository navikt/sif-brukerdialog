import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn';
import { dateFormatter } from '@navikt/sif-common-utils';

import { AppText } from '../../../i18n';
import { OmOmsorgenForBarnSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmOmsorgenForBarnFormValues } from './OmOmsorgenForBarnStep';

export const getOmOmsorgenForBarnStepInitialValues = (
    søknadsdata: Søknadsdata,
    formValues?: OmOmsorgenForBarnFormValues,
): OmOmsorgenForBarnFormValues => {
    if (formValues) {
        return formValues;
    }

    const defaultValues: OmOmsorgenForBarnFormValues = {
        annetBarn: [],
        harAleneomsorgFor: [],
        avtaleOmDeltBosted: YesOrNo.UNANSWERED,
        harAvtaleOmDeltBostedFor: undefined,
    };

    const { omOmsorgenForBarn } = søknadsdata || {};
    const { type, ...data } = omOmsorgenForBarn || {};

    switch (type) {
        case 'omOmsorgenForBarnUtenDeltBosted':
            return { ...defaultValues, ...data };
        case 'omOmsorgenForBarnMedDeltBosted':
            return { ...defaultValues, ...data };
        default:
            return defaultValues;
    }
};

export const getOmOmsorgenForBarnSøknadsdataFromFormValues = (
    values: OmOmsorgenForBarnFormValues,
    registrertBarn: RegistrertBarn[],
): OmOmsorgenForBarnSøknadsdata | undefined => {
    const { annetBarn = [], harAleneomsorgFor = [], avtaleOmDeltBosted, harAvtaleOmDeltBostedFor } = values;

    const isInvalid = (registrertBarn && registrertBarn.length + annetBarn.length < 1) || harAleneomsorgFor.length < 1;

    if (isInvalid) {
        return undefined;
    }

    if (avtaleOmDeltBosted === YesOrNo.NO) {
        return {
            type: 'omOmsorgenForBarnUtenDeltBosted',
            annetBarn,
            harAleneomsorgFor,
            avtaleOmDeltBosted: YesOrNo.NO,
        };
    }

    if (avtaleOmDeltBosted === YesOrNo.YES && (!harAvtaleOmDeltBostedFor || harAvtaleOmDeltBostedFor.length < 1)) {
        return undefined;
    }

    if (avtaleOmDeltBosted === YesOrNo.YES && harAvtaleOmDeltBostedFor) {
        return {
            type: 'omOmsorgenForBarnMedDeltBosted',
            annetBarn,
            harAleneomsorgFor,
            avtaleOmDeltBosted: YesOrNo.YES,
            harAvtaleOmDeltBostedFor,
        };
    }
    return undefined;
};

export const barnItemLabelRenderer = (registrertBarn: RegistrertBarn): React.ReactNode => {
    return (
        <span className="dineBarn">
            <span>
                <AppText
                    id="steg.omOmsorgenForBarn.form.født"
                    values={{ dato: dateFormatter.compact(registrertBarn.fødselsdato) }}
                />
            </span>

            <span className="dineBarn__navn">
                {formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn)}
            </span>
        </span>
    );
};

export const getBarnOptions = (barn: Array<RegistrertBarn | AnnetBarn> = []) => {
    return barn.map((barnet) => ({
        label: (
            <AppText
                id="steg.omOmsorgenForBarn.form.fødtNavn"
                values={{
                    dato: dateFormatter.compact(barnet.fødselsdato),
                    navn: erRegistrertBarn(barnet) ? formatName(barnet.fornavn, barnet.etternavn) : barnet.navn,
                }}
            />
        ),
        value: erRegistrertBarn(barnet) ? barnet.aktørId : barnet.fnr,
    }));
};

const erRegistrertBarn = (barn: RegistrertBarn | AnnetBarn): barn is RegistrertBarn => {
    return 'aktørId' in barn;
};
