
import React, { useState } from 'react';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../utils/firebase';
const SignIn = () => {
    const [Email, setEmail] = useState("")
    const [password, setpassword] = useState("")
    const navigation = useNavigate()
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setEmail(values.Email)
        setpassword(values.password)
        signInWithEmailAndPassword(auth, Email, password).then(()=>navigation("/"))
        .catch((err)=>console.log(err))
    };
 const googleSignIn = () =>{
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    signInWithPopup(auth, provider)
  .then((result) => {
     console.log(result)
  }).catch((error) => {
  console.log(error)
  }); 
}

    return (
        <div className='flex justify-center items-center h-screen'>
            <Form className='shadow-slate-200 bg-white shadow-sm w-96 h-auto  m-4 rounded-sm p-4 '
                name="login"
                initialValues={{
                    remember: true,
                }}
                style={{
                    maxWidth: 360,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="Email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item>
                    <Flex justify="space-between" align="center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Flex>
                </Form.Item>

                <Form.Item>
                    <Button block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    <div className='mt-3 text-center'>
                        <Link className='text-center hover:text-black cursor-text w-full flex justify-center gap-1' to={"/SignUp"}> No account ? <span className='hover:text-blue-400 cursor-pointer hover:underline'>Sign up</span></Link>
                    </div>
                    <div className="my-6 flex items-center justify-center">

                        <hr className="w-full border-gray-300" />
                        <span className="mx-4 text-gray-600">or</span>
                        <hr className="w-full border-gray-300" />
                    </div>
                    <Button onClick={googleSignIn} type="primary" danger className='w-full mt-3' >
                        <GoogleOutlined />
                        Login with Google
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );

};
export default SignIn;