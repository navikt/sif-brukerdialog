import { Add } from '@navikt/ds-icons';
import { Box, Button, HStack, Table, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { DeltakelseHistorikkInnslag } from '../../types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Endringstype } from '@navikt/ung-deltakelse-opplyser-api-veileder';

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
        default:
            return 'Ukjent';
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
        <VStack gap="2">
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
                                <Table.DataCell width="200">{dateFormatter.compactWithTime(tidspunkt)}</Table.DataCell>
                                <Table.DataCell>{getEndringstypeTekst(endringstype)}</Table.DataCell>
                                <Table.DataCell>{endring}</Table.DataCell>
                                <Table.DataCell>{aktør}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {antall < totalt ? (
                <Box className="flex justify-start">
                    <Button variant="tertiary-neutral" type="button" onClick={visFlerehistorikkInnslag}>
                        <HStack gap="2" align="center" wrap={false}>
                            <Add aria-hidden="true" />
                            Vis flere
                        </HStack>
                    </Button>
                </Box>
            ) : null}
        </VStack>
    );
};

export default DeltakelseHistorikkListe;
