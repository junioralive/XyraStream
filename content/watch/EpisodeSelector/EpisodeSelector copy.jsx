"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { HiOutlineBars3 } from "react-icons/hi2";
import Select from "@/components/ui/Select";
import EpisodeCard from "./EpisodeCard";
import { useWatchContext } from "@/context/Watch";
import { SaveProgress } from "@/utils/saveProgress";

const EpisodeSelector = () => {
  const [epFromTo, setEpFromTo] = useState({ id: 0 });
  const [TFseason, setTFseason] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchedEP, setWatchedEP] = useState([]);

  const chunkSize = 15;

  const {
    episode,
    episodes,
    MovieId,
    MovieInfo,
    setSeason,
    episodeLoading,
    season
  } = useWatchContext();

  const loading = episodeLoading;

  // Sync TFseason with the current season from context
  useEffect(() => {
    if (season) {
      setTFseason({ id: season - 1, value: `Season ${season}` });
    }
  }, [season]);

  useEffect(() => {
    if (TFseason?.value) {
      const seasonNumber = parseInt(TFseason.value.replace("Season ", ""), 10);
      if (!isNaN(seasonNumber)) {
        setSeason(seasonNumber);
      }
    }
  }, [TFseason, setSeason]);

  const SplitedEpisodes = useMemo(() => {
    return episodes?.reduce((chunks, _, i) => {
      if (i % chunkSize === 0) {
        chunks.push(episodes.slice(i, i + chunkSize));
      }
      return chunks;
    }, []);
  }, [episodes]);

  useEffect(() => {
    if (!MovieId || !episode || !season) return;
  
    // Retrieve or initialize storage data for this movie or show
    const storageKey = `playing.${MovieId}`;
    const storageData = JSON.parse(localStorage.getItem(storageKey) || "{}");
  
    // Initialize season data if it doesn't exist
    if (!storageData[`season${season}`]) {
      storageData[`season${season}`] = [];
    }
  
    // Update watched episodes for the current season if not already included
    if (!storageData[`season${season}`].includes(episode)) {
      storageData[`season${season}`].push(episode);
      localStorage.setItem(storageKey, JSON.stringify(storageData));
    }
  
    // Update the watchedEP state with the episodes for the current season
    setWatchedEP(storageData[`season${season}`]);
  
    // Save progress with additional episode data if MovieInfo and episodes are available
    if (MovieInfo && episodes) {
      const thumbnail = MovieInfo.poster_path
        ? `https://image.tmdb.org/t/p/w500${MovieInfo.poster_path}`
        : `https://s4.anilist.co/file/anilistcdn/character/large/default.jpg`;
  
      const duration = episodes.find((ep) => ep.episode_number === episode)?.duration || 0;
  
      SaveProgress(
        MovieId,
        TFseason?.value,
        episode,
        0,
        thumbnail,
        duration,
        MovieInfo.title || MovieInfo.name,
        MovieInfo.type
      );
    }
  }, [MovieId, episode, MovieInfo, TFseason, episodes, season]);
  

  const handleSearchQueryChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  return (
    <div className="bg-[#201f28] w-full max-w-[22rem] EPSResponsive rounded-md flex flex-col">
      <div>
        <div className="flex justify-between px-2 py-3 border-b-2 border-[#514f61a1]">
          <div className="bg-[#2e2b3d] h-10 rounded-md">
            <input
              type="text"
              placeholder="Ep Number"
              className="bg-transparent outline-none h-full w-full px-2 text-slate-200 max-w-[13rem]"
              value={searchQuery}
              onChange={handleSearchQueryChange}
            />
          </div>

          <div className="bg-[#2e2b3d] flex gap-2 rounded-lg">
            <div className="bg-[#d5d5d7] w-10 rounded-lg flex items-center justify-center text-2xl cursor-pointer">
              <HiOutlineBars3 />
            </div>
          </div>
        </div>
        <div className="flex justify-between px-2 py-3 gap-4">
          <div className="w-full">
            <Select
              setSelected={setEpFromTo}
              data={Array.from(
                { length: SplitedEpisodes?.length ?? 0 },
                (v, i) => `${i === 0 ? 1 : i * chunkSize} - ${(i + 1) * chunkSize}`
              )}
              defaultValue={0}
            />
          </div>

          {MovieInfo?.type === "tv" && (
          <div className="w-full">
              <Select
                setSelected={setTFseason}
                data={Array.from({ length: MovieInfo?.seasons?.length || 0 }, (_, i) => `Season ${i + 1}`)}
                defaultValue={TFseason?.id}
                key={TFseason?.id} // Force re-render when TFseason changes
              />
            </div>
          )}
        </div>
      </div>

      <div className="px-2 overflow-y-scroll h-full max-h-[44rem]">
        {!loading ? (
          !searchQuery ? (
            SplitedEpisodes[epFromTo?.id]?.map((item, index) => (
              <EpisodeCard
                key={index + 1}
                info={item}
                currentEp={episode}
                watchedEP={watchedEP}
                posterImg={MovieInfo?.poster_path}
              />
            ))
          ) : (
            episodes
              .filter(
                (item) =>
                  `episode ${item.episode_number}`.includes(searchQuery.toLowerCase()) ||
                  item.name?.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").includes(searchQuery.toLowerCase())
              )
              .map((item, index) => (
                <EpisodeCard
                  key={index + 1}
                  info={item}
                  currentEp={episode}
                  watchedEP={watchedEP}
                  posterImg={MovieInfo?.poster_path}
                />
              ))
          )
        ) : (
          Array.from({ length: 7 }).map((_, index) => <EpisodeCard key={index} loading />)
        )}

        {!loading && (!episodes || episodes.length === 0) && (
          <p className="text-[#d5d5d7] text-center my-5">No episodes found</p>
        )}
      </div>
    </div>
  );
};

export default EpisodeSelector;
