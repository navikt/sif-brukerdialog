import { Add } from '@navikt/ds-icons';
import { Box, Button, HStack, Table, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';
import { DeltakelseHistorikkInnslag } from '../../types';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UtvidetRevisjonstype } from '../../types/UtvidetRevisjonstype';

interface Props {
    historikkInnslag?: DeltakelseHistorikkInnslag[];
}

const getRevisjonstypeTekst = (type: UtvidetRevisjonstype): string => {
    switch (type) {
        case UtvidetRevisjonstype.OPPRETTET:
            return 'Deltakelse opprettet';
        case UtvidetRevisjonstype.ENDRET:
            return 'Endret periode';
        case UtvidetRevisjonstype.SLETTET:
            return 'Slettet';
        case UtvidetRevisjonstype.SØKNAD_INNSENDT:
            return 'Søknad mottatt';
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
                                <Table.DataCell>
                                    {getRevisjonstypeTekst(revisjonstype as UtvidetRevisjonstype)}
                                </Table.DataCell>
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
