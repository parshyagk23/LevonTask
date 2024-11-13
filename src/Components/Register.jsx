import { useRef, useState } from "react";
import styles from "./auth.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../Apis/Auth";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [RegisterData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const handleOnchange = (e) => {
    setRegisterData({ ...RegisterData, [e.target.id]: e.target.value });
  };

  const handleRegister = async () => {
    const validEmail = "@gmail.com";
    let isError = false;

    if (RegisterData.username.trim().length == 0) {

      isError = true;
    }

    if (
      RegisterData.email.trim().length == 0 ||
      !RegisterData.email.includes(validEmail)
    ) {

      isError = true;
    }

    if (
      RegisterData.password.trim().length == 0
    ) {
      setRegisterData({ ...RegisterData, password: "" });
      isError = true;
    }

    if(Options ===""){
      isError=true
    }
    if (isError) {
      setError(true)
      return
    }

    const responce = await register(RegisterData);

    if (responce.errormessage === "Email Already exists") {
      toast.error("user Already exist with email", { position: "top-center" });
      setRegisterData({
        email: "",
        username: "",
        password: "",
      });
      return;
    }
    toast.success("Register successful please Login", { position: "top-center" });
    setRegisterData({
      email: "",
      username: "",
      password: "",
    });
    setTimeout(() => {
      navigate('/login')
    }, 2000);
  };

 

  return (
    <>
      <ToastContainer />

      <main className={styles.auth}>
        <div>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            placeholder={"Enter name"}
            value={RegisterData.username}
            onChange={handleOnchange}
            className={styles.username}
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input

            placeholder={"enter email"}
            value={RegisterData.email}
            id="email"
            type="email"
            onChange={handleOnchange}
            className={styles.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input

            placeholder={"enter password"}
            value={RegisterData.password}
            id="password"
            type={"password"}
            onChange={handleOnchange}
            className={styles.username}
          />
        </div>
        
        <div onClick={handleRegister} className={styles.Signbtn}>
          <button>Sign up</button>
        </div>
        <p> Already have a Account then login</p>
        <div onClick={()=> navigate('/login')} className={styles.Signbtn}>
          <button> login</button>
        </div>
        <div>
          {error && <p style={{ color: 'red' }} >filled Can't be Empty</p>}
        </div>
      </main>
    </>
  );
};

export default Register;