import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-[#792099] w-full">
      <div className="py-8 px-4 sm:px-6 lg:px-8 flex justify-between items-center max-w-screen-xl mx-auto">
        <span className="text-white">
          © +92 315 5111119, 339 5111 199 (Shop) | info@gharplans.pk
        </span>
        <div className="flex space-x-4 text-white">
          <a
            href="https://www.facebook.com/gharplanspk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com/gharplanspak"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPinterest /> {/* Replace with a Twitter icon if desired */}
          </a>
          <a
            href="https://www.instagram.com/gp_designandconstruction/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagramSquare />
          </a>
          <a
            href="https://www.pinterest.com/gpdesignandconstruction/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaPinterest />
          </a>
          <a
            href="https://www.youtube.com/c/GharPlansPakistan"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
