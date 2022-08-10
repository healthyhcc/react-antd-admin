import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import {
  Spin,
  Card,
  Form,
  Input,
  Button,
  Space,
  Radio,
  Upload,
  message,
} from "antd";
import { useRequest } from "ahooks";
import Uploading from "@/components/Uploading";
import { getUserDetail, updateUser } from "@/api/user";
import { setUserInfo } from "@/store/actions/user";
import { EmailRegexp, PhoneRegexp } from "@/utils";
import { SERVER_ADDRESS } from "@/utils/config";

const BasicInfo = (props) => {
  const { user, setUserInfo } = props;
  const { userInfo } = user;
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const formRef = useRef();
  const initialForm = {
    id: 0,
    username: "",
    gender: 0,
    role: 1,
    avatar: "",
    phone: "",
    email: "",
    remark: "",
  };
  const { loading: loadingGetUserDetail, runAsync: runGetUserDetail } =
    useRequest((params) => getUserDetail(params), {
      manual: true,
      throttleWait: 1000,
    });
  const { loading: loadingUpdateUser, runAsync: runUpdateUser } = useRequest(
    (params) => updateUser(params),
    { manual: true, throttleWait: 1000 }
  );

  const handleBeforeUpload = (file) => {
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      message.error("只能上传JPG/PNG文件!");
      return false;
    }
    if (file.size / 1024 / 1024 > 2) {
      message.error("图片大小不能超过2MB!");
      return false;
    }
    return true;
  };
  const handleAvatarChange = (avatar) => {
    setUploading(true);
    const { file } = avatar;
    const { status } = file;
    switch (status) {
      case "uploading":
        return setUploading(true);
      case "done":
        const { path } = file.response.file;
        setAvatarUrl(path);
        return setUploading(false);
      case "error":
        return setUploading(false);
      default:
        break;
    }
  };
  const handleSubmitForm = (params) => {
    params["avatar"] = avatarUrl;
    runUpdateUser(params)
      .then(() => {
        setUserInfo({
          ...userInfo,
          username: params["username"],
          avatar: params["avatar"],
        });
        message.success("保存成功");
      })
      .catch((error) => {
        message.error("保存失败");
        console.log(error);
      });
  };
  const handleResetForm = () => {
    const id = formRef.current.getFieldValue("id");
    setAvatarUrl("");
    formRef.current.resetFields();
    formRef.current.setFieldsValue({ id });
  };
  const handleGetUserDetail = () => {
    runGetUserDetail(userInfo.id)
      .then((response) => {
        const { result } = response;
        const data = result[0];

        setAvatarUrl(data.avatar);
        formRef.current.setFieldsValue(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    handleGetUserDetail();
  }, []);

  return (
    <Spin spinning={loadingGetUserDetail || loadingUpdateUser}>
      <Card title="基本资料">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 12 }}
          name="basicinfo"
          ref={formRef}
          initialValues={initialForm}
          onFinish={handleSubmitForm}
        >
          <span style={{ marginLeft: "17%", color: "#999" }} className="ml-1/6">
            不可修改。用户的唯一标识。
          </span>
          <Form.Item label="ID" name="id">
            <Input readOnly />
          </Form.Item>
          <Form.Item label="用户名" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="性别" name="gender">
            <Radio.Group>
              <Radio value={0}>男</Radio>
              <Radio value={1}>女</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="角色" name="role">
            <Radio.Group>
              <Radio value={1}>用户</Radio>
              <Radio value={2}>管理员</Radio>
              <Radio value={3}>超级管理员</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="头像" name="avatar" valuePropName="avatar">
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              action={SERVER_ADDRESS + "/file/uploadAvatar"}
              beforeUpload={handleBeforeUpload}
              onChange={handleAvatarChange}
            >
              {avatarUrl ? (
                <img
                  src={SERVER_ADDRESS + "/" + avatarUrl}
                  alt="获取头像失败"
                  className="w-full h-full"
                />
              ) : (
                <Uploading uploading={uploading} />
              )}
            </Upload>
          </Form.Item>
          <Form.Item
            label="手机"
            name="phone"
            rules={[
              {
                pattern: PhoneRegexp,
                message: "手机格式不正确",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                pattern: EmailRegexp,
                message: "邮箱格式不正确",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input.TextArea rows={4} placeholder="请输入内容" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Space size={20}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
              <Button htmlType="button" onClick={handleResetForm}>
                重新填写
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};

const mapStateToProps = (state) => state;
const mapDispatchToProps = (dispatch) => ({
  setUserInfo: (data) => {
    dispatch(setUserInfo(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
