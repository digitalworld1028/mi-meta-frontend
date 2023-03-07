import {useState, useEffect, useContext} from 'react'
import {
  Row,
  Col,
  InputGroup,
  Card,
  Stack,
  Image,
  FormControl,
  Button,
  Form,
  Modal
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { DropdownComp } from '../';
import { ThemeContext } from '../../providers';
import {getCollectionSide} from '../../redux/reducers/collection'
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import { Web3Storage } from 'web3.storage';
import useMetaMask from '../../hooks/metamask';
import {web3Token} from '../../store/constants'; 
import axios from 'axios';

const CreateComp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {connect, disconnect, isActive, account} = useMetaMask()!;

  const { theme } = useContext(ThemeContext);
  const collectionStore = useAppSelector(state => state.collection)
  const [listMarket, setListMarket] = useState(true);
  const [selectedFile, setSelectedFile] = useState("");
  const [nftFile, setNftFile] = useState([]);
  const [fixedPrice, setFixedPrice] = useState("fix");
  const [explicit, setExplicit] = useState(true);
  const [unlockable, setUnlockable] = useState(true);
  const [modal, setModal] = useState(false)
  const [modalProgress, setModalProgress] = useState(false)
  const [itemData, setItemData] = useState([{name:'Boswell', value:'Ears'}, {name:'Rollo', value:'Sword'}, {name:'Rollo', value:'Shield'}])
  const [bufferItemData, setBufferItemData] = useState([{name:'Boswell', value:'Ears'}, {name:'Rollo', value:'Sword'}, {name:'Rollo', value:'Shield'}])

  const [name, setName] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [owner, setOwner] = useState('');
  const [royalty, setRoyalty] = useState('');
  const [edition, setEdition] = useState('');
  const [category, setCategory] = useState('');
  const [rarity, setRarity] = useState('');
  const [description, setDescription] = useState('');
  const [unlockableContent, setUnlockableContent] = useState('');
  const [price, setPrice] = useState('');
  const [currency, setCurrency] = useState("Eth");
  const [checkValidate, setCheckValidate] = useState(false);

  useEffect(() => {
    console.log(account);
    if (account === undefined) {
      navigate('/login')
    }
    if (collectionStore.collection.length == 0 ) {
      dispatch(getCollectionSide());
    }
  }, [])

  const handleCloseModal = () => {
    setModal(false);
  }
  const handleCloseModalProgress = () => {
    setModalProgress(false);
  }

  const handleValidate = () => {
    if (selectedFile == "" || owner == "" || price == "" || collectionId == "" || description == "" || category == "" || royalty == "" || rarity == "" || edition == "" || unlockableContent == "" ) {
        setCheckValidate(true)
        return true
    }else {
        setCheckValidate(false)
        return false
    }
  }

  const handleClickCollection = (itemId:any, e:any) => {
    setCollectionId(itemId);
  }

  const handleMint = async () => {
    if (handleValidate()) {
      if (selectedFile !== "") {
        const client = new Web3Storage({ token:web3Token })
        setModalProgress(true)
        const cid_nft = await client.put(nftFile, {})
        setModalProgress(false)
        axios.post('http://localhost:5000/api/nft/create', {
          creator: account,
          owner: account,
          price:price,
          collectionId:collectionId,
          description:description,
          category:category,
          royalty:royalty,
          rarity:rarity,
          edition:edition,
          propertise:itemData,
          unlockable:unlockable,
          explicit:explicit,
          listMarketplace:listMarket,
          listMarketplaceCategory: fixedPrice,
          unlockableContent: unlockableContent,
          nftImg:{cid:cid_nft, name:nftFile[0]['name']},
        }).then(resp => {
          console.log(resp);
        })
      }
    }
  }

  const editHandler = (e:any, i:number, type:string) => {
    let itemData = bufferItemData;
    if (type === "type") {
      itemData[i].name = e.target.value;
    } else {
      itemData[i].value = e.target.value;
    }
    setBufferItemData([...itemData]);
  }

  const addItemData = () => {
    setItemData([...itemData, {name:'Boswell', value:'Ears'}])
    setBufferItemData([...itemData, {name:'Boswell', value:'Ears'}]);
  }

  const saveHandler = () => {
    setBufferItemData([...itemData]);
    setModal(false);
  }

  const cancelHandler = () => {
    setItemData([...bufferItemData]);
    setModal(false);
  }

  const onFileChange = (e:any) => {
    e.preventDefault();
    let file = e.target.files[0];
    setNftFile(e.target.files);
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      if (fileReader.result !== null) {
        setSelectedFile(fileReader.result.toString())
      }
    };
    fileReader.readAsDataURL(file)
  };


  return (
    <Row className="create-nft justify-content-center mt-5">
      <Col lg={9}>
        <h1>Create NFT on Ethereum</h1>
        <Row>
          <Col lg={6}>
            <div className="create-nft-trait">
              <h2>Choose wallet</h2>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <Image src={`/icons/eth.png`} />
                </InputGroup.Text>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={account}
                  disabled
                />
              </InputGroup>
            </div>
            <div className="creat-nft-trait">
              <h2>Upload file</h2>
              <Stack direction="horizontal">
                <Card>
                  <Card.Img src={selectedFile !== ""?selectedFile:`/images/base.png`} style={{width:'100%'}} />
                </Card>
                <div className="text-center">
                  <p>PNG, GIF, WEBP, MP4, MP3 Max upload size 100MB.</p>
                  <Form.Control type="file" className="create-file-select" onChange={onFileChange}/>
                </div>
              </Stack>
            </div>
            <div className="creat-nft-trait">
              <p>This is the collection where your item will appear.</p>
              <DropdownComp
                items={
                  collectionStore.collection.map((item, index) => {
                    return <Stack direction="horizontal" key={2} onClick={(e)=>handleClickCollection(item._id,e)}>
                              <Image src={`https://${item.collectionImg.cid}.ipfs.dweb.link/${item.collectionImg.name}`} width={30} height={30} className="me-2" />
                              <p>{item.name}</p>
                            </Stack>
                  })
                }
              />
            </div>
            <div className="creat-nft-trait"></div>
          </Col>
          <Col lg={6} className="p-3 create-nft-trait">
            <h2>Preview</h2>
            <Image src={selectedFile !== ""?selectedFile:`/images/base.png`} fluid style={{ borderRadius: '20px' }} />
            <Stack direction="horizontal" className="mt-4">
              <h2>List on marketplace</h2>
              <BootstrapSwitchButton onlabel=" " offlabel=" " checked={listMarket} onChange={(checked: boolean)=> checked?setListMarket(true):setListMarket(false)} />
            </Stack>
            {listMarket && <div className="create-nft-trait">
              <Stack direction="horizontal" className="create-nft-price-type" gap={3}>
                <div className="text-center" onClick={()=>setFixedPrice("fix")}>
                  <p>Fixed price</p>
                  <Image src={`/icons/tag.png`} width={76} height={76} />
                  <Form.Check className="custom-radio" type="radio" checked={fixedPrice === "fix"} />
                </div>
                <div className="text-center" onClick={()=>setFixedPrice("accept")}>
                  <p>Accept bids</p>
                  <Image src={`/icons/lBKGwu_2_.png`} width={76} height={76} className="p-2" />
                  <Form.Check className="custom-radio" type="radio"  checked={fixedPrice === "accept"} />
                </div>
                <div className="text-center" onClick={()=>setFixedPrice("time")}>
                  <p>Timed auction</p>
                  <Image src={`/icons/Watch.png`} width={76} height={76} />
                  <Form.Check className="custom-radio" type="radio" checked={fixedPrice === "time"}  />
                </div>
                <div className="text-center" onClick={()=>setFixedPrice("free")}>
                  <p>Free</p>
                  <Image src={`/icons/Tag_free.png`} width={76} height={76} />
                  <Form.Check className="custom-radio" type="radio" checked={fixedPrice === "free"}  />
                </div>
                <div></div>
              </Stack>
            </div>}
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <Stack direction="horizontal" gap={4}>
              <div className="create-nft-erc-1155-logo" />
              <Stack>
                <h2 className="pt-3">mi-metaverse multiple</h2>
                <p>ERC-1155</p>
              </Stack>
            </Stack>
          </Col>
          {listMarket && <Col lg={6}>
            <div className="create-nft-trait">
              <h2>Price</h2>
              <p>Enter the price for one item</p>
              <Stack direction="horizontal" gap={3}>
                <FormControl value={price} onChange={(e) => setPrice(e.target.value)} />
                <DropdownComp items={['Eth', 'Usd']} clickHandler={setCurrency}/>
              </Stack>
              <p className="mt-3">
                Service fee <span className="text-light">2.5%</span>
              </p>
              <p>
                You will receive <span className="text-light">{price == "" ? "0" : parseFloat(price)*0.975} {currency}</span> ($8)
              </p>
            </div>
          </Col>}
          <Col lg={12}>
            <div className="create-nft-trait">
              <h2>Description</h2>
              <p>
                The description will be included on the item’s detail page under the image.
                supported.
              </p>
              <Form.Control
                as="textarea"
                placeholder="Enter a detailed description of your item"
                rows={5}
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              ></Form.Control>
              <h2>
                <a href="https://www.markdownguide.org/getting-started" target="_blank" style={{textDecoration:'none'}} className="text-info">Markdown</a> syntax is supported.
              </h2>
            </div>
            <div className="create-nft-trait">
              <h2>Properties</h2>
              <p>Add properties to your item</p>
              <Row className="create-nft-add-item gap-4">
                <Col lg={2}>
                  <div className="bg-dark create-nft-edit-item text-center" onClick={() => setModal(true)}>+</div>
                </Col>
                {itemData.map((item, i) => <Col lg={2} key={i}>
                  <p>{item.name}</p>
                  <p>
                    <span className="text-info">{item.name}</span>
                  </p>
                </Col>)}
              </Row>
              {/* <Stack direction="horizontal" className="create-nft-add-item" gap={3}>
                
                
              </Stack> */}
              <Modal
                show={modal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                centered
              >
                <Modal.Header>
                  <div></div>
                  <Modal.Title>Add properties</Modal.Title>
                  <div className="create-nft-modal-close px-2" onClick={()=>cancelHandler()}>X</div>
                </Modal.Header>
                <Modal.Body>
                  <div className="create-nft-modal-item-row mb-4" style={{borderBottom:'1px solid gray'}}>
                    <div className="create-nft-modal-item-prefix" ></div>
                    <div className="create-nft-modal-item-content">
                      <span>Type</span>
                    </div>
                    <div  className="create-nft-modal-item-content">
                      <span>Name</span>
                    </div>
                  </div>
                  {bufferItemData.map((item, i) => {
                    return <div key={i} className="create-nft-modal-item-row">
                        <div className="create-nft-modal-item-prefix" >X</div>
                        <div className="create-nft-modal-item-content">
                          <div>
                            <Form.Control type="text" className="create-nft-modal-input" value={item.name} onChange={(e)=>editHandler(e, i, "type")}/>
                          </div>
                        </div>
                        <div  className="create-nft-modal-item-content">
                          <div>
                            <Form.Control type="text" className="create-nft-modal-input" value={item.value}  onChange={(e)=>editHandler(e, i, "name")}/>
                          </div>
                        </div>
                      </div>
                  })}
                  <div className="create-nft-modal-item-row mt-3">
                    <div className="create-nft-modal-item-prefix" >+</div>
                    <div className="create-nft-modal-item-content">
                      <div className="create-nft-modal-add-button" onClick={addItemData}>
                        Add more
                      </div>
                    </div>
                    <div className="create-nft-modal-item-content" ></div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" className="create-nft-modal-btn-save" onClick = {()=>saveHandler()}>Save</Button>
                  <Button variant="secondary" className="create-nft-modal-btn-close" onClick={()=>cancelHandler()}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
            <div className="create-nft-trait">
              <Row>
                <Col lg={6} className="mt-3">
                  <h2>Category</h2>
                  <p>This is the category where your item will appear</p>
                  <DropdownComp items={['Choose category', 'b']} />
                </Col>
                <Col lg={6} className="mt-3">
                  <h2>Royalties</h2>
                  <p>Suggested royalties: 0%, 10%, 20%, 30%. Max 50%</p>
                  <FormControl placeholder="30" value={royalty} onChange={(e)=>setRoyalty(e.target.value)}/>
                </Col>
                <Col lg={6} className="mt-3">
                  <h2>Rarity</h2>
                  <p>The rarity of your item</p>
                  <DropdownComp items={['Choose rarity', 'b']} />
                </Col>
                <Col lg={6} className="mt-3">
                  <h2>Number of Editions</h2>
                  <p>Amount of tokens</p>
                  <FormControl  placeholder="30" value={edition} onChange={(e)=>setEdition(e.target.value)} />
                </Col>
              </Row>
            </div>
            <div className="create-nft-trait">
              <Stack direction="horizontal" gap={3}>
                <h2>Unlockable content</h2>
                <BootstrapSwitchButton onlabel=" " offlabel=" " checked={unlockable} onChange={()=>setUnlockable(!unlockable)}/>
              </Stack>
              {unlockable && <FormControl
                as="textarea"
                rows={5}
                placeholder="Example: “when you buy this NFT, you can get free coffee for life”"
                value={unlockableContent}
                onChange={(e)=>setUnlockableContent(e.target.value)}
              /> }
              {unlockable && <h2 className="mt-3">
                <a href="https://www.markdownguide.org/getting-started" target="_blank" style={{textDecoration:'none'}} className="text-info">Markdown</a> syntax is supported.
              </h2>}
            </div>
            <div className="create-nft-trait">
              <Stack direction="horizontal" gap={3}>
                <h2>Explicit content</h2>
                <BootstrapSwitchButton onlabel=" " offlabel=" " checked={explicit} onChange={()=>setExplicit(!explicit)}/>
              </Stack>
              
            </div>
            <div className="create-nft-trait text-center mb-5">
              <Button className="mi-button-primary mx-3" variant="primary" onClick={handleMint}>
                Mint it!
              </Button>
              <Button className="mi-button-light bg-gray mx-3" variant="light">
                Cancel
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
      <Modal
            show={modalProgress}
            onHide={handleCloseModalProgress}
            backdrop="static"
            keyboard={false}
            centered
            className={theme === "dark" ? "modal-dark": "modal-light"}
        >
            <Modal.Header className={theme === "dark" ? "modal-header-dark": "modal-header-light"}>
            <div></div>
            <Modal.Title>Your request is processing!</Modal.Title>
            <div className="modal-close" onClick={cancelHandler}>X</div>
            </Modal.Header>
            <Modal.Body>
                <p className={`text-center ${theme === "dark" ? "text-light": "text-dark"}`}>Awesome! You just minted Nft. It should be comfirmed on the blockchain in just a minute!</p>
                <div className="text-center mt-5">
                    <Image src={selectedFile} width={250} height={250} />
                </div>
                <p className={`text-center mt-3 ${theme === "dark" ? "text-light": "text-dark"}`}>Create Status</p>
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

            </Modal.Body>
        </Modal>
    </Row>
  );
};

export { CreateComp };
