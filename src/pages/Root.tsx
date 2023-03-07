import { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ThemeContext } from '../providers';
import {
  Explore,
  Home,
  Collection,
  Activity,
  Auctions,
  Create,
  Detail,
  Learn,
  Drops,
  Profile,
  Settings,
  Discover,
  Assets,
  Login
} from '../pages';
import {
  Header,
  Footer,
  Contact,
  ProfileSetting,
  CommunicationSetting,
  SecuritySetting,
  MyCollections,
  CreatedItems,
  FavoriteItems,
  HiddenItems,
  ActivityProfile,
  OffersProfile,
  ListingsProfile,
  WatchListProfile,
  SettingsProfile,
  ChooseBlockchain,
  ChooseType,
  CreateComp,
  CreateCollection,
  NotFound
} from '../components';

function Root() {
  const { theme } = useContext(ThemeContext);
  return (
    <Container className={`App ${theme}`} fluid>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/create" element={<Create />}>
            <Route path="" element={<ChooseBlockchain />} />
            <Route path="blockchain" element={<ChooseBlockchain />} />
            <Route path="type" element={<ChooseType />} />
            <Route path="create" element={<CreateComp />} />
            <Route path="collection" element={<CreateCollection />} />
          </Route>
          <Route path="/detail/:nftId" element={<Detail />} />
          <Route path="/drops" element={<Drops />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/discover-collection" element={<Explore />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/collection/:collectionId" element={<Collection />} />
          <Route path="/profile" element={<Profile />}>
            <Route path="" element={<MyCollections />} />
            <Route path="collections" element={<MyCollections />} />
            <Route path="created" element={<CreatedItems />} />
            <Route path="favorites" element={<FavoriteItems />} />
            <Route path="hidden" element={<HiddenItems />} />
            <Route path="activity" element={<ActivityProfile />} />
            <Route path="offers" element={<OffersProfile />} />
            <Route path="listings" element={<ListingsProfile />} />
            <Route path="watchlist" element={<WatchListProfile />} />
            <Route path="settings" element={<SettingsProfile />} />
          </Route>
          <Route path="/settings" element={<Settings />}>
            <Route path="" element={<ProfileSetting />} />
            <Route path="profile" element={<ProfileSetting />} />
            <Route path="communication" element={<CommunicationSetting />} />
            <Route path="security" element={<SecuritySetting />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Contact />
      <Footer />
    </Container>
  );
}

export { Root };
