export interface MockStoreConfig<TData, TScenario extends string> {
    getScenarioData: (scenario: TScenario) => TData;
    scenarioValues: TScenario[];
    defaultScenario: TScenario;
}

export interface MockStore<TData, TScenario extends string> {
    init: (scenario: TScenario) => void;
    setScenario: (scenario: TScenario) => void;
    getScenario: () => TScenario;
    get: () => TData;
    set: (state: TData) => void;
    update: (partial: Partial<TData>) => void;
    reset: () => void;
}
