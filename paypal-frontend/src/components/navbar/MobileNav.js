import p_logo from "../../images/p_logo.png";
import { useNavigate } from "react-router-dom";

export default function MobileNav({user, handleLogout}) {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/login');
  };

  return (
    <section className="absolute bg-white w-full z-40">
      <div className="flex justify-between items-center h-16 px-3">
        <button className="pointer-cursor text-xs font-bold text-xxs border border-primary rounded-full px-5 py-2">
          Menu
        </button>

        <div>
          <img src={p_logo} width={54} height={45} alt="logo" />
        </div>

          {user ? (
              <>
                <button
                onClick={handleLogout}
                className="pointer-cursor text-xs font-bold text-xxs border border-primary rounded-full px-5 py-2"
              >
                Log Out
              </button>
            </>
            ) : (
            <>
             <button
              onClick={handleClick}
              className="pointer-cursor text-xs font-bold text-xxs border border-primary rounded-full px-5 py-2"
            >
              Log In
            </button>
            </>
            )}
      </div>
    </section>
  );
}