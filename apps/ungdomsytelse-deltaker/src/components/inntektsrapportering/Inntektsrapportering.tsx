import { Alert, BodyShort, Box, Heading, VStack } from '@navikt/ds-react';
import { DeltakelseSøktFor } from '../../api/types';
import { dateRangeFormatter } from '@navikt/sif-common-utils';
import { useAppIntl } from '../../i18n';
import { DateRange } from '@navikt/sif-common-formik-ds';
import InntektsrapporteringForm from './InnteksrapporteringForm';
import { getMånederForInnteksrapportering } from '../../utils/deltakelserUtils';

interface Props {
    deltakelse: DeltakelseSøktFor;
}

const Inntektsrapportering = ({ deltakelse }: Props) => {
    const periode: DateRange = {
        from: deltakelse.fraOgMed,
        to: deltakelse.tilOgMed,
    };
    const { locale } = useAppIntl();
    const månederEnKanRapportereFor = getMånederForInnteksrapportering(deltakelse);
    return (
        <Box>
            <Heading level="2" size="medium">
                Inntektsrapportering
            </Heading>
            <VStack gap="6">
                <BodyShort>Periode {dateRangeFormatter.getDateRangeText(periode, locale)}</BodyShort>
                {månederEnKanRapportereFor.length > 0 ? (
                    <InntektsrapporteringForm deltakelse={deltakelse} />
                ) : (
                    <Alert variant="info">Ingen måneder tilgjengelig for inntektsrapportering</Alert>
                )}
            </VStack>
        </Box>
    );
};

export default Inntektsrapportering;
