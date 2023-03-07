import { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Stack, Image } from 'react-bootstrap';
import { DropdownComp } from '../components';
import { ThemeContext } from '../providers';
import '../styles/activity.scss';
import { chains, categories, durations, LinkItem } from '../store';

const heads = ['collection', 'volume', '24h %', '7d %', 'floor price', 'owners', 'items'];
const data: DType[] = [
  {
    id: 1,
    collection: 'Bored Pandas Gym',
    volume: '5478.76',
    p24: '+205.3%',
    p7d: '+20.3%',
    floor_price: '1.76',
    owners: '15.2k',
    items: '30.6k',
  },
  {
    id: 2,
    collection: 'Street Art of Bansky',
    volume: '4478.76',
    p24: '+102.3%',
    p7d: '+20.3%',
    floor_price: '1.76',
    owners: '15.2k',
    items: '30.6k',
  },
  {
    id: 3,
    collection: 'Selfles',
    volume: '4458.34',
    p24: '+205.3%',
    p7d: '+20.3%',
    floor_price: '1.76',
    owners: '15.2k',
    items: '30.6k',
  },
  {
    id: 4,
    collection: 'Curated Art Blocks',
    volume: '4321.11',
    p24: '+205.3%',
    p7d: '+20.3%',
    floor_price: '1.76',
    owners: '15.2k',
    items: '30.6k',
  },
  {
    id: 5,
    collection: '967 Collectibles',
    volume: '4320.05',
    p24: '+205.3%',
    p7d: '+20.3%',
    floor_price: '1.76',
    owners: '15.2k',
    items: '30.6k',
  },
];
type DType = {
  id: number;
  collection: string;
  volume: string;
  p24: string;
  p7d: string;
  floor_price: string;
  owners: string;
  items: string;
};

function Activity() {
  const [_categories, setCategories] = useState<string[]>([]);
  const { theme, setTheme } = useContext(ThemeContext);
  useEffect(() => {
    const _cats: string[] = categories.map((item: LinkItem) => {
      return item?.text;
    });
    setCategories(_cats);
  }, []);
  return (
    <Container className="activity">
      <Row className="activity-header mt-5 pt-3">
        <h1>Top NFTs</h1>
        <p className="mt-3">
          All of the top NFT’s on Mi-Meta, ranked by volume, floor price and more
        </p>
      </Row>
      <Row className="mt-3 activity-category p-3">
        <Col>
          <DropdownComp
            items={['all chains', ...chains].map((item: string, key: number) => {
              return (
                <Stack direction="horizontal" key={key} gap={3}>
                  <Image
                    src={`/icons/${item}-logo.png`}
                    width={12}
                    style={{ visibility: `${item === 'all chains' ? 'hidden' : 'visible'}` }}
                  />
                  {item}
                </Stack>
              );
            })}
          />
        </Col>
        <Col>
          <DropdownComp items={['all categories', ..._categories]} />
        </Col>
        <Col>
          <DropdownComp items={durations} />
        </Col>
      </Row>
      <Row className="mb-5 mt-4">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              {heads.map((item, index) => (
                <th key={index}>{item}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item: DType, index: number) => {
              return (
                <tr key={index}>
                  <td className={` ${theme==="dark"?"text-light":"text-dark"}`}>{item['id']}</td>
                  <td className={` ${theme==="dark"?"text-light":"text-dark"}`}>
                    <Stack direction="horizontal" gap={3}>
                      <Image
                        src={`/images/nft/${index + 1}.png`}
                        width={56}
                        height={56}
                        roundedCircle
                      />
                      {item['collection']}
                    </Stack>
                  </td>
                  <td className={` ${theme==="dark"?"text-light":"text-dark"}`}>
                    <Stack direction="horizontal" gap={3}>
                      <Image src={`/icons/eth.png`} />
                      {item['volume']}
                    </Stack>
                  </td>
                  <td className="text-info">{item['p24']}</td>
                  <td className="text-info">{item['p7d']}</td>
                  <td className={` ${theme==="dark"?"text-light":"text-dark"}`}>
                    <Stack direction="horizontal" gap={3}>
                      <Image src={`/icons/eth.png`} />
                      {item['floor_price']}
                    </Stack>
                  </td>
                  <td className={` ${theme==="dark"?"text-light":"text-dark"}`}>{item['owners']}</td>
                  <td className={` ${theme==="dark"?"text-light":"text-dark"}`}>{item['items']}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export { Activity };
