import { Button, Form, Input, Typography, Flex, theme } from "antd";
import banner from "@/assets/banner/banner.svg";
import { useLogin, type ILoginRequestType } from "@/services";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "@/hooks";

const { Title, Text } = Typography;
const { useToken } = theme;

export const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { actions } = useGlobal();
  const { token } = useToken();

  const { fetchData, loading } = useLogin({
    showLoading: true,
    success: {
      message: "Successfully login",
      action: ({ data }) => {
        if (data) {
          actions.set({ token: data.access });
          navigate("/dashboard");
        }
      },
    },
  });

  const handleSubmit = async (values: ILoginRequestType) => {
    fetchData({
      data: {
        email: values.email,
        password: values.password,
      },
    });
  };

  return (
    <Flex style={{ height: "100vh" }}>
      <Flex
        justify="center"
        align="center"
        style={{
          width: "50%",
          backgroundColor: token.colorPrimary,
        }}
      >
        <div style={{ width: "50%" }}>
          <img style={{ width: "100%" }} src={banner} alt="Login Banner" />
        </div>
      </Flex>

      <Flex
        justify="center"
        align="center"
        style={{
          width: "50%",
          position: "relative",
        }}
      >
        <Flex vertical align="center" gap="large" style={{ width: "40%" }}>
          <div style={{ textAlign: "center" }}>
            <Title level={2}>Login to your account</Title>
            <Text type="secondary">
              Enter your email below to login to your account
            </Text>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{ width: "100%" }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Invalid email address",
                },
              ]}
            >
              <Input placeholder="m@example.com" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password onPressEnter={() => form.submit()} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Login
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Flex>
  );
};
