import React, { useState } from 'react'
import styles from "./auth.module.css";
import Cookies from 'js-cookie';

const Calculator = () => {

    const [Input1 ,setInput1] = useState();
    const [Input2 ,setInput2] = useState();
    const [Output ,setOutput] = useState();
    const Options = Cookies.get('options')
    const handleCalcultor =()=>{
      
        if(Options ==='Addition'){
            const result = Number(Input1)+Number( Input2)
            setOutput(result)
        }
        else if(Options ==='Substraction'){
            const result = Number(Input1)-Number( Input2)
              setOutput(result)
              
            }
            else{
                const result = Number(Input1)*Number( Input2)
              setOutput(result)
            
          }      
    }
    return (
        <>

            <main className={styles.auth}>
                <div style={{display:'block'}} >
                    <h2>You have registerd for {Options }</h2>
                    <h3>Welcome {Cookies.get('userName')}</h3>
                </div>
                <div>
                    <label htmlFor="input1">INPUT 1</label>
                    <input
                        id="input1"
                        type="number"
                        onChange={(e)=>{setInput1(e.target.value)}}
                        className={styles.username}
                    />
                </div>
                <div>
                    <label htmlFor="input2">INPUT 2</label>
                    <input
                        id="input2"
                        type='number'
                        onChange={(e)=>{setInput2(e.target.value)}}
                        className={styles.username}
                    />
                </div>
                <div>
                    <label htmlFor="input2">OUTPUT </label>
                    <input
                        id="output"
                        type='number'
                        value={Output}
                        className={styles.username}
                    />
                </div>


                <div  onClick={handleCalcultor} className={styles.Signbtn}>
                    <button>Calculate</button>
                </div>
            </main>
        </>
    )
}

export default Calculator