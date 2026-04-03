import { InformationSquareIcon } from '@navikt/aksel-icons';
import { Box, Heading, HeadingProps, HelpText, HStack, InfoCard, VStack } from '@navikt/ds-react';
import { RegistrertBarn } from '@navikt/sif-common-api';
import { dateFormatter, formatName } from '@navikt/sif-common-utils';

import { SifSoknadUiText, useSifSoknadUiIntl } from '../../i18n';
import ItemListDarkside from '../item-list-darkside/ItemListDarkside';

interface Props {
    listetittel: string;
    headingProps?: Pick<HeadingProps, 'size' | 'level'>;
    registrerteBarn: RegistrertBarn[];
}

export const RegistrerteBarnListe = ({
    listetittel,
    headingProps = { level: '2', size: 'medium' },
    registrerteBarn,
}: Props) => {
    const { text } = useSifSoknadUiIntl();
    const renderListe = () => {
        return registrerteBarn.length === 0 ? (
            <InfoCard data-color="info">
                <InfoCard.Message icon={<InformationSquareIcon aria-hidden />}>
                    <SifSoknadUiText id="@sifSoknadUi.registrerteBarnListe.ingenbarn" />
                </InfoCard.Message>
            </InfoCard>
        ) : (
            <ItemListDarkside<RegistrertBarn>
                getItemId={(barn): string => barn.aktørId}
                getItemTitle={(barn): string => barn.etternavn}
                labelRenderer={(barn): React.ReactNode => (
                    <HStack gap="space-16">
                        <Box>
                            <SifSoknadUiText
                                id="@sifSoknadUi.registrertBarnListe.barn.født"
                                values={{ dato: dateFormatter.compact(barn.fødselsdato) }}
                            />
                        </Box>
                        <Box>{formatName(barn.fornavn, barn.etternavn, barn.mellomnavn)}</Box>
                    </HStack>
                )}
                items={registrerteBarn}
            />
        );
    };
    return (
        <VStack gap="space-8">
            <HStack gap="space-8">
                <Heading {...headingProps}>{listetittel}</Heading>
                <HelpText title={text('@sifSoknadUi.registrerteBarnKildeInfo.helpTextTooltip')}>
                    <SifSoknadUiText id="@sifSoknadUi.registrerteBarnKildeInfo.kilde" />
                </HelpText>
            </HStack>
            {renderListe()}
        </VStack>
    );
};
