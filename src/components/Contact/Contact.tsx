import { Row, Col, Stack, FormControl, Button, Image } from 'react-bootstrap';
import './contact.style.scss';

function Contact() {
  return (
    <Row className="contact">
      <Col lg={7} sm={12} className="px-5">
        <h1>YOU DON’T MISS A THING</h1>
        <p>
          If that’s you, then you definitely want to join our mailing list to be the first to know
          about newest drops, trending collections, and all the latest on everything mi meta!
        </p>
        <Stack direction="horizontal" gap={3}>
          <FormControl placeholder="Enter your email address" />
          <Button className="contact-sign-up">Sign me up!</Button>
        </Stack>
      </Col>
      <Col lg={4} sm={12}>
        <h1>JOIN THE CONVERSATION</h1>
        <Stack direction="horizontal" gap={3} className="join">
          <Button>
            <Image src={`/icons/discord.svg`} />
          </Button>
          <Button>
            <Image src={`/icons/twitter.svg`} />
          </Button>
          <Button>
            <Image src={`/icons/youtube.svg`} />
          </Button>
          <Button>
            <Image src={`/icons/instagram.svg`} />
          </Button>
        </Stack>
      </Col>
    </Row>
  );
}

export { Contact };
