'use client';

import { getEpisodes } from '@/lib/TVfunctions';
import { useSearchParams } from 'next/navigation';
import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';

export const WatchAreaContext = createContext();

export function WatchAreaContextProvider({ children, MovieInfo, MovieId }) {
  const searchparam = useSearchParams();

  const [episode, setEpisode] = useState(parseInt(searchparam.get('ep')) || 1);
  const [season, setSeason] = useState(parseInt(searchparam.get('se')));
  console.log(season);
  const [watchInfo, setWatchInfo] = useState({ loading: true });
  const [episodes, setEpisodes] = useState([]);
  const [episodeLoading, setEpisodeLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const watchdata = episodes.find(item => item.episode_number === episode);
        setWatchInfo(prev => ({ ...prev, watchdata }));
      } catch (error) {
        handleError(error, isMounted);
      }
    };

    if (MovieInfo?.type !== "tv") {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episode]);

  useEffect(() => {
    if (!MovieInfo || MovieInfo.type !== "tv") return; // Only proceed if it's a TV type

    setEpisodeLoading(true); // Start loading state

    const fetchData = async () => {
      try {
        const episodeData = await getEpisodes(MovieId, season);

        if (!episodeData) {
          handleNoEpisodeFound();
          return;
        }

        setEpisodes(episodeData.episodes);
      } catch (error) {
        handleError(error);
      } finally {
        setEpisodeLoading(false); // Stop loading state in either case
      }
    };

    fetchData();
  }, [MovieInfo, MovieId, season]);

  const handleNoEpisodeFound = () => {
    setWatchInfo({ loading: false });
    toast(`No episodes found`);
  };

  const handleError = (error, isMounted) => {
    console.error('Failed to fetch watch data:', error);
    if (isMounted) {
      setWatchInfo({ loading: false, error: 'Failed to fetch data' });
      toast('Failed to fetch data');
    }
  };

  const contextValue = useMemo(() => ({
    episode,
    watchInfo,
    setWatchInfo,
    setEpisode,
    episodes,
    MovieInfo,
    MovieId,
    season,
    setSeason,
    episodeLoading,
    setEpisodeLoading
  }), [
    episode,
    watchInfo,
    setWatchInfo,
    setEpisode,
    episodes,
    MovieInfo,
    MovieId,
    season,
    setSeason,
    episodeLoading,
    setEpisodeLoading
  ]);

  return (
    <WatchAreaContext.Provider value={contextValue}>
      {children}
    </WatchAreaContext.Provider>
  );
}

export function useWatchContext() {
  return useContext(WatchAreaContext);
}
