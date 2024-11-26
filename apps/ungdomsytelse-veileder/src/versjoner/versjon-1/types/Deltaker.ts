import { Deltakelse, Person } from '../../../api/types';

export interface Deltaker {
    deltakerIdent: string;
    person: Person;
    deltakelser?: Deltakelse[];
}
