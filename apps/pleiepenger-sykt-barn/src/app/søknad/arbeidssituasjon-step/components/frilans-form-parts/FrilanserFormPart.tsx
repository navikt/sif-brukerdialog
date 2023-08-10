/* eslint-disable no-console */
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { useFormikContext } from 'formik';
import ConditionalResponsivePanel from '../../../../components/conditional-responsive-panel/ConditionalResponsivePanel';
import {
    FrilansFormValues,
    FrilansFormField,
    Frilanstype,
} from '../../../../types/søknad-form-values/FrilansFormValues';
import { SøknadFormValues } from '../../../../types/søknad-form-values/SøknadFormValues';
import ErFortsattFrilanserSpørsmål from './spørsmål/ErFortsattFrilanserSpørsmål';
import FrilansertypeSpørsmål from './spørsmål/FrilansertypeSpørsmål';
import FrilansNormalarbeidstidSpørsmål from './spørsmål/FrilansNormalarbeidstidSpørsmål';
import FrilansSluttdatoSpørsmål from './spørsmål/FrilansSluttdatoSpørsmål';
import FrilansStartdatoSpørsmål from './spørsmål/FrilansStartdatoSpørsmål';
import HarHattInntektSomFrilanserSpørsmål from './spørsmål/HarHattInntektSomFrilanserSpørsmål';
import MisterHonorarSpørsmål from './spørsmål/MisterHonorarSpørsmål';
import { InfoArbeiderNormaltTimerFrilanser } from '../info/InfoArbeiderNormaltTimerIUken';
import { ArbeidsforholdFormField } from '../../../../types/søknad-form-values/ArbeidsforholdFormValues';
import { Alert } from '@navikt/ds-react';

export const ArbFriFormComponents = getTypedFormComponents<FrilansFormField, FrilansFormValues, ValidationError>();

interface Props {
    søknadsperiode: DateRange;
    søknadsdato: Date;
    søkerHarFrilansoppdrag: boolean;
}

const FrilanserFormPart: React.FunctionComponent<Props> = ({ søknadsperiode, søkerHarFrilansoppdrag, søknadsdato }) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { harHattInntektSomFrilanser, misterHonorar, erFortsattFrilanser, frilanstype } = values.frilans;

    const visNormalarbeidstidSpørsmål = () => {
        switch (frilanstype) {
            case Frilanstype.FRILANS:
            case Frilanstype.FRILANS_HONORAR:
                return true;
            case Frilanstype.HONORAR:
                return misterHonorar === YesOrNo.YES;
            default:
                return false;
        }
    };

    return (
        <>
            <HarHattInntektSomFrilanserSpørsmål søkerHarFrilansoppdrag={søkerHarFrilansoppdrag} />

            {harHattInntektSomFrilanser === YesOrNo.YES && (
                <FormBlock margin="l">
                    <ConditionalResponsivePanel
                        usePanelLayout={harHattInntektSomFrilanser === YesOrNo.YES}
                        border={true}>
                        <FrilansertypeSpørsmål />

                        {values.frilans.frilanstype === Frilanstype.HONORAR && (
                            <FormBlock margin="l">
                                <MisterHonorarSpørsmål misterHonorar={misterHonorar} />
                            </FormBlock>
                        )}

                        {frilanstype === Frilanstype.FRILANS_HONORAR && (
                            <FormBlock margin="l">
                                <Alert variant="info">
                                    Honorar for verv regnes som det samme som å jobbe som frilanser, og skal da tas med
                                    når du svarer på spørsmålene nedenfor.
                                </Alert>
                            </FormBlock>
                        )}
                        {frilanstype === Frilanstype.HONORAR && misterHonorar === YesOrNo.YES && (
                            <FormBlock margin="l">
                                <Alert variant="info">
                                    Når du får honorar for verv regnes du som frilanser. Når du mister honorar i
                                    perioden du søker for, trenger vi å stille deg noen flere spørsmål om deg som
                                    frilanser.
                                </Alert>
                            </FormBlock>
                        )}

                        {frilanstype && visNormalarbeidstidSpørsmål() && (
                            <>
                                <FormBlock>
                                    <FrilansStartdatoSpørsmål
                                        søknadsdato={søknadsdato}
                                        søknadsperiode={søknadsperiode}
                                        frilanstype={frilanstype}
                                        startdatoValue={values.frilans.startdato}
                                    />
                                </FormBlock>
                                <FormBlock>
                                    <ErFortsattFrilanserSpørsmål
                                        frilanstype={frilanstype}
                                        erFortsattFrilanserValue={values.frilans.erFortsattFrilanser}
                                    />
                                </FormBlock>
                                {erFortsattFrilanser === YesOrNo.NO && (
                                    <FormBlock>
                                        <FrilansSluttdatoSpørsmål
                                            søknadsdato={søknadsdato}
                                            søknadsperiode={søknadsperiode}
                                            frilanstype={frilanstype}
                                            startdatoValue={values.frilans.startdato}
                                            sluttdatoValue={values.frilans.sluttdato}
                                        />
                                    </FormBlock>
                                )}

                                <FormBlock>
                                    <FrilansNormalarbeidstidSpørsmål
                                        fieldName={
                                            `${FrilansFormField.arbeidsforhold}.${ArbeidsforholdFormField.normalarbeidstid_TimerPerUke}` as any
                                        }
                                        frilanstype={frilanstype}
                                        arbeidsforhold={values.frilans.arbeidsforhold || {}}
                                        erAktivtArbeidsforhold={erFortsattFrilanser === YesOrNo.YES}
                                        misterHonorar={misterHonorar}
                                        mottarStønadGodtgjørelse={
                                            values.stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.YES
                                        }
                                        description={<InfoArbeiderNormaltTimerFrilanser frilanstype={frilanstype} />}
                                    />
                                </FormBlock>
                            </>
                        )}
                    </ConditionalResponsivePanel>
                </FormBlock>
            )}
        </>
    );
};

export default FrilanserFormPart;
