import { ApiBarn } from 'app/types/SoknadApiData';
import { Barn, SoknadFormData } from '../../types/SoknadFormData';
import { mapAndreBarnToApiBarn, mapBarnToApiBarn } from './mapUtils';

export interface BarnApiData {
    barn: ApiBarn[];
}

export const mapBarnStepToApiData = ({ andreBarn }: SoknadFormData, registrerteBarn: Barn[]): BarnApiData => {
    const barn: ApiBarn[] = [
        ...andreBarn.map((barn) => mapAndreBarnToApiBarn(barn)),
        ...registrerteBarn.map((barn) => mapBarnToApiBarn(barn)),
    ];
    return {
        barn: barn,
    };
};
