import { Row, Col, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChooseType = () => {
  return (
    <Row className="justify-content-center mt-5">
      <Col lg={9}>
        <h1>Choose Type</h1>
        <p>
          Choose “Single” for one of a kind or “Multiple” if you want to sell one collectible
          multiple times
        </p>
        <Row className="create-type">
          <Col lg={4} md={6} sm={12}>
            <Link to="/create/create">
              <Card>
                <Card.Body className="m-auto text-center mb-5">
                  <h1>Single</h1>
                  <Image src={`/icons/erc721-logo.png`} className="mt-4" />
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Link to="/create/create">
              <Card>
                <Card.Body className="m-auto text-center mb-5">
                  <h1>Editions</h1>
                  <Image src={`/icons/erc1155-logo.png`} className="mt-4" />
                  {/* <Image src={`/icons/erc1155-logo.png`} className="mt-4" />
                  <Image src={`/icons/erc1155-logo.png`} className="mt-4" /> */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Link to="/create/collection">
              <Card>
                <Card.Body className="m-auto text-center mb-5">
                  <h1>Collection</h1>
                  <Image src={`/icons/collection.png`} className="mt-4" />
                  {/* <Image src={`/icons/erc1155-logo.png`} className="mt-4" />
                  <Image src={`/icons/erc1155-logo.png`} className="mt-4" /> */}
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export { ChooseType };
