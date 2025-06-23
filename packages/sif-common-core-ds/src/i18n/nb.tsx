import { pictureScanningGuideMessages } from '../components/picture-scanning-guide/i18n/pictureScanningGuideMessages';

export const commonMessages_nb = {
    Ja: 'Ja',
    Nei: 'Nei',
    '@core.common.fileUploadError': 'Det har dessverre skjedd en feil under opplasting av følgende vedlegg:',
    '@core.formikFileUpload.label': 'Last opp dokumenter',
    '@core.formikFileUpload.description':
        'Du kan laste opp filtypene JPG, JPEG, PNG og PDF. Maks størrelse per fil er {MAX_SIZE_MB} MB.',
    '@core.formikFileUpload.dokumenterLastetOpp.tittel': 'Dokumenter lastet opp ({antall})',
    '@core.formikFileUpload.dokumenterLastetOpp.lasterOpp': 'Laster opp ...',
    '@core.formikFileUpload.dokumenterAvvist.tittel': 'Dokumenter med feil',
    '@core.formikFileUpload.file-upload.error.fileType':
        'Filformatet støttes ikke. Tillatte filformater er JPG, JPEG, PNG og PDF.',
    '@core.formikFileUpload.file-upload.error.fileSize': 'Filen er større enn {MAX_SIZE_MB} MB.',
    '@core.formikFileUpload.file-upload.error.retry': 'Det oppstod en feil under opplastingen.',
    '@core.formikFileUpload.file-upload.error.unknown': 'Det oppstod en feil under opplastingen ({reason})',
    '@core.vedleggSummaryList.ingenVedlegg': 'Ingen dokumenter er lastet opp',
    '@core.formikVedleggList.validation.noVedleggUploaded': 'Ingen dokumenter er lastet opp',
    '@core.formikVedleggList.validation.tooManyVedlegg': 'For mange dokumenter er lastet opp',
    '@core.formikVedleggList.validation.maxTotalSizeExceeded':
        'Total samlet størrelse for dokumentene du har lastet opp overstiger grensen på 24 MB.',
    '@core.formik-vedlegg-form.alert.totalSize':
        'Du har totalt lastet opp mer enn grensen på 24 MB. Det betyr at du må fjerne noe av det du har lastet opp. Hvis det betyr at du ikke får plass til alt du ønsker å sende nå, kan du <Lenke>ettersende flere dokumenter</Lenke>.',
    '@core.formik-vedlegg-form.alert.totalSize.noLink':
        'Du har totalt lastet opp mer enn grensen på 24 MB. Det betyr at du må fjerne noe av det du har lastet opp.',

    ...pictureScanningGuideMessages.nb,
};
