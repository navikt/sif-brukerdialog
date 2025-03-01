import { BodyShort, Box, Button, HStack } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '../api/types';
import PersonNøytral from '../illustrations/PersonNøytral';
import Fødselsnummer from './Fødselsnummer';
import { XMarkIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';

interface Props {
    deltaker: Deltaker;
    deltakelser?: Deltakelse[];
    onLukkDeltaker: () => void;
}

const DeltakerHeader = ({
    deltaker: {
        navn: { fornavn, etternavn },
        deltakerIdent: fødselsnummer,
        fødselsdato,
    },
    deltakelser = [],
    onLukkDeltaker,
}: Props) => {
    return (
        <Box className="p-3 bg-gray-100 w-full rounded-md mt-4">
            <HStack gap="6" align="center" justify={'space-between'}>
                <HStack align={'center'} gap="4">
                    <PersonNøytral width="1.75rem" height={'1.75rem'} />
                    <BodyShort size="medium" weight="semibold">
                        {fornavn} {etternavn}
                    </BodyShort>
                    <Fødselsnummer fnr={fødselsnummer} />
                    <Box>(f. {dateFormatter.compact(fødselsdato)})</Box>
                </HStack>
                {deltakelser && deltakelser?.length > 1 ? (
                    <>
                        |<BodyShort>Deltakelser: {deltakelser.length}</BodyShort>
                    </>
                ) : null}
                <Button
                    variant="tertiary-neutral"
                    size="small"
                    onClick={onLukkDeltaker}
                    iconPosition="right"
                    icon={<XMarkIcon aria-hidden={true} />}>
                    Lukk deltaker
                </Button>
            </HStack>
        </Box>
    );
};

export default DeltakerHeader;
