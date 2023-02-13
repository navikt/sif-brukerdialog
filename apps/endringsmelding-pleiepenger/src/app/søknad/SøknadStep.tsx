import React from 'react';
import { useIntl } from 'react-intl';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import Step from '@navikt/sif-common-soknad-ds/lib/soknad-step/step/Step';
import InvalidStepSøknadsdataInfo from '../components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import StateInfo from '../components/state-info/StateInfo';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { StepId } from './config/StepId';
import { getSøknadStepConfig } from './config/søknadStepConfig';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { Accordion } from '@navikt/ds-react';
import AccordionItem from '@navikt/ds-react/esm/accordion/AccordionItem';
import AccordionHeader from '@navikt/ds-react/esm/accordion/AccordionHeader';
import AccordionContent from '@navikt/ds-react/esm/accordion/AccordionContent';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { Sak } from '../types/Sak';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';

interface Props {
    stepId: StepId;
    sak: Sak;
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, sak, children }) => {
    const intl = useIntl();
    const isDevMode = getEnvironmentVariable('APP_VERSION') === 'dev';

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const stepConfig = getSøknadStepConfig(sak);

    useLogSidevisning(stepId);

    const { pageTitleIntlKey, index } = stepConfig[stepId];

    return (
        <Step
            activeStepId={stepId}
            pageTitle={intlHelper(intl, pageTitleIntlKey)}
            bannerTitle={intlHelper(intl, 'application.bannerTitle')}
            steps={soknadStepUtils.getProgressStepsFromConfig(stepConfig, index, intl)}
            onCancel={avbrytSøknad}
            onContinueLater={fortsettSøknadSenere}>
            <InvalidStepSøknadsdataInfo stepId={stepId} stepConfig={stepConfig} />
            {children}
            {isDevMode && 1 + 1 === 3 ? (
                <Block margin="xxl">
                    <Accordion>
                        <AccordionItem title="Develop info">
                            <AccordionHeader>Dev-info</AccordionHeader>
                            <AccordionContent>
                                <StateInfo />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Block>
            ) : null}
        </Step>
    );
};

export default SøknadStep;
