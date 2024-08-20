'use client';

import { Skeleton, Spinner } from '@/app/components';
import { Issue, User } from '@prisma/client';
import { Button, Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { isPending, error, data: users } = useUsers();
  const [isLoading, setIsLoading] = useState(false);
  const [assignee, setAssignee] = useState(issue.assignedToUserId);
  const router = useRouter();

  if (isPending) return <Skeleton />;

  if (error) return null;

  const assignIssue = async (userId: string) => {
    try {
      setIsLoading(true);
      const res = await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId != 'unassigned' ? userId : null,
      });
      setIsLoading(false);
      setAssignee(res.data.assignedToUserId);
      router.refresh();
    } catch (err) {
      setIsLoading(false);
      toast.error('Changes could not be saved.');
    }
  };

  return (
    <>
      {isLoading ? (
        <Button color='red' disabled>
          Loading...
          {isLoading && <Spinner />}
        </Button>
      ) : (
        <Select.Root defaultValue={assignee || 'unassigned'} onValueChange={assignIssue}>
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
      )}
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
