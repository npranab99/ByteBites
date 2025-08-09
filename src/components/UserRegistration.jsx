import React, { useState } from "react";

const UserRegistration = ()=>{

    const[firstName, setFirstName]=useState("");
    const[lastName, setlastName]= useState("");
    const[mailId, setMailId]= useState("");
    const[mobileNumber, setMobileNumber]=useState("");
    const[password, setPassword]=useState("")
    const[confirmPass, setConfirmPass]=useState("")

    const handleRegister = (e)=>{
        e.preventDefault();
        if(password===confirmPass){

        console.log("register successfully",firstName,lastName,mailId)
        }else{
            console.log("pass is different")
        }
    }

    return(<>
        <h2>wecome to registration page</h2>
        <form onSubmit={handleRegister}>
        <div>
        <label >First Name</label>
        <input value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
        </div>
        <div>
        <label>Last Name</label>
        <input value={lastName} onChange={(e)=>setlastName(e.target.value)}/>
        </div>
        <div>
        <label>mail Id:</label>
        <input type="mail" value={mailId} onChange={(e)=>setMailId(e.target.value)}/>
        </div>
        <div>
        <label>Mobile Number</label>
        <input type="number" value={mobileNumber} onChange={(e)=>setMobileNumber(e.target.value)}/>
        </div>
        <div>
        <label>Create Password</label>
        <input value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div>
        <label>Confirm Password</label>
        <input value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)}/>
        </div>
        <button type='submit'>Register</button>
        </form>
        </>)
}

export default UserRegistration;