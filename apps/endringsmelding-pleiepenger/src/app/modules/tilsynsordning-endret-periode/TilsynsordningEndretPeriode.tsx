import DeleteButton from '@app/components/buttons/DeleteButton';
import EditButton from '@app/components/buttons/EditButton';
import { Box, Heading, HStack, VStack } from '@navikt/ds-react';
import { dateFormatter } from '@navikt/sif-common-utils';

import TidUkedager from '../../components/tid-ukedager/TidUkedager';
import { useAppIntl } from '../../i18n';
import { TilsynsordningPeriodeData } from '../../søknad/steps/tilsynsordning-forenklet/types';

interface Props {
    endretPeriode: TilsynsordningPeriodeData;
    onEdit?: (periode: TilsynsordningPeriodeData) => void;
    onDelete?: (periode: TilsynsordningPeriodeData) => void;
}

export const TilsynsordningEndretPeriode = ({ endretPeriode, onEdit, onDelete }: Props) => {
    const { text } = useAppIntl();
    const { from, to } = endretPeriode.periode;
    const { tidFasteDager } = endretPeriode;
    const fra = dateFormatter.dayCompactDate(from);
    const til = dateFormatter.dayCompactDate(to);
    const periodeTekst = fra === til ? fra : `${fra} - ${til}`;

    return (
        <Box>
            <VStack gap="space-12">
                <Heading size="xsmall" level="4" className="capitalize">
                    {periodeTekst}
                </Heading>
                <Box
                    borderColor="neutral-subtle"
                    borderRadius="4"
                    borderWidth="1"
                    padding="space-16"
                    background="neutral-softA">
                    <VStack gap="space-12">
                        <Heading level="4" size="xsmall" style={{ fontWeight: 'normal' }}>
                            Ukeplan for perioden
                        </Heading>
                        <TidUkedager fasteDager={tidFasteDager} />
                        {onEdit || onDelete ? (
                            <HStack gap="space-12" marginBlock="space-8 space-0">
                                {onEdit && (
                                    <EditButton
                                        variant="secondary"
                                        onClick={() => onEdit(endretPeriode)}
                                        title={text('endringTilsynsordningListe.endreEndring.label')}
                                        aria-label={text('endringTilsynsordningListe.endreEndring.ariaLabel', {
                                            periode: periodeTekst,
                                        })}>
                                        Endre
                                    </EditButton>
                                )}
                                {onDelete && (
                                    <DeleteButton
                                        variant="secondary"
                                        onClick={() => {
                                            onDelete(endretPeriode);
                                        }}
                                        title={text('endringTilsynsordningListe.fjernEndring.label')}
                                        aria-label={text('endringTilsynsordningListe.fjernEndring.ariaLabel', {
                                            periode: periodeTekst,
                                        })}>
                                        Fjern
                                    </DeleteButton>
                                )}
                            </HStack>
                        ) : null}
                    </VStack>
                </Box>
            </VStack>
        </Box>
    );
};
