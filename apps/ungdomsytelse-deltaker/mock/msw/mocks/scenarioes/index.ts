import { ScenarioType } from '../../../../src/dev/scenarioer';
import { ScenarioData } from '../mockUtils';
import { harSøktMock } from './har-søkt';
import { harIkkeSøktMock } from './ikke-søkt';

type ScenarioMap = Record<ScenarioType, ScenarioData>;

export const mockData: ScenarioMap = {
    [ScenarioType.harIkkeSøkt]: harIkkeSøktMock,
    [ScenarioType.harSøkt]: harSøktMock,
};

export const getScenarioMockData = (scenario: ScenarioType): ScenarioData => {
    return mockData[scenario];
};
