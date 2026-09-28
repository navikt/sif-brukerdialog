import { AppText, useAppIntl } from '@app/i18n';
import { useLenker } from '@app/lenker';
import { BodyLong, Heading, Link, VStack } from '@navikt/ds-react';
import { SifInfoCard } from '@sif/soknad-ui/components';
import { dateFormatter } from '@sif/utils';

import { UtledetVedtakInfo } from './omBarnetStegUtils';

interface Props {
    barnetsFornavn: string;
    vedtak: UtledetVedtakInfo;
}

export const VedtakForBarnInfo = ({ barnetsFornavn, vedtak }: Props) => {
    const { text } = useAppIntl();
    const lenker = useLenker();

    const minSideLenke = (chunks: React.ReactNode) => (
        <Link href={lenker.navMinSide} target="_blank" rel="noopener noreferrer">
            {chunks}
        </Link>
    );

    if (vedtak.erTidsbegrenset === false) {
        return (
            <SifInfoCard>
                <VStack gap="space-8">
                    <Heading size="xsmall" level="3">
                        {text('omBarnetSteg.alert.trengerIkkeSøke.tittel', { barnetsFornavn })}
                    </Heading>
                    <BodyLong>
                        <AppText
                            id="omBarnetSteg.alert.trengerIkkeSøke.tekst"
                            values={{
                                barnetsFornavn,
                                Lenke: minSideLenke,
                            }}
                        />
                    </BodyLong>
                </VStack>
            </SifInfoCard>
        );
    }

    return (
        <SifInfoCard variant="warning">
            <VStack gap="space-8">
                <Heading size="xsmall" level="3">
                    {text('omBarnetSteg.alert.tidsbegrensetVedtak.tittel', { barnetsFornavn })}
                </Heading>
                <BodyLong>
                    <AppText
                        id="omBarnetSteg.alert.tidsbegrensetVedtak.tekst.1"
                        values={{
                            barnetsFornavn,
                            vedtakTomDato: dateFormatter.compact(vedtak.vedtakTomDato),
                            førsteMuligeSøknadsdato: dateFormatter.compact(vedtak.førsteMuligeSøknadsdato),
                        }}
                    />
                </BodyLong>
                <BodyLong>
                    <AppText
                        id="omBarnetSteg.alert.tidsbegrensetVedtak.tekst.2"
                        values={{
                            Lenke: minSideLenke,
                        }}
                    />
                </BodyLong>
            </VStack>
        </SifInfoCard>
    );
};
