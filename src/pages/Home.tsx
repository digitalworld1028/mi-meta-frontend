import React, { useEffect } from 'react';
import {Row } from 'react-bootstrap';
import * as components from '../components';
import { CategoryGroup } from '../components';
import {getCollectionSide} from '../redux/reducers/collection'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import axios from 'axios';
import 'react-multi-carousel/lib/styles.css';
import '../styles/home.scss';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

// export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    // dispatch({ type: 'GET_COLLECTION', value: [{aaa:"aaa"}] });
    // console.log(getCollection());
      dispatch(getCollectionSide());
    
  }, [])

  return (
    <Row className="home">
      <components.Landing />
      <components.TopShelfDrops />
      <components.CollectionList />
      <components.UpcomingDrops />
      <CategoryGroup />
    </Row>
  );
};

export { Home };
