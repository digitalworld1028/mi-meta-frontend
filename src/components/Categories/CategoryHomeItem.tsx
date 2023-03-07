import { Card } from 'react-bootstrap';

const CategoryHomeItem = ({ id, title }: { id: number, title:string }) => {
  return (
    <div className="category-item">
      <Card className="text-white m-auto">
        <Card.Img src={`/images/category/${id.toString()}.png`} alt="Card image" />
        <Card.ImgOverlay>
          <Card.Title>{title}</Card.Title>
          <Card.Text>Supporting description for the card goes here like this.</Card.Text>
        </Card.ImgOverlay>
      </Card>
    </div>
  );
};

export { CategoryHomeItem };
