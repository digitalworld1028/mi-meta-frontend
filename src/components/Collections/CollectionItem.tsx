import { Card, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './collections.style.scss';
import {ReactComponent as Heart} from '../../assets/icons/heart.svg';

function CollectionItem({ id, title, description, price, img, owner, favoriteCount }: { id: string, favoriteCount:number, title:string, description:string, price:string, img:string, owner:string }) {
  const navigate = useNavigate();

  const showDetail = (id: string) => {
    console.log(id);
    navigate('/detail/' + id);
    // window.location.href= "/detail/" + id;
  };

  return (
    <Card className="collection-card" onClick={()=>showDetail(id)}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Text className="bold">{title}</Card.Text>
        <Stack direction="horizontal" style={{alignItems:'flex-start!important'}}  className="align-items-start justify-content-between">
          <div>
            <p>#MM-1357</p>
          </div>
          <div>
            <p style={{textAlign:'right'}}>Price</p>
            <Stack direction="horizontal" className="align-items-start justify-content-between">
              <img className="ms-4" src="/icons/eth.png" width={20}/>
              <span >{price}</span>
            </Stack>
            <div className="collection-item-favorite" style={{textAlign:'right'}}>
              {/* <img className="ms-4" src="icons/Heart.svg" width={20}/> */}
              <Heart style={{width:20}}/>
              <span >{favoriteCount}</span>
            </div>
          </div>
        </Stack>
        {/* <Card.Text className="font-bold">#MM-1357</Card.Text>

        <Card.Text className="bold">Price</Card.Text> */}
      </Card.Body>
    </Card>
  );
}

export { CollectionItem };
