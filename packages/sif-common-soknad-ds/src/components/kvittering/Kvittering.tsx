import { Heading, Ingress } from '@navikt/ds-react';
import React from 'react';
import Block from '@navikt/sif-common-core-ds/src/atoms/block/Block';
import CheckmarkIcon from '@navikt/sif-common-core-ds/src/atoms/checkmark-icon/CheckmarkIcon';
import './kvittering.scss';

interface Props {
    tittel: string;
    liste?: {
        tittel: string;
        punkter: React.ReactNode[];
    };
    children?: React.ReactNode;
}

const Kvittering = ({ tittel, liste, children }: Props) => {
    return (
        <div className="kvittering">
            <Block textAlignCenter={true} margin="none">
                <CheckmarkIcon />
                <Block margin="xl">
                    <Heading level="1" size="medium" data-testid="kvittering-heading">
                        {tittel}
                    </Heading>
                </Block>
            </Block>
            {liste && (
                <Block margin="xl">
                    <Ingress>{liste.tittel}</Ingress>
                    <ul className="checklist">
                        {liste.punkter.map((p, idx) => (
                            <li key={idx}>{p}</li>
                        ))}
                    </ul>
                </Block>
            )}
            {children && <Block margin="xl">{children}</Block>}
        </div>
    );
};

export default Kvittering;
