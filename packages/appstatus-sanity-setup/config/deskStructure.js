import S from '@sanity/desk-tool/structure-builder';

export default () =>
    S.list()
        .title('NAV AppStatus')
        .items([
            S.listItem().title('Applications').child(S.documentTypeList('application')),
            S.listItem().title('Teams').child(S.documentTypeList('team')),
            S.divider(),
        ]);
