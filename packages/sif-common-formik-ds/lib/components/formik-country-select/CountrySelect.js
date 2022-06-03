"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const countryUtils_1 = require("../../utils/countryUtils");
const ds_react_1 = require("@navikt/ds-react");
const filteredListEØSCountries = (countryOptionValue, shouldFilter) => {
    if (shouldFilter) {
        switch (countryOptionValue) {
            case 'BE':
            case 'BG':
            case 'DK':
            case 'EE':
            case 'FI':
            case 'FR':
            case 'GR':
            case 'IE':
            case 'IS':
            case 'IT':
            case 'HR':
            case 'CY':
            case 'LV':
            case 'LI':
            case 'LT':
            case 'LU':
            case 'MT':
            case 'NL':
            case 'PL':
            case 'PT':
            case 'RO':
            case 'SK':
            case 'SI':
            case 'ES':
            case 'GB':
            case 'SE':
            case 'CZ':
            case 'DE':
            case 'HU':
            case 'AT':
            case 'CH':
                return true;
            default:
                return false;
        }
    }
    else {
        return countryOptionValue !== 'AQ';
    }
};
const createCountryOptions = (onluEuAndEftaCountries, locale, useAlpha3Code = true) => {
    const lang = locale === 'en' ? 'nn' : 'nb';
    const countries = (0, countryUtils_1.getCountries)();
    const names = Object.entries(countries.getNames(lang));
    return names
        .sort((a, b) => a[1].localeCompare(b[1], lang))
        .filter((countryOptionValue) => filteredListEØSCountries(countryOptionValue[0], onluEuAndEftaCountries))
        .map((countryOptionValue) => (react_1.default.createElement("option", { key: countryOptionValue[0], value: useAlpha3Code ? countries.alpha2ToAlpha3(countryOptionValue[0]) : countryOptionValue[0] }, countryOptionValue[1])));
};
class CountrySelect extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.getCountryOptions = this.getCountryOptions.bind(this);
        this.updateCache = this.updateCache.bind(this);
    }
    updateCache(locale) {
        this.countryOptionsCache = {
            locale,
            options: createCountryOptions(this.props.showOnlyEuAndEftaCountries ? this.props.showOnlyEuAndEftaCountries : false, locale, this.props.useAlpha3Code),
        };
    }
    getCountryOptions(locale) {
        if (!this.countryOptionsCache || locale !== this.countryOptionsCache.locale) {
            this.updateCache(locale);
        }
        return this.countryOptionsCache && this.countryOptionsCache.options ? this.countryOptionsCache.options : [];
    }
    render() {
        const _a = this.props, { onChange, name, showOnlyEuAndEftaCountries, locale, useAlpha3Code } = _a, restProps = __rest(_a, ["onChange", "name", "showOnlyEuAndEftaCountries", "locale", "useAlpha3Code"]);
        return (react_1.default.createElement(ds_react_1.Select, Object.assign({ name: name }, restProps, { onChange: (e) => onChange(e.target.value), autoComplete: "off" }),
            react_1.default.createElement("option", { value: "" }),
            this.getCountryOptions(locale || 'nb')));
    }
}
exports.default = CountrySelect;
