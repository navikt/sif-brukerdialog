import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { RegistrertBarn } from '../../../types/RegistrertBarn';
import { OmOmsorgenForBarnSøknadsdata, Søknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { OmOmsorgenForBarnFormValues } from './OmOmsorgenForBarnStep';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { dateFormatter } from '@navikt/sif-common-utils';
import { FormattedMessage } from 'react-intl';
import { AnnetBarn } from '@navikt/sif-common-forms-ds/src/forms/annet-barn';

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
                <FormattedMessage
                    id="step.omOmsorgenForBarn.form.født"
                    values={{ dato: dateFormatter.compact(registrertBarn.fødselsdato) }}
                />
            </span>

            <span className="dineBarn__navn">
                {formatName(registrertBarn.fornavn, registrertBarn.etternavn, registrertBarn.mellomnavn)}
            </span>
        </span>
    );
};

export const getBarnOptions = (registrertBarn: RegistrertBarn[] = [], andreBarn: AnnetBarn[] = []) => {
    return [
        ...registrertBarn.map((barnet) => ({
            label: (
                <FormattedMessage
                    id="step.omOmsorgenForBarn.form.fødtNavn"
                    values={{
                        dato: dateFormatter.compact(barnet.fødselsdato),
                        navn: formatName(barnet.fornavn, barnet.etternavn),
                    }}
                />
            ),
            value: barnet.aktørId,
        })),
        ...andreBarn.map((barnet) => ({
            label: (
                <FormattedMessage
                    id="step.omOmsorgenForBarn.form.fødtNavn"
                    values={{
                        dato: dateFormatter.compact(barnet.fødselsdato),
                        navn: barnet.navn,
                    }}
                />
            ),
            value: barnet.fnr,
        })),
    ];
};
