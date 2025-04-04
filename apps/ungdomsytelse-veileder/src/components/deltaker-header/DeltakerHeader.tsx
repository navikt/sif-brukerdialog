import { BodyShort, Box, Button, HStack, Tag } from '@navikt/ds-react';
import { XMarkIcon } from '@navikt/aksel-icons';
import { Deltakelse, Deltaker } from '@navikt/ung-common';
import Fødselsnummer from '../../atoms/Fødselsnummer';
import PersonNøytral from '../../atoms/PersonNøytral';

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
    const deltakelse = deltakelser.length === 1 ? deltakelser[0] : undefined;

    return (
        <Box className="p-3 bg-deepblue-100 w-full rounded-md mt-4 rounded-b-none  border-b-2 border-gray-700">
            <HStack gap="6" align="center" justify={'space-between'}>
                <HStack align={'center'} gap="4">
                    <PersonNøytral width="2.5rem" height={'2.5rem'} />
                    <BodyShort size="large" weight="semibold">
                        {fornavn} {etternavn}
                    </BodyShort>
                    <Fødselsnummer fnr={fødselsnummer} copyEnabled={true} />
                    {deltakelse ? (
                        <>
                            {deltakelse.harSøkt ? (
                                <Tag size="small" variant="success">
                                    Søknad mottatt
                                </Tag>
                            ) : (
                                <Tag size="small" variant="warning">
                                    Søknad ikke mottatt
                                </Tag>
                            )}
                        </>
                    ) : null}
                </HStack>
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
