import './App.css';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SignUpEmailVerify from './pages/SignUpEmailVerify';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginService from './services/login';
import registerService from './services/register';
import passwordResetService from './services/passwordReset';
import Notification from './components/Notification';
import LoadingOverlay from "react-loading-overlay";
import styled, { css } from "styled-components";
import { useFormik } from 'formik';
import * as Yup from 'yup';


const DarkBackground = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 999; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  ${props =>
        props.disappear &&
        css`
      display: block;
    `}
`;



function App() {
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: null, type: null });
    const [isLogoutLoading, setIsLogoutLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (!isLogoutLoading) {
            setTimeout(() => setIsLogoutLoading(true), 3000);
        }
    }, [isLogoutLoading]);


    useEffect(() => {
        const loggedUSerJSON = window.localStorage.getItem('loggedBlogAppUser');
        if (loggedUSerJSON) {
            const recoveredUser = JSON.parse(loggedUSerJSON);
            setUser(recoveredUser);
        }
    }, []);
 


const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
     validationSchema: Yup.object({
        firstName: Yup.string()
            .required("first Name is Required")
            .min(2, "First Name is Too Short."),
        lastName: Yup.string()
            .required("Last Name is Required.")
            .min(2, "Last Name is Too Short."),
        email: Yup.string().email().required("Email is Required."),
        password: Yup.string().required('Password is required')
            .min(8, "Password length is weak"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], "Passwords don't match")
    }),
    onSubmit: async function (values) {
        let email = values.email;
        let firstName =  values.firstName;
        let lastName = values.lastName;
        //let password = values.password
        let password = values.confirmPassword;

         setIsLoading(true);
         
        try {
            await registerService.register({
                email, firstName, lastName, password,
            });
            //navigate('login');
            values.email="";
            values.firstName ="";
            values.lastName="";
            values.password="";
            values.confirmPassword="";

            setNotification({
                message: 'An email sent to your account. Please verify!',
                type: 'success'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 7000);
            setIsLoading(false);
        } catch (error) {
            setNotification({
                message: 'Invalid credentials!',
                type: 'error'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 5000);
            setIsLoading(false);
        }
    },
  })

    const handleLogin = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        let email = emailLogin;
        let password = passwordLogin;

        try {
            const user = await LoginService.login({
                email, password,
            });


            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            );
            setUser(user);
            setEmailLogin('');
            setPasswordLogin('');
            navigate('/', { replace: true });
            setIsLoading(false);
            setNotification({
                message: 'login successful!',
                type: 'success'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 5000);
        } catch (error) {
            setIsLoading(false);
            setNotification({
                message: 'login failed!',
                type: 'error'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 5000);
        }
    };


    
    const handleForgotPassword = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        let email = forgotPasswordEmail;

        try {
             await passwordResetService.passwordReset({
                email
            });


            setForgotPasswordEmail('');
            //navigate('/', { replace: true });In future navigate to a page replacing notification msgs
            setIsLoading(false);
            setNotification({
                message: 'Password reset link sent to your email account!',
                type: 'success'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 50000);
        } catch (error) {
            setIsLoading(false);
            setNotification({
                message: 'Password reset failed!',
                type: 'error'
            });
            setTimeout(() => {
                setNotification({ message: null, type: null });
            }, 5000);
        }
    }


    const handleLogout = (e) => {
        e.preventDefault();

        setIsLogoutLoading(!isLogoutLoading);
        setIsLoading(false);
        window.localStorage.removeItem('loggedBlogAppUser');
        setEmailLogin('');
        setPasswordLogin('');
        setUser(null);
    };


    return (
        <div className="App relative">
            <Notification notification={notification} />
            <DarkBackground disappear={!isLogoutLoading}>
                <LoadingOverlay
                    active={true}
                    spinner={true}
                    text="Logging out..." >
                </LoadingOverlay>
            </DarkBackground>
            <Routes>
                <Route path="/" element={<Home user={user} handleLogout={handleLogout} />} />
                <Route path="login" element={<Login
                    emailLogin={emailLogin}
                    setEmailLogin={setEmailLogin}
                    passwordLogin={passwordLogin}
                    setPasswordLogin={setPasswordLogin}
                    handleLogin={handleLogin}
                    isLoading={isLoading}
                />} />
                <Route path="register" element={<Register
                    isLoading={isLoading}
                    formik={formik}
                />} />
                <Route path="/users/:id/verify/:token" element={<SignUpEmailVerify />} />
                <Route path="passwordReset" element={<ForgotPassword
                    handleForgotPassword={handleForgotPassword}
                    forgotPasswordEmail={forgotPasswordEmail} 
                    setForgotPasswordEmail={setForgotPasswordEmail}
                    isLoading={isLoading}
                />} />
                 <Route path="/password-reset/:id/:token" element={<PasswordReset
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                     />}/>
            </Routes>
        </div>
    );
}

export default App;
