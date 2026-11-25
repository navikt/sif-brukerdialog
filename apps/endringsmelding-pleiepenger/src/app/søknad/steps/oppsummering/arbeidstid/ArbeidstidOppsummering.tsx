import { AppText, useAppIntl } from '@app/i18n';
import { ArbeidsgiverMedAnsettelseperioder, ArbeidstidApiData } from '@app/types';
import { VStack } from '@navikt/ds-react';
import { SifInfoCard } from '@sif/soknad-ui/components';

import ArbeidstidAktivitetOppsummering from './ArbeidstidAktivitetOppsummering';

interface Props {
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[];
    arbeidstid: ArbeidstidApiData;
    harGyldigArbeidstid: boolean;
}

const ArbeidstidOppsummering = ({ arbeidsgivere, arbeidstid, harGyldigArbeidstid }: Props) => {
    const { text } = useAppIntl();
    const { arbeidstakerList, frilanserArbeidstidInfo, selvstendigNæringsdrivendeArbeidstidInfo } = arbeidstid;

    /** Nye arbeidsforhold vises først */
    const arbeidstakere = [
        ...arbeidstakerList.filter((a) => a._erUkjentArbeidsforhold),
        ...arbeidstakerList.filter((a) => !a._erUkjentArbeidsforhold),
    ];

    return (
        <VStack gap="space-32">
            {arbeidstakere.map(({ organisasjonsnummer, arbeidstidInfo, _erUkjentArbeidsforhold }) => {
                const arbeidsgiver = arbeidsgivere.find((a) => a.organisasjonsnummer === organisasjonsnummer);
                return arbeidsgiver ? (
                    <ArbeidstidAktivitetOppsummering
                        key={organisasjonsnummer}
                        tittel={arbeidsgiver.navn}
                        perioder={arbeidstidInfo.perioder}
                        visEndringSomOpprinnelig={_erUkjentArbeidsforhold}
                    />
                ) : null;
            })}
            {frilanserArbeidstidInfo && (
                <ArbeidstidAktivitetOppsummering
                    tittel={text('oppsummeringStep.arbeidstid.frilanser.tittel')}
                    perioder={frilanserArbeidstidInfo.perioder}
                />
            )}
            {selvstendigNæringsdrivendeArbeidstidInfo && (
                <ArbeidstidAktivitetOppsummering
                    tittel={text('oppsummeringStep.arbeidstid.sn.tittel')}
                    perioder={selvstendigNæringsdrivendeArbeidstidInfo.perioder}
                />
            )}
            {!harGyldigArbeidstid && (
                <SifInfoCard variant="error">
                    <AppText id="oppsummeringStep.arbeidstid.flereTimerEnnTilgjengelig" />
                </SifInfoCard>
            )}
        </VStack>
    );
};

export default ArbeidstidOppsummering;
