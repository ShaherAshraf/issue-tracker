import { Select } from '@radix-ui/themes';

const AssigneeSelect = () => {
  return (
    <Select.Root>
      <Select.Trigger className='!cursor-pointer' placeholder='Assign...' />
      <Select.Content className='!cursor-pointer'>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value='1'>Shaher Ashraf</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
