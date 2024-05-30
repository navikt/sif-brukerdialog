import { useEffectOnce } from '@navikt/sif-common-hooks';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const SifAppWrapper: React.FunctionComponent<Props> = ({ children }) => {
    useEffectOnce(() => {
        window.document.body.className = window.document.body.className + ' sif-ds-theme';
    });
    return <div className="sif-ds-theme">{children}</div>;
};

export default SifAppWrapper;
