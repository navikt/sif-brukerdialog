import { CheckboxProps } from '@navikt/ds-react';

export enum MockAnimals {
    dog = 'dog',
    cat = 'cat',
    fish = 'fish',
}

type MockOption = Pick<CheckboxProps, 'value' | 'description' | 'error'> & {
    label: string;
    value: string;
    ['data-testid']?: string;
};

export const mockAnimalOptions: MockOption[] = [
    {
        label: 'Dog',
        value: MockAnimals.dog,
        description: 'Maybe the best option',
    },
    {
        label: 'Cat',
        value: MockAnimals.cat,
        description: 'To be avoided',
    },
    {
        label: 'Fish',
        value: MockAnimals.fish,
        description: 'If you please',
    },
];
