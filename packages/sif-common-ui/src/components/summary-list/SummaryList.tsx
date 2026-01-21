import './summaryList.scss';

import { Box, List } from '@navikt/ds-react';
import bemUtils from '@navikt/sif-common-core-ds/src/utils/bemUtils';
import classNames from 'classnames';
import React from 'react';

interface Props<ItemType> {
    items: ItemType[];
    bullets?: boolean;
    useAkselList?: boolean;
    variant?: 'blocks' | 'bullet-blocks';
    as?: 'ul' | 'ol';
    itemTitleRenderer?: (data: ItemType) => string;
    itemRenderer: (data: ItemType) => React.ReactNode;
}

const bem = bemUtils('summaryList');

function SummaryList<ItemType = any>({
    items,
    itemRenderer,
    useAkselList,
    itemTitleRenderer,
    variant,
    as,
    bullets,
}: Props<ItemType>) {
    return useAkselList || variant !== undefined ? (
        <Box paddingBlock="space-8 space-0">
            <List as={as}>
                {items.map((item, idx) => (
                    <List.Item
                        key={idx}
                        title={itemTitleRenderer ? itemTitleRenderer(item) : undefined}
                        className={variant !== undefined ? `sif_navds-form-summary-listItem--${variant}` : undefined}>
                        {itemRenderer(item)}
                    </List.Item>
                ))}
            </List>
        </Box>
    ) : (
        <ul className={classNames(bem.block, bem.modifierConditional('bullet', bullets))}>
            {items.map((item, idx) => (
                <li key={idx} className={bem.element('item')}>
                    {itemRenderer(item)}
                </li>
            ))}
        </ul>
    );
}

export default SummaryList;
