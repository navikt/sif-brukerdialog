import { Tag } from '@navikt/ds-react';
import React from 'react';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { Venteårsak } from '../../types/Venteårsak';

interface Props {
    status: Behandlingsstatus;
    venteårsak?: Venteårsak;
}

const StatusTag: React.FunctionComponent<Props> = ({ status, venteårsak }) => {
    switch (status) {
        case Behandlingsstatus.OPPRETTET:
        case Behandlingsstatus.UNDER_BEHANDLING:
            return (
                <Tag variant="info" size="small">
                    Under behandling
                </Tag>
            );
        case Behandlingsstatus.PÅ_VENT:
            return (
                <Tag variant="warning" size="small">
                    Venter på {venteårsak === Venteårsak.INNTEKTSMELDING ? `inntektsmelding` : 'legeerklæring'}
                </Tag>
            );
        case Behandlingsstatus.AVSLUTTET:
            return (
                <Tag variant="success" size="small">
                    Ferdig behandlet
                </Tag>
            );
    }
};

export default StatusTag;
