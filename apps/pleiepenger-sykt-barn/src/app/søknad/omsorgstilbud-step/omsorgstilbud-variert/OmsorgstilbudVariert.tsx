import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import {
    DateDurationMap,
    DateRange,
    getDatesInMonthOutsideDateRange,
    getMonthsInDateRange,
} from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import OmsorgstilbudMåned from '../../../local-sif-common-pleiepenger/components/omsorgstilbud-periode/OmsorgstilbudMåned';
import SøknadsperioderMånedListe from '../../../local-sif-common-pleiepenger/components/søknadsperioder-måned-liste/SøknadsperioderMånedListe';
import { TidEnkeltdagEndring } from '../../../local-sif-common-pleiepenger/components/tid-enkeltdag-dialog/TidEnkeltdagForm';
import { SøknadFormField, SøknadFormValues } from '../../../types/søknad-form-values/SøknadFormValues';
import { validateOmsorgstilbudEnkeltdagerIPeriode } from '../../../validation/fieldValidations';
import SøknadFormComponents from '../../SøknadFormComponents';
import { skalViseSpørsmålOmProsentEllerLiktHverUke } from '../omsorgstilbudStepUtils';
import OmsorgstilbudPeriode from './OmsorgstilbudPeriode';

interface Props {
    tittel: string;
    formFieldName: SøknadFormField;
    periode: DateRange;
    tidIOmsorgstilbud: DateDurationMap;
    omsorgsdager: DateDurationMap;
    onOmsorgstilbudChanged?: () => void;
}

const OmsorgstilbudVariert: React.FunctionComponent<Props> = ({
    tittel,
    periode,
    tidIOmsorgstilbud,
    formFieldName,
    omsorgsdager,
    onOmsorgstilbudChanged,
}) => {
    const kanLeggeTilPeriode = skalViseSpørsmålOmProsentEllerLiktHverUke(periode);

    const { setFieldValue } = useFormikContext<SøknadFormValues>() || {};
    const antallMåneder = getMonthsInDateRange(periode).length;

    const handleOnPeriodeChange = (data: DateDurationMap) => {
        const dagerMedOmsorgstilbud = { ...tidIOmsorgstilbud, ...data };
        setFieldValue(formFieldName, dagerMedOmsorgstilbud);
        if (onOmsorgstilbudChanged) {
            onOmsorgstilbudChanged();
        }
    };

    const handleOnEnkeltdagChange = (evt: TidEnkeltdagEndring) => {
        const newValues = { ...omsorgsdager, ...evt.dagerMedTid };
        setFieldValue(formFieldName as any, newValues);
        if (onOmsorgstilbudChanged) {
            onOmsorgstilbudChanged();
        }
    };

    const omsorgstilbudMånedRenderer = (måned: DateRange) => {
        return (
            <OmsorgstilbudMåned
                periode={periode}
                måned={måned}
                tidOmsorgstilbud={omsorgsdager}
                utilgjengeligeDatoer={getDatesInMonthOutsideDateRange(måned.from, periode)}
                defaultOpen={antallMåneder === 1 || kanLeggeTilPeriode === false}
                onEnkeltdagChange={handleOnEnkeltdagChange}
                månedTittelHeadingLevel="3"
            />
        );
    };

    return (
        <>
            <SøknadFormComponents.InputGroup
                name={formFieldName}
                legend={tittel}
                validate={() => validateOmsorgstilbudEnkeltdagerIPeriode(tidIOmsorgstilbud, periode)}>
                {kanLeggeTilPeriode && (
                    <>
                        <Block margin="m" padBottom="l">
                            <OmsorgstilbudPeriode periode={periode} onPeriodeChange={handleOnPeriodeChange} />
                        </Block>
                    </>
                )}
                <Block margin="l">
                    <SøknadsperioderMånedListe
                        periode={periode}
                        årstallHeadingLevel="3"
                        månedContentRenderer={omsorgstilbudMånedRenderer}
                    />
                </Block>
            </SøknadFormComponents.InputGroup>
        </>
    );
};

export default OmsorgstilbudVariert;
