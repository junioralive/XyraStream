import EpisodeSelector from "@/content/watch/EpisodeSelector/EpisodeSelector"
import MainVideo from "@/content/watch/MainVideo/MainVideo"
import './watch.css'
import MovieInfos from "@/content/watch/MovieInfo/MovieInfo"
import Rating from "@/content/watch/MovieInfo/Rating"
import { WatchAreaContextProvider } from "@/context/Watch"
import { WatchSettingContextProvider } from "@/context/WatchSetting"
import { Fragment } from "react"
import Comments from "@/content/watch/Comment/Comment"
import Recommendation from "@/content/watch/Recommendation/Recommendation"
import { getInfoTMDB } from "@/lib/MoviesFunctions"
import MovieNotFound from "@/components/errors/MovieNotFound"



const Watch = async ({ params, searchParams }) => {
  const { id: MovieId } = params
  const { media_type } = searchParams

  const MovieInfo = await getInfoTMDB(MovieId, media_type)
  // Check if there's an error fetching the media type

  if (MovieInfo === "media_type_error") {
    return <MovieNotFound />
  }

  // Handle the case where MovieInfo is null (error during fetching)
  if (!MovieInfo) {
    return (
      <div>
        <h1>Error loading media</h1>
        <p>There was a problem fetching the media information. Please try again later.</p>
      </div>
    );
  }

  return MovieInfo ?
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[106px]">
        <div className="w-full max-w-[96rem]">
          {/* container div in this context ⬇ ⬇ */}
          <WatchSettingContextProvider>
            <WatchAreaContextProvider MovieInfo={MovieInfo} MovieId={MovieId} >
              <EpisodeSelector />
              <MainVideo />
            </WatchAreaContextProvider>
          </WatchSettingContextProvider>

          <div className="mt-20 flex gap-44">
            <MovieInfos info={MovieInfo} />
            <Rating info={MovieInfo} />
          </div>

          <div className="flex mb-5 gap-5 max-[1125px]:flex-col mt-24">
            <Comments MovieId={MovieId} title={MovieInfo?.title} />
            <Recommendation MovieId={MovieId} type={MovieInfo?.type} />
          </div>

        </div>
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="absolute max-[737px]:fixed w-[500px] h-[370.13px] right-[50%] bottom-[-25%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </Fragment>

    : <MovieNotFound />
}

export default Watch