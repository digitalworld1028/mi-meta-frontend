import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import { NFTCard } from '../components';
import { CollectionCard } from '../components/Collections/CollectionCard';
import '../styles/explore.scss';
import { categories, LinkItem, SubMenuList} from '../store';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import {getCollectionSide} from '../redux/reducers/collection'

function Explore() {

  const dispatch = useAppDispatch();
  const collectionStore = useAppSelector(state => state.collection);
  const { type } = useParams();
  const[submenu, Setsubmenu] = useState("trending")
  const [count, setCount] = useState(10);

  useEffect(() => {
    console.log(type);
  }, [type]);

  const subItemSelect=(menuitem:any)=>{
    setCount(Math.floor(Math.random()*20))
    Setsubmenu(menuitem);
  }

  useEffect(()=> {
    if (collectionStore.collection.length == 0 ) {
      dispatch(getCollectionSide());
    }
  }, [])
  return (
    <Container className="explore p-0" fluid>
      <Row className="explore-landing">
        <div className="explore-landing-bg" />
        <Col md={12} className="explore-landing-title">
          <h1>Discover collections</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={12} className="m-auto pt-5">
          <Stack direction="horizontal" gap={4} className="explore-categories">
            
            {SubMenuList.map((item,key) => {
              return <div className={`collection_menu_item ${submenu==item.text ? "selected_menu_item":""}`} key={key} onClick={()=>subItemSelect(item.text)}>{item.text}</div>
            })}
          </Stack>
        </Col>
      </Row>
      <Row className="explore-nft">
        {
          submenu == "trending" && collectionStore.collection.filter((e)=>!e.hide).map((item, key) => {
              return <CollectionCard id={item._id} key={key} img={`https://${item.collectionImg.cid}.ipfs.dweb.link/${item.collectionImg.name}`} name={item.name} creator={item.creator} description={item.description}  />
          })
        }
        {
          submenu != "trending" && collectionStore.collection.filter((e)=>!e.hide).filter((each)=> each.category === submenu).map((item, key) => {
              return <CollectionCard id={item._id} key={key} img={`https://${item.collectionImg.cid}.ipfs.dweb.link/${item.collectionImg.name}`} name={item.name} creator={item.creator} description={item.description}  />
          })
        }
      </Row>
    </Container>
  );
}

export { Explore };
