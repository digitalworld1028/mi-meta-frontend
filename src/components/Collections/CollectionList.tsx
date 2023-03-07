import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CollectionListItem } from './CollectionListItem';
import './collections.style.scss';

function CollectionList() {
  return (
    <Container className="collection-list p-3">
      <h1 className="title mt-3">
        Top collections <span className="font-bold">this week</span>
      </h1>
      <Container className="p-4">
        <Row>
          <Col md={4} sm={12} xs={12}>
            <CollectionListItem />
            <CollectionListItem />
            <CollectionListItem />
            <CollectionListItem />
          </Col>
          <Col md={4} sm={12} xs={12}>
            <CollectionListItem />
            <CollectionListItem />
            <CollectionListItem />
            <CollectionListItem />
          </Col>
          <Col md={4} sm={12} xs={12}>
            <CollectionListItem />
            <CollectionListItem />
            <CollectionListItem />
            <CollectionListItem />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export { CollectionList };
