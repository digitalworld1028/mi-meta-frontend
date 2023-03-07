import {useEffect} from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CategoryItem } from '../';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook'; 
import {getCollectionSide, makeHideSide, makeBurnSide} from '../../redux/reducers/collection';
import {changeProfilePicture} from '../../redux/reducers/profile';
import useMetaMask from '../../hooks/metamask';

const MyCollections = () => {
  const navigate = useNavigate();
  const collectionStore = useAppSelector(state => state.collection);
  const dispatch = useAppDispatch();
  const {connect, disconnect, isActive, account} = useMetaMask()!;

  useEffect(()=>{
    if (collectionStore.collection.length == 0) {
      dispatch(getCollectionSide());
    }
  }, [])

  const handleSell = () => {
    console.log("handleSell")
  }

  const handleBurn = (collectionId:any) => {
    dispatch(makeBurnSide(collectionId));
  }

  const handleHide = (collectionId:any) => {
    dispatch(makeHideSide(collectionId));
  }

  const handleTransfer = () => {
    console.log("handletransfer");
  }

  const handleShare = () => {
    console.log("handleShare");
  }

  const handleProfilePicture = (cid:any, name:any, account:any) => {
    dispatch(changeProfilePicture(cid, name, account));
  }

  const handleDetail = (collectionId:any) => {
    navigate('/collection/'+collectionId);
  }


  return (
    <div>
      <div>
        <Button className="py-3 px-3 collection-create-button" onClick={()=>navigate('/create/collection')}>Create New Collection</Button>
      </div>
      {collectionStore.collection.length > 0 && <Row className="mt-3">
        {collectionStore.collection.filter((each)=>each.creator == account).map((item:any, key:number) => {
            return <Col lg={4} md={6} sm={12}>
              <div className="collection-category-container">
                <CategoryItem 
                  id={item._id} 
                  type="collection"
                  title={item.name}
                  account={account}
                  hide={item.hide}
                  description={item.description}
                  cid={item.collectionImg.cid}
                  name={item.collectionImg.name}
                  handleSell={handleSell}
                  handleBurn={handleBurn}
                  handleHide={handleHide}
                  handleTransfer={handleTransfer}
                  handleShare={handleShare}
                  handleProfilePicture={handleProfilePicture}
                  handleDetail={handleDetail}
                 />
              </div>
            </Col>
          })
        }
      </Row>
      }
    </div>
    
  );
};

export { MyCollections };
