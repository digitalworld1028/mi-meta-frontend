import {useState, useContext} from 'react'
import {
  Row,
  Col,
  Image,
  FormControl,
  Button,
  Modal
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../../providers';
import { DropdownComp } from '../';
import { Web3Storage } from 'web3.storage';
import {categories} from '../../store/constants';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import useMetaMask from '../../hooks/metamask';
import {web3Token} from '../../store/constants'; 
import { useEffect } from 'react';

const CreateCollection = () => {
    const navigate = useNavigate();
    const {connect, disconnect, isActive, account} = useMetaMask()!;

    useEffect(()=>{
        console.log(account)
        if (account === undefined) {
            navigate('/login')
        }
    }, [])

    const dispatch = useAppDispatch()
    const { theme } = useContext(ThemeContext);
    const [avatarFile, setAvatarFile] = useState('');
    const [collectionFile, setCollectionFile] = useState('');
    const [bannerFile, setBannerFile] = useState('');

    const [avatar, setAvatar] = useState([]);
    const [collection, setCollection] = useState([]);
    const [banner, setBanner] = useState([]);

    const [collectionName, setCollectionName] = useState('');
    const [collectionDescription, setCollectionDescription] = useState('');
    const [collectionUrl, setCollectionUrl] = useState('');
    const [collectionCategory, setCollectionCategory] = useState('');
    const [collectionRoyalty, setCollectionRoyalty] = useState('');
    const [checkValidate, setCheckValidate] = useState(false);

    const [modal, setModal] = useState(false);

    const handleCloseModal = () => {
        setModal(false);
    }

    const cancelHandler = () => {
        setModal(false);
    }

    const avatarSelect = () => {
        const avatarInput = document.getElementById("avatar_input");
        avatarInput?.click()
    }

    const avatarChange = (e:any) => {
        e.preventDefault();
        let file = e.target.files[0];
        setAvatar(e.target.files);
        let fileReader = new FileReader();
        fileReader.onloadend = () => {
            if (fileReader.result !== null) {
                setAvatarFile(fileReader.result.toString())
            }
        };
        fileReader.readAsDataURL(file)
    }

    const collectionSelect = () => {
        const collectionInput = document.getElementById("collection_input");
        collectionInput?.click()
    }

    const collectionChange = (e:any) => {
        e.preventDefault();
        let file = e.target.files[0];
        setCollection(e.target.files);
        let fileReader = new FileReader();
        fileReader.onloadend = () => {
            if (fileReader.result !== null) {
                setCollectionFile(fileReader.result.toString())
            }
        };
        fileReader.readAsDataURL(file)
    }

    const bannerSelect = () => {
        const bannerInput = document.getElementById("banner_input");
        bannerInput?.click()
    }

    const bannerChange = (e:any) => {
        e.preventDefault();
        let file = e.target.files[0];
        setBanner(e.target.files);
        let fileReader = new FileReader();

        fileReader.onloadend = () => {
            if (fileReader.result !== null) {
                setBannerFile(fileReader.result.toString())
            }
        };
        fileReader.readAsDataURL(file)
    }

    const handleValidate = () => {
        if (avatarFile == "" || collectionFile == "" || bannerFile == "" || collectionName == "" || collectionDescription == "" || collectionCategory == "" || collectionRoyalty == "" ) {
            setCheckValidate(true)
            return true
        }else {
            setCheckValidate(false)
            return false
        }
    }

    const onCreate = async () => {
        if (!handleValidate()) {
            if (avatarFile !== "" && bannerFile !== "" && collectionFile !== "") {
                const client = new Web3Storage({ token:web3Token })
                setModal(true);
                const cid_banner = await client.put(banner, {})
                const cid_collection = await client.put(collection, {})
                const cid_avatar = await client.put(avatar, {})
                setModal(false);
    
                const instance = axios.create({
                    baseURL: 'http://localhost:5000/api/',
                    timeout: 1000, 
                    headers: {'Content-Type': 'application/json'}
                });
                instance.post('collection/create', {
                    name: collectionName,
                    description: collectionDescription,
                    category: collectionCategory,
                    bannerImg: {cid: cid_banner, name: banner[0]['name']},
                    collectionImg: {cid: cid_collection, name: collection[0]['name']},
                    logoImg: {cid: cid_avatar, name: avatar[0]['name']},
                    creator: account,
                    royalty: collectionRoyalty,
                    url: collectionUrl,
                })
            }
        }
    }

  return (
    <Row className="create-nft justify-content-center mt-5">
        <Col lg={9} md={12}>
            <h1 className="mt-4">Create a Collection</h1>
            <Row>
                <Col lg={12}>
                    <div className="create-nft-trait">
                        <h2 className="mt-4">Collection logo</h2>
                        <p className="mb-0">This image will also be used for navigation.</p>
                        <p>We recommend 350x350.</p>
                        <div style={{width:200, height:200, border:'1px solid #979797', borderRadius:'50%', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={avatarSelect}>
                            <img src={avatarFile === '' ? '/Icons/Image.png' : avatarFile} style={avatarFile===''?{width:50}:{width:300}}/>
                            <input type="file" id="avatar_input" style={{display:'none'}} onChange={avatarChange} />
                        </div>
                        {avatarFile =="" && checkValidate == true && <p className="text-danger">Please select collection logo.</p>}
                        <h2 className="mt-4">Collection image</h2>
                        <p>Set the image that you want featured on the homepage, category page, or collections page. We recommend 600x400px.</p>
                        <div style={{width:450, height:300, border:'1px solid #979797', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={collectionSelect}>
                            <img src={collectionFile === '' ? '/Icons/Image.png' : collectionFile} style={collectionFile==='' ? {width:50} : {width:450, height:300}}/>
                            <input type="file" id="collection_input" style={{display:'none'}} onChange={collectionChange} />
                        </div>
                        {collectionFile =="" && checkValidate == true && <p className="text-danger">Please select collection image.</p>}
                        <h2 className="mt-4">Banner image</h2>
                        <p>Set the image that you want featured on the homepage, category page, or collections page. We recommend 600x400px.</p>
                        <div style={{width:'100%', height:300, border:'1px solid #979797', overflow:'hidden', display:'flex', justifyContent:'center', alignItems:'center'}} onClick={bannerSelect}>
                            <img src={bannerFile === '' ? '/Icons/Image.png' : bannerFile} style={bannerFile==='' ? {width:50} : {width:'100%', height:300}}/>
                            <input type="file" id="banner_input" style={{display:'none'}} onChange={bannerChange} />
                        </div>
                        {bannerFile =="" && checkValidate == true && <p className="text-danger">Please select collection banner image.</p>}
                        <h2 className="mt-4">Collection name</h2>
                        <Row>
                            <Col lg={6} md={12}>
                                <FormControl placeholder="Enter name" value={collectionName}  onChange={(e) => setCollectionName(e.target.value)} />
                            </Col>
                        </Row>
                        {collectionName =="" && checkValidate == true && <p className="text-danger">Please input collection name.</p>}
                        <h2 className="mt-4">URL</h2>
                        <p>Set a custom URL for your collection. May only contain lowercase letters, numbers, and hyphens.</p>
                        <Row>
                            <Col lg={6} md={12}>
                                <FormControl placeholder="www.mi-meta.io/collection/collection-name" value={collectionUrl} onChange={(e)=> setCollectionUrl(e.target.value)} />
                            </Col>
                        </Row>
                        <h2 className="mt-4">Description</h2>
                        <p>The description will be included on the item's detail page under the image. Markdown syntax is supported.</p>
                        <FormControl
                            as="textarea"
                            rows={5}
                            placeholder="Enter a detailed description of your item"
                            value = {collectionDescription}
                            onChange={(e)=>setCollectionDescription(e.target.value)}
                        />
                        {collectionDescription =="" && checkValidate == true && <p className="text-danger">Please input collection description.</p>}
                        <h2>
                            <a href="https://www.markdownguide.org/getting-started" target="_blank" style={{textDecoration:'none'}} className="text-info">Markdown</a> syntax is supported.
                        </h2>
                        <Row className="mt-4">
                            <Col lg={6} md={12}>
                                <h2>Category</h2>
                                <p>This is the category where your item will appear</p>
                                <DropdownComp items={categories.map((item)=>item.text)} clickHandler={setCollectionCategory} />
                                {collectionCategory =="" && checkValidate == true && <p className="text-danger">Please input collection category.</p>}
                            </Col>
                            <Col lg={6} md={12}>
                                <h2>Royalties</h2>
                                <p>Suggested royalties:0%, 10% 20%, 30%, Max 50%</p>
                                <FormControl placeholder="0" value={collectionRoyalty} onChange={(e) =>setCollectionRoyalty(e.target.value)} />
                                {collectionRoyalty =="" && checkValidate == true && <p className="text-danger">Please input collection royalty</p>}
                            </Col>
                        </Row>
                        <div className=" mt-5 pt-5 create-nft-trait text-center mb-5">
                            <Button className="mi-button-primary mx-3 px-4" variant="primary" onClick={onCreate}>
                                Create
                            </Button>
                            <Button className="mi-button-light bg-gray mx-3 px-4" variant="light">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Col>
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
            <Modal.Title>Your request is processing!</Modal.Title>
            <div className="modal-close" onClick={cancelHandler}>X</div>
            </Modal.Header>
            <Modal.Body>
                <p className={`text-center ${theme === "dark" ? "text-light": "text-dark"}`}>Awesome! You just created {collectionName}. It should be comfirmed on the blockchain in just a minute!</p>
                <div className="text-center mt-5">
                    <Image src={collectionFile} width={250} height={250} />
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

export { CreateCollection };
