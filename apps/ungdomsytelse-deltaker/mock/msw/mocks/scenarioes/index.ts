import { ScenarioType } from '../../../../src/dev/scenarioer';
import { harSøktMock } from './har-søkt';
import { harIkkeSøktMock } from './ikke-søkt';

type ScenarioMap = Record<ScenarioType, ScenarioData>;

export const mockData: ScenarioMap = {
    [ScenarioType.harIkkeSøkt]: harIkkeSøktMock,
    [ScenarioType.harSøkt]: harSøktMock,
};

export interface ScenarioData {
    søker: any;
    barn: any;
    arbeidsgiver: any;
    deltakelser: any;
}

export const getScenarioMockData = (scenario: ScenarioType) => {
    return mockData[scenario];
};
