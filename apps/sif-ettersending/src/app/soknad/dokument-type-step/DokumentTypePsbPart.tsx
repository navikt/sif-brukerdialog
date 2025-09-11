import { Alert, Heading, Link, List } from '@navikt/ds-react';
import { ReactNode } from 'react';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { getRequiredFieldValidator } from '@navikt/sif-validation';
import { AppText, useAppIntl } from '../../i18n';
import getLenker from '../../lenker';
import { DokumentType } from '../../types/DokumentType';
import { SoknadFormField } from '../../types/SoknadFormData';
import SoknadFormComponents from '../SoknadFormComponents';

interface Props {
    dokumentType?: DokumentType;
}

const erPsbDokumenttype = (dokumentType: DokumentType) => {
    return dokumentType !== DokumentType.kursinformasjon;
};

const DokumentTypePsbPart = ({ dokumentType }: Props) => {
    const { text } = useAppIntl();
    return (
        <>
            <SifGuidePanel>
                <AppText id="step.dokumentType.info" />
                <List>
                    <List.Item>
                        <AppText id="step.dokumentType.info.1" />
                    </List.Item>
                    <List.Item>
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
                    </List.Item>
                    <List.Item>
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
                    </List.Item>
                </List>
            </SifGuidePanel>

            <FormBlock>
                <SoknadFormComponents.RadioGroup
                    legend={text('step.dokumentType.dokumentType.spm')}
                    name={SoknadFormField.dokumentType}
                    radios={Object.values(DokumentType)
                        .filter(erPsbDokumenttype)
                        .map((type) => ({
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
                        <Heading level="2" size="small" className="mb-4">
                            <AppText id="step.dokumentType.annet.info.1" />
                        </Heading>
                        <AppText id="step.dokumentType.annet.info.2" />
                    </Alert>
                </FormBlock>
            )}

            {dokumentType === DokumentType.legeerklæring && (
                <FormBlock>
                    <Alert variant="info" className="mb-10">
                        <Heading level="2" size="small" className="mb-4">
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
        </>
    );
};

export default DokumentTypePsbPart;
