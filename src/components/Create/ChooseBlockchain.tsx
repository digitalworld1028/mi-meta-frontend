import { Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ChooseBlockchain = () => {
  return (
    <Row className="justify-content-center mt-5">
      <Col lg={9}>
        <h1>Choose Blockchain</h1>
        <p>
          Select the blockchain that suits your needs best. You will be required to sign in to
          create your NFT.
        </p>
        <Row className="create-network">
          <Col lg={4} md={6} sm={12}>
            <Link to="type">
              <Card>
                <Card.Body className="m-auto text-center mb-5">
                  <h1>Ethereum</h1>
                  <Image src={`/icons/ethereum-67-107.png`} className="mt-4" />
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Link to="type">
              <Card>
                <Card.Body className="m-auto text-center mb-5">
                  <h1>Polygon</h1>
                  <Image src={`/icons/polygon-88-88.png`} className="mt-4" />
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col lg={4} md={6} sm={12}>
            <Link to="type">
              <Card>
                <Card.Body className="m-auto text-center mb-5">
                  <h1>Solana</h1>
                  <Image src={`/icons/solana-79-79.png`} className="mt-4" />
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export { ChooseBlockchain };
