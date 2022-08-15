import React from 'react';
import { useIntl } from 'react-intl';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import FormBlock from '@navikt/sif-common-core/lib/components/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core/lib/utils/intlUtils';
import { getFødselsnummerValidator, getStringValidator } from '@navikt/sif-common-formik/lib/validation';
import { Person } from 'app/types/Person';
import { SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

type Props = {
    søker: Person;
};

const OmAnnenForelderStep = ({ søker }: Props) => {
    const intl = useIntl();

    return (
        <SoknadFormStep id={StepID.OM_ANNEN_FORELDER}>
            <SifGuidePanel>
                {intlHelper(intl, 'step.om-annen-forelder.banner')}
                <ul>
                    <li>{intlHelper(intl, 'step.om-annen-forelder.banner.list.1')}</li>
                    <li>{intlHelper(intl, 'step.om-annen-forelder.banner.list.2')}</li>
                </ul>
            </SifGuidePanel>

            <FormBlock>
                <SoknadFormComponents.Input
                    name={SoknadFormField.annenForelderFnr}
                    label={intlHelper(intl, 'step.om-annen-forlder.fnr.spm')}
                    validate={getFødselsnummerValidator({
                        required: true,
                        disallowedValues: [søker.fødselsnummer],
                    })}
                    inputMode="numeric"
                    maxLength={11}
                    minLength={11}
                    style={{ maxWidth: '20rem' }}
                />
            </FormBlock>
            <FormBlock>
                <SoknadFormComponents.Input
                    name={SoknadFormField.annenForelderNavn}
                    label={intlHelper(intl, 'step.om-annen-forlder.navn.spm')}
                    validate={(value) => {
                        const error = getStringValidator({ required: true, minLength: 2, maxLength: 50 })(value);
                        return error
                            ? {
                                  key: error,
                                  values: {
                                      min: 2,
                                      maks: 50,
                                  },
                              }
                            : undefined;
                    }}
                    style={{ maxWidth: '20rem' }}
                />
            </FormBlock>
        </SoknadFormStep>
    );
};

export default OmAnnenForelderStep;
