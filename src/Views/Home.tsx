import * as React from 'react';
import { Banner } from '../components/Banner';

export interface Props {
}

export function Home(props: Props) {
  return (
    <div>
      <Banner />
    </div>
  );
}
