import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Stack, Popover, OverlayTrigger } from 'react-bootstrap';
import {ReactComponent as Warn} from '../../assets/icons/warn.svg'
import {ReactComponent as Lock} from '../../assets/icons/lock.svg'
import {ReactComponent as Dot} from '../../assets/icons/dot.svg'
import { useDetectClickOutside } from 'react-detect-click-outside';


const CategoryItem = ({ id, type, title, description, cid, name, hide, handleSell, handleHide, handleBurn, handleProfilePicture, handleShare, handleDetail, account }: any) => {
  const navigate = useNavigate();
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );
  const [show, setShow]= useState(false);
  const [count, setCount] = useState(0);
  const openMenu = (e:any) => {
    e.preventDefault();
    e.stopPropagation()
    setShow(!show);
    setCount(Date.now());
  }
  const closeMenu = () => {
    const element = document.getElementById("menu_pop");
    if (element !== null) {
      console.log("sdf")
      setShow(false);
    }
  }
  
  const ref = useDetectClickOutside({ onTriggered: closeMenu });
  return (
    <div className="category-item">
      <Card className="text-white m-auto category-item-card">
        <Card.Img src={`https://${cid}.ipfs.dweb.link/${name}`} alt="Card image" />
          <Card.Title style={{marginTop:'-100px'}} className="px-3">{title}</Card.Title>
          <Card.Text className="px-3 mb-4 pt-3" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:"ellipsis"}}>{description}</Card.Text>
        {type==="collection" && <div className="px-3 ">
          <Stack direction="horizontal" className="align-items-center justify-content-start">
            <span className="category-item-icon" style={{width:25}}>
              <Warn />
            </span>
            <span className="category-item-icon" style={{width:25}}>
              <Lock />
            </span>
              <span className="category-item-icon" style={{width:30}} onClick={openMenu}>
                <Dot />
              </span>
            
          </Stack>
        </div>
        }
      </Card>
      {show && <div id="menu_pop" className="menu-pop px-2 py-2"  ref={ref}>
        <p className="mb-0 py-1 px-3 menu-pop-item text-dark-light" onClick={()=>handleProfilePicture(cid, name, account)}>Make profile picture</p>
        <p className="mb-0 py-1 px-3 menu-pop-item text-dark-light">Sell</p>
        <p className="mb-0 py-1 px-3 menu-pop-item text-dark-light" onClick = {() => handleHide(id)}>{!hide ? "Hide" : "Show"}</p>
        <p className="mb-0 py-1 px-3 menu-pop-item text-dark-light" onClick = {() => handleBurn(id)}>Burn</p>
        <p className="mb-0 py-1 px-3 menu-pop-item text-dark-light">Transfer</p>
        <p className="mb-0 py-1 px-3 menu-pop-item text-dark-light">Share</p>

        <a href={`https://${cid}.ipfs.dweb.link/${name}`} target="_blank" style={{textDecoration:'none'}}><p className="mb-0 py-1 px-3 menu-pop-item text-dark-light" >Open original on IPFS</p></a>
        <p className="mb-0 py-1 px-3 menu-pop-item text-dark-light" onClick = {() => handleDetail(id)}>View details</p>
      </div>}
    </div>
  );
};

export { CategoryItem };
