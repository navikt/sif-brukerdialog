import { Heading, Ingress } from '@navikt/ds-react';
import React from 'react';
import InfoList from '@navikt/sif-common-core-ds/lib/components/info-list/InfoList';
import Page from '@navikt/sif-common-core-ds/lib/components/page/Page';
import SifGuidePanel from '@navikt/sif-common-core-ds/lib/components/sif-guide-panel/SifGuidePanel';
import { formatName } from '@navikt/sif-common-core-ds/lib/utils/personUtils';
import SamtykkeForm from '@navikt/sif-common-soknad-ds/lib/samtykke-form/SamtykkeForm';
import { dateFormatter } from '@navikt/sif-common-utils/lib';
import { SøknadRoutes } from '../../søknad/config/SøknadRoutes';
import actionsCreator from '../../søknad/context/action/actionCreator';
import { useSøknadContext } from '../../søknad/context/hooks/useSøknadContext';
import { ArbeidAktivitet, ArbeidAktiviteter, Sak } from '../../types/Sak';
import { getArbeidAktivitetNavn } from '../../utils/arbeidAktivitetUtils';
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
                        Her kan du kan melde om endringer på hvor mye du jobber i perioden med pleiepenger. Du kan endre
                        opptil 3 måneder tilbake i tid, og ett år frem i tid. Vil du melde fra om endringer utenfor
                        denne tidsrammen, eller du har behov for å melde fra om andre endringer, send inn en melding via
                        Skriv til oss.
                    </p>
                    <p>Endringer gjelder dine pleiepenger for</p>
                    <InfoList>
                        <li>
                            <strong>{barnetsNavn}</strong>, født {dateFormatter.dayDateShortMonthYear(fødselsdato)}
                        </li>
                    </InfoList>
                    <p>Arbeidsforhold du kan endre arbeidstid på</p>
                    <InfoList>
                        {getAktiviteterSomKanEndres(sak.arbeidAktiviteter).map((aktivitet, index) => {
                            return (
                                <li key={index}>
                                    <strong>{getArbeidAktivitetNavn(aktivitet)}</strong>
                                </li>
                            );
                        })}
                    </InfoList>
                </Ingress>
            </SifGuidePanel>

            <OmSøknaden />

            <SamtykkeForm onValidSubmit={() => startSøknad(sak)} submitButtonLabel="Start melding om endring" />
        </Page>
    );
};

export default VelkommenPage;

const getAktiviteterSomKanEndres = ({
    arbeidstakerArktiviteter,
    frilanser,
    selvstendigNæringsdrivende,
}: ArbeidAktiviteter): ArbeidAktivitet[] => {
    const aktiviteter: ArbeidAktivitet[] = [...arbeidstakerArktiviteter];
    if (frilanser) {
        aktiviteter.push(frilanser);
    }
    if (selvstendigNæringsdrivende) {
        aktiviteter.push(selvstendigNæringsdrivende);
    }
    return aktiviteter;
};

// arbeidstaker.forEach(({ id, arbeidsgiver: { organisasjonsnummer: orgnr, navn, type } }) => {
//     checkboxProps.push({
//         label: getAktivitetCheckboxLabel({
//             title: navn,
//             info: type === ArbeidsgiverType.ORGANISASJON ? `Orgnr. ${orgnr}` : 'Privatperson',
//         }),
//         value: id,
//         'data-testid': `aktivitet-${id}`,
//     });
// });

// if (frilanser) {
//     checkboxProps.push({
//         label: getAktivitetCheckboxLabel({
//             title: 'Frilanser',
//         }),
//         value: ArbeidAktivitetType.frilanser,
//     });
// }
// if (selvstendigNæringsdrivende) {
//     checkboxProps.push({
//         label: getAktivitetCheckboxLabel({
//             title: 'Selvstendig næringsdrivende',
//         }),
//         value: ArbeidAktivitetType.selvstendigNæringsdrivende,
//     });
// }
