import { LaptopIcon, PaletteIcon } from '@navikt/aksel-icons';
import { LinkCard } from '@navikt/ds-react';

import { GhPagesSide } from './sider';

const ikon = {
    demo: LaptopIcon,
    storybook: PaletteIcon,
};

const etikett = {
    demo: 'Demo',
    storybook: 'Storybook',
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
            {/* <LinkCard.Footer>
                <Tag variant={side.type === 'demo' ? 'alt1' : 'alt3'} size="small">
                    {etikett[side.type]}
                </Tag>
                <BodyShort size="small" textColor="subtle">
                    {side.workspace}
                </BodyShort>
            </LinkCard.Footer> */}
        </LinkCard>
    );
};

export default SideKort;
