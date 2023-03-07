import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import './collections.style.scss';

function CollectionCard({ id, name, creator, description, img }: { id: number, name:string, creator: string, description:string, img:string }) {
  const navigate = useNavigate();

  const showDetail = (id: number) => {
    console.log(id);
    navigate(`/collection/${id}`);
  };

  return (
    // <Link to="/detail">
    <Card className="collection-card" style={{overflow:'hidden'}} onClick={() => showDetail(id)}>
      <Card.Img variant="top" src={img} />
      <Card.Body className="text-center">
        <Card.Title className="text-center">{name}</Card.Title>
        <Card.Text className="bold text-center">
          by <span className="text-info">{creator.substring(0,10)}</span>
        </Card.Text>
        <div>
          <Image src={`/avatars/user-1.png`} className="m-auto" fluid style={{objectFit:'cover'}}/>
        </div>
        <p className="text-center">
          {description}
        </p>
      </Card.Body>
    </Card>
    // </Link>
  );
}

export { CollectionCard };
