import { handleApiError } from '@navikt/ung-common';
import {
    Avslutningsårsak,
    DeltakelseUtmeldingDto,
    Veileder,
    zDeltakelseUtmeldingDto,
} from '@navikt/ung-deltakelse-opplyser-api-veileder';
import { Deltakelse, deltakelseSchema } from '../../types/Deltakelse';

/**
 * Melder ut en deltaker fra deltakelse
 * @param deltakelseId
 * @param utmeldingsdato
 * @returns {Promise<MeldUtDeltakerResponse>}
 * @throws {ApiError}
 */
export const meldUtDeltaker = async (deltakelseId: string, dto: DeltakelseUtmeldingDto): Promise<Deltakelse> => {
    try {
        const parsedBody = zDeltakelseUtmeldingDto.parse(dto);

        const body: DeltakelseUtmeldingDto = {
            utmeldingsdato: parsedBody.utmeldingsdato,
            ...(parsedBody.avslutningsårsak != null && {
                // typen krever enum
                avslutningsårsak: Avslutningsårsak[parsedBody.avslutningsårsak],
            }),
        };
        const { data } = await Veileder.meldUtDeltaker({ path: { deltakelseId }, body });
        return deltakelseSchema.parse(data);
    } catch (e) {
        throw handleApiError(e, 'meldUtDeltaker');
    }
};
