import { FaHeart } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="bg-[#242735b3] border-t-[1px] border-[#39374b] text-[.9rem] text-[#bac1cd] w-full h-auto py-4 flex flex-col md:flex-row items-center justify-between px-6 md:px-[12rem] text-center md:text-left">
      
      <div className="mb-2 md:mb-0">
        Xyra does not store any files on our server, we only linked to the media which is hosted on 3rd party services.
      </div>
      
      <div className="flex items-center gap-2">
        Made with <FaHeart /> by JuniorAlive
      </div>

    </div>
  );
};

export default Footer;
