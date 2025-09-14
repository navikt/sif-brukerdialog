import { HStack } from '@navikt/ds-react';
import React, { HTMLProps } from 'react';

interface Props extends HTMLProps<HTMLDivElement> {
    children: React.ReactNode;
}

const TagsContainer = ({ children }: Props) => {
    return <HStack gap="2">{children}</HStack>;
};

export default TagsContainer;
