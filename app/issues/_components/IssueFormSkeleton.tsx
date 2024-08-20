import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

const IssueFormSkeleton = async () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='2rem' />
      <Skeleton height='20rem' />
      <Skeleton width='5rem' />
    </Box>
  );
};

export default IssueFormSkeleton;
