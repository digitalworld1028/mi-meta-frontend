import {useState, useContext} from 'react'
import { Container, Row, Col, Button, Stack, Image, ListGroup, InputGroup, FormControl, Table} from 'react-bootstrap';
import Chart from 'react-apexcharts'
import { CollectionItem } from './CollectionItem';
import {FilterCard} from './FilterCard'
import { DropdownComp } from '../DropdownComp';
import { ThemeContext } from '../../providers';
import {chainData, collectionType, durations } from '../../store';
import './collections.style.scss';

const heads = ['Activiey', 'Item', 'Price', 'Qty', 'From', 'To', 'Time'];
const data: DType[] = [
  {
    id: 1,
    activity: 'Sale',
    item: 'Infinity#495',
    price: '1.76',
    qty: '1',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    time: '2 days ago',
  },
  {
    id: 1,
    activity: 'Transfer',
    item: 'Infinity#495',
    price: '---',
    qty: '1',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    time: '2 days ago',
  },
  {
    id: 1,
    activity: 'List',
    item: 'Infinity#495',
    price: '1.76',
    qty: '1',
    from: 'MonsterMagnet',
    to: '...',
    time: '2 days ago',
  },
  {
    id: 1,
    activity: 'Sale',
    item: 'Infinity#495',
    price: '1.76',
    qty: '1',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    time: '2 days ago',
  },
  {
    id: 1,
    activity: 'Transfer',
    item: 'Infinity#495',
    price: '---',
    qty: '1',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    time: '2 days ago',
  },
  {
    id: 1,
    activity: 'List',
    item: 'Infinity#495',
    price: '1.76',
    qty: '1',
    from: 'MonsterMagnet',
    to: '...',
    time: '2 days ago',
  }
];
type DType = {
  id: number;
  activity: string;
  item: string;
  price: string;
  qty: string;
  from: string;
  to: string;
  time: string;
};

function CollectionIActivityPane(props:any) {
  const { theme } = useContext(ThemeContext);
  const [activeChain, setActiveChain] = useState(chainData[0].name);
  const [options, setOptions] = useState({chart: {id: 'apexchart-example'},dataLabels:{enabled:false},  xaxis: {categories: ['02/28', '03/05', '03/10', '03/15', '03/20', '03/25', '04/01']}})
  const [series, setSeries] = useState([{name: 'series-1', data: [1.8, 1.7, 0.8, 1.4, 1.5, 1.7, 1.0]}])
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
        <FilterCard id="Chains">
            <div className="custom-button-group">
              {chainData.map(item => <Button variant="secondary" className={`my-1 py-1 ${item.name === activeChain ? "button-active":""}`} onClick={() => setActiveChain(item.name)}><span className="px-1"><img src={item.image} style={{width:20}} /></span>{item.name}</Button>)}
            </div>
        </FilterCard>
      </Row>
    </Col>
    <Col lg={9}>
      <Row className="pt-4 justify-content-center align-items-center">
        <Row>
          <Col sm={12} md={4}>
            <DropdownComp items={durations} />
          </Col>
          <Col sm={12} md={4} className="d-flex align-items-center">
            <h1 className="align-items-center d-flex">
              <span>30 Day Avg.Price </span>
              <Image src={`/icons/eth.png`} className="mb-1" />
              <span className="activity-eth-amount-span">0.32</span>
            </h1>
          </Col>
          <Col sm={12} md={4} className="d-flex align-items-center">
            <h1 className="align-items-center d-flex">
              <span>30 Day Volume </span>
              <Image src={`/icons/eth.png`} className="mb-1" />
              <span className="activity-eth-amount-span">0.32</span>
            </h1>
          </Col>
        </Row>
        <Row>
          <Chart options={options} series={series} type="area" width={"100%"} height={320} />
        </Row>
        <Row>
          <Table style={{color:'white'}} className="mt-4">
            <thead>
              <tr>
                {heads.map((item, index) => (
                  <th className={`text-center ${theme === "dark" ? "text-light": "text-dark"}`} key={index}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item: DType, index: number) => {
                return (
                  <tr key={index}>
                    <td className={`text-center align-middle ${theme === "dark" ? "text-light": "text-dark"}`}>{item['activity']}</td>
                    <td className={`text-center align-middle ${theme === "dark" ? "text-light": "text-dark"}`}>
                      <Stack direction="horizontal" gap={3}>
                        <Image
                          src={`/images/nft/${index + 1}.png`}
                          width={56}
                          height={56}
                          roundedCircle
                        />
                        {item['item']}
                      </Stack>
                    </td>
                    <td className={`text-center align-middle ${theme === "dark" ? "text-light": "text-dark"}`}>
                      <Stack direction="horizontal" gap={3}>
                        <Image src={`/icons/eth.png`} />
                        {item['price']}
                      </Stack>
                    </td>
                    <td className={`text-center align-middle ${theme === "dark" ? "text-light": "text-dark"}`}>{item['qty']}</td>
                    <td className="text-info text-center align-middle">{item['from']}</td>
                    <td className="text-info text-center align-middle">{item['to']}</td>
                    <td className={`text-center align-middle ${theme === "dark" ? "text-light": "text-dark"}`}>{item['time']}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Row>
    </Col>
  </Row> 
  );
}

export { CollectionIActivityPane };