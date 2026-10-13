const URL = 'https://www.apertium.org/apy/translate'; //?q=&langpair=nob|nno

type TranslationResponse = {
    responseData: { translatedText: string };
    responseDetails: any;
    responseStatus: number;
};

export const useTranslation = () => {
    const translate = async (text: string, langpair: string = 'nob|nno') => {
        const url = `${URL}?q=${text}&langpair=${langpair}&markUnknown=no`;
        const params = { q: text, langpair, markUnknown: 'no' };
        const result: TranslationResponse = await fetch(url, { method: 'POST', body: JSON.stringify(params) }).then(
            (res) => res.json(),
        );
        const { translatedText } = result.responseData;
        return translatedText;
    };
    return {
        translate,
    };
};
