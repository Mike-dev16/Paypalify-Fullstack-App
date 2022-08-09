import React, { useEffect, useState } from 'react'
import success from '../images/success.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


const SignUpEmailVerify = () => {
  const [validUrl, setValidUrl] = useState(false);
  const param = useParams();
  console.log(param);


  useEffect(() => {
    const verifyEmailUrl = async () => {
      try {
        const url = `https://paypal-back.herokuapp.com/api/users/${param.id}/verify/${param.token}`; //`http://localhost:3001/api/users/${param.id}/verify/${param.token}`; 
        const { data } = await axios.get(url);
        console.log(data);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
        console.log(error);
      }
    };
    verifyEmailUrl();
  }, [param])
  return (
    <>
      {validUrl ? (
        <div>
          <img src={success} alt="success_img" style={{width: "10%", margin: "10px auto"}}/>
          <h1>Email verified successfully</h1>
          <Link to={'/login'}>
            <button style={{border: "2px solid #000", padding: "10px 40px"}}>Login</button>
          </Link>
        </div>
      ): (
        <h1>404 NOT FOUND</h1>
      )}
    </>
  )
}

export default SignUpEmailVerify;