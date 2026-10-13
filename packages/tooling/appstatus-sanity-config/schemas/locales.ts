export const defaultLocale = 'nb';

interface SupportedLocale {
    id: string;
    title: string;
    isDefault?: boolean;
}

const supportedLocales: SupportedLocale[] = [
    { id: 'nb', title: 'Bokmål', isDefault: true },
    { id: 'nn', title: 'Nynorsk' },
];

export default supportedLocales;
