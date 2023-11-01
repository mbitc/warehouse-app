import React, { useEffect, useRef } from 'react';
import { streamUserCam } from '../../util/VideoCam/VideoCam';
import style from './WebCam.module.scss';

const WebCam = ({ videoOn }) => {
  let videoRef = useRef(null);

  const getUserVideo = async () => {
    const stream = await streamUserCam();
    let video = videoRef.current;
    video.srcObject = stream;
    video.play();
  };

  const stopVideoOnly = async () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (videoOn) {
      getUserVideo();
    } else {
      stopVideoOnly();
    }
  }, [videoRef, videoOn]);

  return (
    <div>
      <video className={style.videoSize} ref={videoRef}></video>
    </div>
  );
};

export default WebCam;
