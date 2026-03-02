Innsynsløsning på nav.no for dem som har søkt om Pleiepenger for sykt barn.

#### Komme i gang

```bash
# Installer prosjekt
yarn install

# Start Next.js med MSW mocking (ingen backend nødvendig)
yarn dev:mock

# Start Next.js mot ekte backend (krever VPN/tilgang)
yarn dev
```

**Bytte mock-scenario:**

```bash
MOCK_SCENARIO=en-sak yarn dev:mock
```

#### Storybook

Komponenter og sider er lagt inn i storybook. Start lokalt ved å kjøre:

```bash
yarn storybook
```

#### Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

Interne henvendelser kan sendes via Slack i kanalen #sykdom-i-familien.
