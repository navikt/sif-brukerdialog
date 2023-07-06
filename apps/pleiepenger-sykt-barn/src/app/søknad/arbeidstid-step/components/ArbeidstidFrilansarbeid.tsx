import React from 'react';
import { useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import FormSection from '../../../components/form-section/FormSection';
import { FrilansFormData, FrilansFormField } from '../../../types/FrilansFormData';
import { FrilanserSøknadsdata } from '../../../types/søknadsdata/ArbeidFrilansSøknadsdata';
import ArbeiderIPeriodenSpørsmål from './spørsmål/ArbeiderIPeriodenSpørsmål';
import HonorararbeidIPeriodenSpørsmål from './spørsmål/HonorararbeidIPeriodenSpørsmål';
import { ArbeiderIPeriodenSvar } from '../../../local-sif-common-pleiepenger';
import ArbeidRedusertPart, { RedusertArbeidAktivitetType } from './ArbeidRedusertPart';
import { søkerNoeFremtid } from '../../../utils/søknadsperiodeUtils';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { getArbeidstidIPeriodeIntlValues } from '../../../local-sif-common-pleiepenger/utils';
import { getArbeidstidSpørsmål, getArbeidstidValidationIntlKey } from './arbeidIPeriodeTekstUtils';

interface Props {
    frilanser: FrilanserSøknadsdata;
    values: FrilansFormData;
    søknadsperiode: DateRange;
}

const ArbeidstidFrilanser: React.FunctionComponent<Props> = ({ frilanser, values, søknadsperiode }) => {
    const intl = useIntl();

    if (frilanser.harInntektSomFrilanser === false || frilanser.misterInntektSomFrilanserIPeriode === false) {
        return null;
    }

    const frilansarbeidRedusert = values.frilansarbeid_arbeiderIPeriodenSvar === ArbeiderIPeriodenSvar.redusert;
    const honorararbeidRedusert = values.honorararbeid_arbeiderIPeriodenSvar === ArbeiderIPeriodenSvar.redusert;

    const intlValues = getArbeidstidIPeriodeIntlValues(intl, {
        periode: frilanser.periodeinfo.aktivPeriode,
        jobberNormaltTimer: frilanser.arbeidsforhold.normalarbeidstid.timerPerUkeISnitt,
    });

    const spørsmål = getArbeidstidSpørsmål(intl, RedusertArbeidAktivitetType.FRILANSARBEID);
    const validation = getArbeidstidValidationIntlKey(RedusertArbeidAktivitetType.FRILANSARBEID);

    return (
        <FormSection title={intlHelper(intl, 'arbeidIPeriode.FrilansLabel')}>
            <>
                <div data-testid="arbeidIPerioden_frilanser">
                    {frilanser.frilansarbeid && (
                        <FormBlock>
                            <ArbeiderIPeriodenSpørsmål
                                fieldName={FrilansFormField.frilansarbeid_arbeiderIPeriodenSvar as any}
                                intlValues={intlValues}
                                spørsmål={spørsmål.erLiktHverUke}
                                validationIntlKey={validation.erLiktHverUke}
                            />
                            {frilansarbeidRedusert && (
                                <FormBlock>
                                    <ArbeidRedusertPart
                                        aktivitetType={RedusertArbeidAktivitetType.FRILANSARBEID}
                                        parentFieldName={`${FrilansFormField.arbeidsforhold}`}
                                        arbeidIPeriodenValues={values.arbeidsforhold?.arbeidIPeriode}
                                        søkerNoeFremtid={søkerNoeFremtid(søknadsperiode)}
                                        normalarbeidstid={frilanser.arbeidsforhold.normalarbeidstid}
                                        intlValues={intlValues}
                                    />
                                </FormBlock>
                            )}
                        </FormBlock>
                    )}
                    {frilanser.honorararbeid && (
                        <FormBlock>
                            <HonorararbeidIPeriodenSpørsmål
                                fieldName={FrilansFormField.honorararbeid_arbeiderIPeriodenSvar as any}
                            />
                            {honorararbeidRedusert && (
                                <FormBlock>
                                    <ArbeidRedusertPart
                                        aktivitetType={RedusertArbeidAktivitetType.HONORARARBEID}
                                        intlValues={intlValues}
                                        arbeidIPeriodenValues={values.arbeidsforhold?.arbeidIPeriode}
                                        søkerNoeFremtid={søkerNoeFremtid(søknadsperiode)}
                                        parentFieldName={`${FrilansFormField.arbeidsforhold}`}
                                        normalarbeidstid={frilanser.arbeidsforhold.normalarbeidstid}
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
