import '../styles/profile.scss';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Stack, Nav, InputGroup, FormControl } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { useContext, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook'; 
import {getProfileSide} from '../redux/reducers/profile';
import { ThemeContext } from '../providers';
import { LinkItem } from '../store';
import useMetaMask from '../hooks/metamask';

const categories: LinkItem[] = [
  { text: 'My collections', link: 'collections' },
  { text: 'Favorites', link: 'favorites' },
  { text: 'Hidden', link: 'hidden' },
  { text: 'Activity', link: 'activity' },
  { text: 'Offers', link: 'offers' },
  { text: 'Listings', link: 'listings' },
  { text: 'Watchlist', link: 'watchlist' },
  { text: 'Settings', link: 'settings' },
];
const Profile = () => {
  const navigate = useNavigate();
  const profileStore = useAppSelector(state => state.profile)
  const collectionStore = useAppSelector(state => state.collection);
  const dispatch = useAppDispatch();
  const {connect, disconnect, isActive, account} = useMetaMask()!;
  useEffect(()=>{
    if (account === undefined) {
      navigate('/login')
    }
  }, [])
  useEffect(()=>{
    dispatch(getProfileSide(account));
  }, [account])
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <Container className="profile p-0" fluid>
      <Row className="profile-landing">
        <div className="profile-landing-bg" style={profileStore.profile.bannerImg.cid != "" ?{backgroundImage: `url("https://${profileStore.profile.bannerImg.cid}.ipfs.dweb.link/${profileStore.profile.bannerImg.name}")` }:{}} />
      </Row>
      <Row className="profile-intro">
        <Col md={8} className="m-auto p-4">
          <Image src={profileStore.profile.profileImg.cid != "" ? `https://${profileStore.profile.profileImg.cid}.ipfs.dweb.link/${profileStore.profile.profileImg.name}` : `/images/profile.png` } className="m-auto profile-intro-avatar" />
          <Stack>
            <h1>{profileStore.profile.username !="" ? profileStore.profile.username :  "Unnamed User"}</h1>
            <p className="bold profile-intro-address">
              <Image src={`/icons/eth.svg`} />
              {account}
            </p>
            <Stack direction="horizontal" className="mt-3">
              <p className="m-0 bold">Dark mode</p>
              <BootstrapSwitchButton
                onlabel=" "
                offlabel=" "
                checked={theme === 'dark' ? true : false}
                onChange={(checked: boolean) => {
                  console.log(checked);
                  if (setTheme) {
                    setTheme(checked ? 'dark' : 'light');
                  }
                }}
                size="xs"
              />
            </Stack>
          </Stack>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={8} className="m-auto">
          <Nav
            className="justify-content-between"
            activeKey="/home"
            onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
          >
            {categories.map((item: LinkItem, key: number) => {
              if (item.link === "settings") {
                return (
                  <Nav.Item key={key} onClick={()=>navigate('/settings')}>
                    {/* <Nav.Link>{item}</Nav.Link> */}
                    <Link to=""  className="nav-link" >
                      {item.text}
                    </Link>
                  </Nav.Item>
                );
              } else {
                return (
                  <Nav.Item key={key}>
                    {/* <Nav.Link>{item}</Nav.Link> */}
                    <Link className="nav-link" to={`${item.link}`}>
                      {item.text}
                    </Link>
                  </Nav.Item>
                );
              }
              
            })}
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col md={12} lg={8} className="m-auto profile-body">
          <Row className="mb-3">
            <Col md={5}>
              <InputGroup className="d-flex">
                <InputGroup.Text id="basic-addon1">
                  <Image src={`/icons/lens.svg`} />
                </InputGroup.Text>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </InputGroup>
            </Col>
          </Row>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export { Profile };
