interface NFT {
  id: string;
}
type LinkItem = {
  text: string;
  link: string;
};
type DiscoverRouteParamProps = {
  type: string;
};

export { type NFT, type LinkItem, type DiscoverRouteParamProps };
