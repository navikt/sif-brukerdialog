import { Alert } from '@navikt/ds-react';
/* eslint-disable no-console */
import React from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { DateRange } from '@navikt/sif-common-utils/lib';
import { useFormikContext } from 'formik';
import ConditionalResponsivePanel from '../../../../components/conditional-responsive-panel/ConditionalResponsivePanel';
import { ArbeidsforholdFormField } from '../../../../types/søknad-form-values/ArbeidsforholdFormValues';
import {
    FrilansFormField,
    FrilansFormValues,
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
import FrilansStartetFørSisteTreHeleMånederSpørsmål from './spørsmål/FrilansStartetFørSisteTreHeleMånederSpørsmål';

export const ArbFriFormComponents = getTypedFormComponents<FrilansFormField, FrilansFormValues, ValidationError>();

interface Props {
    søknadsperiode: DateRange;
    søknadsdato: Date;
    søkerHarFrilansoppdrag: boolean;
}

const FrilanserFormPart: React.FunctionComponent<Props> = ({ søknadsperiode, søkerHarFrilansoppdrag, søknadsdato }) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { harHattInntektSomFrilanser, misterHonorar, erFortsattFrilanser, frilanstype } = values.frilans;
    const { stønadGodtgjørelse } = values;

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
            <HarHattInntektSomFrilanserSpørsmål
                søkerHarFrilansoppdrag={søkerHarFrilansoppdrag}
                søkerMottarOmsorgsstønad={stønadGodtgjørelse.mottarStønadGodtgjørelse === YesOrNo.YES}
            />

            {harHattInntektSomFrilanser === YesOrNo.YES && (
                <FormBlock margin="l">
                    <ConditionalResponsivePanel
                        usePanelLayout={harHattInntektSomFrilanser === YesOrNo.YES}
                        border={true}>
                        <FrilansertypeSpørsmål />

                        {values.frilans.frilanstype === Frilanstype.HONORAR && (
                            <FormBlock margin="xl">
                                <MisterHonorarSpørsmål misterHonorar={misterHonorar} />
                            </FormBlock>
                        )}

                        {frilanstype === Frilanstype.FRILANS_HONORAR && (
                            <FormBlock margin="l">
                                <Alert variant="info">
                                    Videre i søknaden bruker vi begrepet &quot;frilanser&quot; også om honorar. Når du
                                    senere skal svare på hvor mye du jobber, skal du legge sammen tiden du jobber som
                                    frilanser og tiden du bruker på det du mottar honorar for, og oppgi denne tiden
                                    samlet.
                                </Alert>
                            </FormBlock>
                        )}
                        {frilanstype === Frilanstype.HONORAR && misterHonorar === YesOrNo.YES && (
                            <FormBlock margin="l">
                                <Alert variant="info">
                                    Når du mottar honorar regnes du som frilanser, og vi kaller deg som frilanser også
                                    videre i søknaden. Ettersom du mister honorar i perioden du søker om, trenger vi å
                                    stille noen flere spørsmål om deg som frilanser.
                                </Alert>
                            </FormBlock>
                        )}

                        {frilanstype && visNormalarbeidstidSpørsmål() && (
                            <>
                                <FormBlock>
                                    <FrilansStartetFørSisteTreHeleMånederSpørsmål søknadsperiode={søknadsperiode} />
                                </FormBlock>
                                {values.frilans.startetFørSisteTreHeleMåneder === YesOrNo.NO && (
                                    <FormBlock>
                                        <FrilansStartdatoSpørsmål
                                            søknadsperiode={søknadsperiode}
                                            startdatoValue={values.frilans.startdato}
                                        />
                                    </FormBlock>
                                )}
                                <FormBlock>
                                    <ErFortsattFrilanserSpørsmål
                                        erFortsattFrilanserValue={values.frilans.erFortsattFrilanser}
                                    />
                                </FormBlock>
                                {erFortsattFrilanser === YesOrNo.NO && (
                                    <FormBlock>
                                        <FrilansSluttdatoSpørsmål
                                            søknadsdato={søknadsdato}
                                            søknadsperiode={søknadsperiode}
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
