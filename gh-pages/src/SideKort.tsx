import { EyeSlashIcon, LaptopIcon, PaletteIcon } from '@navikt/aksel-icons';
import { BodyLong, Heading, InfoCard, LinkCard } from '@navikt/ds-react';

import { GhPagesSide } from './sider';

const ikon = {
    demo: LaptopIcon,
    storybook: PaletteIcon,
};

interface Props {
    side: GhPagesSide;
}

const SideKort = ({ side }: Props) => {
    const Ikon = ikon[side.type];
    if (side.disabled) {
        return (
            <InfoCard key={side.path} title={side.tittel}>
                <InfoCard.Message icon={<EyeSlashIcon aria-hidden />} data-color="neutral">
                    <Heading level="3" size="small">
                        {side.tittel}
                    </Heading>
                    <BodyLong>{side.beskrivelse}</BodyLong>
                </InfoCard.Message>
            </InfoCard>
        );
    }
    return (
        <LinkCard>
            <LinkCard.Icon>
                <Ikon aria-hidden fontSize="3rem" />
            </LinkCard.Icon>
            <LinkCard.Title as="h3">
                <LinkCard.Anchor href={`./${side.path}/`}>{side.tittel}</LinkCard.Anchor>
            </LinkCard.Title>
            <LinkCard.Description>{side.beskrivelse}</LinkCard.Description>
        </LinkCard>
    );
};

export default SideKort;
