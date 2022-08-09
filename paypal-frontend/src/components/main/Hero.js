import hero_img from "../../images/hero_img.jpeg";
import hero_img_mobile from "../../images/hero_img_mobile.jpeg";
import { useNavigate } from "react-router-dom";


export default function Hero({user}) {
    const navigate = useNavigate();

   const handleSignUp = () => {
    navigate('/register');
    };

  return (
    <section className="relative w-full font-main">
      <div className="h-xl relative hidden md:block">
        <img
          layout="fill"
          src={hero_img}
          alt="hero"
          placeholder="blur"
        />
      </div>

      <div className="relative h-96 md:hidden">
        <img src={hero_img_mobile} layout="fill" alt="hero" />
      </div>

      {/* HERO TEXT  */}
      <div className="absolute top-28 md:top-52  text-white w-full text-center">
        <h2
          className="font-light hidden md:block"
          style={{
            fontSize: "3.15714286rem",
          }}
        >
          We’ve got you covered.
        </h2>

        <h2 className="md:hidden font-light text-4xl mb-8">
          The simpler, safer <br /> way to pay online.
        </h2>

        <p
          className="font-semibold my-5 opacity-90 hidden md:block"
          style={{ fontSize: "15px" }}
        >
          We can reimburse you if something’s not right. Shop with peace of
          mind, we protect your eligible purchases. If your <br /> order doesn’t
          arrive or isn’t as the seller described, we can help you get your
          money back.
        </p>

        <button className="hidden md:inline-block  w-1/3 bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]">Learn More</button>


          {!user ? ( 
            <>
               <button className="cursor-pointer md:hidden w-2/3 bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]" onClick={handleSignUp}>Sign up for Free</button>
              <p className="md:hidden text-xxs font-semibold">
                Own a business? Open a Business account.
              </p>
            </>
          ) : (
             <button className="md:hidden w-2/3 bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]" disabled>Hi {`${user.name.charAt(0).toUpperCase()}${user.name.slice(1).toLowerCase()}!`}</button>
          )}
      </div>
    </section>
  );
}