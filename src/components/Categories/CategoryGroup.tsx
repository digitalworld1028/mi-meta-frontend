import './category.style.scss';
import { Row, Col } from 'react-bootstrap';
import { CategoryHomeItem } from './';

const CategoryGroup = () => {
  return (
    <div className="category-group">
      <h1 className="title mt-2">
        EXPLORE NFT BY
        <strong> CATEGORY</strong>
      </h1>
      <Row>
        <Col md={12} lg={10} className="m-auto">
          <Row>
          <Col md={4}  sm={6} xs={12}>
            <CategoryHomeItem id={1} title="Art" />
          </Col>
          <Col md={4} sm={6} xs={12}>
            <CategoryHomeItem id={2}  title="Music"/>
          </Col>
          <Col md={4} sm={6} xs={12}>
            <CategoryHomeItem id={3}  title="Photography"/>
          </Col>
          <Col md={4}  sm={6} xs={12}>
            <CategoryHomeItem id={4}  title="Utility"/>
          </Col>
          <Col md={4}  sm={6} xs={12}>
            <CategoryHomeItem id={5}  title="Collectable"/>
          </Col>
          <Col md={4}  sm={6} xs={12}>
            <CategoryHomeItem id={6}  title="Domain names"/>
          </Col>
            {/* {new Array(6).fill(1).map((item: number, key: number) => {
              return (
                <Col md={4} key={key} sm={6} xs={12}>
                  <CategoryItem id={key + 1} />
                </Col>
              );
            })} */}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export { CategoryGroup };
