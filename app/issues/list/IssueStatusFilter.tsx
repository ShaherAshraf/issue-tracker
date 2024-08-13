import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const statuses: { label: string; value: Status | 'ALL' }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
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
