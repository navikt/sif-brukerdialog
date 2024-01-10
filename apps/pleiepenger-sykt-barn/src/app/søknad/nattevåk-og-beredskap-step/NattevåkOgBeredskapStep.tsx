import { BodyLong } from '@navikt/ds-react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/src/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/src/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/src/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/src';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/src/validation';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { useFormikContext } from 'formik';
import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import FormSection from '../../components/form-section/FormSection';
import ResponsivePanel from '../../components/responsive-panel/ResponsivePanel';
import usePersistOnChange from '../../hooks/usePersistOnChange';
import InfoList from '../../pages/welcoming-page/components/info-list/InfoList';
import { StepCommonProps } from '../../types/StepCommonProps';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/søknad-form-values/SøknadFormValues';
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
    const intl = useIntl();
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
            <Block padBottom="xl">
                <SifGuidePanel compact={true}>
                    <p>
                        <FormattedMessage id={'steg.nattevåkOgBeredskap.veileder'} />
                    </p>
                    <Block>
                        <ExpandableInfo
                            title={intlHelper(
                                intl,
                                'steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn.tittel',
                            )}>
                            <FormattedMessage id={'steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn'} />
                        </ExpandableInfo>
                    </Block>
                </SifGuidePanel>
            </Block>
            <FormSection title="Nattevåk" titleLevel="2">
                <BodyLong>
                    <FormattedMessage id={'steg.nattevåkOgBeredskap.nattevåk.veileder'} />
                </BodyLong>

                <FormBlock>
                    <SøknadFormComponents.YesOrNoQuestion
                        legend={intlHelper(intl, 'steg.nattevåkOgBeredskap.nattevåk.spm')}
                        name={SøknadFormField.harNattevåk}
                        validate={getYesOrNoValidator()}
                    />
                </FormBlock>

                {harNattevåk === YesOrNo.YES && (
                    <FormBlock margin="l">
                        <ResponsivePanel border={true}>
                            <SøknadFormComponents.Textarea
                                name={SøknadFormField.harNattevåk_ekstrainfo}
                                label={<FormattedMessage id={'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.spm'} />}
                                description={
                                    <Block>
                                        <BodyLong as="div">
                                            <FormattedMessage id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.tittel" />
                                            <InfoList>
                                                <li>
                                                    <FormattedMessage id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.1" />
                                                </li>
                                                <li>
                                                    <FormattedMessage id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.2" />
                                                </li>
                                                <li>
                                                    <FormattedMessage id="steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.liste.3" />
                                                </li>
                                            </InfoList>
                                        </BodyLong>
                                    </Block>
                                }
                                validate={getStringValidator({ required: true, maxLength: 1000 })}
                                maxLength={1000}
                            />
                        </ResponsivePanel>
                    </FormBlock>
                )}
            </FormSection>
            <FormSection title="Beredskap" titleLevel="2">
                <BodyLong>
                    <FormattedMessage id={'steg.nattevåkOgBeredskap.beredskap.veileder'} />
                </BodyLong>
                <FormBlock>
                    <SøknadFormComponents.YesOrNoQuestion
                        legend={intlHelper(intl, 'steg.nattevåkOgBeredskap.beredskap.spm')}
                        name={SøknadFormField.harBeredskap}
                        validate={getYesOrNoValidator()}
                    />
                </FormBlock>
                {harBeredskap === YesOrNo.YES && (
                    <FormBlock margin="l">
                        <ResponsivePanel border={true}>
                            <SøknadFormComponents.Textarea
                                name={SøknadFormField.harBeredskap_ekstrainfo}
                                label={<FormattedMessage id={'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.spm'} />}
                                maxLength={1000}
                                validate={getStringValidator({ required: true, maxLength: 1000 })}
                                description={
                                    <Block>
                                        <BodyLong as="div">
                                            <FormattedMessage id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.tittel" />
                                            <InfoList>
                                                <li>
                                                    <FormattedMessage id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.1" />
                                                </li>
                                                <li>
                                                    <FormattedMessage id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.2" />
                                                </li>
                                                <li>
                                                    <FormattedMessage id="steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.liste.3" />
                                                </li>
                                            </InfoList>
                                        </BodyLong>
                                    </Block>
                                }
                            />
                        </ResponsivePanel>
                    </FormBlock>
                )}
            </FormSection>
        </SøknadFormStep>
    );
};

export default NattevåkOgBeredskapStep;
