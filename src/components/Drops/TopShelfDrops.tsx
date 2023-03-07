import React, {useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { DropItem } from './DropItem';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import {getCollectionSide} from '../../redux/reducers/collection';

import './drops.style.scss';

const TopShelfDrops = () => {
  const dispatch = useAppDispatch();
  const collectionStore = useAppSelector(state => state.collection);

  useEffect(()=> {
    if (collectionStore.collection.length == 0 ) {
      dispatch(getCollectionSide());
    }
  }, [])

  return (
    <Container className="top-shelf-drops p-5">
      <h1 className="title">
        <span className="font-bold">Top Shelf</span> Drops
      </h1>
      <Row className="mt-5">
        <Col md={12} lg={10}>
          <Row>
            {collectionStore.collection.filter((e) => !e.hide).map((item, key: number) => {
              if (key < 4) {
                return <Col md={6} sm={6} lg={4}>
                  <DropItem id={1} title={item.name} description={item.description} img={`https://${item.collectionImg.cid}.ipfs.dweb.link/${item.collectionImg.name}`} />
                </Col>;
              }
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export { TopShelfDrops };
