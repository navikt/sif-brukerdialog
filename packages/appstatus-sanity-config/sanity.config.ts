import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import schemaTypes from './schemas';

export default defineConfig({
    name: 'production',
    title: 'Production',
    projectId: 'ryujtq87',
    dataset: 'production',
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
});
