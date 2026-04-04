import { stepMessages_nb } from '../nb/stepMessages';

export const stepMessages_nn: Record<keyof typeof stepMessages_nb, string> = {
    ...stepMessages_nb,
};