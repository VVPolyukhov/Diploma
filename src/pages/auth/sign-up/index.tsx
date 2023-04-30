import AuthLayout from "components/service/AuthLayout";
import SignUp from "components/tree/Auth/SignUp";
import { NextPage } from "next";

const SignUpPage: NextPage = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;
