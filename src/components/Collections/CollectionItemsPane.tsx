import { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Button, Stack, Image, ListGroup, InputGroup, FormControl, Form, ButtonGroup} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { CollectionItem } from './CollectionItem';
import { DropdownComp } from '../DropdownComp';
import { ThemeContext } from '../../providers';
import { chains, categories, durations, LinkItem, sortMethod, collectionType, currencyType, chainImage, chainData } from '../../store';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook';
import {getCollectionSide} from '../../redux/reducers/collection'
import {getNftSide} from '../../redux/reducers/nft'

import {FilterCard} from './FilterCard'
import {NFTCard} from '../NFTCard'
import './collections.style.scss';
import '../../styles/activity.scss';
import { propTypes } from 'react-bootstrap/esm/Image';

function CollectionItemsPane(props:any) {

  const dispatch = useAppDispatch();
  const collectionStore = useAppSelector(state => state.collection);
  const nftStore = useAppSelector(state => state.nft);

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [activeChain, setActiveChain] = useState(chainData[0].name);

  useEffect(()=>{
    if (collectionStore.collection.length == 0 ) {
      dispatch(getCollectionSide());
    }
    if (nftStore.nft.length == 0 ) {
      dispatch(getNftSide());
    }
  }, [])

  return (
    <Row className="mb-3 collection-body">
      <Col lg={3} className="mt-4">
        <Row>
          <Col>
            <span className="filter-text">Filter</span>
          </Col>
        </Row>
        <Row>
          <FilterCard id="Sale Type">
            <Row className="align-items-center">
              <Col><Button variant="primary" className="filter-button">Buy Now</Button></Col>
              <Col> <span> New </span> </Col>
            </Row>
            <Row className="align-items-center">
              <Col> <span> Auction </span></Col>
              <Col><Button variant="primary"  className="filter-button">Has Offers</Button> </Col>
            </Row>
          </FilterCard>
        </Row>
        <Row>
          <FilterCard id="Price">
            <Row className="align-items-center">
              <Form.Select>
                {currencyType.map((item) => <option key={item} value="1">{item}</option>)}
              </Form.Select>
            </Row>
            <Row className="align-items-center mt-1">
              <Col sm={5} className="px-0">
                <Form.Control type="text" placeholder="Min" className="collection-filter-input"></Form.Control>
              </Col>
              <Col sm={2} className="px-0"><span>to</span></Col>
              <Col sm={5} className="px-0"><Form.Control type="text" placeholder="Max" className="collection-filter-input"></Form.Control></Col>
            </Row>
            <Row className="mt-2 align-items-center">
              <Col sm={6} className="px-0"><Button variant="primary" className="filter-button">Apply Filter</Button></Col>
            </Row>
          </FilterCard>
        </Row>
        <Row>
          <FilterCard id="Chains">
              <div className="custom-button-group">
                {chainData.map(item => <Button key={item.name} variant="secondary" className={`my-1 py-1 ${item.name === activeChain ? "button-active":""}`} onClick={() => setActiveChain(item.name)}><span className="px-1"><img src={item.image} style={{width:20}} /></span>{item.name}</Button>)}
              </div>
          </FilterCard>
        </Row>
      </Col>
      <Col lg={9}>
        <Row className="pt-4 justify-content-around">
          <Row>
              <Col sm={12} md={4}>
              <InputGroup className="d-flex custom-input-group">
                <InputGroup.Text id="basic-addon1">
                  <Image src={`/icons/lens.svg`} />
                </InputGroup.Text>
                <FormControl
                  type="search"
                  placeholder="Search"
                  className={theme === "dark" ? "search-input-dark":"search-input-light"}
                  aria-label="Search"
                />
              </InputGroup>
              </Col >
              <Col sm={12} md={4}>
                  <DropdownComp items={collectionType} />
              </Col>
              <Col sm={12} md={4}>
                  <DropdownComp items={sortMethod} />
              </Col>
          </Row>
          {
            props.type !== "assets" && nftStore.nft.filter((each)=>each.collectionId == props.collectionId).map((item, key) => {
              return <CollectionItem  key={key} id={item._id} title={"Doge Nft"} description={item.description} favoriteCount={item.favorite.length} price={item.price} owner={item.owner} img={`https://${item.nftImg.cid}.ipfs.dweb.link/${item.nftImg.name}`} />;
            })
          }
          {
            props.type === "assets" && nftStore.nft.map((item, key) => {
              return <CollectionItem  key={key} id={item._id} title={"Doge Nft"} description={item.description} favoriteCount={item.favorite.length} price={item.price} owner={item.owner} img={`https://${item.nftImg.cid}.ipfs.dweb.link/${item.nftImg.name}`} />;
            })
          }
          {/* {
            props === "assets" && collectionStore.collection.map((item, key) => {
              return <CollectionItem  key={key} id={item._id} title={"Doge Nft"} description={item.description} price={item.price} owner={item.owner} img={`https://${item.nftImg.cid}.ipfs.dweb.link/${item.nftImg.name}`} />;
            })
          } */}
        </Row>
      </Col>
    </Row> 
  );
}

export { CollectionItemsPane };