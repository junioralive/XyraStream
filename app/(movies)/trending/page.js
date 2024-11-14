"use client";
import Movies from "@/content/trending/Movies";
import { Fragment } from "react";
import { useSearchParams } from "next/navigation";

const Providers = [
  { key: 8, value: "NETFLIX" }, 
  { key: 350, value: "Apple TV Plus" }, 
  { key: 531, value: "Paramount Plus" }, 
  { key: 15, value: "Hulu" }, 
  { key: 1899, value: "HBO Max" }, 
  { key: 337, value: "Disney Plus" }, 
  { key: 387, value: "Peacock Premium" }, 
  { key: 584, value: "Discovery+" }, 
  { key: 9, value: "Amazon Prime Video" }
];

const Page = () => {
  const searchParams = useSearchParams();
  const providerParam = searchParams.get("provider");

  // Find provider name based on the provider key in the URL
  const providerName = Providers.find((p) => p.key === parseInt(providerParam))?.value || "Trending";

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[96rem] relative">

          {/* small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]"></div>

          <div className="mt-[15px] flex justify-between items-center">
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins']">
              Trending on {providerName}
            </h1>
          </div>

          <div className="flex gap-4 mt-4 mb-32 max-[780px]:flex-col">
            <Movies />
          </div>

        </div>
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
      <div></div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default Page;
