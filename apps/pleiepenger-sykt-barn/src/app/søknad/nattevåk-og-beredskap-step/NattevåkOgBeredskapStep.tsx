import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Block from '@navikt/sif-common-core-ds/lib/atoms/block/Block';
import FormBlock from '@navikt/sif-common-core-ds/lib/atoms/form-block/FormBlock';
import ExpandableInfo from '@navikt/sif-common-core-ds/lib/components/expandable-info/ExpandableInfo';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import { YesOrNo } from '@navikt/sif-common-formik-ds/lib';
import { getStringValidator, getYesOrNoValidator } from '@navikt/sif-common-formik-ds/lib/validation';
import { useFormikContext } from 'formik';
import FormSection from '../../components/form-section/FormSection';
import useEffectOnce from '../../hooks/useEffectOnce';
import usePersistOnChange from '../../hooks/usePersistOnChange';
import { StepID } from '../../types/StepID';
import { SøknadFormField, SøknadFormValues } from '../../types/SøknadFormValues';
import SøknadFormComponents from '../SøknadFormComponents';
import SøknadFormStep from '../SøknadFormStep';
import { StepCommonProps } from '../../types/StepCommonProps';

const cleanupStep = (values: SøknadFormValues): SøknadFormValues => {
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
        <SøknadFormStep
            stepId={StepID.NATTEVÅK_OG_BEREDSKAP}
            onValidFormSubmit={onValidSubmit}
            onStepCleanup={cleanupStep}>
            <Block padBottom="xl">
                <SifGuidePanel compact={true}>
                    <FormattedMessage id={'steg.nattevåkOgBeredskap.veileder'} />
                </SifGuidePanel>
            </Block>
            <FormSection title="Nattevåk">
                <FormattedMessage id={'steg.nattevåkOgBeredskap.nattevåk.veileder'} tagName="p" />

                <FormBlock>
                    <SøknadFormComponents.YesOrNoQuestion
                        legend={intlHelper(intl, 'steg.nattevåkOgBeredskap.nattevåk.spm')}
                        name={SøknadFormField.harNattevåk}
                        description={
                            <ExpandableInfo
                                title={intlHelper(
                                    intl,
                                    'steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn.tittel'
                                )}>
                                <FormattedMessage id={'steg.nattevåkOgBeredskap.nattevåk.spm.description.flereBarn'} />
                            </ExpandableInfo>
                        }
                        validate={getYesOrNoValidator()}
                        data-testid="nattevåk"
                    />
                </FormBlock>

                {harNattevåk === YesOrNo.YES && (
                    <FormBlock>
                        <SøknadFormComponents.Textarea
                            name={SøknadFormField.harNattevåk_ekstrainfo}
                            label={<FormattedMessage id={'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.spm'} />}
                            validate={getStringValidator({ required: true, maxLength: 1000 })}
                            maxLength={1000}
                            description={
                                <ExpandableInfo
                                    title={intlHelper(
                                        intl,
                                        'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.veiledning.tittel'
                                    )}>
                                    <FormattedMessage
                                        id={'steg.nattevåkOgBeredskap.nattevåk.tilleggsinfo.veiledning'}
                                    />
                                </ExpandableInfo>
                            }
                            data-testid="nattevåk-tilleggsinfo"
                        />
                    </FormBlock>
                )}
            </FormSection>
            <FormSection title="Beredskap">
                <FormattedMessage id={'steg.nattevåkOgBeredskap.beredskap.veileder'} tagName="p" />
                <FormBlock>
                    <SøknadFormComponents.YesOrNoQuestion
                        legend={intlHelper(intl, 'steg.nattevåkOgBeredskap.beredskap.spm')}
                        name={SøknadFormField.harBeredskap}
                        description={
                            <ExpandableInfo
                                title={intlHelper(
                                    intl,
                                    'steg.nattevåkOgBeredskap.beredskap.spm.description.flereBarn.tittel'
                                )}>
                                <FormattedMessage id={'steg.nattevåkOgBeredskap.beredskap.spm.description.flereBarn'} />
                            </ExpandableInfo>
                        }
                        validate={getYesOrNoValidator()}
                        data-testid="beredskap"
                    />
                </FormBlock>
                {harBeredskap === YesOrNo.YES && (
                    <FormBlock>
                        <SøknadFormComponents.Textarea
                            name={SøknadFormField.harBeredskap_ekstrainfo}
                            label={<FormattedMessage id={'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.spm'} />}
                            maxLength={1000}
                            validate={getStringValidator({ required: true, maxLength: 1000 })}
                            description={
                                <ExpandableInfo
                                    title={intlHelper(
                                        intl,
                                        'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.veiledning.tittel'
                                    )}>
                                    <FormattedMessage
                                        id={'steg.nattevåkOgBeredskap.beredskap.tilleggsinfo.veiledning'}
                                    />
                                </ExpandableInfo>
                            }
                            data-testid="beredskap-tilleggsinfo"
                        />
                    </FormBlock>
                )}
            </FormSection>
        </SøknadFormStep>
    );
};

export default NattevåkOgBeredskapStep;
