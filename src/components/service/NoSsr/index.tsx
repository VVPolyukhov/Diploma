import dynamic from 'next/dynamic';
import React, { PropsWithChildren } from 'react';

interface IProps {}
const NoSsr: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  return <>{children}</>
}

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false
})