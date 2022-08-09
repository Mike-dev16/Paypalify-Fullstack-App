import logo from '../../images/logo.png';
import MobileNav from "./MobileNav";
import { useNavigate } from "react-router-dom";


export default function DesktopNav({user, handleLogout}) {
    const navigate = useNavigate();
  
    const handleSignIn = () => {
    navigate('/login');
    };

     const handleSignUp = () => {
    navigate('/register');
    };


  return (
    <>
      <div className="md:hidden">
        <MobileNav user={user} handleLogout={handleLogout}/>
      </div>

      <section
        className="px-40 bg-white absolute w-full font-main hidden md:block z-40"
        style={{ height: "66px" }}
      >
        <div className="flex items-center h-full justify-between">
          <div>
            <img
              src={logo}
              alt="PayPal Logo"
              width={120}
              height={30}
            />
          </div>

          <div>
            <p className="text-primary text-xxs opacity-80 tracking-tight font-bold">
              PERSONAL
            </p>
          </div>


          <div style={{ fontSize: "14px" }}>
            {user ? (
              <>
              <span className="text-primary mr-5 opacity-80 tracking-tight font-bold" style={{color: "#3b7bb7"}}>Hi {`${user.name.charAt(0).toUpperCase()}${user.name.slice(1).toLowerCase()}!`}</span>
               <button
                onClick={handleLogout}
                className=" pointer-cursor text-primary font-bold text-xxs border border-primary rounded-full px-5 py-2"
              >
                Log Out
              </button>
            </>
            ) : (
            <>
              <button
              onClick={handleSignIn}
              className="tracking-tighter mr-4 font-bold text-secondary border border-primary rounded-full py-2 px-5"
            >
              Log In
            </button>
             <button
              onClick={handleSignUp}
              className="tracking-tighter mr-4 font-bold text-secondary border border-primary rounded-full py-2 px-5"
            >
              Sign Up
            </button>
            </>
            )}
            
          </div>
        </div>
      </section>
    </>
  );
}