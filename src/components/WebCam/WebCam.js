import React, { useEffect, useRef } from 'react';
import { streamUserCam } from '../../util/VideoCam/VideoCam';
import style from './WebCam.module.scss';

const WebCam = () => {
  let videoRef = useRef(null);

  const getUserVideo = async () => {
    const stream = await streamUserCam();
    let video = videoRef.current;
    video.srcObject = stream;
    video.play();
  };

  useEffect(() => {
    getUserVideo();
  }, [videoRef]);

  return (
    <div>
      <video className={style.videoSize} ref={videoRef}></video>
    </div>
  );
};

export default WebCam;
