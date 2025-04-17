export const queryKeys = {
    deltakerById: (deltakerId: string) => ['deltakerById', deltakerId] as const,
    deltakelserForDeltaker: (deltakerId: string) => ['deltakelserForDeltaker', deltakerId] as const,
};
