import { Box, FormProgress, Heading, VStack } from '@navikt/ds-react';
import { useSøknadContext } from '../../hooks/context/useSøknadContext';
import { useKontrollerOmStegErTilgjengelig } from '../../hooks/utils/useKontrollerOmStegErTilgjengelig';
import { useSøknadNavigation } from '../../hooks/utils/useSøknadNavigation';
import { Steg } from '../../types';
import { getSkjemaStegIndex, søknadSteg } from '../../utils/stegUtils';
import SøknadHeader from '../søknad-header/SøknadHeader';
import StegFooter from './StegFooter';
import DefaultPageLayout from '../../../innsyn/pages/layout/DefaultPageLayout';

interface Props {
    steg: Steg;
    tittel: string;
    children: React.ReactNode;
}

const SøknadSteg = ({ steg, tittel, children }: Props) => {
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
        <DefaultPageLayout documentTitle={`${tittel} - Søknad om ungdomsprogramytelse`}>
            <section aria-label="Skjema">
                <VStack gap="8">
                    <SøknadHeader />
                    <div>
                        <Box paddingBlock="6 5">
                            <Heading level="2" size="large">
                                {tittel}
                            </Heading>
                        </Box>
                        <FormProgress
                            totalSteps={søknadSteg.length}
                            activeStep={activeIndex}
                            onStepChange={handleOnProgressStepChange}>
                            <FormProgress.Step completed={activeIndex > 2} interactive={activeIndex > 2}>
                                Kontonummer for utbetaling
                            </FormProgress.Step>
                            <FormProgress.Step completed={activeIndex > 1} interactive={activeIndex > 1}>
                                Barn
                            </FormProgress.Step>
                            <FormProgress.Step interactive={false}>Oppsummering</FormProgress.Step>
                        </FormProgress>
                    </div>

                    <Box marginBlock="4 0">{children}</Box>

                    <StegFooter
                        slett={{
                            tittel: 'Avbryt søknad',
                            onClick: avbrytOgSlett,
                        }}
                    />
                </VStack>
            </section>
        </DefaultPageLayout>
    );
};

export default SøknadSteg;
