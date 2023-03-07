import {useState, useContext, useEffect} from 'react'
import { Container, Row, Col, Image, Stack, Button, Accordion, Table, Form, FormControl, Modal, FormCheck } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import DateTimePicker from 'react-datetime-picker';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import {getNftSide, addNftFavorite, addNftVisit} from '../redux/reducers/nft';
import {getCollectionSide} from '../redux/reducers/collection';
import useMetaMask from '../hooks/metamask';
import { NFTCard } from '../components';
import { CollectionItem, DropdownComp } from '../components';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { ThemeContext } from '../providers';
import { currencyType } from '../store';
import '../styles/detail.scss';
import {ReactComponent as Heart} from '../assets/icons/heart.svg'
import {ReactComponent as Visit} from '../assets/icons/Visit.svg'
import {ReactComponent as Share} from '../assets/icons/Share.svg'
const heads = ['Activity', 'Price', 'From', 'To', 'Date'];
const history: HType[] = [
  {
    id: 1,
    activity: 'Sale',
    price: '1.76',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    date: '2 days ago'
  },
  {
    id: 2,
    activity: 'Transfer',
    price: '---',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    date: '2 days ago'
  },
  {
    id: 3,
    activity: 'Sale',
    price: '1.76',
    from: 'MonsterMagnet',
    to: '...',
    date: '2 days ago'
  },
  {
    id: 4,
    activity: 'Sale',
    price: '1.76',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    date: '2 days ago'
  }
];

type HType = {
  id: number;
  activity: string;
  price: string;
  from: string;
  to: string;
  date: string;
};

const data: DType[] = [
  {
    id: 1,
    user: 'zerocool',
    amount: '0.01',
    status: 'reject',
    time: '30 mins ago',
  },
  {
    id: 2,
    user: 'zerocool',
    amount: '0.01',
    status: 'reject',
    time: '30 mins ago',
  },
  {
    id: 3,
    user: 'zerocool',
    amount: '0.01',
    status: 'reject',
    time: '30 mins ago',
  },
  {
    id: 4,
    user: 'zerocool',
    amount: '0.01',
    status: 'reject',
    time: '30 mins ago',
  },
];
type DType = {
  id: number;
  user: string;
  amount: string;
  status: string;
  time: string;
};

function Detail() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nftStore = useAppSelector(state => state.nft);
  const collectionStore = useAppSelector(state => state.collection);
  const {connect, disconnect, isActive, account} = useMetaMask()!;
  const { nftId } = useParams();

  const [nftIndex, setNftIndex] = useState(0);
  const { theme } = useContext(ThemeContext);
  const [itemData, setItemData] = useState([{name:'Boswell', value:'Ears'}, {name:'Rollo', value:'Sword'}, {name:'Rollo', value:'Shield'}])
  const [listMarket, setListMarket] = useState(true);
  const [price, setPrice] = useState("0")
  const [currency, setCurrency] = useState(currencyType[0])
  const [modal, setModal] = useState(false)
  const [modalStep, setModalStep] = useState(1)
  const [value, onChange] = useState(new Date());
  const [offerPrice, setOfferPrice] = useState('0');
  const [term, setTerm] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setModal(false);
  }
  const confirmHandler = () => {
    setModal(false);
  }
  const cancelHandler = () => {
    setModal(false);
  }
  const buyHandler = () => {
    setModalStep(1);
    setModal(true);
  }
  const offerHandler = () => {
    setModalStep(3);
    setModal(true);
  }

  useEffect(()=>{
    if (nftStore.nft.length == 0) {
      dispatch(getNftSide());
      dispatch(getCollectionSide());
    }else {
      if (nftId == "" || nftId == undefined || nftStore.nft.findIndex((each)=>each._id == nftId) != -1 ) {
        setNftIndex(nftStore.nft.findIndex((each)=>each._id == nftId));
        setPrice(nftStore.nft[nftStore.nft.findIndex((each)=>each._id == nftId)].price)
        setItemData(nftStore.nft[nftStore.nft.findIndex((each)=>each._id == nftId)].propertise)
        dispatch(addNftVisit(nftId));
      } else {
        navigate(-1);
      }
    }
  }, [])

  useEffect(() => {
    if (nftId == "" || nftId == undefined || nftStore.nft.findIndex((each)=>each._id == nftId) != -1 ) {
      setNftIndex(nftStore.nft.findIndex((each)=>each._id == nftId));
      setPrice(nftStore.nft[nftStore.nft.findIndex((each)=>each._id == nftId)].price);
      setItemData(nftStore.nft[nftStore.nft.findIndex((each)=>each._id == nftId)].propertise);
    } else {
      navigate(-1);
    }
  }, [nftStore, nftId])

  const handleFavorite = (nftId:any, account:any) => {
    dispatch(addNftFavorite(nftId, account));
  }

  return (
    <div>
    {nftStore.nft.findIndex((each)=>each._id == nftId) != -1 && <Container className="detail">
      <Row>
        <Col lg={5} className="detail-preview">
          <div>
            <Image src={`https://${nftStore.nft[nftIndex].nftImg.cid}.ipfs.dweb.link/${nftStore.nft[nftIndex].nftImg.name}`} />
          </div>
        </Col>
        <Col lg={7} className="detail-body">
          <Stack direction="horizontal">
            <div className="me-4">
              <Heart onClick={()=>handleFavorite(nftStore.nft[nftIndex]._id, account)} />
              <span className="ps-2">{nftStore.nft[nftIndex].favorite.length}</span>
            </div>
            <div className="ms-4 me-4 d-flex align-items-center">
              <Visit  />
              <span className="ps-2">{nftStore.nft[nftIndex].visit}</span>
            </div>
            <div className="ms-4">
              <Share  />
            </div>
          </Stack>
          <p>
            Created by: <span className="text-info">{nftStore.nft[nftIndex].creator.substring(0,10)}</span>
          </p>
          <p>
            Collection: {collectionStore.collection.length > 0 && <span className="text-info">{collectionStore.collection.filter((each)=>each._id == nftStore.nft[nftIndex].collectionId)[0].name}</span>}
          </p>
          <p>
            Owner: <span className="text-info">{nftStore.nft[nftIndex].owner.substring(0,10)}</span>
          </p>
          <p>
            Edition: <span className="text-info">1 of 4</span>
          </p>
          <p>
            Chain: <span className="text-info">Ethereum</span>
          </p>
          {collectionStore.collection.length > 0 && <h1 className="text-dark-light">{collectionStore.collection.filter((each)=>each._id == nftStore.nft[nftIndex].collectionId)[0].name} #874</h1>}
          <p>Current Price</p>
          <h1 className="text-dark-light">
            <Image src={`/icons/eth.png`} />
            {nftStore.nft[nftIndex].price} <span>($67.83 USD)</span>
          </h1>

          {account == nftStore.nft[nftIndex].owner && <Stack direction="horizontal" className="mt-4 text-dark-light align-items-center">
            <p className="text-dark-light mb-0">List on marketplace</p>
            <BootstrapSwitchButton   onlabel=" " offlabel=" "  checked={listMarket} onChange={(checked: boolean)=> checked?setListMarket(true):setListMarket(false)} />
          </Stack>}
          {account == nftStore.nft[nftIndex].owner && listMarket && <div className="create-nft-trait">
            <Stack direction="horizontal" className="create-nft-price-type" gap={3}>
              <div className="text-center">
                <p className="text-center">Fixed price</p>
                <Image src={`/icons/tag.png`} width={76} height={76} />
                <Form.Check className="custom-radio" type="radio" checked={nftStore.nft[nftIndex].listMarketplaceCategory === "fix"}/>
              </div>
              <div className="text-center">
                <p className="text-center">Accept bids</p>
                <Image src={`/icons/lBKGwu_2_.png`} width={76} height={76} className="p-2" />
                <Form.Check className="custom-radio" type="radio" checked={nftStore.nft[nftIndex].listMarketplaceCategory === "accept"}/>
              </div>
              <div className="text-center">
                <p className="text-center">Timed auction</p>
                <Image src={`/icons/Watch.png`} width={76} height={76} />
                <Form.Check className="custom-radio" type="radio" checked={nftStore.nft[nftIndex].listMarketplaceCategory === "time"}/>
              </div>
              <div className="text-center">
                <p className="text-center">Free</p>
                <Image src={`/icons/tag_free.png`} width={76} height={76} />
                <Form.Check className="custom-radio" type="radio" checked={nftStore.nft[nftIndex].listMarketplaceCategory === "free"}/>
              </div>
            </Stack>
          </div>}
          {account == nftStore.nft[nftIndex].owner && listMarket && <div className="create-nft-trait">
            <p className="text-dark-light">Price</p>
            <p>Enter the price for one item</p>
            <Stack direction="horizontal" gap={3}>
              <FormControl value={price} onChange={(e) => setPrice(e.target.value)}/>
              <DropdownComp items={currencyType} clickHandler={setCurrency} initialValue={"Ethereum(Eth)"}/>
            </Stack>
            <p className="mt-3">
              Service fee <span className="text-dark-light">2.5%</span>
            </p>
            <p>
              You will receive <span className="text-dark-light">{price == "" ? "0" : parseFloat(price)*0.975} {currency}</span> ($8)
            </p>
          </div>}
          
        </Col>
      </Row>
      {account != nftStore.nft[nftIndex].owner && nftStore.nft[nftIndex].listMarketplaceCategory == "fix" && <Row className="content-box px-5 py-2 mt-3 justify-content-between align-items-center">
        <Col>
          <Button className="mx-2 create-nft-modal-btn-save" onClick={()=>buyHandler()}>Buy Now</Button>
          <Button className="mx-2 create-nft-modal-btn-save" onClick={()=>offerHandler()}>Make Offer</Button>
        </Col>
        <Col>
          <h1>
            <Image src={`/icons/eth.png`} />
            3.02 <span style={{fontSize:18, color:'gray'}}>($67.83 USD)</span>
          </h1>
          <span style={{fontSize:15, color:'gray'}}>2.9% royalty fee to creator</span>
        </Col>
      </Row>
      }
      {account != nftStore.nft[nftIndex].owner && nftStore.nft[nftIndex].listMarketplaceCategory == "accept" && <Row className="content-box px-5 py-2 mt-3 justify-content-between align-items-center px-lg-3">
        <Col lg={4} md={5}>
          <p className="mb-0">Minimun bid</p>
          <h1>
            <Image src={`/icons/eth.png`} />
            0.02 <span style={{fontSize:18, color:'gray'}}>($67.83 USD)</span>
          </h1>
        </Col>
        <Col lg={8} md={7}>
          <Row className="align-items-center">
            <Col md={8}>
              <p className="mb-0 text-right">Sale ends April 10th at 12:00am CDT</p>
              <h2 className="text-dark-light text-right">08:02:21:55</h2>
            </Col>
            <Col md={4}>
              <Button className="detail-place-bid w-100 create-nft-modal-btn-save">Place Bid</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      }
      <Modal
        show={modal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
        centered
        className={theme === "dark" ? "modal-dark": "modal-light"}
      >
        <Modal.Header className={theme === "dark" ? "modal-header-dark": "modal-header-light"}>
          <div></div>
          {modalStep === 1 && <Modal.Title>Complete checkout</Modal.Title>}
          {modalStep === 2 && <Modal.Title>Your purchase is processing!</Modal.Title>}
          {modalStep === 3 && <Modal.Title>Make an offer</Modal.Title>}
          <div className="modal-close" onClick={cancelHandler}>X</div>
        </Modal.Header>
        {modalStep === 1 && <Modal.Body>
          <Row className="align-items-center">
            <Col sm={5} className="text-right">
              <img src="/images/badge.png" className="modal-avatar" width={40} height={40} />
              <span className="text-modal ps-2">0x12F4...5217</span>
            </Col>
            <Col sm={2}>
              <img src="/icons/Arrow right.png" />
            </Col>
            <Col sm={5}>
              <img src="/images/profile.png" className="modal-avatar" width={40} height={40} />
              <span className="text-modal ps-2">0x12F4...5217</span>
            </Col>
          </Row>
          <Row style={{borderBottom:'1px solid gray'}}>
            <Col>
              <span className="text-left text-modal">Item</span>
            </Col>
            <Col className="text-right">
              <span className="text-right text-modal">Subtotal</span>
            </Col>
          </Row>
          <Row className="py-2" style={{borderBottom:'1px solid gray'}}>
            <Col sm={7}>
              <Stack direction="horizontal" className="align-items-center">
                <Image src={`/images/collection/Image (7).png`} width={60} height={60}/>
                <div className="ms-2">
                  <h4 className="text-light mb-0">Infinite #874</h4>
                  <span className="text-modal">Edition: <span className="text-info">1 of 4</span></span>
                </div>
              </Stack>
            </Col>
            <Col sm={5} className="text-right">
              <h4 className="text-light text-right">
                <Image src={`/icons/eth.png`} />
                0.02 <p className="text-right" style={{fontSize:16, color:'gray'}}>($67.83 USD)</p>
              </h4>
            </Col>
          </Row>
          <Row className="py-4" style={{borderBottom:'1px solid gray'}}>
            <Col sm={2} xs={0}>
            </Col>
            <Col sm={5} xs={5}>
              <p className="text-modal mb-0">Estimated gas fee</p>
            </Col>
            <Col sm={5} xs={7} className="text-right">
              <p className="text-modal text-right mb-0">$12.50 (0.003465 ETH)</p>
            </Col>
          </Row>
          <Row className="py-4" >
            <Col sm={2} xs={0}>
            </Col>
            <Col sm={5} xs={5}>
              <p className="text-modal mb-0">Total</p>
            </Col>
            <Col sm={5} xs={7} className="text-right">
              <p className="text-modal text-right mb-0">$80.33 (0.02465 ETH)</p>
            </Col>
          </Row>
          <Row className="text-center mt-2">
            <Stack direction="horizontal" className="justify-content-center">
              <Form.Check type="checkbox" checked={term} onClick={()=>setTerm(!term)} className={theme === 'dark' ? "text-light custom-check-box-dark" : "text-dark custom-check-box-light"}></Form.Check>
              <Form.Check.Label className="text-light ps-2" style={{fontSize:15}}>By checking this box, I agree to Company's Terms of Service</Form.Check.Label>
            </Stack>
          </Row>
        </Modal.Body>}
        {modalStep === 2 && <Modal.Body>
            <p className={`text-center ${theme === "dark" ? "text-light": "text-dark"}`}>Awesome! You just purchased Infinite #874. It should be comfirmed on the blockchain in just a minute!</p>
            <div className="text-center mt-5">
              <Image src="/images/collection/Image (7).png" width={250} height={250} />
            </div>
            <p className={`text-center mt-3 ${theme === "dark" ? "text-light": "text-dark"}`}>Order Status</p>
            <div className="text-center d-flex justify-content-center">
              <div className="circle-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div> 
              <p className="text-info ms-4 ps-1">Processing</p>
            </div>
            <p className={`text-center mt-3 ${theme === "dark" ? "text-light": "text-dark"}`}>Transaction Hash</p>
            <p className="text-info mt-2 text-center">LKJQ34V-SDF</p>
          </Modal.Body>
        }
        {modalStep === 3 && <Modal.Body>
            <Row style={{borderBottom:'1px solid gray'}}>
              <Col>
                <span className="text-left text-modal">Item</span>
              </Col>
              <Col className="text-right">
                <span className="text-right text-modal">Subtotal</span>
              </Col>
            </Row>
            <Row className="py-2" style={{borderBottom:'1px solid gray'}}>
              <Col sm={7}>
                <Stack direction="horizontal" className="align-items-center">
                  <Image src={`/images/collection/Image (7).png`} width={60} height={60}/>
                  <div className="ms-2">
                    <h4 className="text-light mb-0">Infinite #874</h4>
                    <span className="text-modal">Edition: <span className="text-info">1 of 4</span></span>
                  </div>
                </Stack>
              </Col>
              <Col sm={5} className="text-right">
                <h4 className="text-light text-right">
                  <Stack direction="horizontal" className="align-items-center">
                  <Image src={`/icons/eth.png`} />
                  <FormControl type="text" value={offerPrice} onChange={(e)=>setOfferPrice(e.target.value)}/> <p className="text-right mb-0" style={{fontSize:16, color:'gray'}}>($67.83)</p>
                  </Stack>
                  
                </h4>
              </Col>
            </Row>
            <Row className="mt-4 align-items-center" >
              <Col sm={1} xs={0}>
              </Col>
              <Col sm={4} xs={5}>
                <p className="text-modal mb-0">Your offer</p>
              </Col>
              <Col sm={7} xs={7} className="text-right">
                <h4 className="text-light text-right mb-0">
                  <Image src={`/icons/eth.png`} />
                  {offerPrice} <p className="text-right mb-0" style={{fontSize:16, color:'gray'}}>($67.83 USD)</p>
                </h4>
              </Col>
            </Row>
            <Row className="py-2" style={{borderBottom:'1px solid gray'}}>
              <Col sm={1} xs={0}>
              </Col>
              <Col sm={4} xs={5}>
                <div className="text-modal mb-0">Offer expires <DateTimePicker onChange={onChange} value={value} /> </div>
                  
              </Col>
              <Col sm={7} xs={7} className="text-right">
                <h4 className="text-light text-right mb-0">2022/05/15 00:00:00</h4>
              </Col>
            </Row>
            {/* <Row>
              <div>
              <button className="example-custom-input" onClick={handleClick}>
                    000
                  </button>
                  {isOpen && (
                    <DatePicker selected={startDate} onChange={handleDateChange} inline />
                  )}
                </div>
            </Row> */}
            <Row className="text-center mt-2">
              <Stack direction="horizontal" className="justify-content-center">
                <Form.Check type="checkbox" checked={term} onClick={()=>setTerm(!term)} className={theme === 'dark' ? "text-light custom-check-box-dark" : "text-dark custom-check-box-light"}></Form.Check>
                <Form.Check.Label className="text-light ps-2" style={{fontSize:15}}>By checking this box, I agree to Company's Terms of Service</Form.Check.Label>
              </Stack>
            </Row>
          </Modal.Body>
        }

        {modalStep === 1 && <Modal.Footer>
          <Button variant="primary" className="create-nft-modal-btn-save" onClick = {()=>confirmHandler()}>Confirm</Button>
          <Button variant="secondary" className="create-nft-modal-btn-close" onClick={()=>cancelHandler()}>Cancel</Button>
        </Modal.Footer>}
        {modalStep === 3 && <Modal.Footer>
          <Button variant="primary" className="create-nft-modal-btn-save" onClick = {()=>confirmHandler()}>Submit Offer</Button>
          <Button variant="secondary" className="create-nft-modal-btn-close" onClick={()=>cancelHandler()}>Cancel</Button>
        </Modal.Footer>}
      </Modal>
      <p className="mt-3">Description</p>
      <Row className="px-0">
        <Col lg={6} md={12} sm={12} className="pe-md-3 ps-0 pe-sm-0">
          <div className="px-3 py-2 content-box">
            <p>{nftStore.nft[nftIndex].description}</p>
          </div>
          <div className="px-3 py-2 content-box mt-3">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Details</Accordion.Header>
                <Accordion.Body>
                  <Row>
                    <Col><p>Contract Address</p></Col>
                    <Col><p className="text-primary">0x2953...4963</p></Col>
                  </Row>
                  <Row>
                    <Col><p>Token Id</p></Col>
                    <Col><p>5145218710077526</p></Col>
                  </Row>
                  <Row>
                    <Col><p>Token Standard</p></Col>
                    <Col><p>ERC-1155</p></Col>
                  </Row>
                  <Row>
                    <Col><p>Metadata</p></Col>
                    <Col><p>Hidden</p></Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <p className="mt-3">
            Properties
          </p>
          <div className="mt-3">
            <Stack direction="horizontal" className="detail-properties-item" gap={3}>
              {itemData.map((item, i) => <div key={i}>
                  <p>{item.name}</p>
                  <p>
                    <span className="text-info">{item.value}</span>
                  </p>
                </div>)}
              </Stack>
          </div>
          <p className="mt-3">
            Rarity
          </p>
          <div className="mt-3">
            <Stack direction="horizontal" className="detail-rarity-item" gap={3}>
              <div >
                <p>Super</p>
                <p>
                  Rare
                </p>
              </div>
            </Stack>
          </div>
        </Col>
        <Col lg={6} md={12} sm={12} className="ps-md-2 pe-0 ps-sm-0">
          <div className="px-3 py-2 content-box">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>About Collection Name</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat. 
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
          <div className="mt-3 content-box">
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Offers</Accordion.Header>
                <Accordion.Body>
                {data.map((item: DType, index: number) => {
                  return <Row className="align-items-center offer-row py-2">
                    <Col lg={9}>
                      <Stack direction="horizontal"  gap={3}>
                        <Image
                          src={`/images/nft/${index + 1}.png`}
                          width={56}
                          height={56}
                          roundedCircle
                        />
                        <p className="mb-0">{item.user}'s offer of <Stack direction="horizontal" className="display-inline align-items-center" gap={3}>
                          <Image src={`/icons/eth.png`} />
                          <span className="text-dark-light">{item.amount}</span>
                        </Stack> was {item.status}</p>
                      </Stack>
                    </Col>
                    <Col lg={3}>
                      <span className="text-dark-light">30 mins ago</span>
                    </Col>
                  </Row>
                })}
                  
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Col>
      </Row>
      <Row className="mt-3 content-box">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Offers</Accordion.Header>
            <Accordion.Body>
              <Table className="text-dark-light">
                <thead>
                  <tr>
                    {heads.map((item, index) => (
                      <th className={index !== 0 ?"text-center":"text-left"} key={index}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {history.map((item: HType, index: number) => {
                    return (
                      <tr key={index}>
                        <td className="text-left">{item['activity']}</td>
                        <td className="text-center">
                          <Stack direction="horizontal" className="justify-content-center" gap={3}>
                            {item.price !== "---" && <Image src={`/icons/eth.png`} />}
                            {item['price']}
                          </Stack>
                        </td>
                        <td className="text-info text-center">{item['from']}</td>
                        <td className="text-info text-center">{item['to']}</td>
                        <td className="text-center">{item['date']}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Row>
      {account != nftStore.nft[nftIndex].owner && nftStore.nft[nftIndex].listMarketplaceCategory == "fix" && <Row className="content-box px-5 py-2 mt-3 justify-content-between align-items-center">
        <Col>
          <Button className="mx-2">Buy Now</Button>
          <Button className="mx-2">Make Offer</Button>
        </Col>
        <Col>
          <h1>
            <Image src={`/icons/eth.png`} />
            3.02 <span style={{fontSize:18, color:'gray'}}>($67.83 USD)</span>
          </h1>
          <span style={{fontSize:15, color:'gray'}}>2.9% royalty fee to creator</span>
        </Col>
      </Row>
      }
      <h3 className="text-dark-light mt-3">More from this collection</h3>
      {nftStore.nft.length > 0 && <Row className="">
        {nftStore.nft.filter((each)=>each.collectionId == nftStore.nft[nftIndex].collectionId).map((item, key) => {
          // return <NFTCard id={key + 1} key={key} />;
          if (item._id !== nftStore.nft[nftIndex]._id)
          return (
            <Col lg={4} md={6} sm={12} xs={12} key={key}>
              {collectionStore.collection.length > 0 && <CollectionItem  key={key} id={item._id} favoriteCount={item.favorite.length} title={collectionStore.collection[collectionStore.collection.findIndex((e)=>e._id == nftStore.nft[nftIndex].collectionId)].name} description={item.description} price={item.price} owner={item.owner} img={`https://${item.nftImg.cid}.ipfs.dweb.link/${item.nftImg.name}`} />};
            </Col>
          );
        })}
      </Row>}
    </Container>}
    </div>
  );
}

export { Detail };
