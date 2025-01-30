import Page from '@navikt/sif-common-core-ds/src/components/page/Page';

export const withPageWidth = (Story) => (
    <Page title="abc">
        <Story />
    </Page>
);
