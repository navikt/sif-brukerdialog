import { BodyShort, Box, Button, HStack } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import { dateFormatter } from '@navikt/sif-common-utils';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import PersonNøytral from '../../illustrations/PersonNøytral';
import Fødselsnummer from '../../atoms/Fødselsnummer';

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
        <Box className="p-3 bg-data-surface-1-subtle w-full rounded-md mt-4 rounded-b-none  border-b-2 border-gray-700">
            <HStack gap="6" align="center" justify={'space-between'}>
                <HStack align={'center'} gap="4">
                    <PersonNøytral width="2.5rem" height={'2.5rem'} />
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
