import { AnimatePresence, motion } from 'framer-motion';
import LoadingVideo from '@/components/loadings/loadingVideo/loadingVideo';
import { useWatchContext } from '@/context/Watch';
import { useWatchSettingContext } from '@/context/WatchSetting';
import MainVideoPlayer from './MainVideoPlayer';

const VideoPlayerContainer = () => {
  const { watchInfo, MovieInfo } = useWatchContext();
  const { watchSetting, setWatchSetting } = useWatchSettingContext();

  return (
    <>
      <div className='z-30'>
        {watchInfo?.loading ? (
          <LoadingVideo />
        ) : (
          <MainVideoPlayer videoInfo={watchInfo} movieInfo={MovieInfo} />
        )}
      </div>

      <AnimatePresence>
        {watchSetting?.light ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed top-0 left-0 w-full h-full z-20 bg-[#000000e5]'
            onClick={() => setWatchSetting(prev => ({ ...prev, light: false }))}
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default VideoPlayerContainer;
