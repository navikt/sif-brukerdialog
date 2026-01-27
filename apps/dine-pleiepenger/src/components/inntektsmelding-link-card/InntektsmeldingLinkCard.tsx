import { FileIcon } from '@navikt/aksel-icons';
import { Box, HStack, LinkCard, Show, Tag } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import Link from 'next/link';
import { FormattedNumber } from 'react-intl';

import { Inntektsmelding, InntektsmeldingStatus } from '../../types';
import { InntektsmeldingStatusTag } from '../inntektsmelding-status-tag/InntektsmeldingStatusTag';

interface Props {
    inntektsmelding: Inntektsmelding;
    saksnummer: string;
}

const InntektsmeldingLinkCard = ({ inntektsmelding, saksnummer }: Props) => {
    const erIBruk = inntektsmelding.status === InntektsmeldingStatus.I_BRUK;
    const erIkkeRelevant = inntektsmelding.status === InntektsmeldingStatus.IKKE_RELEVANT;
    const erErstattet = inntektsmelding.status === InntektsmeldingStatus.ERSTATTET_AV_NYERE;

    const getClassName = () => {
        if (erIkkeRelevant) {
            return 'inntektsmeldingLinkCard--ikkeRelevant';
        }
        if (!erIBruk) {
            return 'inntektsmeldingLinkCard--ikkeIBruk';
        }
        return '';
    };

    return (
        <LinkCard
            key={inntektsmelding.journalpostId}
            size={erErstattet ? 'small' : 'medium'}
            className={`w-full inntektsmeldingLinkCard ${getClassName()}`}>
            <Show above="sm" asChild>
                <Box
                    asChild
                    borderRadius="full"
                    padding="space-12"
                    style={{ backgroundColor: 'var(--ax-bg-moderateA)' }}>
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
                    <InntektsmeldingStatusTag status={inntektsmelding.status} />
                </HStack>
            </LinkCard.Footer>
        </LinkCard>
    );
};

export default InntektsmeldingLinkCard;
