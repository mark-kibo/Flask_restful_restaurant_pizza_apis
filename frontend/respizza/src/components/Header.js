import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
function Header() {

    const {active , setActive}= useState(false)

    function handleActive(){
        setActive(!active)
    }
  return (
    <Navbar fluid rounded className='bg-[#FFA500;]'>
      <Navbar.Brand as={Link} href="">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ResPizza app</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={active} className="text-2xl capitalize" onClick={handleActive}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/pizza" active={active} className="text-2xl capitalize" onClick={handleActive}>
          pizza
        </Navbar.Link>
        <Navbar.Link href="/restaurants" active={active} className="text-2xl capitalize" onClick={handleActive}>restaurants</Navbar.Link>
        <Navbar.Link href="/addrestaurantpizza" active={active} className="text-2xl capitalize" onClick={handleActive}>add restaurant pizza</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}


export default Header;