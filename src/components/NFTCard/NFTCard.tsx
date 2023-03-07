import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Card, Stack, Image } from 'react-bootstrap';
import {ReactComponent as Heart} from "../../assets/icons/heart.svg"
import './nft-card.style.scss';

function NFTCard({ id, title, description, price, img, owner }: { id: string, title:string, description:string, price:string, img:string, owner:string }) {
  const navigate = useNavigate();
  
  const showDetail = (id: string) => {
    console.log(id);
    navigate('/detail/' + id);
    // window.location.href= "/detail/" + id;
  };
  return (
    // <Link to="/detail">
    <Card className="nft-card" onClick={() => showDetail(id)}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Text>1 Edition minted</Card.Text>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="bold">
          {description}
        </Card.Text>
        <Card.Text className="bold">
          Price
          <img className="ms-4" src="/icons/eth.png" />
          <span>
            {price}
          </span>
        </Card.Text>
        <Card.Text>
        <Stack direction="horizontal" className="" gap={1}>
          <Image src="/icons/avatar-1.svg" />
          <Stack direction="horizontal"  className="w-100 justify-content-between">
            <Stack gap={1}>
              <h5>Owner</h5>
              <p>
                {owner}
              </p>
            </Stack>
                <Heart className="heart-icon" />
          </Stack>
        </Stack>
        </Card.Text>
      </Card.Body>
    </Card>
    // </Link>
  );
}

// eslint-disable-next-line import/prefer-default-export
export { NFTCard };
