import { Heading } from '@navikt/ds-react';
import React from 'react';
import { useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { SkjemagruppeQuestion } from '@navikt/sif-common-formik-ds/src';
import { getFødselsnummerValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useFormikContext } from 'formik';
import SoknadFormComponents from '../SoknadFormComponents';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';

interface Props {
    søkersFødselsnummer: string;
    harRegistrerteBarn: boolean;
}

const AnnetBarnPart: React.FC<Props> = ({ søkersFødselsnummer, harRegistrerteBarn }) => {
    const intl = useIntl();
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
                            {intlHelper(intl, 'step.beskrivelse_pp.annetBarn.tittel')}
                        </Heading>
                    ) : undefined
                }>
                <div>
                    <SoknadFormComponents.TextField
                        label={intlHelper(intl, 'step.beskrivelse_pp.annetBarn.fnr.spm')}
                        name={SoknadFormField.barnetsFødselsnummer}
                        validate={
                            barnetHarIkkeFnr
                                ? undefined
                                : getFødselsnummerValidator({
                                      required: true,
                                      disallowedValues: [søkersFødselsnummer],
                                  })
                        }
                        width="xl"
                        type="tel"
                        maxLength={11}
                        disabled={barnetHarIkkeFnr}
                    />
                    <FormBlock margin="l">
                        <SoknadFormComponents.Checkbox
                            label={intlHelper(intl, 'step.beskrivelse_pp.annetBarn.fnr.barnHarIkkeFnr')}
                            name={SoknadFormField.barnetHarIkkeFnr}
                            afterOnChange={(newValue) => {
                                if (newValue) {
                                    setFieldValue(SoknadFormField.barnetsFødselsnummer, undefined);
                                }
                            }}
                        />
                    </FormBlock>
                </div>
            </SkjemagruppeQuestion>
        </Block>
    );
};
export default AnnetBarnPart;
