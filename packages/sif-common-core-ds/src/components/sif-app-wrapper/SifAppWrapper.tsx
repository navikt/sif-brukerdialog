import React from 'react';
import { useEffectOnce } from '@navikt/sif-common-hooks';

interface Props {
    children: React.ReactNode;
}

const SifAppWrapper = ({ children }: Props) => {
    useEffectOnce(() => {
        window.document.body.className = window.document.body.className + ' sif-ds-theme';
    });
    return <div className="sif-ds-theme">{children}</div>;
};

export default SifAppWrapper;
