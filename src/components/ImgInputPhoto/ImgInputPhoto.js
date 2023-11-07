import style from './ImgInputPhoto.module.scss';

const ImgInputPhoto = ({ show, closeImgCamModal, imgFile }) => {
  if (!imgFile) {
    return null;
  }
  const fileUrl = URL.createObjectURL(imgFile);
  return (
    <dialog className={style.imgWrapp} open={show}>
      <img src={fileUrl} alt='pic' width='300px' />
      <button className='delete' onClick={closeImgCamModal} />
    </dialog>
  );
};
export default ImgInputPhoto;
