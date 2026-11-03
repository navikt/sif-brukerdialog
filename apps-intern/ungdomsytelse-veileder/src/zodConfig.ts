import { z } from 'zod';

// Uten dette prøver zod new Function() når skjemaer opprettes, noe CSP blokkerer (ingen 'unsafe-eval').
// Må importeres før moduler som definerer skjemaer.
z.config({ jitless: true });
