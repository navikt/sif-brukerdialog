// Legacy export (for bakoverkompatibilitet)
export * from './generated/client';
export * from './generated/client/sdk.gen';
export * from './generated/client/types.gen';
export * from './generated/client/zod.gen';
export * from './generated/client/client.gen';

// K9-sak API
export * as k9Sak from './generated/k9-sak';

// Innsyn API
export * as innsyn from './generated/innsyn';

export * from './initK9SakInnsynApiClients';
