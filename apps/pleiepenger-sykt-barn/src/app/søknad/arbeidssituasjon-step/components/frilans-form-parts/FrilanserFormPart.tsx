/* eslint-disable no-console */
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { DateRange, ISODateToDate } from '@navikt/sif-common-utils/lib';
import dayjs from 'dayjs';
import { useFormikContext } from 'formik';
import ConditionalResponsivePanel from '../../../../components/conditional-responsive-panel/ConditionalResponsivePanel';
import { FrilansFormData, FrilansFormField, Frilanstype } from '../../../../types/FrilansFormData';
import { SøknadFormValues } from '../../../../types/SøknadFormValues';
import { erFrilanserISøknadsperiode } from '../../../../utils/frilanserUtils';
import ErFortsattFrilanserSpørsmål from './spørsmål/ErFortsattFrilanserSpørsmål';
import FrilansertypeSpørsmål from './spørsmål/FrilansertypeSpørsmål';
import FrilansNormalarbeidstidSpørsmål from './spørsmål/FrilansNormalarbeidstidSpørsmål';
import FrilansSluttdatoSpørsmål from './spørsmål/FrilansSluttdatoSpørsmål';
import FrilansStartdatoSpørsmål from './spørsmål/FrilansStartdatoSpørsmål';
import HarHattInntektSomFrilanserSpørsmål from './spørsmål/HarHattInntektSomFrilanserSpørsmål';
import MisterHonorarSpørsmål from './spørsmål/MisterHonorarSpørsmål';
import { InfoArbeiderNormaltTimerFrilanser } from '../info/InfoArbeiderNormaltTimerIUken';

export const ArbFriFormComponents = getTypedFormComponents<FrilansFormField, FrilansFormData, ValidationError>();

interface Props {
    søknadsperiode: DateRange;
    søknadsdato: Date;
    søkerHarFrilansoppdrag: boolean;
}

const FrilanserFormPart: React.FunctionComponent<Props> = ({ søknadsperiode, søkerHarFrilansoppdrag, søknadsdato }) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const {
        harHattInntektSomFrilanser,
        arbeidsforhold,
        misterHonorar,
        frilanstyper = [],
        erFortsattFrilanser,
        startdato,
        sluttdato,
    } = values.frilans;

    const erAktivFrilanserIPerioden = erFrilanserISøknadsperiode(søknadsperiode, values.frilans);
    const harGyldigStartdato = startdato ? ISODateToDate(startdato) : undefined;
    const harGyldigSluttdato = sluttdato ? ISODateToDate(sluttdato) : undefined;

    const harBesvartSpørsmålOmFortsattFrilanser =
        erFortsattFrilanser === YesOrNo.YES || erFortsattFrilanser === YesOrNo.NO;

    const sluttetFørSøknadsperiode =
        erFortsattFrilanser === YesOrNo.NO &&
        harGyldigSluttdato &&
        dayjs(sluttdato).isBefore(søknadsperiode.from, 'day');

    const harFrilansarbeid = frilanstyper?.some((type) => type === Frilanstype.FRILANSARBEID);
    const harHonorararbeid = frilanstyper?.some((type) => type === Frilanstype.HONORARARBEID);

    const visSpørsmålOmArbeidsforhold =
        harGyldigStartdato &&
        harBesvartSpørsmålOmFortsattFrilanser &&
        sluttetFørSøknadsperiode === false &&
        erAktivFrilanserIPerioden;

    const visNormalarbeidstidFrilansarbeid = visSpørsmålOmArbeidsforhold && harFrilansarbeid;
    const visNormalarbeidstidHonorararbeid =
        visSpørsmålOmArbeidsforhold && harHonorararbeid && misterHonorar === YesOrNo.YES;

    const visNormalarbeidstidSpørsmål = () => {
        if (!frilanstyper || frilanstyper.length === 0) {
            return false;
        }
        if (frilanstyper.length === 1 && harHonorararbeid && misterHonorar === YesOrNo.YES) {
            return true;
        }
        if (!harHonorararbeid) {
            return true;
        } else if (harHonorararbeid && frilanstyper.length > 1 && misterHonorar !== undefined) {
            return true;
        }
        return false;
    };

    const getFrilanstypeTekstKey = () => {
        if (frilanstyper === undefined || frilanstyper.length === 0) {
            return '';
        }
        const erFrilanser = frilanstyper.some((type) => type === Frilanstype.FRILANSARBEID);
        const erVerv = frilanstyper.some((type) => type === Frilanstype.HONORARARBEID) && misterHonorar === YesOrNo.YES;

        if (erFrilanser && !erVerv) {
            return 'frilans';
        }
        if (erVerv && !erFrilanser) {
            return 'verv';
        }
        if (erVerv && erFrilanser) {
            return 'frilansVerv';
        }
        return '';
    };

    const frilanstypeTekstKey = getFrilanstypeTekstKey();

    return (
        <>
            <HarHattInntektSomFrilanserSpørsmål søkerHarFrilansoppdrag={søkerHarFrilansoppdrag} />

            {harHattInntektSomFrilanser === YesOrNo.YES && (
                <FormBlock margin="l">
                    <ConditionalResponsivePanel
                        usePanelLayout={harHattInntektSomFrilanser === YesOrNo.YES}
                        border={true}>
                        <FrilansertypeSpørsmål />

                        {harHonorararbeid && (
                            <FormBlock>
                                <MisterHonorarSpørsmål misterHonorar={misterHonorar} />
                            </FormBlock>
                        )}

                        {visNormalarbeidstidSpørsmål() && (
                            <>
                                <FormBlock>
                                    <FrilansStartdatoSpørsmål
                                        søknadsdato={søknadsdato}
                                        søknadsperiode={søknadsperiode}
                                        frilansTypeTekst={frilanstypeTekstKey}
                                        startdatoValue={values.frilans.startdato}
                                    />
                                </FormBlock>
                                <FormBlock>
                                    <ErFortsattFrilanserSpørsmål
                                        frilansTypeTekst={frilanstypeTekstKey}
                                        erFortsattFrilanserValue={values.frilans.erFortsattFrilanser}
                                    />
                                </FormBlock>
                                {erFortsattFrilanser === YesOrNo.NO && (
                                    <FormBlock>
                                        <FrilansSluttdatoSpørsmål
                                            søknadsdato={søknadsdato}
                                            søknadsperiode={søknadsperiode}
                                            frilanstypeTekstKey={frilanstypeTekstKey}
                                            startdatoValue={values.frilans.startdato}
                                            sluttdatoValue={values.frilans.sluttdato}
                                        />
                                    </FormBlock>
                                )}
                                {visNormalarbeidstidFrilansarbeid && (
                                    <FormBlock>
                                        <FrilansNormalarbeidstidSpørsmål
                                            fieldName={FrilansFormField.normalarbeidstidFrilansarbeid}
                                            frilanstype={Frilanstype.FRILANSARBEID}
                                            arbeidsforhold={arbeidsforhold || {}}
                                            erAktivtArbeidsforhold={erFortsattFrilanser === YesOrNo.YES}
                                            frilanstyper={frilanstyper}
                                            misterHonorar={misterHonorar}
                                            mottarStønadGodtgjørelse={
                                                values.stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.YES
                                            }
                                            description={
                                                <InfoArbeiderNormaltTimerFrilanser
                                                    frilanstyper={frilanstyper}
                                                    misterHonorar={misterHonorar}
                                                />
                                            }
                                        />
                                    </FormBlock>
                                )}
                                {visNormalarbeidstidHonorararbeid && (
                                    <FormBlock>
                                        <FrilansNormalarbeidstidSpørsmål
                                            fieldName={FrilansFormField.normalarbeidstidHonorararbeid}
                                            frilanstype={Frilanstype.HONORARARBEID}
                                            arbeidsforhold={arbeidsforhold || {}}
                                            erAktivtArbeidsforhold={erFortsattFrilanser === YesOrNo.YES}
                                            frilanstyper={frilanstyper}
                                            misterHonorar={misterHonorar}
                                            mottarStønadGodtgjørelse={
                                                values.stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.YES
                                            }
                                            description={
                                                <InfoArbeiderNormaltTimerFrilanser
                                                    frilanstyper={frilanstyper}
                                                    misterHonorar={misterHonorar}
                                                />
                                            }
                                        />
                                    </FormBlock>
                                )}
                            </>
                        )}
                    </ConditionalResponsivePanel>
                </FormBlock>
            )}
        </>
    );
};

export default FrilanserFormPart;
