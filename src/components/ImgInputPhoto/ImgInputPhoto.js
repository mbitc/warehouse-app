import WebCam from '../WebCam/WebCam';

const ImgInputPhoto = ({ show }) => {
  return (
    <dialog className='form-modal' open={show}>
      <WebCam />
    </dialog>
  );
};
export default ImgInputPhoto;
