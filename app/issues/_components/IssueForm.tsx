'use client';

import { ErrorMessage, Spinner } from '@/app/components/';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Box, Button, Callout, Flex, TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import IssueFormStatusSelect from './IssueFormStatusSelect';

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    debugger;
    try {
      setIsSubmitting(true);
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post('/api/issues', data);
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className='max-w-xl'>
      {error && (
        <Callout.Root color='red' className='mb-5'>
          <Callout.Icon>
            <AiOutlineInfoCircle />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className='space-y-3' onSubmit={onSubmit}>
        <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')} />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name='description'
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Box>
          <Flex direction='column'>
            <Controller
              name='status'
              control={control}
              defaultValue={issue?.status}
              render={({ field }) => <IssueFormStatusSelect issue={issue} {...field} />}
            />
          </Flex>
        </Box>
        <Button className='!cursor-pointer' disabled={isSubmitting}>
          {issue ? 'Update Issue' : 'Submit New Issue'} {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
