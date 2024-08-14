'use client';

import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterStatus = (status: string) => {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (searchParams.get('orderBy')) params.append('orderBy', searchParams.get('orderBy')!);
    const query = params.size ? '?' + params.toString() : '';
    router.push('/issues/list' + query);
  };

  return (
    <Select.Root
      value={searchParams.get('status')!}
      onValueChange={(status) => filterStatus(status)}
    >
      <Select.Trigger className='!cursor-pointer' placeholder='Filter by status...' />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item className='!cursor-pointer' key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
