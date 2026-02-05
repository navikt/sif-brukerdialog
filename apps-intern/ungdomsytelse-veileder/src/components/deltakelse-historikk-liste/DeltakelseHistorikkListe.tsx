import { Box, Button, HStack, Table, VStack } from '@navikt/ds-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Endringstype } from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { DeltakelseHistorikkInnslag } from '../../types';
import { PlusIcon } from '@navikt/aksel-icons';

interface Props {
    historikkInnslag?: DeltakelseHistorikkInnslag[];
}
const getEndringstypeTekst = (type: Endringstype): string => {
    switch (type) {
        case Endringstype.DELTAKER_HAR_SØKT_YTELSE:
            return 'Søknad sendt inn';
        case Endringstype.DELTAKER_MELDT_UT:
            return 'Deltakelse avsluttet';
        case Endringstype.DELTAKER_MELDT_INN:
            return 'Deltakelse opprettet';
        case Endringstype.ENDRET_SLUTTDATO:
            return 'Endret sluttdato';
        case Endringstype.ENDRET_STARTDATO:
            return 'Endret startdato';
        case Endringstype.DELTAKELSE_FJERNET:
            return 'Deltakelse slettet';
        case Endringstype.UKJENT:
            return 'Ukjent endringstype';
    }
};

const DeltakelseHistorikkListe = ({ historikkInnslag = [] }: Props) => {
    const [antall, setAntall] = useState(5);
    const [focusIndex, setFocusIndex] = useState<number | undefined>();

    const totalt = useMemo(() => historikkInnslag.length, [historikkInnslag]);

    const ref = useRef<HTMLTableRowElement>(null);

    useEffect(() => {
        if (focusIndex && ref.current) {
            ref.current.focus();
            setFocusIndex(undefined);
        }
    }, [antall, focusIndex]);

    const visFlerehistorikkInnslag = () => {
        setFocusIndex(antall);
        setAntall(Math.min(historikkInnslag.length, antall + 10));
    };

    const synligeHistorikkInnslag = historikkInnslag.slice(0, antall);

    return (
        <VStack gap="space-8">
            <Table zebraStripes>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">Tidspunkt</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Endring</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Beskrivelse</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Kilde</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {synligeHistorikkInnslag.map(({ tidspunkt, aktør, endring, endringstype }, index) => {
                        return (
                            <Table.Row key={tidspunkt.getTime()} ref={index === focusIndex ? ref : undefined}>
                                <Table.DataCell width="200" valign="top">
                                    {dateFormatter.compactWithTime(tidspunkt)}
                                </Table.DataCell>
                                <Table.DataCell valign="top">{getEndringstypeTekst(endringstype)}</Table.DataCell>
                                <Table.DataCell valign="top">{endring}</Table.DataCell>
                                <Table.DataCell valign="top">{aktør}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {antall < totalt ? (
                <Box className="flex justify-start">
                    <Button variant="tertiary-neutral" type="button" onClick={visFlerehistorikkInnslag}>
                        <HStack gap="space-8" align="center" wrap={false}>
                            <PlusIcon aria-hidden="true" />
                            Vis flere
                        </HStack>
                    </Button>
                </Box>
            ) : null}
        </VStack>
    );
};

export default DeltakelseHistorikkListe;
