import { Alert } from '@navikt/ds-react';
import React from 'react';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { DateRange } from '@navikt/sif-common-utils';
import ArbeidsperiodeTekst from '../../../components/arbeidsperiode-tekst/ArbeidsperiodeTekst';
import OfficeIconSvg from '../../../components/office-icon/OfficeIconSvg';
import {
    ArbeidsforholdFormField,
    ArbeidsforholdFormValues,
} from '../../../types/søknad-form-values/ArbeidsforholdFormValues';
import AnsattNormalarbeidstidSpørsmål from './ansatt-spørsmål/AnsattNormalarbeidstidSpørsmål';
import ErAnsattIArbeidsforholdSpørsmål from './ansatt-spørsmål/ErAnsattIArbeidsforholdSpørsmål';
import SluttetIArbeidsforholdFørSøknadsperiodeSpørsmål from './ansatt-spørsmål/SluttetIArbeidsforholdFørSøknadsperiodeSpørsmål';
import ArbeidssituasjonPanel from './arbeidssituasjon-panel/ArbeidssituasjonPanel';
import { AppText } from '../../../i18n';
import { getFeatureToggles } from '../../../utils/featureToggleUtils';
import { FormLayout } from '@navikt/sif-common-ui';

interface Props {
    arbeidsforhold: ArbeidsforholdFormValues;
    parentFieldName: string;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonAnsatt: React.FC<Props> = ({ arbeidsforhold, parentFieldName, søknadsperiode }) => {
    const { spørOmSluttetISøknadsperiode } = getFeatureToggles();

    const getFieldName = (field: ArbeidsforholdFormField): ArbeidsforholdFormField =>
        `${parentFieldName}.${field}` as any;

    const erFortsattAnsattEllerSluttetISøknadsperioden =
        arbeidsforhold.erAnsatt === YesOrNo.YES ||
        (arbeidsforhold.erAnsatt === YesOrNo.NO && arbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.NO);

    return (
        <div data-testid="arbeidssituasjonAnsatt">
            <ArbeidssituasjonPanel
                title={arbeidsforhold.arbeidsgiver.navn}
                titleIcon={<OfficeIconSvg />}
                description={
                    arbeidsforhold.arbeidsgiver.ansattFom && (
                        <ArbeidsperiodeTekst
                            from={arbeidsforhold.arbeidsgiver.ansattFom}
                            to={arbeidsforhold.arbeidsgiver.ansattTom}
                        />
                    )
                }>
                <FormLayout.Questions>
                    <ErAnsattIArbeidsforholdSpørsmål
                        fieldName={getFieldName(ArbeidsforholdFormField.erAnsatt)}
                        arbeidsforhold={arbeidsforhold}
                    />

                    {arbeidsforhold.erAnsatt !== undefined && (
                        <>
                            {arbeidsforhold.erAnsatt === YesOrNo.NO && (
                                <FormLayout.QuestionBleedTop>
                                    <Alert variant="info">
                                        <AppText id="arbeidsforhold.ikkeAnsatt.info" />
                                    </Alert>
                                    {spørOmSluttetISøknadsperiode ? (
                                        <SluttetIArbeidsforholdFørSøknadsperiodeSpørsmål
                                            søknadsperiode={søknadsperiode}
                                            arbeidsforhold={arbeidsforhold}
                                            fieldName={getFieldName(ArbeidsforholdFormField.sluttetFørSøknadsperiode)}
                                        />
                                    ) : null}
                                </FormLayout.QuestionBleedTop>
                            )}
                            {(!spørOmSluttetISøknadsperiode || erFortsattAnsattEllerSluttetISøknadsperioden) && (
                                <AnsattNormalarbeidstidSpørsmål
                                    arbeidsforhold={arbeidsforhold}
                                    fieldName={getFieldName(ArbeidsforholdFormField.normalarbeidstid_TimerPerUke)}
                                />
                            )}
                        </>
                    )}
                </FormLayout.Questions>
            </ArbeidssituasjonPanel>
        </div>
    );
};

export default ArbeidssituasjonAnsatt;
