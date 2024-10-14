import React, { useEffect, useRef, useState } from 'react';
import ActionLink from '@navikt/sif-common-core-ds/src/atoms/action-link/ActionLink';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import { guid } from '@navikt/sif-common-utils';
import { usePrevious } from '@navikt/sif-common/src/hooks';

interface Props {
    initialyExpanded?: boolean;
    intro: React.ReactNode;
    children: React.ReactNode;
    expandLinkLabel?: string;
    collapseLinkLabel?: string;
    enableCollapse?: boolean;
}

const CollapsedText: React.FunctionComponent<Props> = ({
    initialyExpanded,
    intro,
    children,
    expandLinkLabel = 'Vis mer',
    collapseLinkLabel = 'Vis mindre',
    enableCollapse = false,
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(initialyExpanded || false);
    const introContent = useRef<HTMLDivElement>(null);
    const moreContent = useRef<HTMLDivElement>(null);

    const prev = usePrevious(isExpanded);
    const hasChanged = prev !== undefined && prev !== isExpanded;
    useEffect(() => {
        if (hasChanged) {
            if (isExpanded) {
                if (moreContent && moreContent.current) {
                    moreContent.current.focus();
                }
            }
            if (isExpanded === false) {
                if (introContent && introContent.current) {
                    introContent.current.focus();
                }
            }
        }
    }, [hasChanged, isExpanded]);

    const id = guid();
    const introId = `${id}_intro`;

    return (
        <div>
            <div id={introId} ref={introContent} tabIndex={-1}>
                {intro}
                {isExpanded === false && (
                    <Block margin="l">
                        <ActionLink onClick={() => setIsExpanded(true)}>{expandLinkLabel}</ActionLink>
                    </Block>
                )}
            </div>
            {isExpanded && (
                <div tabIndex={-1} ref={moreContent} aria-describedby={introId}>
                    {children}
                    {enableCollapse && (
                        <Block margin="l">
                            <ActionLink onClick={() => setIsExpanded(false)}>{collapseLinkLabel}</ActionLink>
                        </Block>
                    )}
                </div>
            )}
        </div>
    );
};

export default CollapsedText;
