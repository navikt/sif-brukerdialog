import { BodyLong, Link } from '@navikt/ds-react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import { getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { AppText, useAppIntl } from '../../i18n';
import { SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';

interface Props {
    søknadstype: Søknadstype;
}

export const MAX_BESKRIVELSE_LENGTH = 250;
export const MIN_BESKRIVELSE_LENGTH = 5;

const BeskrivelseStep = ({ søknadstype }: Props) => {
    const { text } = useAppIntl();
    return (
        <SoknadFormStep id={StepID.BESKRIVELSE} søknadstype={søknadstype}>
            <FormBlock>
                <SoknadFormComponents.Textarea
                    data-testid="beskrivelse"
                    name={SoknadFormField.beskrivelse}
                    label={text('step.beskrivelse.hvaSendes.spm')}
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
                                <AppText id="step.beskrivelse.intro.1" />
                            </p>
                            <ul>
                                <li>
                                    <AppText id="step.beskrivelse.intro.li.1" />
                                </li>
                                <li>
                                    <AppText id="step.beskrivelse.intro.li.2" />
                                </li>
                            </ul>
                            <p>
                                <AppText
                                    id="step.beskrivelse.intro.2"
                                    values={{
                                        kontaktMedOssLink: (
                                            <Link
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={'https://www.nav.no/person/kontakt-oss/nb/'}>
                                                <AppText id="step.beskrivelse.intro.2.1" />
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
