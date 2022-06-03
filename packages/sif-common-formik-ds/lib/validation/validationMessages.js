"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMessages = void 0;
const _1 = require(".");
const _2 = require(".");
const _3 = require(".");
const _4 = require(".");
const _5 = require(".");
const _6 = require(".");
const _7 = require(".");
const _8 = require(".");
const _9 = require(".");
const _10 = require(".");
exports.validationMessages = {
    [_8.ValidateRequiredFieldError.noValue]: ({ hva }) => `Du må svare på ${hva}.`,
    [_1.ValidateCheckedError.notChecked]: ({ hva }) => `Du må krysse av for ${hva}.`,
    [_3.ValidateDateError.dateHasNoValue]: ({ hva }) => `Du må oppgi ${hva}. Skriv inn eller velg dato.`,
    [_3.ValidateDateError.dateHasInvalidFormat]: ({ hva }) => `Du må oppgi ${hva} i et gyldig format. Gyldig format er dd.mm.åååå.`,
    [_3.ValidateDateError.dateIsBeforeMin]: ({ hva, min }) => `${hva} kan ikke være før ${min}. Skriv inn eller velg sluttdato fra datovelgeren.`,
    [_3.ValidateDateError.dateIsAfterMax]: ({ hva, maks }) => `${hva} kan ikke være etter ${maks}. Skriv inn eller velg dato fra datovelgeren.`,
    [_3.ValidateDateError.dateIsNotWeekday]: `Lørdag og søndag kan ikke velges. Velg en annen ukedag.`,
    [_2.ValidateDateRangeError.fromDateIsAfterToDate]: ({ sluttdato, startdato, }) => `${startdato} kan ikke være etter ${sluttdato}. Skriv inn eller velg dato fra datovelgeren.`,
    [_2.ValidateDateRangeError.toDateIsBeforeFromDate]: ({ sluttdato, startdato, }) => `${sluttdato} kan ikke være før ${startdato}. Skriv inn eller velg sluttdato fra datovelgeren.`,
    [_4.ValidateFødselsnummerError.fødselsnummerHasNoValue]: ({ fødselsnummeret }) => `Skriv inn ${fødselsnummeret}.`,
    [_4.ValidateFødselsnummerError.fødselsnummerIsNot11Chars]: ({ fødselsnummeret }) => `${fødselsnummeret} du har tastet inn er ugyldig. Fødselsnummeret må bestå av 11 siffer.`,
    [_4.ValidateFødselsnummerError.fødselsnummerIsInvalid]: ({ fødselsnummeret }) => `${fødselsnummeret} du har tastet inn inneholder 11 siffer, men det er ikke et gyldig norsk fødselsnummer. Kontroller at du har tastet inn riktig.`,
    [_4.ValidateFødselsnummerError.fødselsnummerIsNotAllowed]: `Du har tastet inn en fødselsnummer som ikke er lov.`,
    [_5.ValidateListError.listIsEmpty]: ({ hva }) => `Legg til ${hva}.`,
    [_5.ValidateListError.listHasTooFewItems]: ({ hva }) => `Legg til minst {minAntall} ${hva}.`,
    [_5.ValidateListError.listHasTooManyItems]: ({ hva }) => `Du har lagt til for mange ${hva}. Maks antall elementer er {maksAntall}.`,
    [_6.ValidateNumberError.numberHasNoValue]: ({ hva }) => `Skriv inn ${hva}.`,
    [_6.ValidateNumberError.numberHasInvalidFormat]: ({ hva }) => `Du må oppgi et gyldig tall for ${hva}. Et gyldig tall inneholder kun siffer.`,
    [_6.ValidateNumberError.numberIsTooSmall]: ({ hva }) => `Tallet du har oppgitt for ${hva} er for lavt. Tallet kan ikke være lavere enn {min}.`,
    [_6.ValidateNumberError.numberIsTooLarge]: ({ hva }) => `Tallet du har oppgitt for ${hva} er for høyt. Tallet kan ikke være høyere enn {maks}.`,
    [_7.ValidateOrgNumberError.orgNumberHasNoValue]: ({ hva }) => `Skriv inn ${hva}.`,
    [_7.ValidateOrgNumberError.orgNumberHasInvalidFormat]: `Du har oppgitt et ugyldig organisasjonsnummer. Oppgi et gyldig organsisasjonsnummer som inneholder 9 siffer.`,
    [_9.ValidateStringError.stringHasNoValue]: ({ hva }) => `Skriv inn ${hva}.`,
    [_9.ValidateStringError.stringIsNotAString]: ({ hva }) => `${hva} er ikke en gyldig tekst.`,
    [_9.ValidateStringError.stringIsTooShort]: ({ hva, minLengde }) => `${hva} må inneholde minst ${minLengde} tegn.`,
    [_9.ValidateStringError.stringIsTooLong]: ({ hva, maksLengde }) => `${hva} kan ikke inneholde flere enn ${maksLengde} tegn.`,
    [_10.ValidateYesOrNoError.yesOrNoIsUnanswered]: ({ hva }) => `Du må svare ja eller nei på ${hva}.`,
};
