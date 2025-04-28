import { FormSummary } from '@navikt/ds-react';
import SøknadSteg from '../../components/søknad-steg/SøknadSteg';
import { Steg } from '../../types/Steg';
import { Spørsmål, useSøknadContext } from '../../context/søknadContext';
import { useDeltakerContext } from '../../../../context/DeltakerContext';
import { dateFormatter } from '@navikt/sif-common-utils';
import { YesOrNo } from '@navikt/sif-common-core-ds/src';
import BarnInfo from '../barn/BarnInfo';
import SkjemaFooter from '../../components/steg-skjema/SkjemaFooter';

const OppsummeringSteg = () => {
    const { deltakelse, barn, kontonummer } = useDeltakerContext();
    const { setAktivtSteg } = useSøknadContext();
    const harKontonummer = kontonummer !== undefined && kontonummer !== null;

    const { svar } = useSøknadContext();

    const handleOnSubmit = () => {
        alert('Sender inn');
    };

    return (
        <SøknadSteg tittel="Oppsummering" steg={Steg.OPPSUMMERING}>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">Dine svar</FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    <FormSummary.Answer>
                        <FormSummary.Label>
                            Er det riktig at du starter i ungdomsprogrammet{' '}
                            {dateFormatter.dayDateMonthYear(deltakelse.programPeriode.from)}?
                        </FormSummary.Label>
                        <FormSummary.Value>{svar[Spørsmål.OPPSTART] === YesOrNo.YES ? 'Ja' : 'Nei'}</FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Barn vi har registrert på deg:</FormSummary.Label>
                        <FormSummary.Value>
                            <BarnInfo barn={barn} />
                        </FormSummary.Value>
                    </FormSummary.Answer>
                    <FormSummary.Answer>
                        <FormSummary.Label>Stemmer informasjonen om barn?</FormSummary.Label>
                        <FormSummary.Value>{svar[Spørsmål.BARN] === YesOrNo.YES ? 'Ja' : 'Nei'}</FormSummary.Value>
                    </FormSummary.Answer>
                    {harKontonummer ? (
                        <FormSummary.Answer>
                            <FormSummary.Label>Stemmer det at kontonummeret ditt er {kontonummer}?</FormSummary.Label>
                            <FormSummary.Value>
                                {svar[Spørsmål.KONTONUMMER] === YesOrNo.YES ? 'Ja' : 'Nei'}
                            </FormSummary.Value>
                        </FormSummary.Answer>
                    ) : (
                        <FormSummary.Answer>
                            <FormSummary.Label>Kontonummer for utbetaling</FormSummary.Label>
                            <FormSummary.Value>Vi har ikke registrert noe kontonummer på deg.</FormSummary.Value>
                        </FormSummary.Answer>
                    )}
                </FormSummary.Answers>
            </FormSummary>
            <SkjemaFooter
                forrige={{ tittel: 'Forrige steg', onClick: () => setAktivtSteg(Steg.KONTONUMMER) }}
                neste={{ tittel: 'Send søknad', erSendInn: true, onClick: handleOnSubmit }}
            />
        </SøknadSteg>
    );
};
export default OppsummeringSteg;
