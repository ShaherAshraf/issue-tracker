import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  return (
    <Flex align='center' gap='2'>
      <Text size='2'>
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === 1}
        className={currentPage === 1 ? '!cursor-not-allowed' : '!cursor-pointer'}
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button color='gray' variant='soft' className='!cursor-pointer'>
        <ChevronLeftIcon />
      </Button>
      <Button color='gray' variant='soft' className='!cursor-pointer'>
        <ChevronRightIcon />
      </Button>
      <Button
        color='gray'
        variant='soft'
        disabled={currentPage === pageCount}
        className={currentPage === pageCount ? '!cursor-not-allowed' : '!cursor-pointer'}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
