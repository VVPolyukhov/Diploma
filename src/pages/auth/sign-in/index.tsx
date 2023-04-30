import AuthLayout from 'components/service/AuthLayout'
import SignIn from 'components/tree/Auth/SignIn'
import { NextPage } from 'next'

const SignInPage: NextPage = () => {
  return <AuthLayout><SignIn /></AuthLayout>
}

export default SignInPage