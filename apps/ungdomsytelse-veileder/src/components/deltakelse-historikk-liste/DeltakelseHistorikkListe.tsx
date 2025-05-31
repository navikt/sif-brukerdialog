import { Add } from '@navikt/ds-icons';
import { Box, Button, HStack, Table, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Revisjonstype } from '@navikt/ung-deltakelse-opplyser-api';
import { DeltakelseHistorikkInnslag } from '../../types';
import { useEffect, useMemo, useRef, useState } from 'react';

interface Props {
    historikkInnslag?: DeltakelseHistorikkInnslag[];
}

const getRevisjonstypeTekst = (type: Revisjonstype): string => {
    switch (type) {
        case Revisjonstype.OPPRETTET:
            return 'Deltakelse opprettet';
        case Revisjonstype.ENDRET:
            return 'Endret periode';
        case Revisjonstype.SLETTET:
            return 'Slettet';
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
                        <Table.HeaderCell scope="col">Kilde</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {synligeHistorikkInnslag.map(({ revisjonstype, tidspunkt, utfører }, index) => {
                        return (
                            <Table.Row key={index} ref={index === focusIndex ? ref : undefined}>
                                <Table.DataCell width="200">{dateFormatter.compactWithTime(tidspunkt)}</Table.DataCell>
                                <Table.DataCell>{getRevisjonstypeTekst(revisjonstype)}</Table.DataCell>
                                <Table.DataCell>{utfører}</Table.DataCell>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>
            {antall < totalt ? (
                <Box className="flex justify-start">
                    <Button variant="tertiary-neutral" type="button" onClick={visFlerehistorikkInnslag}>
                        <HStack gap="2" align="center" wrap={false}>
                            <Add role="presentation" />
                            Vis flere
                        </HStack>
                    </Button>
                </Box>
            ) : null}
        </VStack>
    );
};

export default DeltakelseHistorikkListe;
