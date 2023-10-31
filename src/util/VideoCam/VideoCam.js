export const streamUserCam = async () => {
  return await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user' },
  });
};
