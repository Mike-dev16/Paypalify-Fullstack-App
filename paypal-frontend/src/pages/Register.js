import { useNavigate } from "react-router-dom"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";



export default function Register({formik, isLoading}) {
  const navigate = useNavigate();
 
  return (
  <form className="flex flex-col min-h-screen justify-center items-center bg-white" onSubmit={formik.handleSubmit}>
  <div className="p-10 border-[1px] my-10 border-slate-200 rounded-md flex flex-col items-center space-y-3 flex-grow">
    <div className="flex justify-between py-8 w-full">
    <span className= "cursor-pointer -mt-10 self-start justify-self-center" onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft}/></span>
      <img width="30" className="-mt-10 self-center justify-self-center" src="https://www.paypalobjects.com/images/shared/momgram@2x.png" alt="logo" />
        <span className= "invisible cursor-pointer -mt-10 self-start justify-self-center" onClick={() => navigate('/')}><FontAwesomeIcon icon={faArrowLeft}/></span>
    </div>
    <div className="text-center mt-8 text-primary">
    <h4 className="font-medium" style={{ fontSize: "28px" }}>
        Set up your profile
    </h4>

    <p className="font-semibold my-4" style={{ fontSize: "17px" }}>
        This info needs to be accurate
    </p>
    </div>
     <input 
      className="p-3 border-[1px] border-slate-500 rounded-sm w-80" 
      type="email" 
      name="email" 
      id="email"
      placeholder="Email"
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur} 
      value={formik.values.email} />
    {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600">{formik.errors.email}</div>
    ) : null}
     <input 
      className="p-3 border-[1px] border-slate-500 rounded-sm w-80" 
      type="text" 
      name="firstName" 
      id="firstName"
      placeholder="First Name"
      onChange={formik.handleChange} 
      onBlur={formik.handleBlur} 
      value={formik.values.firstName} />
       {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-600">{formik.errors.firstName}</div>
            ) : null}

      <input 
        className="p-3 border-[1px] border-slate-500 rounded-sm w-80" 
        type="text" 
        name="lastName" 
        id="lastName"
        placeholder="Last Name"
        onChange={formik.handleChange} 
        onBlur={formik.handleBlur} 
        value={formik.values.lastName} />
       {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-600">{formik.errors.lastName}</div>
       ) : null}

        <input 
          className="p-3 border-[1px] border-slate-500 rounded-sm w-80" 
          placeholder="Create your password"
          type="password" 
          name="password" 
          id="password"
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.password} />
          {formik.touched.password && formik.errors.password ? (
              <div className="text-red-600">{formik.errors.password}</div>
            ) : null}

        <input 
          className="p-3 border-[1px] border-slate-500 rounded-sm w-80" 
          placeholder="Confirm your password"
          type="password" 
          name="confirmPassword" 
          id="confirmPassword"
          onChange={formik.handleChange} 
          onBlur={formik.handleBlur} 
          value={formik.values.confirmPassword} />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-600">{formik.errors.confirmPassword}</div>
            ) : null}

    <div className="flex flex-col space-y-5 justify-center items-center w-full">
        <p className="text-xs font-semibold w-96 opacity-90 my-6">
            By continuing, you confirm that you’re the owner of the provided information or primary user
            of these details.</p>
         <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
      </div>
      <button type="submit" className="flex items-center justify-center w-2/3 bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">
        {isLoading && (<svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>)}
        {isLoading ? "Processing" : "Next"}
      </button>
    </div>
  </div>
  

  <div className="w-full p-3 bg-[#F7F9FA] fle justify-center items-center space-x-3 text-[14px] font-medium text-[#666]">
    <p className="block w-full">©1999–2022 PayPal. All rights reserved.</p><br />
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Contact Us</a>
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Privacy</a>
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Legal</a>
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Policy </a>
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Worldwide </a>
  </div>
      </form>
   );
};

      
 
