import { ROUTES } from 'constants/shared/routes';
import { NextPage } from 'next';
import Link from 'next/link';

const PrivatePage: NextPage = () => {
  return <>PrivatePage<Link href={ROUTES.HOME.PATHNAME}>home</Link></>
}

export default PrivatePage