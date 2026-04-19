import { AppText, useAppIntl } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import { SifInfoCard } from '@sif/soknad-ui/components';

interface Props {
    barnetsFornavn: string;
}

export const TrengerIkkeSøkeForBarnAlert = ({ barnetsFornavn }: Props) => {
    const { text } = useAppIntl();
    const lenker = useLenker();

    return (
        <SifInfoCard variant="warning">
            <VStack gap="space-8">
                <Heading size="xsmall" level="3">
                    {text('omBarnetSteg.alert.trengerIkkeSøke.tittel', { barnetsFornavn })}
                </Heading>
                <BodyLong>
                    <AppText id="omBarnetSteg.alert.trengerIkkeSøke.tekst" values={{ barnetsFornavn }} />{' '}
                    <Link href={lenker.navMinSide} target="_blank" rel="noopener noreferrer">
                        <AppText id="omBarnetSteg.alert.trengerIkkeSøke.minsideLenke" />
                    </Link>
                </BodyLong>
            </VStack>
        </SifInfoCard>
    );
};
