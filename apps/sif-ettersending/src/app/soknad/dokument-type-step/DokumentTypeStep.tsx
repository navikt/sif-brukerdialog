import { Alert, Heading, Link } from '@navikt/ds-react';
import { ReactNode, useEffect } from 'react';
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

const DokumentTypeStep = ({ søknadstype, søkersFødselsnummer, registrertBarn }: Props) => {
    const { text } = useAppIntl();
    const {
        values: { gjelderEtAnnetBarn, dokumentType },
        setFieldValue,
    } = useFormikContext<SoknadFormData>();

    const harRegistrerteBarn = registrertBarn.length > 0;

    useEffect(() => {
        if (!harRegistrerteBarn && gjelderEtAnnetBarn === undefined) {
            setFieldValue(SoknadFormField.gjelderEtAnnetBarn, true);
        }
    }, [harRegistrerteBarn, gjelderEtAnnetBarn, setFieldValue]);

    return (
        <SoknadFormStep id={StepID.DOKUMENT_TYPE} søknadstype={søknadstype}>
            <SifGuidePanel>
                <AppText id="step.dokumentType.info" />
                <ul>
                    <li>
                        <AppText id="step.dokumentType.info.1" />
                    </li>
                    <li>
                        <AppText
                            id="step.dokumentType.info.2"
                            values={{
                                Lenke: (children: ReactNode) => (
                                    <Link href={getLenker().endringsmelding} target="_blank">
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </li>
                    <li>
                        <AppText
                            id="step.dokumentType.info.3"
                            values={{
                                Lenke: (children: ReactNode) => (
                                    <Link href={getLenker().skrivTilOss} target="_blank">
                                        {children}
                                    </Link>
                                ),
                            }}
                        />
                    </li>
                </ul>
            </SifGuidePanel>

            <FormBlock>
                <SoknadFormComponents.RadioGroup
                    legend={text('step.dokumentType.dokumentType.spm')}
                    name={SoknadFormField.dokumentType}
                    radios={Object.values(DokumentType).map((type) => ({
                        label: text(`step.dokumentType.dokumentType.${type}`),
                        value: type,
                    }))}
                    validate={getRequiredFieldValidator()}
                    value={dokumentType}
                />
            </FormBlock>

            {dokumentType === DokumentType.annet && (
                <FormBlock>
                    <Alert variant="info" className="mb-10">
                        <Heading level="3" size="small" className="mb-4">
                            <AppText id="step.dokumentType.annet.info.1" />
                        </Heading>
                        <AppText id="step.dokumentType.annet.info.2" />
                    </Alert>
                </FormBlock>
            )}

            {dokumentType === DokumentType.legeerklæring && (
                <FormBlock>
                    <Alert variant="info" className="mb-10">
                        <Heading level="3" size="small" className="mb-4">
                            <AppText id="step.dokumentType.barn.info.tittel" />
                        </Heading>
                        <AppText
                            id="step.dokumentType.barn.info.1.1"
                            values={{
                                ppSyktBarnLenke: (
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={getLenker().pleiepengerSyktBarn}>
                                        <AppText id="step.dokumentType.barn.info.lenke" />
                                    </Link>
                                ),
                            }}
                        />
                    </Alert>
                </FormBlock>
            )}

            {dokumentType && (
                <>
                    <FormBlock>
                        <RegistrertBarnPart registrertBarn={registrertBarn} />
                    </FormBlock>

                    {(gjelderEtAnnetBarn || !harRegistrerteBarn) && (
                        <AnnetBarnPart
                            søkersFødselsnummer={søkersFødselsnummer}
                            harRegistrerteBarn={harRegistrerteBarn}
                        />
                    )}
                </>
            )}
        </SoknadFormStep>
    );
};

export default DokumentTypeStep;
