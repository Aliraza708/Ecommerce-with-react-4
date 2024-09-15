
import React, { useState } from 'react';
import { Button, Form, Input, Upload } from 'antd';
import { GoogleOutlined, UploadOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { auth, db, storage } from '../../utils/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
const MyFormItemContext = React.createContext([]);
function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);
  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};
const MyFormItem = ({ name, ...props }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;
  return <Form.Item name={concatName} {...props} />;
};

const SignUp = () => {
  const [userProfile,setUserProfile]= useState([])
  const [Email,setemail] = useState("")
  const [UserImage,setuserImage] = useState("")
  const [Password,setPassword] = useState("")
  const navigation = useNavigate()
  const onFinish = (value) => {
    setUserProfile(value)   
    setemail(value.user.Email)
    setPassword(value.user.Password)
    const ProfileObj ={
        Email : value.user.Email,
        Name : value.user.Name,
        Age : value.user.age,
        ImageUrl : UserImage 
    }   
    createUserWithEmailAndPassword(auth,Email,Password).then(()=>{
      console.log("Create Acount Successful")
      const docRef = doc(db,"user",auth.currentUser.uid)
      setDoc(docRef,ProfileObj).then(()=>navigation("/"))
      .catch((err)=>console.log(err))
    }).catch((err)=>{
      console.log("err",err)
    })
  };
  const handleUpload = (info) => {
    const image = info.file.originFileObj
    const imageRef = ref(storage,`usersProfiles/${info.file.name}`)
    uploadBytes(imageRef,image).then(()=>{
      console.log("upload Image")
      getDownloadURL(imageRef).then((url)=>setuserImage(url)).catch((err)=>console.log(err))
    }).catch((err)=>console.log(err))
  };
  function googlSignUp(){
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        signInWithPopup(auth, provider)
      .then((result) => {
         console.log(result)
         navigation("/")
      }).catch((error) => {
      console.log(error)
      }); 
  }
//  console.log(userProfile)
  return (
    <div className=' flex justify-center'>
      <Form name="form_item_path" layout="vertical" className='shadow-slate-200 bg-white shadow-sm w-96 h-auto  m-4 rounded-sm p-4 ' onFinish={onFinish}>
        <h1 className='text-center font-black text-2xl'>Create Account</h1>
        <MyFormItemGroup prefix={['user']}>
          {/* <MyFormItemGroup prefix={['name']}> */}
          <MyFormItem required name="Name" label="Name">
            <Input required />
          </MyFormItem>
          <MyFormItem required name="Email" label="Email">
            <Input required />
          </MyFormItem>
          <MyFormItem required name="Password" label="Password">
            <Input required type='Password' />
          </MyFormItem>

          <MyFormItem required name="age" label="Age">
            <Input required />
          </MyFormItem>

          <Upload onChange={handleUpload}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>

        </MyFormItemGroup>

        <Button type="primary" className='w-full mt-4 ' htmlType="submit">
          SignUp
        </Button>
        <Link className='hover:text-black cursor-text text-center w-full flex justify-center gap-1 mt-3' to={"/SignIn"}> Already have an acount ? <span className='hover:text-blue-400 cursor-pointer hover:underline'>Sign In</span></Link>
        <div className="my-6 flex items-center justify-center">

          <hr className="w-full border-gray-300" />
          <span className="mx-4 text-gray-600">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        <Button onClick={googlSignUp} type="primary" danger className='w-full mt-3' >
          <GoogleOutlined />
          Sign Up with Google
        </Button>


      </Form>
    </div>
  );
};
export default SignUp;
