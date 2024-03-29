import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Spin, Form, Input, Button, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CryptoJS from "crypto-js";
import { useRequest } from "ahooks";
import { userLogin, userRegister, findEmail } from "@/api/login";
import { setToken, setUserInfo } from "@/store";
import { EmailRegexp, formatGMTTime } from "@/utils";

interface OverlayType {
  isLogin: boolean;
  step: number;
}
const Login: React.FC = () => {
  const state: any = useSelector((state) => state);
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const [overlay, setOverlay] = useState<OverlayType>({
    isLogin: true,
    step: 100,
  });
  const [loginForm, setLoginForm] = useState<any>({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState<any>({
    email: "",
    password: "",
  });
  const { loading: loadingUserLogin, runAsync: runUserLogin } = useRequest(
    (params: object) => userLogin(params),
    { manual: true, throttleWait: 1000 }
  );
  const { loading: loadingUserRegister, runAsync: runUserRegister } =
    useRequest((params: object) => userRegister(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingFindEmail, runAsync: runFindEmail } = useRequest(
    (params: object) => findEmail(params),
    { manual: true, throttleWait: 1000 }
  );

  const handleToggleOverlay = (step: number) => {
    setOverlay({ isLogin: !overlay.isLogin, step });
  };
  const handleInputChange = (
    event: any,
    formType: string,
    labelName: string
  ) => {
    event.preventDefault();
    if (formType === "login") {
      loginForm[labelName] = event?.target?.value;
      setLoginForm(loginForm);
    } else {
      registerForm[labelName] = event?.target?.value;
      setRegisterForm(registerForm);
    }
  };
  const handleLogin = (values: object) => {
    const params = JSON.parse(JSON.stringify(values));
    params["password"] = CryptoJS.MD5(params["password"]).toString();

    runUserLogin(params)
      .then((response: any) => {
        const { token, userInfo } = response;

        const tokenAction = setToken(token);
        const userInfoAction = setUserInfo(userInfo);
        userDispatch(tokenAction);
        userDispatch(userInfoAction);
        localStorage.setItem("user", JSON.stringify({ token, userInfo }));

        // navigate("/home");

        window.location.replace("http://localhost:3000/#/login?isLogin");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        message.error("登陆失败");
      });
  };
  const handleAuthRegistered = (event: any) => {
    const params = { email: event?.target?.value };
    runFindEmail(params)
      .then((response: any) => {
        const { result } = response;
        if (result.length !== 0) {
          setRegistered(true);
          return message.error("该邮箱已注册，请登录");
        }
        setRegistered(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleRegister = () => {
    if (registered) {
      return message.error("该邮箱已注册，请登录");
    }
    const params = JSON.parse(JSON.stringify(registerForm));
    params.password = CryptoJS.MD5(params?.password).toString();

    runUserRegister(params)
      .then(() => {
        message.loading({
          content: "注册成功，正在为你登录...",
          key: "loading",
        });
        setLoginForm(registerForm);
        handleLogin(registerForm);
      })
      .catch((error) => {
        console.log(error);
        message.error("注册失败");
      })
      .finally(() => {
        message.destroy("loading");
      });
  };
  useEffect(() => {
    setLoading(loadingUserLogin || loadingUserRegister);
  }, [loadingUserLogin, loadingUserRegister]);

  useEffect(() => {
    const dataJSON: any = localStorage.getItem("user");
    const data = dataJSON ? JSON.parse(dataJSON) : null;
    if (location.search.slice(1) === "isLogin" && !!data?.token) {
      const {
        last_login_time = "1970-01-01 00:00:00",
        last_login_ip = "127.0.0.1",
      } = state?.user?.userInfo || {};

      navigate("/home");

      message.success("登陆成功");
      message.info(
        `上次登录时间：${formatGMTTime(
          last_login_time
        )} 上次登录IP：${last_login_ip}`,
        13
      );
    }
  }, []);
  return (
    <Spin
      spinning={loadingUserLogin || loadingUserRegister || loadingFindEmail}
    >
      <div className="flex justify-center items-center w-screen h-screen bg-slate-100">
        <div className="flex w-2/5 h-1/2 bg-slate-50 relative shadow-2xl overflow-hidden rounded-xl">
          <div className="w-1/2">
            <h1 className="text-black text-2xl py-6 mt-4 text-center font-bold">
              登录
            </h1>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              name="basic"
              className="flex justify-center items-center flex-col p-0 h-3/4 text-center"
              initialValues={loginForm}
              onFinish={handleLogin}
            >
              <Form.Item
                label="邮箱"
                name="email"
                className="p-3 w-full"
                rules={[
                  {
                    required: true,
                    message: "邮箱不能为空!",
                  },
                  {
                    pattern: EmailRegexp,
                    message: "邮箱格式不正确!",
                  },
                ]}
              >
                <Input
                  autoComplete="off"
                  onChange={(event: any) =>
                    handleInputChange(event, "login", "email")
                  }
                />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                className="p-3 w-full"
                rules={[
                  {
                    required: true,
                    message: "密码不能为空!",
                  },
                  {
                    min: 6,
                    message: "密码长度不能少于六位!",
                  },
                ]}
              >
                <Input.Password
                  onChange={(event: any) =>
                    handleInputChange(event, "login", "password")
                  }
                />
              </Form.Item>
              <Link to="/forget" className="mx-0 my-1 text-black">
                忘记密码
              </Link>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button
                  type="primary"
                  disabled={loading ? true : false}
                  htmlType="submit"
                >
                  {loading ? <LoadingOutlined className="mr-1" /> : null}登录
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="w-1/2">
            <h1 className="text-black text-2xl py-6 mt-4 text-center font-bold">
              注册
            </h1>
            <Form
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 16 }}
              name="basic"
              className="flex justify-center items-center flex-col p-0 h-3/4 text-center"
              initialValues={registerForm}
              onFinish={handleRegister}
            >
              <Form.Item
                label="邮箱"
                name="email"
                className="p-3 w-full"
                rules={[
                  {
                    required: true,
                    message: "邮箱不能为空!",
                  },
                  {
                    pattern: EmailRegexp,
                    message: "邮箱格式不正确!",
                  },
                ]}
              >
                <Input
                  autoComplete="off"
                  onChange={(event: any) =>
                    handleInputChange(event, "register", "email")
                  }
                  onBlur={handleAuthRegistered}
                />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                className="p-3 w-full"
                rules={[
                  {
                    required: true,
                    message: "密码不能为空!",
                  },
                  {
                    min: 6,
                    message: "密码长度不能小于六位!",
                  },
                ]}
              >
                <Input.Password
                  onChange={(event: any) =>
                    handleInputChange(event, "register", "password")
                  }
                />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                <Button
                  type="primary"
                  disabled={loading ? true : false}
                  htmlType="submit"
                >
                  {loading ? <LoadingOutlined className="mr-1" /> : null}注册
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div
            className="absolute w-1/2 h-full bg-green-800"
            style={{
              transform: "translateX(" + overlay.step + "%)",
              transition: "ease all 0.5s",
            }}
          >
            {overlay.isLogin ? (
              <section className="flex flex-col justify-center items-center mt-36">
                <h1 className="text-center text-white text-4xl font-bold">
                  注册新账号！
                </h1>
                <p className="text-white text-sm font-thin leading-5 tracking-wider mx-0 my-8">
                  输入您的个人信息注册账号。
                </p>
                <button
                  className="border border-solid border-white rounded-2xl text-xs font-bold bg-green-700 px-12 py-3 text-white outline-none cursor-pointer"
                  onClick={() => handleToggleOverlay(0)}
                >
                  注册
                </button>
              </section>
            ) : (
              <section className="flex flex-col justify-center items-center mt-36">
                <h1 className="text-center text-white text-4xl font-bold">
                  欢迎回来！
                </h1>
                <p className="text-white text-sm font-thin leading-5 tracking-wider mx-0 my-8">
                  请您先登录的个人信息，进行操作。
                </p>
                <button
                  className="border border-solid border-white rounded-2xl text-xs font-bold bg-green-700 px-12 py-3 text-white outline-none cursor-pointer"
                  onClick={() => handleToggleOverlay(100)}
                >
                  登录
                </button>
              </section>
            )}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Login;
