import * as React from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import { SoknadFormField } from '../../types/SoknadFormData';
import { MAX_BESKRIVELSE_LENGTH, MIN_BESKRIVELSE_LENGTH } from '../../validation/fieldValidations';
import SoknadFormComponents from '../SoknadFormComponents';
import { getStringValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { BodyLong, Link } from '@navikt/ds-react';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import SoknadFormStep from '../SoknadFormStep';
import { ApplicationType } from '../../types/ApplicationType';
import { StepID } from '../soknadStepsConfig';
interface Props {
    søknadstype: ApplicationType;
}

const BeskrivelseStep: React.FC<Props> = ({ søknadstype }) => {
    const intl = useIntl();
    return (
        <SoknadFormStep id={StepID.BESKRIVELSE} søknadstype={søknadstype}>
            <FormBlock>
                <SoknadFormComponents.Textarea
                    data-testid="beskrivelse"
                    name={SoknadFormField.beskrivelse}
                    label={intlHelper(intl, 'step.beskrivelse.hvaSendes.spm')}
                    maxLength={MAX_BESKRIVELSE_LENGTH}
                    autoComplete="off"
                    validate={(value) => {
                        const error = getStringValidator({
                            required: true,
                            maxLength: MAX_BESKRIVELSE_LENGTH,
                            minLength: MIN_BESKRIVELSE_LENGTH,
                        })(value);
                        return error
                            ? {
                                  key: error,
                                  values: {
                                      min: MIN_BESKRIVELSE_LENGTH,
                                      maks: MAX_BESKRIVELSE_LENGTH,
                                  },
                              }
                            : undefined;
                    }}
                    description={
                        <BodyLong as="div">
                            <p>
                                <FormattedMessage id="step.beskrivelse.intro.1" />
                            </p>
                            <ul>
                                <li>
                                    <FormattedMessage id="step.beskrivelse.intro.li.1" />
                                </li>
                                <li>
                                    <FormattedMessage id="step.beskrivelse.intro.li.2" />
                                </li>
                            </ul>
                            <p>
                                <FormattedMessage
                                    id="step.beskrivelse.intro.2"
                                    values={{
                                        kontaktMedOssLink: (
                                            <Link
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={'https://www.nav.no/person/kontakt-oss/nb/'}>
                                                <FormattedMessage id="step.beskrivelse.intro.2.1" />
                                            </Link>
                                        ),
                                    }}
                                />
                            </p>
                        </BodyLong>
                    }
                />
            </FormBlock>
        </SoknadFormStep>
    );
};

export default BeskrivelseStep;
