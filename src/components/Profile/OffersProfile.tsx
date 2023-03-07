import {useState} from 'react';
import { Row, Table, Stack, Image } from 'react-bootstrap';

interface DataType {
  item: string;
  offer: string;
  seller: string;
  status: string;
  date: string;
}
const data: DataType[] = [
  {
    item: 'Bored Pandas #233',
    offer: '1.76',
    seller: 'JimmyPockets',
    status: 'rejected',
    date: '2 Days ago',
  },
  {
    item: 'Selfles 2022 Pass',
    offer: '5',
    seller: 'WereSelfles',
    status: 'Pending',
    date: '2 Days ago',
  },
  {
    item: '201 Beach Ave Share 43',
    offer: '20',
    seller: 'RealestateFuture',
    status: 'Pending',
    date: '2 Days ago',
  },
  {
    item: 'The Black Keys | Row 1 Seat1',
    offer: '1.76',
    seller: 'ConcertTickets22',
    status: 'accepted',
    date: '2 Days ago',
  },
  {
    item: 'Transfer',
    offer: '1.76',
    seller: 'MonsterMagnet',
    status: 'TheCollecstatusr',
    date: '2 Days ago',
  },
];
const OffersProfile = () => {
  const [offerTab, setOfferTab] = useState('submit')
  return (
    <>
      <Row>
        <Stack direction="horizontal" gap={3} className="profile-body-offers-category">
          <p  className={offerTab =="submit"?"text-info offer-tab":"offer-tab"} onClick={()=>setOfferTab('submit')}>Offers Submitted</p>
          <p className={offerTab =="receive"?"text-info offer-tab":"offer-tab"} onClick={()=>setOfferTab('receive')}>Offers Received</p>
        </Stack>
      </Row>
      <Row className="profile-body-offers p-4">
        <div className="profile-body-offers-table">
          <Table hover>
            <thead>
              <tr>
                <th>Item</th>
                <th>Offer</th>
                <th>Seller</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: DataType, key: number) => {
                return (
                  <tr key={key}>
                    <td>
                      {
                        <Stack direction="horizontal" gap={2}>
                          <Image src="/icons/Profile.png" roundedCircle />
                          {item['item']}
                        </Stack>
                      }
                    </td>
                    <td>
                      {item['offer'] ? (
                        <Stack direction="horizontal" gap={2}>
                          <Image src="/icons/eth.png" />
                          {item['offer']}
                        </Stack>
                      ) : (
                        '---'
                      )}
                    </td>
                    <td>
                      {item['seller'] ? (
                        <Stack direction="horizontal">
                          <Image src="" />
                          <span className="text-info">{item['seller']}</span>
                        </Stack>
                      ) : (
                        '---'
                      )}
                    </td>
                    <td className={`text-${item['status']}`}>{item['status']}</td>
                    <td>{item['date']}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Row>
    </>
  );
};

export { OffersProfile };
