import { MoonOutlined, SearchOutlined, ShoppingOutlined, SunOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge,Popover } from 'antd';
import { createContext, useContext, useState } from 'react';
import { SearchContext } from '../ContextApi/Searchbar ';
import { Link } from 'react-router-dom';
import { CartContext } from '../ContextApi/CartIncrement';
import { Theme } from '../ContextApi/Theme';
import { UserContext } from '../ContextApi/user';

const Header = () => {
  const { setsearch } = useContext(SearchContext)
  const { cart } = useContext(CartContext);
  const { setTheme, theme } = useContext(Theme)
  const {usershow} = useContext(UserContext)
  console.log(usershow)
  const popoverContent = (
    <div>

      {console.log(usershow.userInfo.email)}
      <p>Email:{usershow.userInfo.email}</p>
    </div>
  );
 function check(){
  setTheme("Light")
 }
 function check1(){
  setTheme("Dark")
 }
  return (
    <div className='sticky top-0 z-30'>
      <nav className={`flex h-16 justify-between  items-center ${theme == "Dark" ? "bg-gray-900 text-white" : " bg-white text-gray-900"} shadow-md px-6`}>
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Logo</h1>
        </div>

        <div className={`w-1/2 h-10 rounded-full ${theme == "Dark" ? "bg-white text-gray-500" : "bg-gray-900 text-white" } flex items-center mx-4`}>
          <input
            className={`${theme == "Dark" ? "bg-white" : "bg-slate-900"} w-full h-full rounded-full outline-none p-2 pl-5 `}
            placeholder="Search Product..."
            type="text"
            onChange={(e) => setsearch(e.target.value)}
          />

          <SearchOutlined className="text-xl pr-4 " />
        </div>

        <div className="flex items-center space-x-4">
          <Link to={"cart"}>
            <Badge size="small" count={cart} showZero>
              <ShoppingOutlined className={` ${theme == "Dark" ? "text-white" : "text-gray-500"}  text-2xl cursor-pointer`} title="Cart" />
            </Badge>
          </Link>
          {theme == "Dark" ? (
            <MoonOutlined onClick={check} className="text-white text-2xl cursor-pointer" title="Theme" />
          ) : ( <SunOutlined className='text-2xl  cursor-pointer' onClick={check1} />)
        }
           <Popover content={popoverContent}  trigger={["hover", "click"]}>
      <Link to={"/SignIn"}>
        <Avatar
          shape="circle"
          className="text-white text-2xl cursor-pointer"
          
          size={40}
          icon={<UserOutlined />}
        />
      </Link>
    </Popover>
         
        </div>
      </nav>
    </div>

  );
}



export default Header;
