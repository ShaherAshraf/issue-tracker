import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <div>{issue.title}</div>
      <div>{issue.description}</div>
      <div>{issue.status}</div>
      <div>{issue.createdAt.toDateString()}</div>
    </div>
  );
};

export default IssueDetailPage;
