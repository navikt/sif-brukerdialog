import { Heading, VStack } from '@navikt/ds-react';
import { Arbeidsgiver, ArbeidstidApiData } from '@types';

import { AppText, useAppIntl } from '../../../i18n';
import ArbeidstidUker from '../../../modules/arbeidstid-uker/ArbeidstidUker';
import ArbeidstidArbeidstakerOppsummering from './ArbeidstidArbeidstakerOppsummering';
import { oppsummeringStepUtils } from './oppsummeringStepUtils';

interface Props {
    arbeidstid: ArbeidstidApiData;
    arbeidsgivere: Arbeidsgiver[];
}

const ArbeidstidOppsummering = ({ arbeidstid, arbeidsgivere }: Props) => {
    const { text } = useAppIntl();
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;
    const arbeidstidKolonneTittel = text('oppsummeringStep.arbeidstid.kolonne.endretArbeidstid');

    const eksisterendeArbeidstakere = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === false);
    const ukjenteArbeidsforhold = arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold === true);
    return (
        <VStack gap="8">
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
                <>
                    <Heading level="3" size="small">
                        <AppText id="oppsummeringStep.arbeidstid.frilanser.tittel" />
                    </Heading>

                    <ArbeidstidUker
                        listItems={oppsummeringStepUtils.getArbeidstidUkerItems(frilanserArbeidstidInfo.perioder)}
                        arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                    />
                </>
            )}
            {selvstendigNæringsdrivendeArbeidstidInfo && (
                <>
                    <Heading level="3" size="small">
                        <AppText id="oppsummeringStep.arbeidstid.sn.tittel" />
                    </Heading>

                    <ArbeidstidUker
                        listItems={oppsummeringStepUtils.getArbeidstidUkerItems(
                            selvstendigNæringsdrivendeArbeidstidInfo.perioder,
                        )}
                        arbeidstidKolonneTittel={arbeidstidKolonneTittel}
                    />
                </>
            )}
        </VStack>
    );
};

export default ArbeidstidOppsummering;
