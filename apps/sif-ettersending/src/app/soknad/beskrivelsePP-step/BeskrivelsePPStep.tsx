import React, { useEffect } from 'react';
import { Alert, Heading, Link } from '@navikt/ds-react';
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
import { RegistrertBarn } from '../../types/RegistrertBarn';
import getLenker from '../../lenker';

interface Props {
    søknadstype: Søknadstype;
    søkersFødselsnummer: string;
    registrertBarn: RegistrertBarn[];
}

const BeskrivelsePPStep: React.FC<Props> = ({ søknadstype, søkersFødselsnummer, registrertBarn }) => {
    const intl = useIntl();
    const {
        values: { legeerklæringGjelderEtAnnetBarn, dokumentType, registrertBarnAktørId, barnetsFødselsnummer },
        setFieldValue,
    } = useFormikContext<SoknadFormData>();

    const harRegistrerteBarn = registrertBarn.length > 0;

    useEffect(() => {
        if (!harRegistrerteBarn && legeerklæringGjelderEtAnnetBarn === undefined) {
            setFieldValue(SoknadFormField.legeerklæringGjelderEtAnnetBarn, true);
        }
    }, [harRegistrerteBarn, legeerklæringGjelderEtAnnetBarn, setFieldValue]);

    console.log('get lenker', getLenker().pleiepengerSyktBarn);

    return (
        <SoknadFormStep id={StepID.BESKRIVELSE_PP} søknadstype={søknadstype}>
            <SifGuidePanel>
                <FormattedMessage id="step.beskrivelse_pp.info" />
            </SifGuidePanel>
            <FormBlock>
                <SoknadFormComponents.RadioGroup
                    legend={intlHelper(intl, 'step.beskrivelse_pp.dokumentType.spm')}
                    name={SoknadFormField.dokumentType}
                    radios={Object.values(DokumentType).map((type) => ({
                        label: intlHelper(intl, `step.beskrivelse_pp.dokumentType.${type}`),
                        value: type,
                    }))}
                    validate={getRequiredFieldValidator()}
                    value={dokumentType}
                    afterOnChange={(value) => {
                        if (value !== DokumentType.legeerklæring) {
                            setFieldValue(SoknadFormField.registrertBarnAktørId, undefined);
                            setFieldValue(SoknadFormField.barnetsFødselsnummer, undefined);
                            setFieldValue(SoknadFormField.legeerklæringGjelderEtAnnetBarn, undefined);
                            setFieldValue(SoknadFormField.valgteRegistrertBarn, undefined);
                        }
                        if (value !== DokumentType.annet) {
                            setFieldValue(SoknadFormField.beskrivelse, undefined);
                        }
                    }}
                />
            </FormBlock>

            {dokumentType === DokumentType.legeerklæring && (
                <>
                    <FormBlock>
                        <RegistrertBarnPart registrertBarn={registrertBarn} />
                    </FormBlock>

                    {(legeerklæringGjelderEtAnnetBarn || !harRegistrerteBarn) && (
                        <AnnetBarnPart
                            søkersFødselsnummer={søkersFødselsnummer}
                            harRegistrerteBarn={harRegistrerteBarn}
                        />
                    )}
                    {(!!registrertBarnAktørId || !harRegistrerteBarn || barnetsFødselsnummer?.length === 11) && (
                        <FormBlock>
                            <Alert variant="info" className="mb-10">
                                <Heading level="3" size="small" className="mb-4">
                                    <FormattedMessage id="step.beskrivelse_pp.barn.info.tittel" />
                                </Heading>
                                <FormattedMessage
                                    id="step.beskrivelse_pp.barn.info.1.1"
                                    values={{
                                        ppSyktBarnLenke: (
                                            <Link
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={getLenker().pleiepengerSyktBarn}>
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
