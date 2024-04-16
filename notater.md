/** Fellespakker **/

SifAppWrapper

-   Setter kun css klasse for noe overstyring

ErrorBoundary

-   Usikker på om det virker etter hensikt

AmplitudeProvider

-   Gir amplitude context for logging til amplitude

SoknadApplication

-   Wrapper som setter opp noe felles funksjonalitet. Denne har mindre verdi nå enn tidligere, og kan kanskje droppes/forenkles enda mer. Potensielt flytte komponener over inn i denne.
    -- intlProvider
    -- appStatus fra Sanity
    -- BrowserRouter
    -- DevBranchInfo - info om hvilken branch som brukes når app kjøres i q
