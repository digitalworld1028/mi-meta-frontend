import { Row, Table, Stack, Image } from 'react-bootstrap';

interface DataType {
  activity: string;
  price: string;
  from: string;
  to: string;
  date: string;
}
const data: DataType[] = [
  { activity: 'Sale', price: '1.76', from: 'You', to: 'TheCollector', date: '2 Days ago' },
  {
    activity: 'Transfer',
    price: '',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    date: '2 Days ago',
  },
  {
    activity: 'List',
    price: '1.76',
    from: 'MonsterMagnet',
    to: 'You',
    date: '2 Days ago',
  },
  {
    activity: 'Sale',
    price: '1.76',
    from: 'MonsterMagnet',
    to: '',
    date: '2 Days ago',
  },
  {
    activity: 'Transfer',
    price: '1.76',
    from: 'MonsterMagnet',
    to: 'TheCollector',
    date: '2 Days ago',
  },
];
const ActivityProfile = () => {
  return (
    <Row className="profile-body-activity p-4">
      <div className="profile-body-activity-table">
        <Table hover>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Price</th>
              <th>From</th>
              <th>To</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: DataType, key: number) => {
              return (
                <tr key={key}>
                  <td>{item['activity']}</td>
                  <td>
                    {item['price'] ? (
                      <Stack direction="horizontal" gap={2}>
                        <Image src="/icons/eth.png" />
                        {item['price']}
                      </Stack>
                    ) : (
                      '---'
                    )}
                  </td>
                  <td className="text-info">
                    {item['from'] ? (
                      <Stack direction="horizontal">
                        <Image src="" />
                        {item['from']}
                      </Stack>
                    ) : (
                      '---'
                    )}
                  </td>
                  <td  className="text-info">
                    {item['to'] ? (
                      <Stack direction="horizontal">
                        <Image src="" />
                        {item['to']}
                      </Stack>
                    ) : (
                      '---'
                    )}
                  </td>
                  <td>{item['date']}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </Row>
  );
};

export { ActivityProfile };
