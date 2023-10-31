export const streamUserCam = async () => {
  return await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'user' },
  });
};
export const streamEnviromentCam = async () => {
  return await navigator.mediaDevices.getUserMedia({
    video: { facingMode: 'environment' },
  });
};
