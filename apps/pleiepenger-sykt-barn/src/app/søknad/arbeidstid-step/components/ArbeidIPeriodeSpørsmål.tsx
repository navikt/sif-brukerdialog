import { Ingress } from '@navikt/ds-react';
import { useEffect, useState } from 'react';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import {
    ArbeiderIPeriodenSvar,
    ArbeidIPeriodeIntlValues,
    ArbeidsforholdType,
} from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeFormField, MisterHonorarerFraVervIPerioden } from '../../../types/ArbeidIPeriodeFormValues';
import { ArbeidsforholdFormValues, ArbeidsforholdFrilanserFormValues } from '../../../types/ArbeidsforholdFormValues';
import { FrilansTyper } from '../../../types/FrilansFormData';
import { NormalarbeidstidSøknadsdata } from '../../../types/søknadsdata/Søknadsdata';
import { søkerNoeFremtid } from '../../../utils/søknadsperiodeUtils';
import SøknadFormComponents from '../../SøknadFormComponents';
import { arbeidIPeriodeSpørsmålConfig } from '../utils/arbeidIPeriodeSpørsmålConfig';
import {
    getArbeidIPeriodeArbeiderIPeriodenValidator,
    getArbeidIPeriodeArbeiderIPeriodenVervValidator,
    getArbeidIPeriodeErLiktHverUkeValidator,
    getArbeidIPeriodeTimerEllerProsentValidator,
} from '../validationArbeidIPeriodeSpørsmål';
import ArbeidstidInput from './ArbeidstidInput';
import ArbeidstidUkerSpørsmål from './ArbeidstidUkerSpørsmål';
import InfoOmEndring from './InfoOmEndring';

interface Props {
    aktivitetType: 'arbeidstaker' | 'sn' | 'frilans';
    normalarbeidstid: NormalarbeidstidSøknadsdata;
    parentFieldName: string;
    arbeidsforhold: ArbeidsforholdFormValues | ArbeidsforholdFrilanserFormValues;
    arbeidsforholdType: ArbeidsforholdType;
    arbeidsstedNavn: string;
    frilansType?: FrilansTyper[];
    misterHonorarer?: YesOrNo;
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
    frilansType,
    misterHonorarer,
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
    const { arbeiderIPerioden, timerEllerProsent, misterHonorarerFraVervIPerioden } = arbeidIPeriode || {};

    const visibility = arbeidIPeriodeSpørsmålConfig.getVisbility({
        formValues: arbeidIPeriode || {},
        arbeidsperiode,
    });

    const frilansRedusert =
        frilansType &&
        frilansType.some((type) => type === FrilansTyper.FRILANS) &&
        arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert;

    const vervRedusert =
        frilansType &&
        frilansType.some((type) => type === FrilansTyper.STYREVERV) &&
        misterHonorarer === YesOrNo.YES &&
        misterHonorarerFraVervIPerioden === MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer;

    const getFrilansVerv = (): string => {
        if (frilansRedusert && !vervRedusert) {
            return 'frilans';
        }
        if (vervRedusert && !frilansRedusert) {
            return 'verv';
        }
        if (frilansRedusert && vervRedusert) {
            return 'frilansVerv';
        }
        return '';
    };

    return (
        <>
            {(aktivitetType === 'sn' ||
                aktivitetType === 'arbeidstaker' ||
                (frilansType && frilansType.some((type) => type === FrilansTyper.FRILANS))) && (
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
            )}
            {frilansType &&
                frilansType.some((type) => type === FrilansTyper.STYREVERV && misterHonorarer === YesOrNo.YES) && (
                    <FormBlock>
                        <SøknadFormComponents.RadioGroup
                            name={getFieldName(ArbeidIPeriodeFormField.misterHonorarerFraVervIPerioden)}
                            legend={intlHelper(intl, `arbeidIPeriode.arbeiderIPerioden.verv.spm`)}
                            validate={getArbeidIPeriodeArbeiderIPeriodenVervValidator()}
                            radios={[
                                {
                                    label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.verv.misterHonorar'),
                                    value: MisterHonorarerFraVervIPerioden.misterAlleHonorarer,
                                    'data-testid': MisterHonorarerFraVervIPerioden.misterAlleHonorarer,
                                },
                                {
                                    label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.verv.misterDeller'),
                                    value: MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer,
                                    'data-testid': MisterHonorarerFraVervIPerioden.misterDelerAvHonorarer,
                                },
                            ]}
                        />
                    </FormBlock>
                )}
            {(arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert || vervRedusert) && (
                <FormBlock margin="l">
                    <ResponsivePanel border={true}>
                        <Ingress>
                            <FormattedMessage id="arbeidIPeriode.redusert.info.tittel" />
                        </Ingress>
                        {frilansRedusert && !vervRedusert && (
                            <Block margin="l">
                                <FormattedMessage id="arbeidIPeriode.redusert.info.frilans.info.tittel" />
                            </Block>
                        )}

                        {vervRedusert && !frilansRedusert && (
                            <Block margin="l">
                                <FormattedMessage id="arbeidIPeriode.redusert.info.verv.info.tittel" />
                            </Block>
                        )}

                        {vervRedusert && frilansRedusert && (
                            <Block margin="l">
                                <FormattedMessage id="arbeidIPeriode.redusert.info.frilansVerv.info.tittel.1" />
                                <ul>
                                    <li>
                                        <FormattedMessage id="arbeidIPeriode.redusert.info.frilansVerv.info.tittel.2" />
                                    </li>

                                    <li>
                                        <FormattedMessage id="arbeidIPeriode.redusert.info.frilansVerv.info.tittel.4" />
                                    </li>
                                </ul>
                            </Block>
                        )}

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
                                    legend={intlHelper(
                                        intl,
                                        frilansRedusert || vervRedusert
                                            ? `arbeidIPeriode.erLiktHverUke.spm.${getFrilansVerv()}`
                                            : `arbeidIPeriode.erLiktHverUke.spm`,
                                        intlValues
                                    )}
                                    validate={getArbeidIPeriodeErLiktHverUkeValidator(
                                        intlValues,
                                        frilansRedusert || vervRedusert ? getFrilansVerv() : undefined
                                    )}
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
                                    legend={intlHelper(
                                        intl,
                                        frilansRedusert || vervRedusert
                                            ? `arbeidIPeriode.timerEllerProsent.spm.${getFrilansVerv()}`
                                            : `arbeidIPeriode.timerEllerProsent.spm`,
                                        intlValues
                                    )}
                                    radios={getTimerEllerProsentRadios(intl, intlValues)}
                                    validate={getArbeidIPeriodeTimerEllerProsentValidator(
                                        intlValues,
                                        frilansRedusert || vervRedusert ? getFrilansVerv() : undefined
                                    )}
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
                                    erFrilanser={frilansRedusert || vervRedusert}
                                    frilansVervString={
                                        frilansRedusert || vervRedusert
                                            ? intlHelper(
                                                  intl,
                                                  `arbeidIPeriode.ulikeUkerGruppe.frilanser.spm.${getFrilansVerv()}`
                                              )
                                            : undefined
                                    }
                                    frilansVervValideringString={
                                        frilansRedusert || vervRedusert
                                            ? intlHelper(
                                                  intl,
                                                  `validation.arbeidIPeriode.${getFrilansVerv()}.valideringString`,
                                                  { hverUke: '' }
                                              )
                                            : undefined
                                    }
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
                                    frilans={frilansRedusert || vervRedusert}
                                    frilansVervString={
                                        frilansRedusert || vervRedusert
                                            ? intlHelper(
                                                  intl,
                                                  `arbeidIPeriode.${timerEllerProsent}.frilanser.spm.${getFrilansVerv()}`
                                              )
                                            : undefined
                                    }
                                    frilansVervValideringString={
                                        frilansRedusert || vervRedusert
                                            ? intlHelper(
                                                  intl,
                                                  `validation.arbeidIPeriode.${getFrilansVerv()}.valideringString`,
                                                  { hverUke: timerEllerProsent === 'timer' ? 'hver uke' : '' }
                                              )
                                            : undefined
                                    }
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
