import React, {  useState } from "react";
import axios from 'axios';

function Login() {
    //define and initialize variables
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [retailers, setRetailers] = useState([{id: null, name:null, type: null, active: null}]);
    const [status,setStatus] = useState("Status");

    //create axios client
    const client = axios.create({ baseURL: 'https://www.savemybills.com.au/api'});

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
        const requestBody = {
            email: email,
            password: password
        };
        console.log(requestBody);
        // log in post
        client.post('/loginCheck', requestBody).then((response)=>{
          console.log(response);
          setStatus(response.data.message);
          if(response.data.code===1){
            //get retailers
            client.get('/getRetailer').then((response) => {setRetailers(response.data.data.retailers)});
          }
        })
             
    };
return (
    <div className="login_container">
      <form>
        <div className="text-center mb-4 text-white">
          <label htmlFor="email">Email</label>
          <div className="emailInput">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="text-center mb-4 text-white">
          <label htmlFor="password">Password</label>
          <div className="passwordInput">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="text-center mt-5 mb-5">
          <button onClick={handleSubmitLogin} id="login">
            Login
          </button>
          <p>{status}</p>
          <table classname="table">
          <thead>
            <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Active</th>
            </tr>
         </thead>
         <tbody>  
         {retailers.map((retailer)=>{
            return (
                <tr>
                <th scope="row">{retailer.id}</th>
                <td>{retailer.name}</td>
                <td>{retailer.type}</td>
                <td>{retailer.active}</td>
            </tr>
            );
         })}
         </tbody>
         </table>
        </div>
      </form>
    </div>
  );
}

export default Login;