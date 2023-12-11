const { Issuer } = require('openid-client');
let tokenxClient;

async function initTokenX() {
    const tokenxIssuer = await Issuer.discover(process.env.TOKEN_X_WELL_KNOWN_URL);
    tokenxClient = new tokenxIssuer.Client(
        {
            client_id: process.env.TOKEN_X_CLIENT_ID,
            token_endpoint_auth_method: 'private_key_jwt',
        },
        {
            keys: [JSON.parse(process.env.TOKEN_X_PRIVATE_JWK)],
        },
    );
}

async function getTokenXToken(token, additionalClaims) {
    let tokenSet;
    try {
        tokenSet = await tokenxClient?.grant(
            {
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                audience: process.env.API_TOKENX_AUDIENCE,
                subject_token: token,
            },
            additionalClaims,
        );
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Noe gikk galt ved exchange token', err);
    }
    return tokenSet;
}

async function exchangeToken(token) {
    if (!token) {
        // Brukeren er ikke autorisert
        return;
    }

    const additionalClaims = {
        clientAssertionPayload: {
            nbf: Math.floor(Date.now() / 1000),
            // TokenX only allows a single audience
            aud: [tokenxClient?.issuer.metadata.token_endpoint],
        },
    };

    return await getTokenXToken(token, additionalClaims);
}

module.exports = {
    initTokenX,
    exchangeToken,
};
