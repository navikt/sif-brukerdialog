import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
    DateDurationMap,
    DateRange,
    getDatesInMonthOutsideDateRange,
    getMonthsInDateRange,
} from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
import { ArbeidsforholdType, ArbeidstidRegistrertLogProps } from '../types';
import FormikInputGroup from '@navikt/sif-common-formik-ds/lib/components/formik-input-group/FormikInputGroup';
import { Heading } from '@navikt/ds-react';
import { ArbeidstidFormFields, ArbeidstidFormValues } from '../../ArbeidstidStep';
import SøknadsperioderMånedListe from '../../../../../local-sif-common-pleiepenger/common/søknadsperioder-måned-liste/SøknadsperioderMånedListe';
import ArbeidstidKalender from '../../../../../local-sif-common-pleiepenger/arbeidstid/arbeidstid-kalender/ArbeidstidKalender';
import { validateArbeidsTidEnkeltdager } from '../validation/validateArbeidsTidEnkeltdager';
import { TidEnkeltdagEndring } from '../../../../../local-sif-common-pleiepenger/tid/tid-enkeltdag-dialog/TidEnkeltdagForm';
import { ArbeidIPeriodeIntlValues } from '../../../../../local-sif-common-pleiepenger/types';

interface Props extends ArbeidstidRegistrertLogProps {
    arbeidsstedNavn: string;
    arbeidsforholdType: ArbeidsforholdType;
    formFieldName: ArbeidstidFormFields;
    periode: DateRange;
    jobberNormaltTimer: number;
    arbeidstid?: DateDurationMap;
    intlValues: ArbeidIPeriodeIntlValues;
    kanLeggeTilPeriode: boolean;
    onArbeidstidVariertChanged?: (arbeidstid: DateDurationMap) => void;
}

const ArbeidstidVariert: React.FC<Props> = ({
    formFieldName,
    arbeidstid = {},
    arbeidsstedNavn,
    arbeidsforholdType,
    periode,
    intlValues,
    onArbeidstidVariertChanged,
    onArbeidstidEnkeltdagRegistrert,
}) => {
    const { setFieldValue } = useFormikContext<ArbeidstidFormValues>() || {};

    const antallMåneder = getMonthsInDateRange(periode).length;

    const handleOnEnkeltdagChange = (evt: TidEnkeltdagEndring) => {
        const newValues = { ...arbeidstid, ...evt.dagerMedTid };
        setFieldValue(formFieldName as any, newValues);
        if (onArbeidstidEnkeltdagRegistrert) {
            onArbeidstidEnkeltdagRegistrert({ antallDager: Object.keys(evt.dagerMedTid).length });
        }
        onArbeidstidVariertChanged ? onArbeidstidVariertChanged(newValues) : undefined;
    };

    const månedContentRenderer = (måned: DateRange) => {
        return (
            <ArbeidstidKalender
                arbeidsstedNavn={arbeidsstedNavn}
                arbeidsforholdType={arbeidsforholdType}
                måned={måned}
                åpentEkspanderbartPanel={antallMåneder === 1}
                tidArbeidstid={arbeidstid}
                utilgjengeligeDatoer={getDatesInMonthOutsideDateRange(måned.from, periode)}
                periode={periode}
                onEnkeltdagChange={handleOnEnkeltdagChange}
            />
        );
    };

    return (
        <FormikInputGroup
            legend=""
            name={`${formFieldName}_dager`}
            validate={() => validateArbeidsTidEnkeltdager(arbeidstid, periode, intlValues)}>
            <Heading level="3" size="medium">
                <FormattedMessage id={'arbeidstidVariert.kortPeriode.tittel'} />
            </Heading>
            <p>
                <FormattedMessage id="arbeidstidVariert.kortPeriode.info" values={intlValues} />
            </p>
            <SøknadsperioderMånedListe periode={periode} månedContentRenderer={månedContentRenderer} />
        </FormikInputGroup>
    );
};

export default ArbeidstidVariert;
