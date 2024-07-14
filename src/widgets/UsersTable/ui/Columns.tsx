import { UserResponseDto } from '@/shared/api/generated';
import { TableProps } from 'antd';

export const getColumns = (): TableProps<UserResponseDto>['columns'] => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
];
