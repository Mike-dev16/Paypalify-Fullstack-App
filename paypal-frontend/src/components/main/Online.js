import online_img from "../../images/online_img.jpg";
import { useNavigate } from "react-router-dom";


export default function Online() {
const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
    }; 

  return (
    <section
      className="font-main text-primary text-center pb-20 py-20 px-10"
    >
      <h2 className="text-3xl md:text-4xl font-light mb-10">
        PayPal is for everyone <br className="md:hidden" /> who pays online.
      </h2>

      <div className="flex justify-center items-center">
        <img src={online_img} alt="avatar" />
      </div>

      <h3 className="mt-3 text-2xl">Individuals</h3>

      <p className="text-xxs font-semibold mt-4 mb-6 md:mb-0">
        Find out why we have more than 200M active accounts worldwide.
      </p>

    <button className="w-2/3 md:w-1/3 mt-5 border-blue-900 hover:border-[#003087] hover:border-[2px] border-[1px] rounded-3xl p-3 text-[#0070ba] font-bold transition duration-200" onClick={handleSignUp}>Learn More</button>
    </section>
  );
}