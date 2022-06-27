import { useState, useEffect } from 'react'
import { AiFillWarning } from 'react-icons/ai'

import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {

  let list = localStorage.getItem('list');

  if (list) {

    return JSON.parse(localStorage.getItem('list'));

  } else {

    return [];

  }
}

const App = () => {

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const showAlert = (show = false, msg = '', type = '') => {

    setAlert({ show, msg, type });

  }

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name) {

      showAlert('true', 'Please enter some input', 'danger')

    } else if (name && isEditing) {

      setList(list.map((item) => {

        if (item.id === editID) {

          return { ...item, title: name }

        } else {

          return item;

        }

      }));

      setName('');
      setEditID(null);
      setIsEditing(false);
      showAlert(true, 'Item edited successfully', 'success');

    } else {

      const newItem = {

        id: new Date().getTime().toString(),
        title: name

      };

      showAlert('true', 'Item added to the list', 'success');

      setList([...list, newItem]);

      setName('');

    }

  };

  const removeAllItems = () => {

    setList([]);

    showAlert('true', 'All items removed successfully', 'success');

  };

  const removeIndivudualItem = (id) => {

    showAlert(true, 'Item removed successfully', 'success');

    setList(list.filter((item) => {

      return item.id !== id;

    }));

  };

  const editItem = (id) => {

    const specificItem = list.find((item) => {

      return item.id === id;

    });

    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);

  }

  useEffect(() => {

    localStorage.setItem('list', JSON.stringify(list));

  }, [list]);

  return (
    <>
      <section className="section-center">

        <form className='grocery-form' onSubmit={handleSubmit}>

          {alert.show && <Alert {...alert} dispALertForTwoSeconds={showAlert} list={list} />}

          <h3>Grocery Bud</h3>

          <div className="form-control">
            <input
              type="text"
              className='grocery'
              placeholder='type your grocery...'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type='submit' className='submit-btn'>{isEditing ? 'edit' : 'submit'}</button>
          </div>

        </form>

        {list.length > 0 ? <div className="grocery-container">
          <List items={list} removeIndivudualItem={removeIndivudualItem} editItem={editItem} />
          <button className='clear-btn' onClick={removeAllItems}>Remove All Items</button>
        </div> : <p className='no-item'><AiFillWarning className='warning' /><span>No Items found. Please add some.</span></p>}

      </section>
    </>
  );
}

export default App;