import { Container, Row, Col, Image, Stack } from 'react-bootstrap';
import './footer.style.scss';

function Footer() {
  return (
    <Container fluid className="footer">
      <Row>
        <Col lg={6} sm={12}>
          <Row>
            <Col lg={2}>
              <Stack direction="horizontal" gap={3} className="text-light footer-brand">
                <Image src="/icons/logo.svg" width={23} height={28} />
                <>mi-meta</>
              </Stack>
            </Col>
            <Col lg={10} className="footer-items">
              <Row>
                <Col lg={6}>
                  <p className="bold text-light">Term of Use</p>
                </Col>
                <Col lg={6}>
                  <p className="bold text-light">Privacy Policy</p>
                </Col>
                <Col lg={6}>
                  <p className="bold text-light">FAQs</p>
                </Col>
                <Col lg={6}>
                  <p className="bold text-light">Contact Us</p>
                </Col>
                <Col lg={6}>
                  <p className="bold text-light">Support</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col lg={6} sm={12}></Col>
      </Row>
      <Row style={{ marginTop: '40px' }}>
        <Col className="px-5">
          <p className="bold text-light text-center">©2022 mi-meta.io</p>
        </Col>
      </Row>
    </Container>
  );
}

export { Footer };
