import { z } from 'zod';
import { deltakelseRequestSchema } from '../schemas/deltakelseRequestSchema';
import { deltakelserSchema } from '../schemas/deltakelserSchema';
import { deltakelseSchema } from '../schemas/deltakelseSchema';
import { deltakerSchema } from '../schemas/deltakerSchema';
import { nyDeltakerSchema } from '../schemas/nyDeltakerSchema';

export type Deltakelse = z.infer<typeof deltakelseSchema>;
export type Deltakelser = z.infer<typeof deltakelserSchema>;
export type DeltakelseRequestDTO = z.infer<typeof deltakelseRequestSchema>;
export type Deltaker = z.infer<typeof deltakerSchema>;
export type NyDeltaker = z.infer<typeof nyDeltakerSchema>;

export const isNyDeltaker = (deltaker: any): deltaker is NyDeltaker => {
    if (deltaker && 'id' in deltaker && deltaker.id !== null && deltaker.id !== undefined) {
        return false;
    }
    return true;
};

export const isDeltaker = (deltaker: any): deltaker is Deltaker => {
    if (deltaker && 'id' in deltaker && deltaker.id !== null && deltaker.id !== undefined) {
        return true;
    }
    return false;
};
