export declare const validationMessages: {
    noValue: ({ hva }: {
        hva: string;
    }) => string;
    notChecked: ({ hva }: {
        hva: string;
    }) => string;
    dateHasNoValue: ({ hva }: {
        hva: string;
    }) => string;
    dateHasInvalidFormat: ({ hva }: {
        hva: string;
    }) => string;
    dateIsBeforeMin: ({ hva, min }: {
        hva: string;
        min: string;
    }) => string;
    dateIsAfterMax: ({ hva, maks }: {
        hva: string;
        maks: string;
    }) => string;
    dateIsNotWeekday: string;
    fromDateIsAfterToDate: ({ sluttdato, startdato, }: {
        sluttdato: string;
        startdato: string;
    }) => string;
    toDateIsBeforeFromDate: ({ sluttdato, startdato, }: {
        sluttdato: string;
        startdato: string;
    }) => string;
    fødselsnummerHasNoValue: ({ fødselsnummeret }: {
        fødselsnummeret: string;
    }) => string;
    fødselsnummerIsNot11Chars: ({ fødselsnummeret }: {
        fødselsnummeret: string;
    }) => string;
    fødselsnummerIsInvalid: ({ fødselsnummeret }: {
        fødselsnummeret: string;
    }) => string;
    fødselsnummerIsNotAllowed: string;
    listIsEmpty: ({ hva }: {
        hva: string;
    }) => string;
    listHasTooFewItems: ({ hva }: {
        hva: string;
    }) => string;
    listHastooManyItems: ({ hva }: {
        hva: string;
    }) => string;
    numberHasNoValue: ({ hva }: {
        hva: string;
    }) => string;
    numberHasInvalidFormat: ({ hva }: {
        hva: string;
    }) => string;
    numberIsTooSmall: ({ hva }: {
        hva: string;
    }) => string;
    numberIsTooLarge: ({ hva }: {
        hva: string;
    }) => string;
    orgNumberHasNoValue: ({ hva }: {
        hva: string;
    }) => string;
    orgNumberHasInvalidFormat: string;
    stringHasNoValue: ({ hva }: {
        hva: string;
    }) => string;
    stringIsNotAString: ({ hva }: {
        hva: string;
    }) => string;
    stringIsTooShort: ({ hva, minLengde }: {
        hva: string;
        minLengde: number;
    }) => string;
    stringIsTooLong: ({ hva, maksLengde }: {
        hva: string;
        maksLengde: number;
    }) => string;
    yesOrNoIsUnanswered: ({ hva }: {
        hva: string;
    }) => string;
};
//# sourceMappingURL=validationMessages.d.ts.map