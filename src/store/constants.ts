import { LinkItem } from './types';

const categories: LinkItem[] = [
  { text: 'art', link: 'art' },
  { text: 'music', link: 'music' },
  { text: 'photography', link: 'photo' },
  { text: 'utility', link: 'utility' },
  { text: 'videos', link: 'videos' },
  { text: 'domain names', link: 'domain' },
];
const chains = ['ethereum', 'polygon', 'solana'];
const chainImage=["/icons/ethereum-logo.png", "/icons/polygon-logo.png", "/icons/solana-logo.png"]
const chainData = [
  {name:"All Chains", image:'/icons/blank.png'},
  {name:"Ethereum", image:"/icons/ethereum-logo.png"},
  {name:"Polygon", image:"/icons/polygon-logo.png"},
  {name:"Solana", image:"/icons/solana-logo.png"},
]
const durations = ['last 24 hours', 'last 7 days', 'last 30 days'];
const sortMethod = ["Price:High to Low", "Price:Low to High"];
const collectionType = ["Single Items", "Multiple Items"];
const currencyType = ["United States Dollar(USD)", "Ethereum(Eth)", "Polygon(Matic)"];

const MENUITEM = ["Discover", "Activity", "Learn", "Create", "Profile"];

const SubMenuList = [
  { text: 'trending', link: 'art' },
  { text: 'art', link: 'art' },
  { text: 'music', link: 'music' },
  { text: 'photography', link: 'photo' },
  { text: 'utility', link: 'utility' },
  { text: 'videos', link: 'videos' },
  { text: 'domain names', link: 'domain' },
];

const web3Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzYUVkQzEwOTYxRWY0RjRhNWI4QjM3RjgzYjAyNUI2MjMwYjhDOTYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTMyNDI3ODk1MjYsIm5hbWUiOiJtaS1tZXRhIn0.2GwE6AHabOC18PRqUOUHSuLc-MB6Vz3dtVEgjbKmPeo";

export { categories, chains, durations, MENUITEM, SubMenuList, sortMethod, collectionType, currencyType, chainImage, chainData, web3Token};
