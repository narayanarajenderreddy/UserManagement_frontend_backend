import { useForm } from "react-hook-form";

type LoginForm = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (data: LoginForm) => {
    console.log("Login data:", data);
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
