import { Tag } from '@navikt/ds-react';
import React from 'react';
import { Behandlingsstatus } from '../../server/api-models/Behandlingsstatus';
import { Venteårsak } from '../../types/Venteårsak';

interface Props {
    status: Behandlingsstatus;
    venteårsak?: Venteårsak;
}

const getVenteårsakTag = (venteårsak: Venteårsak): React.ReactNode => {
    switch (venteårsak) {
        case Venteårsak.INNTEKTSMELDING:
            return (
                <Tag variant="warning" size="small">
                    Venter på inntektsmelding
                </Tag>
            );

        case Venteårsak.MEDISINSK_DOKUMENTASJON:
            return (
                <Tag variant="warning" size="small">
                    Venter på legeerklæring
                </Tag>
            );
        case Venteårsak.MELDEKORT:
            return (
                <Tag variant="info" size="small">
                    Venter på behandling
                </Tag>
            );

        case Venteårsak.SØKT_FOR_TIDLIG:
            return (
                <Tag variant="info" size="small">
                    Venter på behandling
                </Tag>
            );
    }
};

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
            return venteårsak ? getVenteårsakTag(venteårsak) : null;

        case Behandlingsstatus.AVSLUTTET:
            return (
                <Tag variant="success" size="small">
                    Ferdig behandlet
                </Tag>
            );
    }
};

export default StatusTag;
