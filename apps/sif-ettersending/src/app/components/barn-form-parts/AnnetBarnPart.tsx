import { Heading } from '@navikt/ds-react';
import { isDevMode } from '@navikt/sif-common-env';
import { resetFieldValue, SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds';
import { FormLayout } from '@navikt/sif-common-ui';
import { getFødselsnummerValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import { useAppIntl } from '../../i18n';
import SoknadFormComponents from '../../soknad/SoknadFormComponents';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';

interface Props {
    søkersFødselsnummer: string;
    harRegistrerteBarn: boolean;
}

const AnnetBarnPart = ({ søkersFødselsnummer, harRegistrerteBarn }: Props) => {
    const { text } = useAppIntl();

    const {
        values: { barnetHarIkkeFnr },
        setFieldValue,
    } = useFormikContext<SoknadFormData>();

    return (
        <>
            <SkjemagruppeQuestion
                legend={
                    harRegistrerteBarn ? (
                        <Heading level="2" size="small" spacing={true}>
                            {text('formPart.annetBarn.tittel')}
                        </Heading>
                    ) : undefined
                }>
                <FormLayout.Questions>
                    <SoknadFormComponents.TextField
                        label={text('formPart.annetBarn.fnr.spm')}
                        description={!harRegistrerteBarn ? text('formPart.annetBarn.fnr.spm.description') : undefined}
                        name={SoknadFormField.barnetsFødselsnummer}
                        validate={
                            !barnetHarIkkeFnr
                                ? getFødselsnummerValidator({
                                      required: true,
                                      allowHnr: isDevMode(),
                                      disallowedValues: [søkersFødselsnummer],
                                  })
                                : undefined
                        }
                        width="xl"
                        type="tel"
                        maxLength={11}
                        disabled={barnetHarIkkeFnr}
                    />
                    <FormLayout.QuestionBleedTop>
                        <SoknadFormComponents.Checkbox
                            label={text('formPart.annetBarn.fnr.barnHarIkkeFnr')}
                            name={SoknadFormField.barnetHarIkkeFnr}
                            afterOnChange={(newValue) => {
                                if (newValue) {
                                    resetFieldValue(SoknadFormField.barnetsFødselsnummer, setFieldValue, '');
                                }
                            }}
                        />
                    </FormLayout.QuestionBleedTop>
                </FormLayout.Questions>
            </SkjemagruppeQuestion>
        </>
    );
};
export default AnnetBarnPart;
