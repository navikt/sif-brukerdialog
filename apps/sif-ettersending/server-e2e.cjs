const { startE2EServer } = require('@navikt/sif-server-utils/start-e2e-server.cjs');
const { getAppSettings } = require('./src/build/AppSettings.cjs');

startE2EServer(getAppSettings(), __dirname);
