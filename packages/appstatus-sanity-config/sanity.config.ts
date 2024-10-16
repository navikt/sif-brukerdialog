import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import schemaTypes from './schemas';
import { visionTool } from '@sanity/vision';

export default defineConfig([
    {
        name: 'staging',
        title: 'Staging',
        projectId: 'ryujtq87',
        dataset: 'staging',
        basePath: '/staging',
        plugins: [structureTool(), visionTool()],
        schema: {
            types: schemaTypes,
        },
    },
    {
        name: 'production',
        title: 'Production',
        projectId: 'ryujtq87',
        dataset: 'production',
        basePath: '/production',
        plugins: [structureTool(), visionTool()],
        schema: {
            types: schemaTypes,
        },
    },
]);
