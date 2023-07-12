import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { useFormikContext } from 'formik';
import FormSection from '../../../components/form-section/FormSection';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { ArbeidIPeriodeFormField } from '../../../types/ArbeidIPeriodeFormValues';
import { FrilansFormField } from '../../../types/FrilansFormData';
import { SøknadFormValues } from '../../../types/SøknadFormValues';
import { FrilanserSøknadsdata } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import { søkerNoeFremtid } from '../../../utils/søknadsperiodeUtils';
import { getArbeidstidSpørsmål, getArbeidstidValidationIntlKey } from './arbeidIPeriodeTekstUtils';
import ArbeidRedusertPart, { RedusertArbeidAktivitetType } from './ArbeidRedusertPart';
import ArbeiderIPeriodenSpørsmål from './spørsmål/ArbeiderIPeriodenSpørsmål';
import HonorararbeidIPeriodenSpørsmål from './spørsmål/HonorararbeidIPeriodenSpørsmål';

interface Props {
    frilanser: FrilanserSøknadsdata;
    søknadsperiode: DateRange;
}

const ArbeidstidFrilanser: React.FunctionComponent<Props> = ({ frilanser, søknadsperiode }) => {
    const {
        values: {
            frilans: { arbeidsforholdFrilansarbeid, arbeidsforholdHonorararbeid },
        },
    } = useFormikContext<SøknadFormValues>();
    const intl = useIntl();

    if (frilanser.harInntektSomFrilanser === false || frilanser.misterInntektSomFrilanserIPeriode === false) {
        return null;
    }

    const frilansarbeidRedusert =
        arbeidsforholdFrilansarbeid?.arbeidIPeriode?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert;
    const honorararbeidRedusert =
        arbeidsforholdHonorararbeid?.arbeidIPeriode?.arbeiderIPerioden === ArbeiderIPeriodenSvar.redusert;

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        periode: frilanser.periodeinfo.aktivPeriode,
        jobberNormaltTimer: 0, // TODO frilanser.arbeidsforhold.normalarbeidstid.timerPerUkeISnitt,
    });

    const spørsmål = getArbeidstidSpørsmål(intl, RedusertArbeidAktivitetType.FRILANSARBEID);
    const validation = getArbeidstidValidationIntlKey(RedusertArbeidAktivitetType.FRILANSARBEID);

    return (
        <FormSection title={intlHelper(intl, 'arbeidIPeriode.FrilansLabel')}>
            <>
                <div data-testid="arbeidIPerioden_frilanser">
                    {frilanser.arbeidsforholdFrilanserarbeid && (
                        <FormBlock>
                            <ArbeiderIPeriodenSpørsmål
                                fieldName={
                                    `${FrilansFormField.arbeidsforholdFrilansarbeid}.arbeidIPeriode.${ArbeidIPeriodeFormField.arbeiderIPerioden}` as any
                                }
                                intlValues={intlValues}
                                spørsmål={spørsmål.erLiktHverUke}
                                validationIntlKey={validation.erLiktHverUke}
                            />
                            {frilansarbeidRedusert && (
                                <FormBlock>
                                    <ArbeidRedusertPart
                                        aktivitetType={RedusertArbeidAktivitetType.FRILANSARBEID}
                                        parentFieldName={FrilansFormField.arbeidsforholdFrilansarbeid}
                                        arbeidIPeriodenValues={arbeidsforholdFrilansarbeid?.arbeidIPeriode}
                                        søkerNoeFremtid={søkerNoeFremtid(søknadsperiode)}
                                        normalarbeidstid={
                                            frilanser.arbeidsforholdFrilanserarbeid.normalarbeidstid.timerPerUkeISnitt
                                        }
                                        intlValues={intlValues}
                                    />
                                </FormBlock>
                            )}
                        </FormBlock>
                    )}
                    {frilanser.arbeidsforholdHonorararbeid && frilanser.arbeidsforholdHonorararbeid.misterHonorar && (
                        <FormBlock>
                            <HonorararbeidIPeriodenSpørsmål
                                fieldName={
                                    `${FrilansFormField.arbeidsforholdHonorararbeid}.arbeidIPeriode.${ArbeidIPeriodeFormField.arbeiderIPerioden}` as any
                                }
                            />
                            {honorararbeidRedusert && (
                                <FormBlock>
                                    <ArbeidRedusertPart
                                        aktivitetType={RedusertArbeidAktivitetType.HONORARARBEID}
                                        intlValues={intlValues}
                                        arbeidIPeriodenValues={arbeidsforholdHonorararbeid?.arbeidIPeriode}
                                        søkerNoeFremtid={søkerNoeFremtid(søknadsperiode)}
                                        parentFieldName={FrilansFormField.arbeidsforholdHonorararbeid}
                                        normalarbeidstid={
                                            frilanser.arbeidsforholdHonorararbeid.normalarbeidstid.timerPerUkeISnitt
                                        }
                                    />
                                </FormBlock>
                            )}
                        </FormBlock>
                    )}
                </div>
            </>
        </FormSection>
    );
};

export default ArbeidstidFrilanser;
