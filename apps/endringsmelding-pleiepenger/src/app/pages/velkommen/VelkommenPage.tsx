import { Heading, Ingress } from '@navikt/ds-react';
import React from 'react';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { Sak } from '../../types/Sak';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import OmSøknaden from './OmSøknaden';

const VelkommenPage = () => {
    const {
        state: { søker, sak },
        dispatch,
    } = useSøknadContext();

    const startSøknad = (sak: Sak) => {
        dispatch(actionsCreator.startSøknad(sak));
        dispatch(actionsCreator.setSøknadRoute(SøknadRoutes.AKTIVITET));
    };

    if (!sak) {
        return (
            <Page title="Velkommen">
                <SifGuidePanel>
                    <Heading level="1" size="large">
                        Velkommen {søker.fornavn}
                    </Heading>
                    <p>Vi kan ikke finne en aktiv sak på deg</p>
                </SifGuidePanel>
            </Page>
        );
    }

    const { fornavn, mellomnavn, etternavn, fødselsdato } = sak.barn;
    const barnetsNavn = formatName(fornavn, etternavn, mellomnavn);

    return (
        <Page title="Velkommen">
            <SifGuidePanel>
                <Heading level="1" size="large" data-testid="velkommen-header" spacing={true}>
                    Velkommen {søker.fornavn}
                </Heading>
                <Ingress as="div">
                    <p>
                        Her kan du kan melde om endringer på hvor mye du faktisk jobber i perioden med pleiepenger. Du
                        kan endre opptil 3 måneder tilbake i tid, og ett år frem i tid. Vil du melde fra om endringer
                        utenfor denne tidsrammen, eller du har behov for å melde fra om andre endringer, send inn en
                        melding via Skriv til oss.
                    </p>
                    <p>
                        Endringer du sender inn gjelder dine pleiepenger for <strong>{barnetsNavn}</strong>, født{' '}
                        {dateFormatter.dayDateShortMonthYear(fødselsdato)}.
                    </p>
                    <p>
                        Dersom du ønsker å melde inn endring om hvor mye du jobbet normalt, før du startet med
                        pleiepenger, må du sende inn en ny søknad, eller ta kontakt med oss.
                    </p>
                </Ingress>
            </SifGuidePanel>

            <OmSøknaden />

            <SamtykkeForm onValidSubmit={() => startSøknad(sak)} submitButtonLabel="Start melding om endring" />
        </Page>
    );
};

export default VelkommenPage;
