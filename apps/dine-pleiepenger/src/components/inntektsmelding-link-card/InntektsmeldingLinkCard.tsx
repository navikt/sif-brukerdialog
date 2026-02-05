import { FileIcon } from '@navikt/aksel-icons';
import { Box, HStack, LinkCard, Show, Tag } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Link from 'next/link';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding } from '../../types';

interface Props {
    inntektsmelding: Inntektsmelding;
    saksnummer: string;
}

const InntektsmeldingLinkCard = ({ inntektsmelding, saksnummer }: Props) => {
    return (
        <LinkCard key={inntektsmelding.journalpostId} size="small" className="inntektsmeldingLinkCard">
            <Show above="sm" asChild>
                <Box asChild borderRadius="full" padding="space-12" background="moderateA">
                    <LinkCard.Icon>
                        <FileIcon role="presentation" aria-hidden={true} width="1.5rem" height="1.5rem" />
                    </LinkCard.Icon>
                </Box>
            </Show>
            <LinkCard.Title>
                <LinkCard.Anchor asChild>
                    <Link href={`/sak/${saksnummer}/inntektsmelding/${inntektsmelding.journalpostId}`}>
                        Inntektsmelding - første fraværsdag {dateFormatter.full(inntektsmelding.startDatoPermisjon)}.
                    </Link>
                </LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>
                Beregnet månedsbeløp:{' '}
                <FormattedNumber
                    value={inntektsmelding.inntektBeløp}
                    style="currency"
                    currency="NOK"
                    maximumFractionDigits={2}
                    trailingZeroDisplay="stripIfInteger"
                />
            </LinkCard.Description>
            <LinkCard.Footer>
                <HStack gap="space-8">
                    <Tag variant="info" size="small">
                        Mottatt {dateFormatter.compact(inntektsmelding.mottattDato)}
                    </Tag>
                </HStack>
            </LinkCard.Footer>
        </LinkCard>
    );
};

export default InntektsmeldingLinkCard;
