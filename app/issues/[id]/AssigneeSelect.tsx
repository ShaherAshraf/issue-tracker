'use client';

import { Skeleton } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { isPending, error, data: users } = useUsers();

  if (isPending) return <Skeleton />;

  if (error) return null;

  const assignIssue = (userId: string) =>
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId != 'unassigned' ? userId : null,
      })
      .catch(() => {
        toast.error('Changes could not be saved.');
      });

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || 'unassigned'}
        onValueChange={assignIssue}
      >
        <Select.Trigger className='!cursor-pointer' placeholder='Assign...' />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value='unassigned' className='!cursor-pointer'>
              unassigned
            </Select.Item>
            {users.map((user) => (
              <Select.Item key={user.id} value={user.id} className='!cursor-pointer'>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () => axios('/api/users').then((res) => res.data),
    staleTime: 60 * 1000,
    retry: 3,
  });

export default AssigneeSelect;
