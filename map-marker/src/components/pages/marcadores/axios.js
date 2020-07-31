import {naxios ,paxios} from '../../utilities/axios';

export const getall = async () => {
    const url = '/map/';
    try {
        let result = await naxios.get(url);
        return result;
    } catch (e) {
        throw e;
    }
}


export const marker = async (latitud, longitud, msg) => {
    try {
        const {data} = await paxios.post("/map/marker", {
            latitud: latitud,
            longitud: longitud,
            msg: msg
        });
        return data;
    } catch (e) {
        throw(e);
    }
}
