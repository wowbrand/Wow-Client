import * as React from 'react';
import { Banner } from '../components/Banner';
import "./Home.css"

export interface Props {
}

export function Home(props: Props) {
  return (
    <div>
      <Banner />
    </div>
  );
}
