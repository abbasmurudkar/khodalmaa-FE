"use client";
import styled from "styled-components";
import {
  Form,
  ButtonToolbar,
  Button,
  InputGroup,
  Input,
  Checkbox
} from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { useState } from "react";
import { Vortex } from "@/components/ui/vortex";
import VisibleIcon from "@rsuite/icons/Visible";
import EyeCloseIcon from "@rsuite/icons/EyeClose";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import { auth } from "@/config/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/constant/constant";
import PublicRoute from "@/components/publicRoute";
export default function Home() {
  const [formValue, setFormValue] = useState({ email: "", password: "" });
  const [visible, setVisible] = useState(false);
  const toast = useToast()
  const handleChange = (value, event) => {
    const { name } = event.target;
    setFormValue((prev) => ({ ...prev, [name]: value }));
  };

  const SignInWithCreds = async () => {
    try {
      if (!formValue.email || !formValue.password) {
        return toast.error("Please provide all details");
      }

      const result = await signInWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password
      );

      console.log("RM LoggedIn:", result.user.email);
      toast.success(`Welcome back, ${result.user.email}!`);
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <PublicRoute>
      
   
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-screen w-screen overflow-hidden">
      <Vortex
        className="flex items-center justify-center h-full w-full"
        backgroundColor="rgba(0,0,0,0)"
        rangeY={800}
        particleCount={100}
        baseHue={120}
        baseSpeed={0.5}
        baseRadius={1.5}
        containerClassName="bg-[url('/assets/image.png')] bg-cover bg-center"
      >
        <GlassCard>
          <h1 className="text-3xl font-bold text-center text-white neon-text mb-4">
            Your winning streak starts here.
          </h1>
          <StyledForm fluid onSubmit={SignInWithCreds}>
            <Form.Group controlId="email">
              <Form.ControlLabel className="form-label">Email</Form.ControlLabel>
              <InputGroup>
                <Input
                  type="email"
                  name="email"
                  value={formValue.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="Enter your email"
                />
                <InputGroup.Addon>
                  <UserInfoIcon style={{ fontSize: "20px" }} />
                </InputGroup.Addon>
              </InputGroup>
            </Form.Group>

            <Form.Group controlId="password" style={{ marginBottom: "15px" }}>
              <Form.ControlLabel className="form-label">Password</Form.ControlLabel>
              <InputGroup>
                <Input
                  type={visible ? "text" : "password"}
                  name="password"
                  value={formValue.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <InputGroup.Addon
                  style={{ cursor: "pointer" }}
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? <VisibleIcon /> : <EyeCloseIcon />}
                </InputGroup.Addon>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Checkbox
                onChange={() => setVisible((prev) => !prev)}
                style={{ color: "#fff" }}
              >
                Show Password
              </Checkbox>
            </Form.Group>
            <ButtonToolbar>
              <Button
                appearance="primary"
                color="cyan"
                type="submit"
                block
                className="neon-button"
              >
                Login
              </Button>
            </ButtonToolbar>
          </StyledForm>
        </GlassCard>
      </Vortex>
    </div>
     </PublicRoute>
  );
}

const GlassCard = styled.div`
  background: rgba(20, 20, 20, 0.6);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 520px;
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.2);
  animation: fadeIn 1.2s ease;
  margin: 0 16px;

  @media (max-width: 768px) {
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 20px;
    border-radius: 14px;
    height: 400px;

    h1 {
      font-size: 1.3rem;
    }
  }
`;

const StyledForm = styled(Form)`
  .form-label {
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.5px;
    font-size: 0.95rem;

    @media (max-width: 480px) {
      font-size: 0.85rem;
    }
  }

  input {
    font-size: 0.95rem;
    padding: 10px;
  }
`;

