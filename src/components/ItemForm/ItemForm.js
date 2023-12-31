import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../config';
import style from './ItemForm.module.scss';
import ImgInputPhoto from '../ImgInputPhoto/ImgInputPhoto';

const ItemForm = ({ show, onCloseModal, data }) => {
  const { id } = useParams();

  const itemObj = {
    catalogId: Number(id),
    name: '',
    description: '',
    img: '',
    code: '',
    price: '',
    qty: '',
  };

  const [catalogs, setCatalogs] = useState([]);
  const [newItem, setNewItem] = useState(itemObj);
  const [imgModal, setImgModal] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    if (data) {
      setNewItem(data);
    }
  }, [data, show]);

  useEffect(() => {
    axios
      .get(`${API_URL}/catalogs`)
      .then((res) => setCatalogs(res.data))
      .catch((err) => toast.error(err.message));
  }, []);

  const catalogsListElement = catalogs.map((catalog) => {
    return (
      <option key={catalog.id} value={catalog.id} name='catalogId'>
        {catalog.name}
      </option>
    );
  });

  const manageItemHandler = (e) => {
    e.preventDefault();
    if (data) {
      axios
        .patch(`${API_URL}/products/${newItem.id}`, newItem)
        .then((res) => {
          toast.success(`Item ${newItem.name} is updated ${res.statusText}`);
          closeModalHandler();
        })
        .catch((err) => toast.error(err.message));
    } else {
      if (!newItem.img) {
        const imgPath = `https://placehold.co/350x240/grey/white?font=oswald&text=${newItem.name.toLowerCase()}`;
        const newItemWithImg = { ...newItem, img: imgPath };
        axios
          .post(`${API_URL}/products`, newItemWithImg)
          .then((res) => {
            toast.success(`Item ${newItem.name} is ${res.statusText}`);
            closeModalHandler();
          })
          .catch((err) => toast.error(err.message));
      } else {
        axios
          .post(`${API_URL}/products`, newItem)
          .then((res) => {
            toast.success(`Item ${newItem.name} is ${res.statusText}`);
            closeModalHandler();
          })
          .catch((err) => toast.error(err.message));
      }
    }
  };

  const inputsHandler = (e) => {
    const { value, name } = e.target;
    if (
      name === 'catalogId' ||
      name === 'code' ||
      name === 'price' ||
      name === 'qty'
    ) {
      setNewItem((prevState) => ({ ...prevState, [name]: Number(value) }));
    } else {
      setNewItem((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const closeModalHandler = () => {
    setNewItem(itemObj);
    onCloseModal();
  };

  const closeImgModalHandler = () => setImgModal(false);

  const fileSelectHandler = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg, image/png';
    input.click();

    input.addEventListener('change', async (e) => {
      const selectedFile = e.target.files[0];
      setImgModal(true);
      setImgFile(selectedFile);
    });
  };

  const addImgUrlHandler = (uuid) => {
    setNewItem((prevState) => ({
      ...prevState,
      img: `https://ucarecdn.com/${uuid}/-/scale_crop/300x300/-/format/auto/-/quality/smart/`,
    }));
    setImgModal(false);
  };

  return (
    <dialog className='form-modal' open={show}>
      <h2>{data ? 'Edit Item' : 'Create New Item'}</h2>
      <form>
        <div className='form-control'>
          <label htmlFor='catalogId'>Catalogs</label>
          <select
            type='number'
            id='catalogId'
            name='catalogId'
            value={newItem.catalogId}
            onChange={inputsHandler}
          >
            {catalogsListElement}
          </select>
        </div>
        <div className='form-control'>
          <label htmlFor='name'>Title</label>
          <input
            type='text'
            id='name'
            name='name'
            value={newItem.name}
            onChange={inputsHandler}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='description'>Item Description</label>
          <textarea
            id='description'
            name='description'
            value={newItem.description}
            onChange={inputsHandler}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='img'>Item Image</label>
          <div className={style.inBtnBox}>
            <input
              type='url'
              id='img'
              name='img'
              value={newItem.img}
              onChange={inputsHandler}
            />
            <button
              className='folder'
              type='button'
              onClick={fileSelectHandler}
            />
          </div>
        </div>
        <div className='form-control'>
          <label htmlFor='code'>Code</label>
          <input
            type='number'
            id='code'
            name='code'
            value={newItem.code}
            onChange={inputsHandler}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='price'>Price</label>
          <input
            type='number'
            id='price'
            name='price'
            value={newItem.price}
            onChange={inputsHandler}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='qty'>Qty</label>
          <input
            type='number'
            id='qty'
            name='qty'
            value={newItem.qty}
            onChange={inputsHandler}
          />
        </div>
        <button className='btn' type='submit' onClick={manageItemHandler}>
          {data ? 'Save' : 'Create'}
        </button>
      </form>
      <button className='btn' onClick={closeModalHandler}>
        Close
      </button>
      <ImgInputPhoto
        show={imgModal}
        closeImgModal={closeImgModalHandler}
        imgFile={imgFile}
        addImgUrl={addImgUrlHandler}
      />
    </dialog>
  );
};

export default ItemForm;
