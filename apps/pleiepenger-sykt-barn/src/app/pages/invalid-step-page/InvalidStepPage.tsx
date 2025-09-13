import { BodyShort, Heading } from '@navikt/ds-react';
import { useNavigate } from 'react-router-dom';
import { useAppIntl } from '@i18n/index';
import { ActionLink } from '@navikt/sif-common-ui';
import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/src/components/sif-guide-panel/SifGuidePanel';
import { SoknadHeader } from '@navikt/sif-common-soknad-ds';
import RouteConfig from '../../config/routeConfig';
import { AppText } from '../../i18n';
import { StepID } from '../../types/StepID';

interface Props {
    stepId: StepID;
}

const InvalidStepPage = ({ stepId }: Props) => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const backLink = getPrevStepFromNotIncludedStep(stepId);

    return (
        <Page
            title={text('page.invalidStepPage.sidetittel')}
            topContentRenderer={() => <SoknadHeader title={text('application.title')} />}>
            <div style={{ paddingTop: '1rem' }}>
                <SifGuidePanel poster={true} compact={true} mood="uncertain">
                    <Heading level="2" size="medium" spacing={true}>
                        <AppText id="page.invalidStepPage.tittel" />
                    </Heading>
                    <BodyShort as="div">
                        <AppText id="page.invalidStepPage.tekst" />
                        <p>
                            <ActionLink
                                onClick={() => {
                                    if (backLink) {
                                        navigate(`${RouteConfig.SØKNAD_ROUTE_PREFIX}/${backLink}`);
                                    } else {
                                        history.go(-1);
                                    }
                                }}>
                                <AppText id="page.invalidStepPage.tilbakeLenke" />
                            </ActionLink>
                        </p>
                    </BodyShort>
                </SifGuidePanel>
            </div>
        </Page>
    );
};

export default InvalidStepPage;

export const getPrevStepFromNotIncludedStep = (stepId: StepID): string | undefined => {
    if (stepId === StepID.NATTEVÅK_OG_BEREDSKAP) {
        return StepID.OMSORGSTILBUD;
    }
    if (stepId === StepID.ARBEIDSTID) {
        return StepID.ARBEIDSSITUASJON;
    }
    return undefined;
};
