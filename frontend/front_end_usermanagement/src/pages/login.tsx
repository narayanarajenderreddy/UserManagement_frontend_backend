import { useForm } from "react-hook-form";
import { loginApi } from "../api/authApi";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();
  const navigate = useNavigate();

  const onSubmit = async  (data: LoginForm) => {
    try{
          // console.log("Login data:", data);
          const res = await loginApi(data);
          //console.log(res.data)
          localStorage.setItem("token",res.data.access_token);
          //console.log("local_token:",localStorage.getItem("token"))
          navigate("/dashboard")
    }catch(error){
      alert("Invalid Credentials");

    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "100px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Email"
          {...register("email")}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
