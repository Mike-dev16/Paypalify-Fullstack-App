import { useNavigate } from "react-router-dom";

export default function Login({handleLogin,  emailLogin, passwordLogin, setEmailLogin, setPasswordLogin, isLoading }) {
  const navigate = useNavigate();

  const registerNav = () => {
      navigate('/register')
  }

  return (
<form className="min-h-screen flex flex-col justify-center items-center bg-white" onSubmit={handleLogin}>
  <div className="p-10 border-[1px] my-10 border-slate-200 rounded-md flex flex-col items-center space-y-3 flex-grow">
    <div className="py-8">
      <img width="30" className="-mt-10" src="https://www.paypalobjects.com/images/shared/momgram@2x.png" alt="logo" />
    </div>
    <input 
        className="p-3 border-[1px] border-slate-500 rounded-sm w-80" 
        placeholder="E-Mail or mobile number"  
        type="email"
        value={emailLogin}
        name="email"
        onChange={({ target }) => setEmailLogin(target.value)}
    />
    <div className="flex flex-col space-y-1">
      <input 
        className="p-3 border-[1px] border-slate-500 rounded-sm w-80" 
        placeholder="Enter your Password"
        type="password"
        value={passwordLogin}
        name="password"
        onChange={({ target }) => setPasswordLogin(target.value)}
        />
      <p className="font-bold text-[#0070ba] cursor-pointer" onClick={() => navigate("/passwordReset")}>Forgot password?</p>
    </div>
    <div className="flex flex-col space-y-5 w-full">
      <button type="submit" className="w-full flex items-center justify-center bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]" style={{cursor: isLoading ? "not-allowed" : "pointer"}}>
        {isLoading && (<svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>)}
        {isLoading ? "Processing" : "Log In"}
      </button>
     


      <div className="flex items-center justify-center border-t-[1px] border-t-slate-300 w-full relative">
        <div className="-mt-1 font-bod bg-white px-5 absolute">Or</div>
      </div>
      <button className="w-full border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200" onClick={registerNav}>Sign Up</button>
    </div>
    <div className="flex space-x-1 p-20 text-sm">
      <p className="hover:underline cursor-pointer">French</p>
      <div className="border-r-[1px] border-r-slate-300"></div>
      <p className="font-bold hover:underline cursor-pointer">English</p>
    </div>
  </div>

  <div className="w-full p-3 bg-[#F7F9FA] flex justify-center items-center space-x-3 text-[14px] font-medium text-[#666]">
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Contact Us</a>
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Privacy</a>
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Legal</a>
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Policy </a>
    <a href="##" target="_blank" className="hover:underline underline-offset-1 cursor-pointer">Worldwide </a>
  </div>
</form>
  );
}

