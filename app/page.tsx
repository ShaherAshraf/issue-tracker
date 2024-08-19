import { Status } from '@prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import axios from 'axios';
import { Metadata } from 'next';
import IssueChart from './IssueChart';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';

const baseURL = process.env.NEXTAUTH_URL || 'http://localhost:3000';

// const countStatus = async (status: Status) => {
//   const res = await fetch(`${process.env.NEXTAUTH_URL}/api/issues?status=${status}`, {
//     cache: 'no-store',
//   });
//   const data = await res.json();
//   return data.statusCount;
// };

const countStatus = async (status: Status) => {
  try {
    const response = await axios.get(`${baseURL}/api/issues`, {
      params: { status },
    });
    const data = response.data;
    return data.statusCount;
  } catch (error) {
    console.error('Error fetching status count:', error);
    throw new Error('Failed to fetch status count');
  }
};

export default async function Home() {
  // const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  // const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  // const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

  const open = await countStatus('OPEN');
  const inProgress = await countStatus('IN_PROGRESS');
  const closed = await countStatus('CLOSED');

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};
