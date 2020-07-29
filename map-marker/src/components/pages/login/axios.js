import {paxios} from '../../utilities/axios';

export const login = async (email, pswd) => {
    try {
        const {data} = await paxios.post("/user/login", {
            email: email,
            pswd: pswd
        });
        return data;
    } catch (e) {
        throw(e);
    }
}
