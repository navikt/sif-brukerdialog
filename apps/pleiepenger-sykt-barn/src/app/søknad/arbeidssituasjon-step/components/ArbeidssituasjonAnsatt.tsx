import { Alert } from '@navikt/ds-react';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
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

interface Props {
    arbeidsforhold: ArbeidsforholdFormValues;
    parentFieldName: string;
    søknadsperiode: DateRange;
}

const ArbeidssituasjonAnsatt: React.FC<Props> = ({ arbeidsforhold, parentFieldName, søknadsperiode }) => {
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
                <FormBlock>
                    <ErAnsattIArbeidsforholdSpørsmål
                        fieldName={getFieldName(ArbeidsforholdFormField.erAnsatt)}
                        arbeidsforhold={arbeidsforhold}
                    />
                </FormBlock>

                {arbeidsforhold.erAnsatt !== undefined && (
                    <FormBlock margin="l">
                        {arbeidsforhold.erAnsatt === YesOrNo.NO && (
                            <Block padBottom={arbeidsforhold.sluttetFørSøknadsperiode === YesOrNo.NO ? 'xl' : 'none'}>
                                <Alert variant="info">
                                    <FormattedMessage id="arbeidsforhold.ikkeAnsatt.info" />
                                </Alert>
                                <FormBlock>
                                    <SluttetIArbeidsforholdFørSøknadsperiodeSpørsmål
                                        søknadsperiode={søknadsperiode}
                                        arbeidsforhold={arbeidsforhold}
                                        fieldName={getFieldName(ArbeidsforholdFormField.sluttetFørSøknadsperiode)}
                                    />
                                </FormBlock>
                            </Block>
                        )}
                        {erFortsattAnsattEllerSluttetISøknadsperioden && (
                            <AnsattNormalarbeidstidSpørsmål
                                arbeidsforhold={arbeidsforhold}
                                fieldName={getFieldName(ArbeidsforholdFormField.normalarbeidstid_TimerPerUke)}
                            />
                        )}
                    </FormBlock>
                )}
            </ArbeidssituasjonPanel>
        </div>
    );
};

export default ArbeidssituasjonAnsatt;
