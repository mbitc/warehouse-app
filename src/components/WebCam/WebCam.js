import React, { useEffect, useRef } from 'react';
import { streamUserCam } from '../../util/VideoCam/VideoCam';

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
      <video ref={videoRef}></video>
    </div>
  );
};

export default WebCam;
