import { Alert, Heading, Link } from '@navikt/ds-react';
import React, { useEffect } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getRequiredFieldValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useFormikContext } from 'formik';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { DokumentType } from '../../types/DokumentType';
import { RegistrertBarn } from '../../types/RegistrertBarn';
import { SoknadFormData, SoknadFormField } from '../../types/SoknadFormData';
import { Søknadstype } from '../../types/Søknadstype';
import SoknadFormComponents from '../SoknadFormComponents';
import SoknadFormStep from '../SoknadFormStep';
import { StepID } from '../soknadStepsConfig';
import AnnetBarnPart from './AnnetBarnPart';
import RegistrertBarnPart from './RegistrertBarnPart';

interface Props {
    søknadstype: Søknadstype;
    søkersFødselsnummer: string;
    registrertBarn: RegistrertBarn[];
}

const BeskrivelsePPStep: React.FC<Props> = ({ søknadstype, søkersFødselsnummer, registrertBarn }) => {
    const { text } = useAppIntl();
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

    return (
        <SoknadFormStep id={StepID.BESKRIVELSE_PP} søknadstype={søknadstype}>
            <SifGuidePanel>
                <AppText id="step.beskrivelse_pp.info" />
            </SifGuidePanel>
            <FormBlock>
                <SoknadFormComponents.RadioGroup
                    legend={text('step.beskrivelse_pp.dokumentType.spm')}
                    name={SoknadFormField.dokumentType}
                    radios={Object.values(DokumentType).map((type) => ({
                        label: text(`step.beskrivelse_pp.dokumentType.${type}`),
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
                                    <AppText id="step.beskrivelse_pp.barn.info.tittel" />
                                </Heading>
                                <AppText
                                    id="step.beskrivelse_pp.barn.info.1.1"
                                    values={{
                                        ppSyktBarnLenke: (
                                            <Link
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href={getLenker().pleiepengerSyktBarn}>
                                                <AppText id="step.beskrivelse_pp.barn.info.lenke" />
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
                            <AppText id="step.beskrivelse_pp.annet.info.1" />
                        </Heading>
                        <AppText id="step.beskrivelse_pp.annet.info.2" />
                    </Alert>
                </FormBlock>
            )}
        </SoknadFormStep>
    );
};

export default BeskrivelsePPStep;
