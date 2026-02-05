import { PlusCircleIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Heading, HStack, VStack } from '@navikt/ds-react';
import { usePagination } from '@navikt/sif-common-hooks';

import { Inntektsmelding } from '../../types';
import { ArbeidsgiverMedInntektsmeldinger } from '../../utils/inntektsmeldingUtils';
import InntektsmeldingLinkCard from '../inntektsmelding-link-card/InntektsmeldingLinkCard';
import Organisasjonsnummer from '../organisasjonsnummer/Organisasjonsnummer';

interface Props {
    arbeidsgiver: ArbeidsgiverMedInntektsmeldinger;
    saksnummer: string;
}

const ArbeidsgiverInntektsmeldingerListe = ({
    arbeidsgiver: { arbeidsgiverId, arbeidsgiverNavn, inntektsmeldinger, erOrganisasjon },
    saksnummer,
}: Props) => {
    const { visibleItems, hasMoreItems, showMoreItems, showAllItems } = usePagination<Inntektsmelding>(
        inntektsmeldinger,
        2,
    );

    return (
        <VStack gap="space-12">
            <Heading level="3" size="medium">
                {arbeidsgiverNavn}
                {erOrganisasjon && (
                    <BodyShort>
                        Orgnr. <Organisasjonsnummer orgnr={arbeidsgiverId} />
                    </BodyShort>
                )}
            </Heading>
            <VStack gap="space-8">
                {visibleItems.map((inntektsmelding) => {
                    return (
                        <InntektsmeldingLinkCard
                            key={inntektsmelding.journalpostId}
                            inntektsmelding={inntektsmelding}
                            saksnummer={saksnummer}
                        />
                    );
                })}
            </VStack>
            {hasMoreItems && (
                <HStack gap="space-8">
                    <Button
                        size="small"
                        variant="tertiary"
                        icon={<PlusCircleIcon role="presentation" aria-hidden={true} />}
                        type="button"
                        onClick={showMoreItems}>
                        Vis flere
                    </Button>
                    <Button
                        size="small"
                        variant="tertiary"
                        icon={<PlusCircleIcon role="presentation" aria-hidden={true} />}
                        type="button"
                        onClick={showAllItems}>
                        Vis alle ({inntektsmeldinger.length})
                    </Button>
                </HStack>
            )}
        </VStack>
    );
};

export default ArbeidsgiverInntektsmeldingerListe;
