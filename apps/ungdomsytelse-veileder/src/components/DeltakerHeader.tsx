import { BodyShort, Box, Button, HStack, Page } from '@navikt/ds-react';
import { Deltakelse, Deltaker } from '../api/types';
import PersonNøytral from '../illustrations/PersonNøytral';
import Fødselsnummer from './Fødselsnummer';
import { XMarkIcon } from '@navikt/aksel-icons';

interface Props {
    deltaker: Deltaker;
    deltakelser?: Deltakelse[];
    onLukkDeltaker: () => void;
}

const DeltakerHeader = ({
    deltaker: {
        navn: { fornavn, etternavn },
        deltakerIdent: fødselsnummer,
    },
    deltakelser = [],
    onLukkDeltaker,
}: Props) => {
    return (
        <Page.Block width="xl" gutters={true}>
            <Box className="p-3 bg-gray-100 w-full rounded-md mt-4">
                <HStack gap="6" align="center" justify={'space-between'}>
                    <HStack align={'center'} gap="4">
                        <PersonNøytral width="1.75rem" height={'1.75rem'} />
                        <BodyShort size="medium" weight="semibold">
                            {fornavn} {etternavn}
                        </BodyShort>
                        <Fødselsnummer fnr={fødselsnummer} />
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
        </Page.Block>
    );
};

export default DeltakerHeader;
