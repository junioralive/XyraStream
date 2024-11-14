import Image from "next/image";
import styles from "./ProviderCard.module.css";

const ProviderCard = ({ data }) => {
  return (
    <div className={styles.card}>
      <h1 className="text-[#ffffffbd] text-lg font-['Rubik'] font-medium mt-2 z-[2] relative">
        {data?.text}
      </h1>

      <div className="mt-4 flex justify-center items-center w-full relative z-[2]">
        <Image
          src={data?.image[0]} // Only the first image is displayed
          alt={data.text}
          width={100}
          height={100}
          quality={20}
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};

export default ProviderCard;
