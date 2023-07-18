import Plyr from "plyr-react";
import "plyr-react/plyr.css"
import videos from "~/component/assets/video";
import images from "~/component/assets/images";

const url = videos.video1;
const poster = images.cartLocation1;
const videoSrc = {
  type: "video",
  sources: [
    {
      src: url,
      type: 'video/mp4',
      size: 1080,
    }
  ]
};

const videoOption = {
  controls: ['rewind', 'play-large', 'fast-forward', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
  poster: poster
}

function PlyrComponent() {
  return (
    <>
      <Plyr source={videoSrc}  options={videoOption}/>
    </>
  );
}

export default PlyrComponent;
