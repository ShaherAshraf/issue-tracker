import { Issue, Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';

const IssueFormStatusSelect = ({ issue }: { issue: Issue }) => {
  const statuses: { label: string; value: Status }[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'In-progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  return (
    <>
      <Select.Root defaultValue={issue?.status} onValueChange={(s: Status) => (issue.status = s)}>
        <Select.Trigger className='!cursor-pointer' placeholder='Status...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Status</Select.Label>
            {statuses.map((status) => (
              <Select.Item key={status.label} value={status.value} className='!cursor-pointer'>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueFormStatusSelect;
