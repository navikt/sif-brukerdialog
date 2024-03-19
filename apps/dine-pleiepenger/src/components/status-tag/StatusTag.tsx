import { Tag } from '@navikt/ds-react';
import React from 'react';
import { Msg } from '../../i18n';
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
                    <Msg id="statusTag.venteårsak.inntektsmelding" />
                </Tag>
            );

        case Venteårsak.MEDISINSK_DOKUMENTASJON:
            return (
                <Tag variant="warning" size="small">
                    <Msg id="statusTag.venteårsak.legeerklæring" />
                </Tag>
            );
        case Venteårsak.MELDEKORT:
            return (
                <Tag variant="info" size="small">
                    <Msg id="statusTag.venteårsak.meldekort" />
                </Tag>
            );

        case Venteårsak.SØKT_FOR_TIDLIG:
            return (
                <Tag variant="info" size="small">
                    <Msg id="statusTag.venteårsak.søktForTidlig" />
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
                    <Msg id="statusTag.status.underBehandling" />
                </Tag>
            );
        case Behandlingsstatus.PÅ_VENT:
            return venteårsak ? getVenteårsakTag(venteårsak) : null;

        case Behandlingsstatus.AVSLUTTET:
            return (
                <Tag variant="success" size="small">
                    <Msg id="statusTag.status.ferdigBehandlet" />
                </Tag>
            );
    }
};

export default StatusTag;
