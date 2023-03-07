import { Link, Outlet } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import '../styles/settings.scss';
// import { ProfileSetting } from '../components';

const Settings = () => {
  // let { path, url } = useRouteMatch();
  return (
    <Container className="settings mb-5" fluid>
      <Row>
        <Col lg={3}>
          <h1 className="underline text-dark-light">Settings</h1>
          <Nav defaultActiveKey="link-0" className="flex-column">
            <Nav.Link as="span" eventKey="link-0">
              <Link to="profile" className="nav-link text-dark-light">
                Profile Settings
              </Link>
            </Nav.Link>
            <Nav.Link as="span" eventKey="link-1">
              <Link to={`communication`} className="nav-link text-dark-light">
                Communications
              </Link>
            </Nav.Link>
            <Nav.Link as="span" eventKey="link-2">
              <Link to="security" className="nav-link text-dark-light">
                Security
              </Link>
            </Nav.Link>
          </Nav>
          {/* <Nav defaultActiveKey="/home" className="flex-column">
            <Link to="profile" className="nav-link active">
              Profile Settings
            </Link>
            <Link to={`communication`}>Communications</Link>
            <Link to="security" className="nav-link">
              Security
            </Link>
            <Link to="security" className="nav-link">
              Support
            </Link>
          </Nav> */}
        </Col>
        <Col lg={9} className="settings-body">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export { Settings };
