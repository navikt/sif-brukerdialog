import { Box, FormProgress, Heading, VStack } from '@navikt/ds-react';

import { useAppIntl } from '../../../i18n';
import DefaultPageLayout from '../../../pages/layout/DefaultPageLayout';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useKontrollerOmStegErTilgjengelig } from '../../hooks/utils/useKontrollerOmStegErTilgjengelig';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Steg } from '../../types';
import { getSkjemaStegIndex, søknadSteg } from '../../utils/stegUtils';
import SøknadHeader from '../søknad-header/SøknadHeader';
import StegFooter from './StegFooter';

interface Props {
    steg: Steg;
    tittel: string;
    children: React.ReactNode;
}

const SøknadSteg = ({ steg, tittel, children }: Props) => {
    const { text } = useAppIntl();
    useKontrollerOmStegErTilgjengelig(steg);

    const { avbrytOgSlett } = useSøknadContext();
    const { gotoSteg } = useSøknadNavigation();

    const handleOnProgressStepChange = (stegIndex: number) => {
        if (stegIndex > 0) {
            gotoSteg(søknadSteg[stegIndex - 1]);
        }
    };

    const activeIndex = getSkjemaStegIndex(steg) + 1;

    return (
        <DefaultPageLayout documentTitle={`${tittel} - ${text('søknad.tittel')}`}>
            <section aria-label="Skjema">
                <VStack gap="space-32">
                    <SøknadHeader />
                    <div>
                        <Box paddingBlock="space-24 space-20">
                            <Heading level="2" size="large">
                                {tittel}
                            </Heading>
                        </Box>
                        <FormProgress
                            totalSteps={søknadSteg.length}
                            activeStep={activeIndex}
                            onStepChange={handleOnProgressStepChange}>
                            <FormProgress.Step completed={activeIndex > 2} interactive={activeIndex > 2}>
                                Kontonumer
                            </FormProgress.Step>
                            <FormProgress.Step completed={activeIndex > 1} interactive={activeIndex > 1}>
                                Bosted
                            </FormProgress.Step>
                            <FormProgress.Step completed={activeIndex > 3} interactive={activeIndex > 3}>
                                Medlemskap
                            </FormProgress.Step>
                            <FormProgress.Step completed={activeIndex > 4} interactive={activeIndex > 4}>
                                Barn
                            </FormProgress.Step>
                            <FormProgress.Step interactive={false}>{text('oppsummeringSteg.tittel')}</FormProgress.Step>
                        </FormProgress>
                    </div>

                    <Box marginBlock="space-16 space-0">{children}</Box>

                    <StegFooter
                        slett={{
                            tittel: text('søknadApp.avbrytSøknad.label'),
                            onClick: avbrytOgSlett,
                        }}
                    />
                </VStack>
            </section>
        </DefaultPageLayout>
    );
};

export default SøknadSteg;
