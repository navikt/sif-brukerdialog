import { RegistrertBarn } from '../../types/RegistrertBarn';
import { ApiBarn } from '../../types/SoknadApiData';
import { SoknadFormData } from '../../types/SoknadFormData';
import { mapAndreBarnToApiBarn, mapBarnToApiBarn } from './mapUtils';

export interface BarnApiData {
    barn: ApiBarn[];
}

export const mapBarnStepToApiData = ({ andreBarn }: SoknadFormData, registrerteBarn: RegistrertBarn[]): BarnApiData => {
    const barn: ApiBarn[] = [
        ...andreBarn.map((barn) => mapAndreBarnToApiBarn(barn)),
        ...registrerteBarn.map((barn) => mapBarnToApiBarn(barn)),
    ];
    return {
        barn: barn,
    };
};
