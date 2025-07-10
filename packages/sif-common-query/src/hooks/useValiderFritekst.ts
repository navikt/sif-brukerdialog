import { useMutation } from '@tanstack/react-query';
import { validerFritekst } from '../api/validerFritekstApi';

export const useValiderFritekst = () => {
    return useMutation({
        mutationFn: validerFritekst,
    });
};
