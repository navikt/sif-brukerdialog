import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { ArbeiderIPeriodenSvar, ArbeidsforholdType } from '../../../local-sif-common-pleiepenger';
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
    getArbeidIPeriodeArbeiderIPeriodenFrilanserValidator,
    getArbeidIPeriodeArbeiderIPeriodenVervValidator,
    getArbeidIPeriodeErLiktHverUkeFrilansVervValidator,
} from '../validationArbeidIPeriodeSpørsmål';
import ArbeidstidInput from './ArbeidstidInput';
import ArbeidstidUkerSpørsmål from './ArbeidstidUkerSpørsmål';
import InfoOmEndring from './InfoOmEndring';

interface Props {
    normalarbeidstid: NormalarbeidstidSøknadsdata;
    parentFieldName: string;
    arbeidsforhold: ArbeidsforholdFormValues | ArbeidsforholdFrilanserFormValues;
    arbeidsforholdType: ArbeidsforholdType;
    arbeidsstedNavn: string;
    frilansType: FrilansTyper[];
    misterHonorarer?: YesOrNo;
    arbeidsperiode: DateRange;
    søknadsperiode: DateRange;
    onArbeidstidVariertChange: () => void;
}

const ArbeidIPeriodeSpørsmålFrilans = ({
    arbeidsforhold,
    parentFieldName,
    arbeidsforholdType,
    arbeidsperiode,
    søknadsperiode,
    arbeidsstedNavn,
    normalarbeidstid,
    frilansType,
    misterHonorarer,
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
    const { arbeiderIPerioden, misterHonorarerFraVervIPerioden } = arbeidIPeriode || {};

    const visibility = arbeidIPeriodeSpørsmålConfig.getVisbility({
        formValues: arbeidIPeriode || {},
        arbeidsperiode,
    });

    const frilansRedusert =
        frilansType.some((type) => type === FrilansTyper.FRILANS) &&
        arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert;

    const vervRedusert =
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
        <ResponsivePanel>
            {frilansType.some((type) => type === FrilansTyper.FRILANS) && (
                <FormBlock margin="m">
                    <SøknadFormComponents.RadioGroup
                        name={getFieldName(ArbeidIPeriodeFormField.arbeiderIPerioden)}
                        legend={intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.frilans.spm')}
                        validate={getArbeidIPeriodeArbeiderIPeriodenFrilanserValidator()}
                        radios={[
                            {
                                label: intlHelper(intl, 'arbeidIPeriode.arbeiderIPerioden.svar.jobberIkke', intlValues),
                                value: ArbeiderIPeriodenSvar.heltFravær,
                                'data-testid': ArbeiderIPeriodenSvar.heltFravær,
                            },
                            {
                                label: intlHelper(
                                    intl,
                                    'arbeidIPeriode.arbeiderIPerioden.svar.jobberRedusert',
                                    intlValues
                                ),
                                value: ArbeiderIPeriodenSvar.redusert,
                                'data-testid': ArbeiderIPeriodenSvar.redusert,
                            },
                            {
                                label: intlHelper(
                                    intl,
                                    'arbeidIPeriode.arbeiderIPerioden.svar.jobberVanlig',
                                    intlValues
                                ),
                                value: ArbeiderIPeriodenSvar.somVanlig,
                                'data-testid': ArbeiderIPeriodenSvar.somVanlig,
                            },
                        ]}
                    />
                </FormBlock>
            )}

            {frilansType.some((type) => type === FrilansTyper.STYREVERV && misterHonorarer === YesOrNo.YES) && (
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

            {(frilansRedusert || vervRedusert) && (
                <FormBlock>
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
                        <InfoOmEndring aktivitetType="frilans" />
                    </Block>

                    {visibility.isIncluded(ArbeidIPeriodeFormField.erLiktHverUke) && (
                        <FormBlock>
                            <SøknadFormComponents.YesOrNoQuestion
                                name={getFieldName(ArbeidIPeriodeFormField.erLiktHverUke)}
                                legend={intlHelper(intl, 'arbeidIPeriode.erLiktHverUke.frilans.spm')}
                                validate={getArbeidIPeriodeErLiktHverUkeFrilansVervValidator()}
                                data-testid="er-likt-hver-uke"
                                labels={{
                                    yes: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.ja`),
                                    no: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.nei`),
                                }}
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
                                frilansVervString={intlHelper(
                                    intl,
                                    `arbeidIPeriode.timerAvNormalt.frilanser.spm.${getFrilansVerv()}`
                                )}
                            />
                        </FormBlock>
                    )}

                    {visibility.isVisible(ArbeidIPeriodeFormField.erLiktHverUke) &&
                        !visibility.isVisible(ArbeidIPeriodeFormField.arbeidsuker) &&
                        arbeidIPeriode &&
                        arbeidIPeriode.erLiktHverUke && (
                            <ArbeidstidInput
                                arbeidIPeriode={arbeidIPeriode}
                                parentFieldName={arbeidIPeriodeParentFieldName}
                                intlValues={intlValues}
                                normalarbeidstid={normalarbeidstid}
                                timerEllerProsent={TimerEllerProsent.TIMER}
                                frilans={true}
                                frilansVervString={intlHelper(
                                    intl,
                                    `arbeidIPeriode.timerAvNormalt.frilanser.spm.${getFrilansVerv()}`
                                )}
                            />
                        )}
                </FormBlock>
            )}
        </ResponsivePanel>
    );
};

export default ArbeidIPeriodeSpørsmålFrilans;
