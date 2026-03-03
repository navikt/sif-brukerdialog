import { useState, useEffect } from 'react';
import { useStepFormValues } from '../state/StepFormValuesContext';

type FormValuesToSøknadsdataFn = (
    stegId: string,
    formValues: Record<string, unknown>,
) => Record<string, unknown> | undefined;

type GetSøknadsdataForStegFn = (stegId: string) => Record<string, unknown> | undefined;

interface UseStepFormValuesStatusOptions {
    currentStegId: string;
    stegRekkefølge: string[];
    formValuesToSøknadsdata: FormValuesToSøknadsdataFn;
    getSøknadsdataForSteg: GetSøknadsdataForStegFn;
    isEqual?: (a: unknown, b: unknown) => boolean;
}

const defaultIsEqual = (a: unknown, b: unknown): boolean => {
    return JSON.stringify(a) === JSON.stringify(b);
};

/**
 * Hook som sjekker om formValues for tidligere steg matcher lagret søknadsdata.
 * Brukes for å oppdage om bruker har endret data uten å submitte.
 *
 * @returns invalidSteps - Liste over stegId-er hvor formValues ikke matcher søknadsdata
 */
export const useStepFormValuesStatus = ({
    currentStegId,
    stegRekkefølge,
    formValuesToSøknadsdata,
    getSøknadsdataForSteg,
    isEqual = defaultIsEqual,
}: UseStepFormValuesStatusOptions) => {
    const [invalidSteps, setInvalidSteps] = useState<string[]>([]);
    const { stepFormValues } = useStepFormValues();

    useEffect(() => {
        const currentIndex = stegRekkefølge.indexOf(currentStegId);
        if (currentIndex <= 0) {
            setInvalidSteps([]);
            return;
        }

        const precedingSteps = stegRekkefølge.slice(0, currentIndex);
        const invalid: string[] = [];

        precedingSteps.forEach((stegId) => {
            const formValues = stepFormValues[stegId];
            if (!formValues) {
                return;
            }

            const søknadsdata = getSøknadsdataForSteg(stegId);
            const convertedFormValues = formValuesToSøknadsdata(stegId, formValues);

            if (!søknadsdata || !isEqual(convertedFormValues, søknadsdata)) {
                invalid.push(stegId);
            }
        });

        setInvalidSteps(invalid);
    }, [currentStegId, stegRekkefølge, stepFormValues, formValuesToSøknadsdata, getSøknadsdataForSteg, isEqual]);

    return {
        invalidSteps,
        hasInvalidSteps: invalidSteps.length > 0,
        firstInvalidStep: invalidSteps[0] ?? null,
    };
};
