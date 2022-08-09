import { useNavigate } from "react-router-dom";

export default function FooterTop() {
  const navigate = useNavigate();

   const handleSignUp = () => {
    navigate('/register');
    };

  return (
    <section className="bg-secondary text-center py-10 md:py-20">
      <div className="container mx-auto">
        <h5 className="font-light mb-4" style={{ fontSize: "27px" }}>
          Sign up and get started
        </h5>
         <button className="w-2/3 md:w-1/3 bg-[#0070ba] rounded-3xl p-3 text-white font-bold transition duration-200 hover:bg-[#003087]" onClick={handleSignUp}>Get Started</button>

      
      </div>
    </section>
  );
}