import {paxios} from '../../utilities/axios';

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
