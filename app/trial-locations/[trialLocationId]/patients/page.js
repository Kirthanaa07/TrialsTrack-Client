'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  useDisclosure,
  ModalFooter,
  ModalBody,
  ModalHeader,
  ModalContent,
  Modal,
  Tooltip,
} from '@nextui-org/react';
import { useAuth } from '../../../../utils/context/authContext';

function Patients() {
  const INITIAL_VISIBLE_COLUMNS = ['nct_id', 'title', 'overall_status', 'study_type', 'phase', 'brief_summary', 'actions'];
  const [trials, setTrials] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'nct_id',
    direction: 'descending',
  });
  const [page, setPage] = React.useState(1);

  const router = useRouter();
  const { user } = useAuth();

  return <><div>Patients</div></>;
}

export default Patients;
