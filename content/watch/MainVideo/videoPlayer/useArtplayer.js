/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import Artplayer from 'artplayer';
import artplayerPluginHlsQuality from 'artplayer-plugin-hls-quality';
import artplayerPluginChapter from 'artplayer-plugin-chapter';
import { useWatchContext } from '@/context/Watch';
import { useWatchSettingContext } from '@/context/WatchSetting';
import { SaveProgress } from '@/utils/saveProgress';


const useArtplayer = (getInstance) => {
  const { setEpisode, watchInfo, episode, animeid, AnimeInfo } = useWatchContext();
  const { watchSetting } = useWatchSettingContext();
  const artRef = useRef();


  useEffect(() => {
    const initializeArtPlayer = () => {
      const M3U8Url = `https://m3-u8-proxy-iota.vercel.app/m3u8-proxy?url=${encodeURIComponent(watchInfo?.server)}&headers=${encodeURIComponent(`{"referer": "${watchInfo?.referer}"}`)}`;

      if (!M3U8Url || watchInfo?.loading) return;
      Artplayer.AUTO_PLAYBACK_TIMEOUT = 10000;

      try {
        const art = new Artplayer({
          url: "https://m3-u8-proxy-iota.vercel.app/m3u8-proxy?url=https%3A%2F%2Ftmstr.luminousstreamhaven.com%2Fstream_new%2FH4sIAAAAAAAAAw3JXVuCMBgA0L_0MoZGdxUMQ1juG7hDNvNhw0gfw_j1dW5P79DJuRO4rUW4T226idAGtmnSu.gp3pye20nfRMN_K9BGA16OE2.raNbuMn.z5vU.oDzm_uuhmlBYFKrW46gu1M.gAz1KSuXqIw5nEKO9CiCiEzfsstLI0eJe3Bbtk7sKalGBvx21Xz4K0pgpJcPlZdXwjplRV2lo4YiWNbSoXhUSwMmQBz6EDvYQ7dq43LiC5nVGYYCZ1g1hNisf_8dtzLAY6cHkXaSm88wv3b6fhqgjJLMQWNsQyVWi2WgPg_.8tkbhGs19BR53Xku7Kw2bLFYZA2e07IpwZ4YrgfLErpD.AeXozr5BAQAA%2Fmaster.m3u8&headers=%7B%22referer%22%3A%20%22https%3A%2F%2Fate60vs7zcjhsjo5qgv8.com%2F%22%7D",
          setting: true,
          theme: '#7569c8',
          autoplay: watchSetting?.autoPlay,
          playbackRate: true,
          miniProgressBar: true,
          pip: true,
          fullscreen: true,
          container: artRef.current,
          plugins: [
            artplayerPluginHlsQuality({
              control: true,
              setting: true,
              getResolution: (level) => `${level.height}P`,
              title: 'Quality',
              auto: 'Auto',
            }),

          ],
          customType: {
            m3u8: (video, url, art) => {
              if (Hls.isSupported()) {
                if (art.hls) art.hls.destroy();
                const hls = new Hls();
                hls.loadSource(url);
                hls.attachMedia(video);
                art.hls = hls;
                art.on('destroy', () => hls.destroy());
              } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                video.src = url;
              } else {
                art.notice.show = 'Unsupported playback format: m3u8';
              }
            }
          },
        });

        art.on('loading', () => {
          const loading = art.template.$loading;
          loading.innerHTML = '';
          const customLoading = document.createElement('div');
          customLoading.className = 'i';
          customLoading.innerHTML = '<div></div><div></div>';
          loading.appendChild(customLoading);
        });

        art.on('video:ended', () => {
          if (watchSetting.autoNext) {
            setEpisode(prev => prev + 1);
          }
        });




        art.on('video:timeupdate', throttledSaveProgress);


        art.on('ready', () => {
          const watch_history = JSON.parse(localStorage?.getItem("watch_history"));

          if (
            watch_history &&
            watch_history[animeid] &&
            watch_history[animeid].episode?.toString() === episode?.toString() &&
            watch_history[animeid].currentTime
          ) {
            const currentTime = parseInt(watch_history[animeid].currentTime, 10);
            if (!isNaN(currentTime)) {
              art.seek = currentTime;

              // art.play();
            }
          }
        });





        if (getInstance && typeof getInstance === 'function') {
          getInstance(art);
        }

        return () => {
          if (art && art.destroy) {
            art.destroy(false);
          }
        };
      } catch (error) {
        console.error('Error initializing Artplayer:', error);
      }
    };

    initializeArtPlayer();
  }, [watchInfo, watchSetting?.autoNext, getInstance]);

  return artRef;
};

export default useArtplayer;
