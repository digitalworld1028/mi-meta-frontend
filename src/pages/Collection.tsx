import { Container, Row, Button, Stack, Image} from 'react-bootstrap';
import {useNavigate}  from 'react-router';
import '../styles/collection.scss';
import { CollectionItemsPane, CollectionIActivityPane } from '../components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import {getCollectionSide} from '../redux/reducers/collection';
import collection from '../redux/reducers/collection';

function Collection() {
  const navigate = useNavigate();
  const [collectionIndex, setCollectionIndex] = useState(0);

  const setshowpane = (val:any)=> {
    setItemTab(val);
  }

  const collectionStore = useAppSelector(state => state.collection);
  const { collectionId } = useParams();
  const [itemTab, setItemTab] = useState(true);
  const dispatch = useAppDispatch()

  useEffect(()=>{
    if (collectionStore.collection.length == 0) {
      dispatch(getCollectionSide());
    }else {
      if (collectionId == "" || collectionId == undefined || collectionStore.collection.findIndex((each)=>each._id == collectionId) != -1 ) {
        setCollectionIndex(collectionStore.collection.findIndex((each)=>each._id == collectionId));
      } else {
        navigate(-1);
      }
    }
  }, [])

  useEffect(() => {
    if (collectionId == "" || collectionId == undefined || collectionStore.collection.findIndex((each)=>each._id == collectionId) != -1 ) {
      setCollectionIndex(collectionStore.collection.findIndex((each)=>each._id == collectionId));
    } else {
      navigate(-1);
    }
  }, [collectionStore])

  return (
    <Container className="collection p-0" fluid>
      <Row className="collection-landing">
        {collectionStore.collection.length >0 && <div className="collection-landing-bg" style={{backgroundImage:`url("https://${collectionStore.collection[collectionIndex].bannerImg.cid}.ipfs.dweb.link/${collectionStore.collection[collectionIndex].bannerImg.name}")`}}/>}
        {collectionStore.collection.length >0 && <div className="collection-badge" style={{backgroundImage:`url("https://${collectionStore.collection[collectionIndex].logoImg.cid}.ipfs.dweb.link/${collectionStore.collection[collectionIndex].logoImg.name}")`}}/>}
      </Row>
      <Row className="collection-description">
        {collectionStore.collection.length > 0 && <h1>{collectionStore.collection[collectionIndex].name}</h1>}
        <p>
          Created By: {collectionStore.collection.length > 0 && <span className="text-info mx-2">{collectionStore.collection[collectionIndex].creator.substring(0,10)}</span>}
          <Button variant="danger" className="mx-2">
            <Image src="/icons/twitter.svg" width={15} height={15} />
          </Button>
          <Button variant="danger">
            <Image src="/icons/discord.svg" width={15} height={15} />
          </Button>
        </p>
        <Stack direction="horizontal" className="collection-params">
          <Stack direction="horizontal">
            <div>
              <h1>333</h1>
              <p>items</p>
            </div>
            <div>
              <h1>285</h1>
              <p>owners</p>
            </div>
          </Stack>
          <Stack direction="horizontal">
            <div>
              <h1>
                <Image src={`/icons/eth.png`} className="mb-1" />
                <span className="eth-amount-span" style={{display:'inline-block'}}>0.32</span>
              </h1>
              <p>floor price</p>
            </div>
            <div>
              <h1>
                <Image src={`/icons/eth.png`} className="mb-1" />
                <span  className="eth-amount-span" style={{display:'inline-block'}}>30.6</span>
              </h1>
              <p>volume trated</p>
            </div>
          </Stack>
        </Stack>
      </Row>
    
      <Row className="collection-tab">
        <Stack direction="horizontal">
          <div className="tab-pane-item" onClick={() => setshowpane(true)}>
            {itemTab ? <Image src="/icons/item.png" /> : <Image src="/icons/item_gray.png" />}
            <p className={itemTab ? "active": ""}>Items</p>
          </div>
          <div className="tab-pane-item" onClick={() => setshowpane(false)}>
            {itemTab ? <Image src="/icons/Graph Poly.png" /> : <Image src="/icons/Graph Poly_blue.png" />}
            <p className={!itemTab ? "active": ""}>Activity</p>
          </div>
        </Stack>
      </Row>
      {itemTab ? <CollectionItemsPane collectionId={collectionId}/> :<CollectionIActivityPane /> }
      
    </Container>
  );
}

export { Collection };
