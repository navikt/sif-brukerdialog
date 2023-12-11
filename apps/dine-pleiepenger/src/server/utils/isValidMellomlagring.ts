import { MellomlagringModel } from '../api-models/MellomlagringSchema';

export const isValidMellomlagring = (mellomlagring?: MellomlagringModel) => {
    return mellomlagring !== undefined && Object.keys(mellomlagring).length > 0;
};
