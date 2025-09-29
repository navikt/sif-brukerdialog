import { harIkkeSøktMock } from './data/harIkkeSøkt';
import { harSøktMock } from './data/harSøkt';
import { ikkeMeldtInnMock } from './data/ikkeMeldtInn';
import { ScenarioType } from './types';

export const mockData = {
    [ScenarioType.harIkkeSøkt]: harIkkeSøktMock,
    [ScenarioType.harSøkt]: harSøktMock,
    [ScenarioType.ikkeMeldtInn]: ikkeMeldtInnMock,
};

export const getScenarioMockData = (scenario: ScenarioType) => mockData[scenario];
