import React from 'react';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import Block from '../block/Block';
import CheckmarkIcon from '../checkmark-icon/CheckmarkIcon';
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
                    <Innholdstittel>{tittel}</Innholdstittel>
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
