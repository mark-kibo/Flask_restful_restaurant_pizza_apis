import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

function SearchBar() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' , width:"100%" }}>
      <form className="flex">
        <TextInput id="email1" type="email" placeholder="name@flowbite.com" required style={{ width: '100%' }} className='mx-2' />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
}


export default SearchBar;