import { Tag } from '@navikt/ds-react';
import React from 'react';
import { BehandlingStatus } from '../../server/api-models/BehandlingStatus';
import { Venteårsak } from '../../types/Venteårsak';

interface Props {
    status: BehandlingStatus;
    venteårsak?: Venteårsak;
}

const StatusTag: React.FunctionComponent<Props> = ({ status, venteårsak }) => {
    switch (status) {
        case BehandlingStatus.OPPRETTET:
        case BehandlingStatus.UNDER_BEHANDLING:
            return (
                <Tag variant="info" size="small">
                    Under behandling
                </Tag>
            );
        case BehandlingStatus.PAA_VENT:
            return (
                <Tag variant="warning" size="small">
                    Vi venter på {venteårsak === Venteårsak.INNTEKTSMELDING ? `inntektsmelding` : 'legeerklæring'}
                </Tag>
            );
        case BehandlingStatus.AVSLUTTET:
            return (
                <Tag variant="success" size="small">
                    Ferdig behandlet
                </Tag>
            );
    }
};

export default StatusTag;
