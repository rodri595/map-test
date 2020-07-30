import {paxios} from '../../utilities/axios';

export const signin = async (email, nombreCompleto, password) => {
    try {
        const {data} = await paxios.post("/user/signin", {
            email: email,
            nombreCompleto: nombreCompleto,
            password: password
        });
        return data;
    } catch (e) {
        throw(e);
    }
}
