import { NFTCard } from '../';
import { Row } from 'react-bootstrap';

const CreatedItems = () => {
  return (
    <Row>
      {new Array(10).fill(1).map((_, key: number) => {
        return <NFTCard  key={key} id={`${key} + 1`} title={"aaa"} description={"aaaaaaaaaaaaaa"} price={'24.31'} owner={"asdf"} img={"sdfsdf"} />
      })}
    </Row>
  );
};

export { CreatedItems };
