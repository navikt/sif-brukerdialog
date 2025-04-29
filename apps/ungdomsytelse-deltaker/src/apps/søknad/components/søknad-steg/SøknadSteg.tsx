import Page from '@navikt/sif-common-core-ds/src/components/page/Page';
import { Steg } from '../../types/Steg';
import SøknadHeader from '../søknad-header/SøknadHeader';
import { Box, FormProgress, Heading, VStack } from '@navikt/ds-react';
import { getSkjemaStegIndex, skjemaSteg } from '../../utils/stegUtils';
import { useNavigate } from 'react-router-dom';
import { useErStegTilgjengelig } from '../../hooks/useErStegTilgjengelig';
import StegFooter from './StegFooter';
import { useSøknadContext } from '../../context/søknadContext';

interface Props {
    steg: Steg;
    tittel: string;
    children: React.ReactNode;
}

const SøknadSteg = ({ steg, tittel, children }: Props) => {
    useErStegTilgjengelig(steg);

    const { avbrytOgSlett } = useSøknadContext();

    const navigate = useNavigate();

    const handleOnStepChange = (stegIndex: number) => {
        if (stegIndex > 0) {
            navigate('/soknad/' + skjemaSteg[stegIndex - 1]);
        }
    };

    const activeIndex = getSkjemaStegIndex(steg) + 1;

    return (
        <Page title={`${tittel} - Søknad om ungdomsytelse`}>
            <VStack gap="8">
                <SøknadHeader tittel="Søknad om ungdomsytelse" />
                <div>
                    <Box paddingBlock="6 5">
                        <Heading level="2" size="large">
                            {tittel}
                        </Heading>
                    </Box>
                    <FormProgress
                        totalSteps={skjemaSteg.length}
                        activeStep={activeIndex}
                        onStepChange={handleOnStepChange}>
                        <FormProgress.Step completed={activeIndex > 0} interactive={true}>
                            Oppstart
                        </FormProgress.Step>
                        <FormProgress.Step completed={activeIndex > 1} interactive={activeIndex > 1}>
                            Barn
                        </FormProgress.Step>
                        <FormProgress.Step completed={activeIndex > 2} interactive={activeIndex > 2}>
                            Kontonummer
                        </FormProgress.Step>
                        <FormProgress.Step interactive={false}>Oppsummering</FormProgress.Step>
                    </FormProgress>
                </div>

                <div>{children}</div>

                <StegFooter
                    slett={{
                        tittel: 'Avbryt søknad',
                        onClick: avbrytOgSlett,
                    }}
                />
            </VStack>
        </Page>
    );
};

export default SøknadSteg;
