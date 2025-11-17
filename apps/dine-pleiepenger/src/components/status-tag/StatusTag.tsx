import { Tag } from '@navikt/ds-react';
import React from 'react';

import { AppText } from '../../i18n';
import { BehandlingStatus, Venteårsak } from '../../types';
import { BehandlingsstatusISak } from '../../types/BehandlingsstatusISak';

const getVenteårsakTag = (venteårsak: Venteårsak): React.ReactNode => {
    switch (venteårsak) {
        case Venteårsak.INNTEKTSMELDING:
            return (
                <Tag variant="warning" size="small">
                    <AppText id="statusTag.venteårsak.inntektsmelding" />
                </Tag>
            );

        case Venteårsak.MEDISINSK_DOKUMENTASJON:
            return (
                <Tag variant="warning" size="small">
                    <AppText id="statusTag.venteårsak.legeerklæring" />
                </Tag>
            );
        case Venteårsak.MELDEKORT:
            return (
                <Tag variant="info" size="small">
                    <AppText id="statusTag.venteårsak.meldekort" />
                </Tag>
            );

        case Venteårsak.FOR_TIDLIG_SOKNAD:
            return (
                <Tag variant="info" size="small">
                    <AppText id="statusTag.venteårsak.søktForTidlig" />
                </Tag>
            );
    }
};

const StatusTag = ({ status, venteårsak }: BehandlingsstatusISak) => {
    switch (status) {
        case BehandlingStatus.OPPRETTET:
        case BehandlingStatus.UNDER_BEHANDLING:
            return (
                <Tag variant="info" size="small">
                    <AppText id="statusTag.status.underBehandling" />
                </Tag>
            );
        case BehandlingStatus.PÅ_VENT:
            return venteårsak ? getVenteårsakTag(venteårsak) : null;

        case BehandlingStatus.AVSLUTTET:
            return (
                <Tag variant="success" size="small">
                    <AppText id="statusTag.status.ferdigBehandlet" />
                </Tag>
            );
    }
};

export default StatusTag;
