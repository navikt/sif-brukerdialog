export const removeElementFromArray = (element: any, array: any[], keyProp?: string) =>
    array.filter((el) => {
        return keyProp ? el[keyProp] !== element[keyProp] : el !== element;
    });
