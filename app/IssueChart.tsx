'use client';

import { Card, Flex, Heading } from '@radix-ui/themes';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: 'Open', value: open },
    { label: 'In progress', value: inProgress },
    { label: 'Closed', value: closed },
  ];

  return (
    <Card>
      {!open && !inProgress && !closed ? (
        <Flex height='300px' justify='center' align='center'>
          <Heading as='h1'>Add Issues First! 📊</Heading>
        </Flex>
      ) : (
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <XAxis dataKey='label' />
            <YAxis />
            <Bar dataKey='value' barSize={60} style={{ fill: 'var(--accent-9)' }} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default IssueChart;
