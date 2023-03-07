import { Row, Table, Stack, Image } from 'react-bootstrap';
import './notfound.scss';

const NotFound = () => {
  return (
    <div className="w-100">
        <img className="w-100" src="/images/NotFound/404.png" />
        <div className="notfound-container w-100 text-center">
            <p className="notfound-title w-100 text-center mb-5">404</p>
            <p className="notfound-content w-100 text-center pt-5">Oops! The page you are looking for can</p>
            <p className="notfound-content w-100 text-center">not be found. please try again.</p>
        </div>
    </div>
  );
};

export { NotFound };
