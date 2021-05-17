import React, {useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store'

import {setModalMount} from './store/modal'
import {setModalMount2} from './store/modal2'

const store = configureStore();

const Root = () => {
  const modalMooringRef = useRef(null)
  const modalMooringRef2 = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setModalMount(modalMooringRef.current))
  }, [dispatch])

  useEffect(() => {
    dispatch(setModalMount2(modalMooringRef2.current));
  }, [dispatch]);

  return (
    <>
    <App />
    <div ref={modalMooringRef} className='modal'/>
    <div ref={modalMooringRef2} className='modal2'/>
  
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
