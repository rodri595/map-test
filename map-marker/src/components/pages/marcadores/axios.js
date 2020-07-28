import {naxios} from '../../utilities/axios';

export const getall = async () => {
    const url = '/map/';
    try {
        let result = await naxios.get(url);
        return result;
    } catch (e) {
        throw e;
    }
}
