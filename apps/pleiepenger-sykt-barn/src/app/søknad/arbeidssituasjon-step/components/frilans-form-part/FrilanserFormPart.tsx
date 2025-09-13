import { Alert } from '@navikt/ds-react';
import { getTypedFormComponents, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { DateRange } from '@navikt/sif-common-utils';
import { useFormikContext } from 'formik';
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
import FrilansStartetFørSisteTreHeleMånederSpørsmål from './spørsmål/FrilansStartetFørSisteTreHeleMånederSpørsmål';
import HarHattInntektSomFrilanserSpørsmål from './spørsmål/HarHattInntektSomFrilanserSpørsmål';
import MisterHonorarSpørsmål from './spørsmål/MisterHonorarSpørsmål';

export const ArbFriFormComponents = getTypedFormComponents<FrilansFormField, FrilansFormValues, ValidationError>();

interface Props {
    søknadsperiode: DateRange;
    søknadsdato: Date;
    søkerHarFrilansoppdrag: boolean;
    timerOmsorgsstønad?: number;
}

const FrilanserFormPart = ({ søknadsperiode, søkerHarFrilansoppdrag, søknadsdato, timerOmsorgsstønad }: Props) => {
    const { values } = useFormikContext<SøknadFormValues>();
    const { harHattInntektSomFrilanser, misterHonorar, erFortsattFrilanser, frilanstype } = values.frilans;
    const { omsorgsstønad } = values;

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
        <FormLayout.Questions>
            <HarHattInntektSomFrilanserSpørsmål
                søkerHarFrilansoppdrag={søkerHarFrilansoppdrag}
                søkerMottarOmsorgsstønad={omsorgsstønad.mottarOmsorgsstønad === YesOrNo.YES}
            />

            {harHattInntektSomFrilanser === YesOrNo.YES && (
                <FormLayout.Panel bleedTop={true}>
                    <FormLayout.Questions>
                        <FrilansertypeSpørsmål />

                        {values.frilans.frilanstype === Frilanstype.HONORAR && (
                            <MisterHonorarSpørsmål misterHonorar={misterHonorar} />
                        )}

                        {frilanstype === Frilanstype.FRILANS_HONORAR && (
                            <FormLayout.QuestionRelatedMessage>
                                <Alert variant="info">
                                    Videre i søknaden bruker vi begrepet &quot;frilanser&quot; også om honorar. Når du
                                    senere skal svare på hvor mye du jobber, skal du legge sammen tiden du jobber som
                                    frilanser og tiden du bruker på det du mottar honorar for, og oppgi denne tiden
                                    samlet.
                                </Alert>
                            </FormLayout.QuestionRelatedMessage>
                        )}
                        {frilanstype === Frilanstype.HONORAR && misterHonorar === YesOrNo.YES && (
                            <FormLayout.QuestionRelatedMessage>
                                <Alert variant="info">
                                    Når du mottar honorar regnes du som frilanser, og vi kaller deg som frilanser også
                                    videre i søknaden. Ettersom du mister honorar i perioden du søker om, trenger vi å
                                    stille noen flere spørsmål om deg som frilanser.
                                </Alert>
                            </FormLayout.QuestionRelatedMessage>
                        )}

                        {frilanstype && visNormalarbeidstidSpørsmål() && (
                            <>
                                <FrilansStartetFørSisteTreHeleMånederSpørsmål søknadsperiode={søknadsperiode} />
                                {values.frilans.startetFørSisteTreHeleMåneder === YesOrNo.NO && (
                                    <FrilansStartdatoSpørsmål
                                        søknadsperiode={søknadsperiode}
                                        startdatoValue={values.frilans.startdato}
                                    />
                                )}
                                <ErFortsattFrilanserSpørsmål
                                    erFortsattFrilanserValue={values.frilans.erFortsattFrilanser}
                                />
                                {erFortsattFrilanser === YesOrNo.NO && (
                                    <FrilansSluttdatoSpørsmål
                                        søknadsdato={søknadsdato}
                                        søknadsperiode={søknadsperiode}
                                        startdatoValue={values.frilans.startdato}
                                        sluttdatoValue={values.frilans.sluttdato}
                                    />
                                )}

                                <FrilansNormalarbeidstidSpørsmål
                                    fieldName={
                                        `${FrilansFormField.arbeidsforhold}.${ArbeidsforholdFormField.normalarbeidstid_TimerPerUke}` as any
                                    }
                                    frilanstype={frilanstype}
                                    arbeidsforhold={values.frilans.arbeidsforhold || {}}
                                    erAktivtArbeidsforhold={erFortsattFrilanser === YesOrNo.YES}
                                    misterHonorar={misterHonorar}
                                    mottarOmsorgsstønad={values.omsorgsstønad.mottarOmsorgsstønad === YesOrNo.YES}
                                    timerOmsorgsstønad={timerOmsorgsstønad}
                                />
                            </>
                        )}
                    </FormLayout.Questions>
                </FormLayout.Panel>
            )}
        </FormLayout.Questions>
    );
};

export default FrilanserFormPart;
