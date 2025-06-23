import { ScenarioType } from './types';
import { ikkeMeldtInnMock } from './data/ikkeMeldtInn';
import { harSøktMock } from './data/harSøkt';
import { harIkkeSøktMock } from './data/harIkkeSøkt';

export const mockData = {
    [ScenarioType.harIkkeSøkt]: harIkkeSøktMock,
    [ScenarioType.harSøkt]: harSøktMock,
    [ScenarioType.ikkeMeldtInn]: ikkeMeldtInnMock,
};

export const getScenarioMockData = (scenario: ScenarioType) => mockData[scenario];
