import type { ClientOptions } from './types.gen';
import { type Config, type ClientOptions as DefaultClientOptions } from './client';
export type CreateClientConfig<T extends DefaultClientOptions = ClientOptions> = (override?: Config<DefaultClientOptions & T>) => Config<Required<DefaultClientOptions> & T>;
export declare const client: import("./client").Client;
//# sourceMappingURL=client.gen.d.ts.map