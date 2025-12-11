export const queryKeys = {
    slettDeltaker: (deltakelseId?: string) => ['SlettDeltaker', deltakelseId] as const,
    deltakerById: (deltakerId?: string) => ['deltakerById', deltakerId] as const,
    deltakelserForDeltaker: (deltakerId?: string) => ['deltakelserForDeltaker', deltakerId] as const,
    finnDeltaker: (deltakerIdent?: string) => ['finnDeltaker', deltakerIdent] as const,
    deltakelseHistorikk: (deltakelseId?: string) => ['deltakelseHistorikk', deltakelseId] as const,
};
// Use queryKeys directly with QueryClient methods, e.g.:
// queryClient.invalidateQueries({ queryKey: queryKeys.deltakelserForDeltaker(id) });
