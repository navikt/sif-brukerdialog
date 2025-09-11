import { Heading } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { isDevMode } from '@navikt/sif-common-env';
import { resetFieldValue, SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds';
import { getFødselsnummerValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import { useAppIntl } from '../../i18n';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../../soknad/SoknadFormComponents';

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
        <Block margin="xl">
            <SkjemagruppeQuestion
                legend={
                    harRegistrerteBarn ? (
                        <Heading level="2" size="small" style={{ display: 'inline-block', fontSize: '1.125rem' }}>
                            {text('formPart.annetBarn.tittel')}
                        </Heading>
                    ) : undefined
                }>
                <div>
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
                </div>
                <FormBlock margin="l">
                    <SoknadFormComponents.Checkbox
                        label={text('formPart.annetBarn.fnr.barnHarIkkeFnr')}
                        name={SoknadFormField.barnetHarIkkeFnr}
                        afterOnChange={(newValue) => {
                            if (newValue) {
                                resetFieldValue(SoknadFormField.barnetsFødselsnummer, setFieldValue, '');
                            }
                        }}
                    />
                </FormBlock>
            </SkjemagruppeQuestion>
        </Block>
    );
};
export default AnnetBarnPart;
