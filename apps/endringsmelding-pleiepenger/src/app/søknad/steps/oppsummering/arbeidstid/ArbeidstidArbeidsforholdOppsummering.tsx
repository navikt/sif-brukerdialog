import { useAppIntl } from '@app/i18n';
import { Arbeidsgiver, ArbeidstidApiData } from '@app/types';

import ArbeidstidArbeidstakerOppsummering from './ArbeidstidArbeidstakerOppsummering';
import ArbeidstidEndringerAnswer from './ArbeidstidEndringerAnswer';
import ArbeidstidFormSummary from './ArbeidstidFormSummary';

interface Props {
    arbeidstid: ArbeidstidApiData;
    arbeidsgivere: Arbeidsgiver[];
}

const ArbeidstidArbeidsforholdOppsummering = ({ arbeidstid, arbeidsgivere }: Props) => {
    const { text } = useAppIntl();
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    const eksisterendeArbeidstakere = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === false);
    const ukjenteArbeidsforhold = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === true);
    return (
        <>
            {ukjenteArbeidsforhold &&
                Object.keys(ukjenteArbeidsforhold).map((key) => (
                    <ArbeidstidArbeidstakerOppsummering
                        key={key}
                        arbeidstaker={ukjenteArbeidsforhold[key]}
                        arbeidsgivere={arbeidsgivere}
                        arbeidstidKolonneTittel={text('oppsummeringStep.arbeidstid.kolonne.iPerioden')}
                    />
                ))}
            {eksisterendeArbeidstakere &&
                Object.keys(eksisterendeArbeidstakere).map((key) => (
                    <ArbeidstidArbeidstakerOppsummering
                        key={key}
                        arbeidstaker={eksisterendeArbeidstakere[key]}
                        arbeidsgivere={arbeidsgivere}
                    />
                ))}
            {frilanserArbeidstidInfo && (
                <ArbeidstidFormSummary title={text('oppsummeringStep.arbeidstid.frilanser.tittel')}>
                    <ArbeidstidEndringerAnswer perioder={frilanserArbeidstidInfo.perioder} />
                </ArbeidstidFormSummary>
            )}
            {selvstendigNæringsdrivendeArbeidstidInfo && (
                <ArbeidstidFormSummary title={text('oppsummeringStep.arbeidstid.sn.tittel')}>
                    <ArbeidstidEndringerAnswer perioder={selvstendigNæringsdrivendeArbeidstidInfo.perioder} />
                </ArbeidstidFormSummary>
            )}
        </>
    );
};

export default ArbeidstidArbeidsforholdOppsummering;
