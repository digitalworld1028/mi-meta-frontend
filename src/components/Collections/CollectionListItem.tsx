import { Stack, Image } from 'react-bootstrap';

function CollectionListItem() {
  return (
    <Stack direction="horizontal" className="collection-list-item" gap={1}>
      <Image src="/icons/avatar-1.svg" />
      <Stack direction="horizontal">
        <Stack gap={1}>
          <h3>Collection Name</h3>
          <p>
            Floor Price <Image src="/icons/eth.svg" /> 68.76
          </p>
        </Stack>
        <Stack gap={1}>
          <p className="mb-2 text-info">+205.3%</p>
          <p>
            <Image src="/icons/eth.svg" /> 5,4768.76
          </p>
        </Stack>
      </Stack>
    </Stack>
  );
}

export { CollectionListItem };
