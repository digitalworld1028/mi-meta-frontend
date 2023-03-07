import { Row, Stack } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';

const CommunicationSetting = () => {
  return (
    <>
      <h1 className="text-dark-light">Communication Setting</h1>
      <Row>
        <Stack direction="horizontal" className="communication-setting" gap={2}>
          <h2 className="text-dark-light">Receive email notifications</h2>
          <BootstrapSwitchButton checked={true} onlabel=" " offlabel=" " onChange={() => console.log('change')} size="xs" />
        </Stack>
        <p style={{ maxWidth: '650px' }}>
          Turn on email notifications if you want to receive regular updates, marketing emails, and
          account notifications.
        </p>
      </Row>
    </>
  );
};

export { CommunicationSetting };
