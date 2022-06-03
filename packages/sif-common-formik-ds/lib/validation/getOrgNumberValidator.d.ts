import { ValidationFunction } from './types';
export declare enum ValidateOrgNumberError {
    orgNumberHasNoValue = "orgNumberHasNoValue",
    orgNumberHasInvalidFormat = "orgNumberHasInvalidFormat"
}
declare type OrgNumberValidationResult = undefined | ValidateOrgNumberError.orgNumberHasNoValue | ValidateOrgNumberError.orgNumberHasInvalidFormat;
interface Options {
    required?: boolean;
}
declare const getOrgNumberValidator: (options?: Options) => ValidationFunction<OrgNumberValidationResult>;
export default getOrgNumberValidator;
//# sourceMappingURL=getOrgNumberValidator.d.ts.map