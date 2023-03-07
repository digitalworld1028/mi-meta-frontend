import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import './collections.style.scss';

function FilterCard({ id , children}: { id: string, children:any }) {
    const [expand, setExpand] = useState(true)
    return (
        // <Link to="/detail">
        <Card className="collection-filter-card" >
        <Card.Body className="text-center">
            <Card.Title className="d-flex justify-content-between align-items-center">
                <span>{id}</span>
                {expand ? <Image src={`/icons/arrow-up.png`} onClick={() => setExpand(false)}/> : <Image src={`/icons/arrow-down.png`} onClick={() => setExpand(true)} /> }
            </Card.Title>
            {expand ?<div>
                {children}
            </div> : <div></div> }
        </Card.Body>
        </Card>
        // </Link>
    );
}

export { FilterCard };