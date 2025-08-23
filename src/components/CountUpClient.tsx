"use client";

import React from 'react';
import CountUp from './CountUp';

type Props = React.ComponentProps<typeof CountUp>;

const CountUpClient: React.FC<Props> = (props) => {
  return <CountUp {...props} />;
};

export default CountUpClient;
