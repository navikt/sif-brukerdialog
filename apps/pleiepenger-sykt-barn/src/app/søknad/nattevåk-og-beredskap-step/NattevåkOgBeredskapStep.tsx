import { useAppIntl } from '@i18n/index';
import { BodyLong, Box, List } from '@navikt/ds-react';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import { YesOrNo } from '@navikt/sif-common-formik-ds';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { FormLayout } from '@navikt/sif-common-ui';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-validation';
import { useFormikContext } from 'formik';
import { useState } from 'react';

import usePersistOnChange from '../../hooks/usePersistOnChange';
import { AppText } from '../../i18n';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadFormStep from '../SøknadFormStep';

export const cleanupNattevåkOgBeredskapStep = (values: SøknadFormValues): SøknadFormValues => {
    const cleanedValues = { ...values };
    if (values.harNattevåk === YesOrNo.NO) {
        cleanedValues.harNattevåk_ekstrainfo = undefined;
    }
    if (values.harBeredskap === YesOrNo.NO) {
        cleanedValues.harBeredskap_ekstrainfo = undefined;
    }
    return cleanedValues;
};

const NattevåkOgBeredskapStep = ({ onValidSubmit }: StepCommonProps) => {
    const { text } = useAppIntl();
    const [loaded, setLoaded] = useState<boolean>(false);

    const { values } = useFormikContext<SøknadFormValues>();
    const { harNattevåk, harNattevåk_ekstrainfo, harBeredskap, harBeredskap_ekstrainfo } = values;

    usePersistOnChange(harNattevåk_ekstrainfo, loaded, StepID.NATTEVÅK_OG_BEREDSKAP);
    usePersistOnChange(harBeredskap_ekstrainfo, loaded, StepID.NATTEVÅK_OG_BEREDSKAP);

    useEffectOnce(() => {
        setLoaded(true);
    });

    return (
        <SøknadFormStep stepId={StepID.NATTEVÅK_OG_BEREDSKAP} onValidFormSubmit={onValidSubmit}>
            <FormLayout.Guide compact={true}>
                <AppText id="steg.nattevåkOgBeredskap.veileder" />
                <Box paddingBlock="4 0">
                    <ExpandableInfo title={text('steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn.tittel')}>
                        <AppText id="steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn" />
                    </ExpandableInfo>
                </Box>
            </FormLayout.Guide>

            <FormLayout.Sections>
                <FormLayout.Section title={text('steg.nattevåkOgBeredskap.nattevåk.sectionTittel')}>
                    <FormLayout.Questions>
                        <BodyLong>
                            <AppText id="steg.nattevåkOgBeredskap.nattevåk.veileder" />
                        </BodyLong>

                        <SøknadFormComponents.YesOrNoQuestion
                            legend={text('steg.nattevåkOgBeredskap.nattevåk.spm')}
                            name={SøknadFormField.harNattevåk}
                            validate={getYesOrNoValidator()}
                            data-testid="nattevåk"
                        />

                        {harNattevåk === YesOrNo.YES && (
                            <FormLayout.Panel bleedTop={true}>
                                <SøknadFormComponents.Textarea
                                    name={SøknadFormField.harNattevåk_ekstrainfo}
                                    label={<AppText id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.spm" />}
                                    description={
                                        <Box paddingBlock="2">
                                            <BodyLong as="div">
                                                <p>
                                                    <AppText id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.tittel" />
                                                </p>
                                                <List>
                                                    <List.Item>
                                                        <AppText id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.1" />
                                                    </List.Item>
                                                    <List.Item>
                                                        <AppText id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.2" />
                                                    </List.Item>
                                                    <List.Item>
                                                        <AppText id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.3" />
                                                    </List.Item>
                                                </List>
                                            </BodyLong>
                                        </Box>
                                    }
                                    validate={getStringValidator({
                                        required: true,
                                        maxLength: 1000,
                                        disallowInvalidBackendCharacters: true,
                                    })}
                                    maxLength={1000}
                                    data-testid="nattevåk-tilleggsinfo"
                                />
                            </FormLayout.Panel>
                        )}
                    </FormLayout.Questions>
                </FormLayout.Section>
                <FormLayout.Section title="Beredskap" titleLevel="2">
                    <FormLayout.Questions>
                        <BodyLong>
                            <AppText id="steg.nattevåkOgBeredskap.beredskap.veileder" />
                        </BodyLong>
                        <SøknadFormComponents.YesOrNoQuestion
                            legend={text('steg.nattevåkOgBeredskap.beredskap.spm')}
                            name={SøknadFormField.harBeredskap}
                            validate={getYesOrNoValidator()}
                            data-testid="beredskap"
                        />

                        {harBeredskap === YesOrNo.YES && (
                            <FormLayout.Panel bleedTop={true}>
                                <SøknadFormComponents.Textarea
                                    name={SøknadFormField.harBeredskap_ekstrainfo}
                                    label={<AppText id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.spm" />}
                                    maxLength={1000}
                                    validate={getStringValidator({
                                        required: true,
                                        maxLength: 1000,
                                        disallowInvalidBackendCharacters: true,
                                    })}
                                    description={
                                        <Box paddingBlock="2">
                                            <BodyLong as="div">
                                                <p>
                                                    <AppText id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.tittel" />
                                                </p>
                                                <List>
                                                    <List.Item>
                                                        <AppText id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.1" />
                                                    </List.Item>
                                                    <List.Item>
                                                        <AppText id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.2" />
                                                    </List.Item>
                                                    <List.Item>
                                                        <AppText id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.3" />
                                                    </List.Item>
                                                </List>
                                            </BodyLong>
                                        </Box>
                                    }
                                    data-testid="beredskap-tilleggsinfo"
                                />
                            </FormLayout.Panel>
                        )}
                    </FormLayout.Questions>
                </FormLayout.Section>
            </FormLayout.Sections>
        </SøknadFormStep>
    );
};

export default NattevåkOgBeredskapStep;
