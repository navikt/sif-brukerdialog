import { MellomlagringModel } from '../api-models/Mellomlagring';

export const isValidMellomlagring = (mellomlagring?: MellomlagringModel) => {
    return mellomlagring !== undefined && Object.keys(mellomlagring).length > 0;
};
