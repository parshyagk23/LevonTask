import { useRef, useState } from "react";
import styles from "./auth.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../Apis/Auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Login = ({Options, setOptions}) => {
  const navigate = useNavigate()
  const [LoginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false)

  const handleOnchange = (e) => {

    setLoginData({ ...LoginData, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    const validEmail = "@gmail.com";
    let isError = false;
    if (
      LoginData.email.trim().length == 0 ||
      !LoginData.email.includes(validEmail)
    ) {

      isError = true;
    }

    if (LoginData.password.trim().length == 0) {


      setLoginData({ ...LoginData, password: "" });
      isError = true;
    }
    if(Options ===""){
      isError=true
    }
    if (isError) {
      setError(true)
      return
    };

    const responce = await login(LoginData);
    if (responce.errormessage === "Invalid Credentials!!") {
      toast.error(responce.errormessage, { position: "top-center" });
      setLoginData({ email: "", password: "" });
      return;
    }

    setLoginData({ email: "", password: "" });
    setTimeout(() => {
      navigate('/calculator')
    }, 2000);
    Cookies.set('options',Options)
    toast.success("Login successful", { position: "top-center" });
  };

  const handleOptionCheck=(e)=>{
    if(e.target.name ==='Addition'){
      setOptions('Addition')
    }
    else if(e.target.name  ==='Substraction'){
      setOptions('Substraction')
    }
    else{
      setOptions('Multiplication')
    }
   
  }
  return (
    <>
      <ToastContainer />

      <main className={styles.auth}>

        <div>
          <label htmlFor="email">Email</label>
          <input

            placeholder={"enter email"}
            value={LoginData.email}
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
            value={LoginData.password}
            id="password"
            type={"password"}
            onChange={handleOnchange}
            className={styles.username}
          />
        </div>
        <section className={styles.options}>

          <div>
            <label >Choose Option</label>
          </div>
          <div  >
            <label htmlFor="add">Addition</label>
            <input type="radio" name="Addition" 
            onChange={(e)=>handleOptionCheck(e)}
            id="add" checked={Options==='Addition'}
            
            />
          </div>
          <div>
            <label htmlFor="sub">Substraction</label>
            <input type="radio" name="Substraction" 
                    id="sub" onChange={(e)=>handleOptionCheck(e)}
                    checked={Options==='Substraction'}
             />
          </div>
          <div>
            <label htmlFor="mul">Multiplication </label>
            <input type="radio" name="Multiplication" 
            onChange={(e)=>handleOptionCheck(e)}
            id="mul" checked={Options==='Multiplication' }
             />
          </div>


        </section>

        <div onClick={handleLogin} className={styles.Signbtn}>
          <button>Login</button>
        </div>
        <p> Don't have a Account then sign up</p>
        <div onClick={()=> navigate('/')} className={styles.Signbtn}>
          <button> Sign up</button>
        </div>
        <div>
          {error && <p style={{ color: 'red' }} >filled Can't be Empty</p>}
        </div>
      </main>
    </>
  )
}

export default Login