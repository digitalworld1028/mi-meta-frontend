import { Card } from 'react-bootstrap';

function DropItem({ id, title, description, img }: { id: number, title:string, description:string, img:string }) {
  return (
    <Card className="text-white">
      <Card.Img src={img} alt="Card image" />
      <Card.ImgOverlay>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );
}

export { DropItem };
