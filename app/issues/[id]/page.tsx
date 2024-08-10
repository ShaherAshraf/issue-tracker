import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import prisma from '@/prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  await delay(2000);

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap='3' my='2'>
        <IssueStatusBadge status={issue.status} />
        <div>{issue.createdAt.toDateString()}</div>
      </Flex>
      <Card className='prose mt-4'>
        <Markdown>{issue.description}</Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
