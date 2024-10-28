import { Box, Heading } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { formatName } from '@navikt/sif-common-core-ds/src/utils/personUtils';
import { FormikRadioProp } from '@navikt/sif-common-formik-ds/src/components/formik-radio-group/FormikRadioGroup';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { FormLayout } from '@navikt/sif-common-ui';
import { dateFormatter } from '@navikt/sif-common-utils';
import { OmBarnetFormText, useOmBarnetFormIntl } from '../omBarnetFormMessages';
import { OmBarnetFormFields } from '../types';
import { OmBarnetFormComponents } from './OmBarnetFormComponents';

interface Props {
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderEtAnnetBarn?: boolean;
    onAnnetBarnSelected: () => void;
}

const { RadioGroup, Checkbox } = OmBarnetFormComponents;

const VelgRegistrertBarn: React.FunctionComponent<Props> = ({
    registrerteBarn,
    søknadenGjelderEtAnnetBarn,
    onAnnetBarnSelected,
}) => {
    const { text } = useOmBarnetFormIntl();

    return (
        <Box>
            <Heading level="2" size="medium" spacing={true}>
                {text('omBarnetForm.hvilketBarn.spm')}
            </Heading>
            <FormLayout.Questions>
                <RadioGroup
                    legend={text('omBarnetForm.hvilketBarn.registrerteBarn')}
                    description={text('omBarnetForm.hvilketBarn.info')}
                    name={OmBarnetFormFields.barnetSøknadenGjelder}
                    radios={registrerteBarn.map((barn) => mapBarnTilRadioProps(barn, søknadenGjelderEtAnnetBarn))}
                    validate={søknadenGjelderEtAnnetBarn ? undefined : getRequiredFieldValidator()}
                />
                <FormLayout.QuestionRelatedMessage>
                    <Checkbox
                        label={text('omBarnetForm.gjelderAnnetBarn')}
                        name={OmBarnetFormFields.søknadenGjelderEtAnnetBarn}
                        afterOnChange={(isChecked) => {
                            if (isChecked) {
                                onAnnetBarnSelected();
                            }
                        }}
                    />
                </FormLayout.QuestionRelatedMessage>
            </FormLayout.Questions>
        </Box>
    );
};

const mapBarnTilRadioProps = (barn: RegistrertBarn, disabled?: boolean): FormikRadioProp => {
    const { fornavn, mellomnavn, etternavn, fødselsdato, aktørId } = barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);
    return {
        value: aktørId,
        label: (
            <>
                <div>{barnetsNavn}</div>
                <div>
                    <OmBarnetFormText
                        id="omBarnetForm.hvilketBarn.født"
                        values={{ dato: dateFormatter.compact(fødselsdato) }}
                    />
                </div>
            </>
        ),
        disabled,
    };
};

export default VelgRegistrertBarn;
