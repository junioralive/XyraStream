import { useWatchContext } from '@/context/Watch';
import VideoPlayerContainer from './VideoPlayerContainer';

const VideoPlayer = ({ getInstance }) => {
  const { watchInfo, MovieInfo } = useWatchContext()
  // return <VideoPlayerContainer getInstance={getInstance} />;
  return watchInfo?.iframe ?
    <iframe
      src={watchInfo?.url}
      className="aspect-video"
      allowFullScreen
      loading="lazy"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title={MovieInfo?.title || MovieInfo?.name || MovieInfo?.original_name || MovieInfo?.original_title}
    />
    : <VideoPlayerContainer getInstance={getInstance} />;
};

export default VideoPlayer;
