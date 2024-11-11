import RecommendationCard from "@/components/Cards/HorizontalCard/HorizontalCard"
import { getRecommendation } from "@/lib/MoviesFunctions"
import { Fragment } from "react"



const Recommendation = async ({ MovieId, type }) => {
  const { results: recommendation = [] } = await getRecommendation(MovieId, type) || {};

  return (
    <div className="w-full min-[1125px]:max-w-[24rem]">
      <div className="text-[#ffffffe0] text-[18px] font-medium font-['poppins'] mb-4">Recommendation</div>

      <div className="w-full flex flex-col gap-3 max-[1125px]:grid max-[1125px]:grid-cols-[repeat(auto-fit,minmax(306px,1fr))]">
        {recommendation?.slice(0, 5)?.map((item, index) => <Fragment key={index}><RecommendationCard data={item} type={!recommendation?.results?.length <= 5 ? item?.media_type : type} /></Fragment>)}
      </div>
    </div>
  )
}

export default Recommendation