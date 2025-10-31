import { Buildings3Icon } from '@navikt/aksel-icons';
import { Box, HStack, LinkCard, Show, Tag } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import dayjs from 'dayjs';
import Link from 'next/link';

import { Inntektsmelding, InntektsmeldingStatus } from '../../server/api-models/InntektsmeldingSchema';
import { InntektsmeldingStatusTag } from '../inntektsmeldinger-liste/InntektsmeldingerListe';

interface Props {
    inntektsmelding: Inntektsmelding;
    saksnummer: string;
}

const InntektsmeldingLinkCard = ({ inntektsmelding, saksnummer }: Props) => {
    const startdato = inntektsmelding.startDatoPermisjon
        ? dayjs.utc(inntektsmelding.startDatoPermisjon).toDate()
        : undefined;

    const mottattDato = dayjs.utc(inntektsmelding.mottattDato).toDate();

    const erIBruk = inntektsmelding.status === InntektsmeldingStatus.I_BRUK;
    return (
        <LinkCard
            key={inntektsmelding.journalpostId}
            size={erIBruk ? 'medium' : 'small'}
            className={`w-full inntektsmeldingLinkCard ${!erIBruk ? ' inntektsmeldingLinkCard--ikkeIBruk' : ''}`}>
            <Show above="sm" asChild>
                <Box
                    asChild
                    borderRadius="full"
                    padding="space-12"
                    style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
                    <LinkCard.Icon>
                        <Buildings3Icon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />
                    </LinkCard.Icon>
                </Box>
            </Show>
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <Link href={`/sak/${saksnummer}/inntektsmelding/${inntektsmelding.journalpostId}`}>
                        {inntektsmelding.arbeidsgiver.navn}
                    </Link>
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
                Første fraværsdato: {startdato ? dateFormatter.full(startdato) : 'Ukjent'}.
            </LinkCard.Description>
            <LinkCard.Footer>
                <HStack gap="2">
                    <Tag variant="info" size="small">
                        Mottatt {dateFormatter.compact(mottattDato)}
                    </Tag>
                    <InntektsmeldingStatusTag status={inntektsmelding.status} />
                </HStack>
            </LinkCard.Footer>
        </LinkCard>
    );
};

export default InntektsmeldingLinkCard;
