import WebCam from '../WebCam/WebCam';
import style from './ImgInputPhoto.module.scss';

const ImgInputPhoto = ({ show, closeImgCamModal }) => {
  return (
    <dialog className={style.videoWrapp} open={show}>
      <button className='delete' onClick={closeImgCamModal} />
      <WebCam />
    </dialog>
  );
};
export default ImgInputPhoto;
