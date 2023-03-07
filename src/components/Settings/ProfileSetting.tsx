import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Image, Stack, Button, FormControl, Tooltip, OverlayTrigger, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';
import {web3Token} from '../../store/constants';
import { useAppSelector, useAppDispatch } from '../../hooks/reduxHook'; 
import {getProfileSide} from '../../redux/reducers/profile';
import useMetaMask from '../../hooks/metamask';

const ProfileSetting = () => {
  const navigate = useNavigate();
  const {connect, disconnect, isActive, account} = useMetaMask()!;
  const profileStore = useAppSelector(state => state.profile)
  const dispatch = useAppDispatch();
  const [walletData, setWalletData] = useState(["0x12f491fany9ll5rw2...cddc107116083ec49e5217", "0x12f491fany9ll5rw2...cddc107116083ec49e5217"])
  const [newWallet, setNewWallet] = useState('')

  const [profile, setProfile] = useState([]);
  const [profileFile, setProfileFile] = useState('');
  const [banner, setBanner] = useState([]);
  const [bannerFile, setBannerFile] = useState('');

  const [linkNft, setLinkNft] = useState('')
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [discord, setDiscord] = useState('');
  const [facebook, setFacebook] = useState('');
  const [tiktok, setTiktok] = useState('');

  const renderBannerTooltip = (props:any) => (
    <Tooltip id="button-tooltip" placement="top-start" {...props}>
      We recommend a 1500x1500px JPG, PNG, WEBP, or GIF (1MB max file size)
    </Tooltip>
  );

  const renderProfileTooltip = (props:any) => (
    <Tooltip id="button-tooltip" placement="top-start" {...props}>
      We recommend a 500x500px JPG, PNG, WEBP, or GIF (1MB max file size)
    </Tooltip>
  );

  useEffect(()=>{
    if (account === undefined) {
      navigate('/login')
    }
  }, [])

  const editWallet = (e:any, i:number) => {
    let wallet = walletData;
    wallet[i] = e.target.value;
    setWalletData([...wallet]);
  }
  const addWallet = () => {
    setWalletData([...walletData, newWallet])
    setNewWallet('')
  }

  const profileSelect = () => {
    const bannerInput = document.getElementById("profile_input");
    bannerInput?.click()
  }

  const profileChange = (e:any) => {
    e.preventDefault();
    let file = e.target.files[0];
    setProfile(e.target.files);
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      if (fileReader.result !== null) {
          setProfileFile(fileReader.result.toString())
      }
    };
    fileReader.readAsDataURL(file)
  }

  const bannerSelect = () => {
    const bannerInput = document.getElementById("banner_input");
    bannerInput?.click()
  }

  const bannerChange = (e:any) => {
    e.preventDefault();
    let file = e.target.files[0];
    setBanner(e.target.files);
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      if (fileReader.result !== null) {
        setBannerFile(fileReader.result.toString())
      }
    };
    fileReader.readAsDataURL(file)
  }

  const handleSave = async () => {
    if (profileFile !== "" && bannerFile !== "" ) {
      const client = new Web3Storage({ token:web3Token })
      const cid_profile = await client.put(profile, {})
      const cid_banner = await client.put(banner, {})

      const instance = axios.create({
        baseURL: 'http://localhost:5000/api/',
        timeout: 1000, 
        headers: {'Content-Type': 'application/json'}
      });

      instance.post('profile/save', {
        wallet: newWallet,
        linkNft: linkNft,
        username: username,
        profileImg:{cid:cid_profile, name:profile[0]['name']},
        bannerImg:{cid:cid_banner, name:banner[0]['name']},
        email: email,
        bio: bio,
        twitter: twitter,
        instagram: instagram,
        discord: discord,
        facebook: facebook,
        tiktok: tiktok
      })
    }
  }

  useEffect(()=>{
      dispatch(getProfileSide(account));
  }, [])

  useEffect(()=>{
    // if (profileStore.profile == {}) {
      // profile: {_id:"", wallet:"", profileImg:{cid:"", name:""}, username:"", bio:"", email:"", twitter:"", instagram:"", discord:"", facebook:"", tiktok:""}
      setNewWallet(profileStore.profile.wallet);
      if (profileStore.profile.profileImg.cid !== "") setProfileFile(`https://${profileStore.profile.profileImg.cid}.ipfs.dweb.link/${profileStore.profile.profileImg.name}`);
      if (profileStore.profile.bannerImg.cid !== "") setBannerFile(`https://${profileStore.profile.bannerImg.cid}.ipfs.dweb.link/${profileStore.profile.bannerImg.name}`);
      setUsername(profileStore.profile.username);
      setBio(profileStore.profile.bio);
      setEmail(profileStore.profile.email);
      setTwitter(profileStore.profile.twitter);
      setInstagram(profileStore.profile.instagram);
      setDiscord(profileStore.profile.discord);
      setFacebook(profileStore.profile.facebook);
      setTiktok(profileStore.profile.tiktok);
      // setProfile(profileStore.profile.wallet);

    // }
  }, [profileStore.profile])

  return (
    <>
      <h1 className="text-dark-light">Profile Setting</h1>
      <Row className="settings-body-profile">
        <Stack direction="horizontal" gap={5} className="settings-body-profile-preview">
          <div>
            <h2 className="text-dark-light">Profile Image 
              <OverlayTrigger
                placement="top-start"
                delay={{ show: 250, hide: 400 }}
                overlay={renderProfileTooltip}
              >
                <img className="ps-2" src="/icons/info.png" />
              </OverlayTrigger>
              
            </h2>
            <Image
              src={profileFile !== "" ? profileFile: "/images/profile.png"}
              className="settings-body-profile-image"
              width={200}
              height={200}
              roundedCircle
              onClick={profileSelect}
            />
            <input type="file" id="profile_input" style={{display:'none'}} onChange={profileChange} />
          </div>
          <div>
            <h2 className="text-dark-light">Profile Banner
              <OverlayTrigger
                placement="top-start"
                delay={{ show: 250, hide: 400 }}
                overlay={renderBannerTooltip}
              >
                <img className="ps-2" src="/icons/info.png" />
              </OverlayTrigger>
            </h2>
            <Image
              src={bannerFile !== "" ? bannerFile: "/images/profile-banner.png"}
              className="settings-body-profile-banner"
              height={200}
              rounded
              onClick={bannerSelect}
            />
            <input type="file" id="banner_input" style={{display:'none'}} onChange={bannerChange} />
          </div>
        </Stack>
        <div className="mb-2">
          <h2 className="text-dark-light">Link NFT</h2>
          <Stack direction="horizontal" gap={2}>
            <FormControl className="input-dark-light" value={linkNft} onChange={(e)=>setLinkNft(e.target.value)} />
            <Button size="lg">Connect</Button>
          </Stack>
        </div>
        <div className="mb-2">
          <h2 className="text-dark-light">Username</h2>
          <FormControl className="input-dark-light" value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className="mb-2">
          <h2 className="text-dark-light">Personal Bio</h2>
          <FormControl className="input-dark-light" as="textarea" value={bio} onChange={(e)=>setBio(e.target.value)} />
        </div>
        <div className="mb-2">
          <h2 className="text-dark-light">Email</h2>
          <FormControl className="input-dark-light" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="mb-2">
          <h2 className="text-dark-light">Linked Wallets</h2>
          {walletData.map((item, i)=> {
              return <Stack key={i} direction="horizontal" gap={2}> <InputGroup>
                <InputGroup.Text className="prefix-icon"><img src="/icons/Frame.png" className="px-1" /></InputGroup.Text>
                  <FormControl className="input-dark-light" type="text" value={item} aria-label="With textarea" />
                </InputGroup>
                <Button size="lg">Copy</Button>
              </Stack>
          })}
          <Stack direction="horizontal" gap={2}>
            <FormControl  className="input-dark-light" type="text" value={newWallet} onChange={(e)=>setNewWallet(e.target.value)} />
            <Button size="lg" onClick={()=>addWallet()}>+</Button>
          </Stack>
        </div>
        <div className="mb-2 mt-1">
          <h2 className="text-dark-light">Social Connections</h2>
          <Stack direction="horizontal" gap={2}> 
            <InputGroup>
              <InputGroup.Text className="prefix-social-icon"><img src="/icons/twitter.png" className="px-1" /></InputGroup.Text>
              <FormControl className="input-dark-light" type="text" aria-label="With textarea" placeholder="Link Twitter" value={twitter} onChange={(e)=>setTwitter(e.target.value)}  />
            </InputGroup>
          </Stack>
          <Stack direction="horizontal" gap={2}> 
            <InputGroup>
              <InputGroup.Text className="prefix-social-icon"><img src="/icons/instagram.png" className="px-1" /></InputGroup.Text>
              <FormControl className="input-dark-light" type="text" aria-label="With textarea" placeholder="Link Instagram" value={instagram} onChange={(e)=>setInstagram(e.target.value)} />
            </InputGroup>
          </Stack>
          <Stack direction="horizontal" gap={2}> 
            <InputGroup>
              <InputGroup.Text className="prefix-social-icon"><img src="/icons/discord.png" className="px-1" /></InputGroup.Text>
              <FormControl className="input-dark-light" type="text" aria-label="With textarea" placeholder="Link Discord" value={discord} onChange={(e)=>setDiscord(e.target.value)} />
            </InputGroup>
          </Stack>
          <Stack direction="horizontal" gap={2}> 
            <InputGroup>
              <InputGroup.Text className="prefix-social-icon"><img src="/icons/facebook.png" className="px-1" /></InputGroup.Text>
              <FormControl className="input-dark-light" type="text" aria-label="With textarea" placeholder="Link Facebook" value={facebook} onChange={(e)=>setFacebook(e.target.value)} />
            </InputGroup>
          </Stack>
          <Stack direction="horizontal" gap={2}> 
            <InputGroup>
              <InputGroup.Text className="prefix-social-icon"><img src="/icons/tiktok.png" className="px-1" /></InputGroup.Text>
              <FormControl className="input-dark-light" type="text" aria-label="With textarea" placeholder="Link Tiktok" value={tiktok} onChange={(e)=>setTiktok(e.target.value)} />
            </InputGroup>
          </Stack>
        </div>
        <div className="mb-2 ms-5 ps-5 mt-4 pt-4">
          <Button size="lg" onClick={handleSave}>Save</Button>
          <Button size="lg" className="mx-3" variant="light">
            Cancel
          </Button>
        </div>
      </Row>
    </>
  );
};

export { ProfileSetting };
