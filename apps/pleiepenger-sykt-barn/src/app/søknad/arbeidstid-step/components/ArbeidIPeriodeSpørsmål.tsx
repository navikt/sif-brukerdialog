import { Ingress } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import {
    ArbeiderIPeriodenSvar,
    ArbeidIPeriodeIntlValues,
    ArbeidsforholdType,
} from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeFormField } from '../../../types/ArbeidIPeriodeFormValues';
import { ArbeidsforholdFormValues, ArbeidsforholdFrilanserFormValues } from '../../../types/ArbeidsforholdFormValues';
import { NormalarbeidstidSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { søkerNoeFremtid } from '../../../utils/søknadsperiodeUtils';
import SøknadFormComponents from '../../SøknadFormComponents';
import { arbeidIPeriodeSpørsmålConfig } from '../utils/arbeidIPeriodeSpørsmålConfig';
import {
    getArbeidIPeriodeArbeiderIPeriodenValidator,
    getArbeidIPeriodeErLiktHverUkeValidator,
    getArbeidIPeriodeTimerEllerProsentValidator,
} from '../validationArbeidIPeriodeSpørsmål';
import ArbeidstidInput from './ArbeidstidInput';
import ArbeidstidUkerSpørsmål from './ArbeidstidUkerSpørsmål';
import InfoOmEndring from './InfoOmEndring';

interface Props {
    aktivitetType: 'arbeidstaker' | 'sn';
    normalarbeidstid: NormalarbeidstidSøknadsdata;
    parentFieldName: string;
    arbeidsforhold: ArbeidsforholdFormValues | ArbeidsforholdFrilanserFormValues;
    arbeidsforholdType: ArbeidsforholdType;
    arbeidsstedNavn: string;
    arbeidsperiode: DateRange;
    søknadsperiode: DateRange;
    onArbeidstidVariertChange: () => void;
}

const ArbeidIPeriodeSpørsmål = ({
    aktivitetType,
    arbeidsforhold,
    parentFieldName,
    arbeidsforholdType,
    arbeidsperiode,
    søknadsperiode,
    arbeidsstedNavn,
    normalarbeidstid,
    onArbeidstidVariertChange,
}: Props) => {
    const intl = useIntl();
    const [arbeidstidChanged, setArbeidstidChanged] = useState(false);

    useEffect(() => {
        if (arbeidstidChanged === true) {
            setArbeidstidChanged(false);
            onArbeidstidVariertChange();
        }
    }, [arbeidstidChanged, onArbeidstidVariertChange]);

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        arbeidsforhold: {
            type: arbeidsforholdType,
            arbeidsstedNavn,
            jobberNormaltTimer: normalarbeidstid.timerPerUkeISnitt,
        },
        periode: arbeidsperiode,
    });

    const arbeidIPeriodeParentFieldName = `${parentFieldName}.arbeidIPeriode`;
    const getFieldName = (field: ArbeidIPeriodeFormField) => `${arbeidIPeriodeParentFieldName}.${field}` as any;

    const { arbeidIPeriode } = arbeidsforhold;
    const { arbeiderIPerioden, timerEllerProsent } = arbeidIPeriode || {};

    const visibility = arbeidIPeriodeSpørsmålConfig.getVisbility({
        formValues: arbeidIPeriode || {},
        arbeidsperiode,
    });

    return (
        <>
            <SøknadFormComponents.RadioGroup
                name={getFieldName(ArbeidIPeriodeFormField.arbeiderIPerioden)}
                legend={intlHelper(intl, `arbeidIPeriode.arbeiderIPerioden.spm`, intlValues)}
                validate={getArbeidIPeriodeArbeiderIPeriodenValidator(intlValues)}
                radios={[
                    {
                        label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke', intlValues),
                        value: ArbeiderIPeriodenSvar.heltFravær,
                        'data-testid': ArbeiderIPeriodenSvar.heltFravær,
                    },
                    {
                        label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert', intlValues),
                        value: ArbeiderIPeriodenSvar.redusert,
                        'data-testid': ArbeiderIPeriodenSvar.redusert,
                    },
                    {
                        label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig', intlValues),
                        value: ArbeiderIPeriodenSvar.somVanlig,
                        'data-testid': ArbeiderIPeriodenSvar.somVanlig,
                    },
                ]}
            />
            {arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert && (
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
                        <Ingress>
                            <FormattedMessage id="arbeidIPeriode.redusert.info.tittel" />
                        </Ingress>

                        {søkerNoeFremtid(arbeidsperiode) && (
                            <p>
                                <FormattedMessage id="arbeidIPeriode.redusert.info.tekst" />
                            </p>
                        )}
                        <Block margin="m">
                            <InfoOmEndring aktivitetType={aktivitetType} />
                        </Block>

                        {visibility.isIncluded(ArbeidIPeriodeFormField.erLiktHverUke) && (
                            <FormBlock>
                                <SøknadFormComponents.YesOrNoQuestion
                                    name={getFieldName(ArbeidIPeriodeFormField.erLiktHverUke)}
                                    legend={intlHelper(intl, `arbeidIPeriode.erLiktHverUke.spm`, intlValues)}
                                    validate={getArbeidIPeriodeErLiktHverUkeValidator(intlValues)}
                                    data-testid="er-likt-hver-uke"
                                    labels={{
                                        yes: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.ja`),
                                        no: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.nei`),
                                    }}
                                />
                            </FormBlock>
                        )}
                        {visibility.isIncluded(ArbeidIPeriodeFormField.timerEllerProsent) && (
                            <FormBlock>
                                <SøknadFormComponents.RadioGroup
                                    name={getFieldName(ArbeidIPeriodeFormField.timerEllerProsent)}
                                    legend={intlHelper(intl, `arbeidIPeriode.timerEllerProsent.spm`, intlValues)}
                                    radios={getTimerEllerProsentRadios(intl, intlValues)}
                                    validate={getArbeidIPeriodeTimerEllerProsentValidator(intlValues)}
                                />
                            </FormBlock>
                        )}

                        {visibility.isVisible(ArbeidIPeriodeFormField.arbeidsuker) && arbeidIPeriode !== undefined && (
                            <FormBlock>
                                <ArbeidstidUkerSpørsmål
                                    periode={arbeidsperiode}
                                    søknadsperiode={søknadsperiode}
                                    parentFieldName={arbeidIPeriodeParentFieldName}
                                    normalarbeidstid={normalarbeidstid}
                                    timerEllerProsent={TimerEllerProsent.TIMER}
                                    arbeidIPeriode={arbeidIPeriode}
                                    intlValues={intlValues}
                                />
                            </FormBlock>
                        )}

                        {visibility.isVisible(ArbeidIPeriodeFormField.timerEllerProsent) &&
                            arbeidIPeriode &&
                            timerEllerProsent && (
                                <ArbeidstidInput
                                    arbeidIPeriode={arbeidIPeriode}
                                    parentFieldName={arbeidIPeriodeParentFieldName}
                                    intlValues={intlValues}
                                    normalarbeidstid={normalarbeidstid}
                                    timerEllerProsent={timerEllerProsent}
                                />
                            )}
                    </ResponsivePanel>
                </FormBlock>
            )}
        </>
    );
};

const getTimerEllerProsentRadios = (intl: IntlShape, intlValues: ArbeidIPeriodeIntlValues) => [
    {
        label: intlHelper(intl, `arbeidIPeriode.timerEllerProsent.prosent`, intlValues),
        value: TimerEllerProsent.PROSENT,
        'data-testid': TimerEllerProsent.PROSENT,
    },
    {
        label: intlHelper(intl, `arbeidIPeriode.timerEllerProsent.timer`, intlValues),
        value: TimerEllerProsent.TIMER,
        'data-testid': TimerEllerProsent.TIMER,
    },
];

export default ArbeidIPeriodeSpørsmål;
