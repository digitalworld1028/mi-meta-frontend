import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../providers';
import { categories, LinkItem, MENUITEM } from '../../store';

import './header.style.scss';
import {
  Row,
  Image,
  Container,
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import Sidebar from '../SideBar/Sidebar';
// let isOpen = false;


const posts = [
  { id: '1', name: 'This first post is about React', image:"/images/nft/1.png", count:'199' },
  { id: '2', name: 'This next post is about Preact', image:"/images/nft/2.png", count:'32' },
  { id: '3', name: 'We have yet another React post!', image:"/images/nft/3.png", count:'134' },
  { id: '4', name: 'This is the fourth and final post', image:"/images/nft/4.png", count:'12' },
];


const filterPosts = (posts:any, inputval:any) => {
  if (!inputval) {
      return [];
  }

  return posts.filter((post:any) => {
      const postName = post.name.toLowerCase();
      return postName.includes(inputval.toLowerCase());
  });
};

function Header() {

  const { theme } = useContext(ThemeContext);
  const [searchval, setSearchval] = useState("");
  const navigate = useNavigate();
  // const [show, setShow] = useState(true);
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [menuselected, setMenuselected] = useState("");
  const [dropitem, setDropitem] = useState("all nft");
  const [userItem, setUserItem] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleProfileOpen = () => {
    setIsProfileOpen(true);
  };

  const handleProfileClose = () => {
    setIsProfileOpen(false);
  };

  const changeValue = (val:any)=>{
    setSearchval(val);
 }

  const navigate2discover = (val:any) => {
    setDropitem("all nft");
    setMenuselected(val);
    navigate('/discover-collection');
  };

  document.addEventListener('click', function () {
    handleClose();
  });

  const subitemclick = (val:any) => {
    setDropitem(val.toLowerCase());
  }

  const filteredPosts = filterPosts(posts, searchval);

  return (
    
    <Row>
      <Navbar bg={`${theme}`} variant={`${theme === 'dark' ? 'dark' : 'light'}`} expand="lg">
        <Container fluid>
          <Link to="/" className="navbar-brand" onClick={()=>setMenuselected("")}>
            <Image src="/icons/logo.svg" className="img-brand" />
            <span>mi-meta</span>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Sidebar show={show} setShow={setShow} />
          <Navbar.Collapse id="navbarScroll">
            <InputGroup className="d-flex custom-input-group">
              <InputGroup.Text id="basic-addon1">
                <Image src={`/icons/lens.svg`} />
              </InputGroup.Text>
              <FormControl
                type="search"
                placeholder="Search items and collections"
                className={theme === "dark" ? "search-input-dark":"search-input-light"}
                aria-label="Search"
                value={searchval}
                onChange = {e=> changeValue(e.target.value)}
              />
              <ul className={(theme === "dark" ? "search-action-dark ":"search-action-light ") + (searchval !== "" && filteredPosts.length>0 ? "":"d-none")} >
                    {filteredPosts.map((post:any, i:Number) => (
                        <li key={post.id} className={(theme ==="dark"? "search-action-li-dark ":"search-action-li-light ") + " d-flex justify-content-between"}>
                          <div>
                            <span>
                              <img className="search-action-li-image " src={post.image} />
                            </span>
                            <span className="ps-sm-1">
                              {post.name}
                            </span>
                          </div>
                          <div>{post.count + " items"}</div>
                        </li> 
                    ))}
              </ul>
               
              {/* <Button variant="outline-success">Search</Button> */}
            </InputGroup>
            <Nav className="me-auto pull-width" />
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '140px' }} navbarScroll>
              <NavDropdown
                as="span"
                title={
                  <Nav.Link as="span" onClick={()=>navigate2discover(MENUITEM[0])} className={menuselected==MENUITEM[0]?"selected_menu":""} >
                    Discover
                  </Nav.Link>
                }
                id="navbarScrollingDropdown"
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                show={isOpen}
              >
               
              {/* {SubMenuList.map((item: LinkItem, key: number) => {
                return (
                  <NavDropdown.Item as="span" key={key}>
                    <div className='header_menu_item'>{item.text}</div>
                  </NavDropdown.Item>
                );
              })}
              </NavDropdown> */}
                <NavDropdown.Item as="span" href="#action/3.1"  className={dropitem == "all nft"? "dropdown_item_active":""} onClick={()=>subitemclick("all nft")} >
                  <Link to="/assets">All NFT</Link>
                </NavDropdown.Item>
                {categories.map((item: LinkItem, key: number) => {
                  return (
                    <NavDropdown.Item as="span" key={key} className={dropitem == item.text.toLocaleLowerCase()? "dropdown_item_active":""}>
                      <Link to={`/discover/${item.link}`} onClick={()=>subitemclick(item.text)} >{item.text}</Link>
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <Nav.Link as="span" >
                <Link to="/activity" className={`nav-link ${menuselected === MENUITEM[1] ? "selected_menu":""}`} onClick={()=>navigate2discover(MENUITEM[1])}  >
                  Activity
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/learn" className={`nav-link ${menuselected === MENUITEM[2] ? "selected_menu":""}`} onClick={()=>navigate2discover(MENUITEM[2])}>
                  Learn
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Link to="/create" className={`nav-link ${menuselected === MENUITEM[3] ? "selected_menu":""}`} onClick={()=>navigate2discover(MENUITEM[3])}>
                  Create
                </Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Nav.Link as="span" >
                  <Link to="/profile">
                    <Image src="/icons/user.svg" />
                  </Link>
                </Nav.Link>
              </Nav.Link>
              <Nav.Link as="span">
                <Nav.Link href="#action1" onClick={() => setShow(true)}>
                  <Image src="/icons/save.svg" />
                </Nav.Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        
        </Container>
      </Navbar>
    </Row>
  );
}

export { Header };
