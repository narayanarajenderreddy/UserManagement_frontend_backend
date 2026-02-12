import api from "./axios";

type Userquery = {
    limit?:number;
    offset?:number;
    search?:string;
    role?:string;
    is_active?:boolean;
}



export const getUsers = async (params: Userquery) => {
    const response = await api.get("/users/search",{params})
    console.log(response.data);
    return response.data;

}


export const updateUsers = async(user_id:number,payload:{is_active:boolean,role:string}) => {
    const response = await api.put(`/users/${user_id}`,payload)
    return response.data;
}