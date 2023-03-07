import { Navbar, Offcanvas, NavDropdown, Form, FormControl, Nav, Button } from 'react-bootstrap';
import useMetaMask from '../../hooks/metamask';
import { injected } from '../wallet/connectors';
import './sidebar.style.scss';


const Sidebar = ({ show, setShow }: { show: boolean; setShow: (f: boolean) => void }) => {

  const {connect, disconnect, isActive, account} = useMetaMask()!;

  return (
    <>
    <Navbar.Offcanvas
      show={show}
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
      placement="end"
      className="sidebar"
    >
      <Offcanvas.Header closeButton onHide={() => setShow(false)}>
        <div style={{display:'flex'}}>
          <img src="/icons/wallet.png" className="ps-4"/>
          <Offcanvas.Title id="offcanvasNavbarLabel" style={{color:'white'}}>My Wallet</Offcanvas.Title>
        </div>
      </Offcanvas.Header>
      <p className="px-4 mt-3 text-light">
        Connect with an available wallet provider to get started.
      </p>
      <p className="px-4 text-light">
        First time setting up a wallet?
      </p>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link  className="wallet-item" onClick={connect}><img src="/icons/metamask.png" width={30} /><span className="ps-3 text-light">MetaMask</span></Nav.Link>
          <Nav.Link href="#action2" className="wallet-item"><img src="/icons/coinbase.png" width={30}/><span className="ps-3 text-light">Coinbase</span></Nav.Link>
          <Nav.Link href="#action2" className="wallet-item"><img src="/icons/trust wallet.png" width={30}/><span className="ps-3 text-light" >Trust Wallet</span></Nav.Link>
          <Nav.Link href="#action2" className="wallet-item"><img src="/icons/phantom.png" width={30}/><span className="ps-3 text-light">Phantom</span></Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
    </>
  );
};

// export { Sidebar };
export default Sidebar;
