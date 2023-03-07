import React, {useState, useEffect} from 'react';
import { Dropdown, Stack, Image } from 'react-bootstrap';
import './dropdown.comp.style.scss';

const DropdownComp = ({ items, clickHandler, initialValue}: { items: React.ReactNode[], clickHandler?:Function, initialValue?:any }) => {
  const [itemKey, setItemKey] = useState(0);

  const handleClick = (key:number) => {
    setItemKey(key);
    if (clickHandler !== undefined) {
      clickHandler(items[key]?.toString());
    }
  }

  useEffect(()=>{
    if (initialValue !== undefined && items.findIndex((each)=>each == initialValue) != -1) {
      setItemKey(items.findIndex((each)=>each == initialValue));
    }
  }, [])

  return (
    <Dropdown className="dropdown-comp">
      <Dropdown.Toggle variant="" id="dropdown-basic">
        <Stack direction="horizontal" gap={5}>
          <span>{items[itemKey]}</span>
          <Image src={`/icons/arrow-down.png`} />
        </Stack>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {items.map((item: React.ReactNode, key: number) => {
          return (
            clickHandler == undefined ? <Dropdown.Item href={`#/action-${key}`} key={key} onClick={()=>handleClick(key)}>
              {item}
            </Dropdown.Item> : <Dropdown.Item href={`#/action-${key}`} key={key} onClick={()=>handleClick(key)}>
              {item}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { DropdownComp };
