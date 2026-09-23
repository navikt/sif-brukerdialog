import { LaptopIcon, PaletteIcon } from '@navikt/aksel-icons';
import { LinkCard } from '@navikt/ds-react';

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
