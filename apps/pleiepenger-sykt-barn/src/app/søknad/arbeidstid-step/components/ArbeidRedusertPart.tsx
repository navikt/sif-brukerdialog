import { Ingress } from '@navikt/ds-react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import ResponsivePanel from '../../../components/responsive-panel/ResponsivePanel';
import { ArbeidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger';
import { TimerEllerProsent } from '../../../types';
import { ArbeidIPeriodeFormField, ArbeidIPeriodeFormValues } from '../../../types/ArbeidIPeriodeFormValues';
import SøknadFormComponents from '../../SøknadFormComponents';
import {
    getArbeidIPeriodeErLiktHverUkeValidator,
    getArbeidIPeriodeTimerEllerProsentValidator,
} from '../validationArbeidIPeriodeSpørsmål';
import ArbeidstidInput from './arbeidstid-uker-spørsmål/ArbeidstidInput';
import { getArbeidstidSpørsmål } from './arbeidIPeriodeTekstUtils';

export enum RedusertArbeidAktivitetType {
    'ARBEIDSTAKER' = 'ARBEIDSTAKER',
    'SN' = 'SN',
    'HONORARARBEID' = 'HONORARARBEID',
    'FRILANSARBEID' = 'FRILANSARBEID',
}

interface Props {
    aktivitetType: RedusertArbeidAktivitetType;
    parentFieldName: string;
    arbeidIPeriodenValues?: ArbeidIPeriodeFormValues;
    søkerNoeFremtid: boolean;
    normalarbeidstid: number;
    intlValues: ArbeidIPeriodeIntlValues;
}

const ArbeidRedusertPart = ({
    aktivitetType,
    parentFieldName,
    søkerNoeFremtid,
    arbeidIPeriodenValues,
    normalarbeidstid,
    intlValues,
}: Props) => {
    const intl = useIntl();
    const getFieldName = (field: ArbeidIPeriodeFormField) => `${parentFieldName}.arbeidIPeriode.${field}` as any;

    const spørsmål = getArbeidstidSpørsmål(intl, aktivitetType, intlValues);

    return (
        <FormBlock margin="l">
            <ResponsivePanel border={true}>
                <Ingress>
                    <FormattedMessage id="arbeidIPeriode.redusert.info.tittel" />
                </Ingress>
                {søkerNoeFremtid && (
                    <p>
                        <FormattedMessage id="arbeidIPeriode.redusert.info.tekst" />
                    </p>
                )}
                {/* <Block margin="m">
                    <InfoOmEndring aktivitetType={aktivitetType} />
                </Block> */}

                <FormBlock>
                    <SøknadFormComponents.YesOrNoQuestion
                        name={getFieldName(ArbeidIPeriodeFormField.erLiktHverUke)}
                        legend={spørsmål.erLiktHverUke}
                        validate={getArbeidIPeriodeErLiktHverUkeValidator(intlValues)}
                        labels={{
                            yes: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.ja`),
                            no: intlHelper(intl, `arbeidIPeriode.erLiktHverUke.nei`),
                        }}
                    />
                </FormBlock>

                {arbeidIPeriodenValues?.erLiktHverUke === YesOrNo.YES && (
                    <>
                        <FormBlock>
                            <SøknadFormComponents.RadioGroup
                                name={getFieldName(ArbeidIPeriodeFormField.timerEllerProsent)}
                                legend={spørsmål.timerEllerProsent}
                                radios={[
                                    {
                                        label: intlHelper(intl, `arbeidIPeriode.timerEllerProsent.prosent`),
                                        value: TimerEllerProsent.PROSENT,
                                        'data-testid': TimerEllerProsent.PROSENT,
                                    },
                                    {
                                        label: intlHelper(intl, `arbeidIPeriode.timerEllerProsent.timer`),
                                        value: TimerEllerProsent.TIMER,
                                        'data-testid': TimerEllerProsent.TIMER,
                                    },
                                ]}
                                validate={getArbeidIPeriodeTimerEllerProsentValidator(intlValues)}
                            />
                        </FormBlock>
                        {arbeidIPeriodenValues.timerEllerProsent !== undefined && (
                            <ArbeidstidInput
                                arbeidIPeriode={arbeidIPeriodenValues}
                                parentFieldName={parentFieldName}
                                normalarbeidstid={normalarbeidstid}
                                timerEllerProsent={arbeidIPeriodenValues.timerEllerProsent}
                                intlValues={intlValues}
                            />
                        )}
                    </>
                )}

                {/*

                <FormBlock>
                    <ArbeidstidUkerSpørsmål
                        periode={arbeidsperiode}
                        søknadsperiode={søknadsperiode}
                        parentFieldName={arbeidIPeriodeParentFieldName}
                        normalarbeidstid={normalarabeidstid}
                        timerEllerProsent={TimerEllerProsent.TIMER}
                        arbeidIPeriode={arbeidIPeriode}
                        intlValues={intlValues}
                        erFrilanser={frilansRedusert || vervRedusert}
                        frilansVervString={
                            frilansRedusert || vervRedusert
                                ? intlHelper(intl, `arbeidIPeriode.ulikeUkerGruppe.frilanser.spm.${getFrilansVerv()}`)
                                : undefined
                        }
                        frilansVervValideringString={
                            frilansRedusert || vervRedusert
                                ? intlHelper(intl, `validation.arbeidIPeriode.${getFrilansVerv()}.valideringString`, {
                                      hverUke: '',
                                  })
                                : undefined
                        }
                    />
                </FormBlock>

                <ArbeidstidInput
                    arbeidIPeriode={arbeidIPeriode}
                    parentFieldName={arbeidIPeriodeParentFieldName}
                    intlValues={intlValues}
                    normalarbeidstid={normalarbeidstid}
                    timerEllerProsent={timerEllerProsent}
                    frilans={frilansRedusert || vervRedusert}
                    frilansVervString={
                        frilansRedusert || vervRedusert
                            ? intlHelper(intl, `arbeidIPeriode.${timerEllerProsent}.frilanser.spm.${getFrilansVerv()}`)
                            : undefined
                    }
                    frilansVervValideringString={
                        frilansRedusert || vervRedusert
                            ? intlHelper(intl, `validation.arbeidIPeriode.${getFrilansVerv()}.valideringString`, {
                                  hverUke: timerEllerProsent === 'timer' ? 'hver uke' : '',
                              })
                            : undefined
                    }
                /> */}
            </ResponsivePanel>
        </FormBlock>
    );
};

export default ArbeidRedusertPart;
