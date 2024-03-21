import { Alert, Heading, Link } from '@navikt/ds-react';
import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { getRequiredFieldValidator, getStringValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import { MAX_BESKRIVELSE_LENGTH, MIN_BESKRIVELSE_LENGTH } from '../../validation/fieldValidations';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import { DokumentType } from '../../types/DokumentType';
import { useFormikContext } from 'formik';
import RegistrertBarnPart from './RegistrertBarnPart';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import AnnetBarnPart from './AnnetBarnPart';

interface Props {
    søknadstype: Søknadstype;
    søkersFødselsnummer: string;
}

const BeskrivelsePPStep: React.FC<Props> = ({ søknadstype, søkersFødselsnummer }) => {
    const intl = useIntl();
    const {
        values: {
            legeerklæringGjelderEtAnnetBarn,
            dokumentType,
            barnetLegeerklæringGjelder,
            barnetsFødselsnummer,
            barnetHarIkkeFnr,
        },
        setFieldValue,
    } = useFormikContext<SoknadFormData>();
    const [harRegistrerteBarn, setHarRegistrerteBarn] = useState(false);

    return (
        <SoknadFormStep id={StepID.BESKRIVELSE_PP} søknadstype={søknadstype}>
            <SifGuidePanel>
                <FormattedMessage id="step.beskrivelse_pp.info" />
            </SifGuidePanel>
            <FormBlock>
                <SoknadFormComponents.RadioGroup
                    legend={intlHelper(intl, 'step.beskrivelse_pp.dokumentType.spm')}
                    name={SoknadFormField.dokumentType}
                    radios={Object.keys(DokumentType).map((type) => ({
                        label: intlHelper(intl, `step.beskrivelse_pp.dokumentType.${type}`),
                        value: type,
                    }))}
                    validate={getRequiredFieldValidator()}
                    value={dokumentType}
                    afterOnChange={(value) => {
                        if (value !== DokumentType.legeerklæring) {
                            setFieldValue(SoknadFormField.barnetLegeerklæringGjelder, undefined);
                            setFieldValue(SoknadFormField.barnetsFødselsnummer, undefined);
                            setFieldValue(SoknadFormField.barnetHarIkkeFnr, undefined);
                            setFieldValue(SoknadFormField.legeerklæringGjelderEtAnnetBarn, undefined);
                        }
                    }}
                />
            </FormBlock>

            {dokumentType === DokumentType.legeerklæring && (
                <>
                    <FormBlock>
                        <RegistrertBarnPart setHarRegistrerteBarn={setHarRegistrerteBarn} />
                    </FormBlock>

                    {(legeerklæringGjelderEtAnnetBarn || !harRegistrerteBarn) && (
                        <AnnetBarnPart
                            søkersFødselsnummer={søkersFødselsnummer}
                            harRegistrerteBarn={harRegistrerteBarn}
                        />
                    )}
                    {(barnetLegeerklæringGjelder ||
                        !harRegistrerteBarn ||
                        barnetsFødselsnummer?.length === 11 ||
                        barnetHarIkkeFnr) && (
                        <FormBlock>
                            <Alert variant="info" className="mb-10">
                                <Heading level="3" size="small" className="mb-4">
                                    <FormattedMessage id="step.beskrivelse_pp.barn.info.tittel" />
                                </Heading>
                                <FormattedMessage
                                    id="step.beskrivelse_pp.barn.info.1.1"
                                    values={{
                                        ppSyktBarnLenke: (
                                            <Link target="_blank" rel="noopener noreferrer" href={'TODO'}>
                                                <FormattedMessage id="step.beskrivelse_pp.barn.info.lenke" />
                                            </Link>
                                        ),
                                    }}
                                />
                            </Alert>
                        </FormBlock>
                    )}
                </>
            )}

            {dokumentType === DokumentType.annet && (
                <FormBlock>
                    <Alert variant="info" className="mb-10">
                        <Heading level="3" size="small" className="mb-4">
                            <FormattedMessage id="step.beskrivelse_pp.annet.info.1" />
                        </Heading>
                        <FormattedMessage id="step.beskrivelse_pp.annet.info.2" />
                    </Alert>
                    <SoknadFormComponents.Textarea
                        data-testid="beskrivelse"
                        name={SoknadFormField.beskrivelse}
                        label={intlHelper(intl, 'step.beskrivelse_pp.hvaSendes.spm')}
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
                    />
                </FormBlock>
            )}
        </SoknadFormStep>
    );
};

export default BeskrivelsePPStep;
