import { Accordion } from '@navikt/ds-react';
import AccordionContent from '@navikt/ds-react/esm/accordion/AccordionContent';
import AccordionHeader from '@navikt/ds-react/esm/accordion/AccordionHeader';
import AccordionItem from '@navikt/ds-react/esm/accordion/AccordionItem';
import React from 'react';
import { useIntl } from 'react-intl';
import { useLogSidevisning } from '@navikt/sif-common-amplitude/lib';
import Block from '@navikt/sif-common-core-ds/lib/components/block/Block';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import intlHelper from '@navikt/sif-common-core-ds/lib/utils/intlUtils';
import soknadStepUtils from '@navikt/sif-common-soknad-ds/lib/soknad-step/soknadStepUtils';
import Step from '@navikt/sif-common-soknad-ds/lib/soknad-step/step/Step';
import InvalidStepSøknadsdataInfo from '../components/invalid-step-søknadsdata-info/InvalidStepSøknadsdataInfo';
import StateInfo from '../dev/state-info/StateInfo';
import useAvbrytEllerFortsettSenere from '../hooks/useAvbrytSøknad';
import { Sak } from '../types/Sak';
import { StepId } from './config/StepId';
import { getSøknadStepConfig } from './config/søknadStepConfig';
import { EndringType } from '../types/EndringType';

interface Props {
    stepId: StepId;
    sak: Sak;
    hvaSkalEndres: EndringType[];
    children: React.ReactNode;
}

const SøknadStep: React.FunctionComponent<Props> = ({ stepId, sak, hvaSkalEndres, children }) => {
    const intl = useIntl();
    const isDevMode = getEnvironmentVariable('APP_VERSION') === 'dev';

    const { avbrytSøknad, fortsettSøknadSenere } = useAvbrytEllerFortsettSenere();

    const stepConfig = getSøknadStepConfig(sak, hvaSkalEndres);

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
            <InvalidStepSøknadsdataInfo stepId={stepId} stepConfig={stepConfig} sak={sak} />
            {children}
            {isDevMode && 1 + 1 === 2 ? (
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
