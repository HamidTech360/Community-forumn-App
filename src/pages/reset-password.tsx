import React, {useState, useRef} from "react";
import { Button, Container, Form, Image, InputGroup } from "react-bootstrap";
import {BiHide, BiShow} from 'react-icons/bi'

const ResetPassword = () => {
  const showPrependStyles = {
    backgroundColor:'whitesmoke', 
    border:'0px',
    cursor:'pointer'
  }
  const [showPassword, setShowPassword] = useState(false)
  const [showCPassword, setShowCPassword] = useState(false)

  const passwordRef = useRef()
  const c_passwordRef = useRef()
  const [formData, setFormData] = useState({
    password:'',
    c_password:''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  
  };

  const handleShowPassword = (ref:any)=>{
    ref.current.type="text"
    if(ref.current.name=="password"){
        setShowPassword(true)
    }else if(ref.current.name=="c_password"){
      setShowCPassword(true)
    }
  }

  const handleHidePassword = (ref:any)=>{
    ref.current.type="password"
    if(ref.current.name=="password"){
      setShowPassword(false)
    }else if(ref.current.name=="c_password"){
      setShowCPassword(false)
    }
  }
  return (
    <Container
      style={{ minHeight: "60vh" }}
      className=" d-flex mt-5 flex-column align-items-center justify-content-center"
    >
      
      <div
        className="p-4  mb-3position-relatived-flex justify-content-center flex-column align-items-center"
        style={{ maxWidth: "663px" }}
      >
        <div>
          <h2 className="text-center ">Forgot Password?</h2>
          <p style={{ lineHeight: "1.5" }} className="text-center">
            Please enter a new password of your choice. Your new password should be at least 5 characters long.
          </p>
        </div>
        <Form
          // onSubmit={handleSubmit}
          className="p-3"
          style={{
            background: "#F5FEFF",
            border: "0.2px solid #0B5351",
            borderRadius: 10,
          }}
        >
          <Form.Group style={{marginBottom:'30px'}}>
            <Form.Label>New Password</Form.Label>
           <InputGroup>
            <Form.Control
                name="password"
                placeholder="Enter new password"
                type="password"
                onChange={handleChange}
                ref={passwordRef}
              />
              
              <InputGroup.Text style={showPrependStyles}>
                 {showPassword? 
                 <BiShow size={23} onClick={()=>handleHidePassword(passwordRef)} />:
                 <BiHide size={23} onClick={()=>handleShowPassword(passwordRef)} />
                 }
              </InputGroup.Text>
           </InputGroup>
          </Form.Group>

          <Form.Group>
            <Form.Label>Comfirm Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                name="c_password"
                placeholder="Re-enter new password"
                onChange={handleChange}
                ref={c_passwordRef}
              />
              <InputGroup.Text style={showPrependStyles}>
                 {showCPassword?
                 <BiShow size={23} onClick={()=>handleHidePassword(c_passwordRef)} />:
                 <BiHide size={23} onClick={()=>handleShowPassword(c_passwordRef)} />
                 }
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button className="px-3" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      {/* <Image
        src="/assets/ellipse-intro-top.png"
        className="vector-2"
        alt=""
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: "rotate(180deg) translate(-50%,20%)",
        }}
        fluid
      /> */}
    </Container>
  )
};

export default ResetPassword;
