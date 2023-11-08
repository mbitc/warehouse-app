import { uploadFile } from '@uploadcare/upload-client';
import style from './ImgInputPhoto.module.scss';

const ImgInputPhoto = ({ show, closeImgModal, imgFile, addImgUrl }) => {
  const saveImgHangler = async () => {
    const result = await uploadFile(imgFile, {
      publicKey: 'a3ceebf59d832a68f3bc',
      store: 'auto',
      metadata: {
        subsystem: 'js-client',
      },
    });
    addImgUrl(result.uuid);
  };

  if (!imgFile) {
    return null;
  }
  const fileUrl = URL.createObjectURL(imgFile);
  return (
    <dialog className={style.imgWrapp} open={show}>
      <img src={fileUrl} alt='pic' width='200px' />
      <button className='accept' onClick={saveImgHangler} />
      <button className='delete' onClick={closeImgModal} />
    </dialog>
  );
};
export default ImgInputPhoto;
