'use client'

import { TailSpin } from 'react-loader-spinner'

export default function Loader() {
  return (
    <TailSpin
      visible={true}
      height="80"
      width="80"
      color="#2563EB"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
