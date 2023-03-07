import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { CollectionCard } from '../components';
import {getCollectionSide} from '../redux/reducers/collection'
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';
import '../styles/discover.scss';

const Discover = () => {
  const dispatch = useAppDispatch();
  const collectionStore = useAppSelector(state => state.collection)
  const { category } = useParams();

  useEffect(() => {
    console.log(category);
  }, [category]);

  useEffect(()=> {
    if (collectionStore.collection.length == 0 ) {
      dispatch(getCollectionSide());
    }
  }, [])

  return (
    <Container className="discover p-0" fluid>
      <Row className="discover-landing">
        <div className="discover-landing-bg" />
      </Row>
      <Row className="m-auto p-2">
        <Col md={5} className="m-auto text-center mt-4">
          <h1>
            Discover <span className="text-capitalize">{category}</span>
          </h1>
          <p className="text-center">
            Bektig löras hjärtslagslag epiledes. Eurovis jåmän på syskapet. Poliism kropos monon
            fådede. Suligt posaskapet, en sul ans fåde. Polyskade pregitude larar remyrar.
            Transosmos päföss i prest jag teren. semin.
          </p>
        </Col>
      </Row>
      <Row className="mb-5">
        <div className="p-4">
          <h1 className="text-center">
            Trending <span className="text-capitalize">{category}</span>
          </h1>
        </div>
        <Col lg={10} className="m-auto">
          <Row className="justify-content-center">
            {collectionStore.collection.filter((e) => !e.hide).map((item, key: number) => {
              return <CollectionCard id={item._id} key={key} img={`https://${item.collectionImg.cid}.ipfs.dweb.link/${item.collectionImg.name}`} name={item.name} creator={item.creator} description={item.description}  />;
              // return (
              //   <Col lg={3} md={4} sm={6} key={key}>
              //     <CollectionCard id={key + 1} />
              //   </Col>
              // );
            })}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export { Discover };
