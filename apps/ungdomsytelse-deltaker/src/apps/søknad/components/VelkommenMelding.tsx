import { BodyLong, BodyShort, GuidePanel, Heading, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import YtelseHeader from '../../../components/ytelse-header/YtelseHeader';

interface Props {
    fornavn: string;
    startdato: Date;
}

const VelkommenMelding = ({ fornavn, startdato }: Props) => {
    return (
        <VStack gap="8">
            <YtelseHeader title="Søknad om ungdomsytelse" />
            <GuidePanel poster={true}>
                <Heading level="1" size="medium" spacing={true}>
                    Hei {fornavn}!
                </Heading>
                <VStack gap="8">
                    <BodyLong size="large">
                        Du er meldt på av din veileder til å være med i ungdomsprogrammet fra og med{' '}
                        <strong>{dateFormatter.dateShortMonthYear(startdato)}</strong>. For å kunne motta ungdomsytelsen
                        må du svare på noen få spørsmål i søknadsskjemaet nedenfor.
                    </BodyLong>
                    <BodyShort size="large">
                        Du må svare på alle spørsmålene for å kunne sende inn en søknaden.
                    </BodyShort>
                </VStack>
            </GuidePanel>
        </VStack>
    );
};

export default VelkommenMelding;
