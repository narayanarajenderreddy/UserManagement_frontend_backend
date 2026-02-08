import api  from "./axios";

export const getUser = async ()=>{
    const res = await api.get("/users/me");
    return res.data;
}

