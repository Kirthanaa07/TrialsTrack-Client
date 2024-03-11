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
} from '@nextui-org/react';
import { getTrials } from '../utils/data/trialsData';
import { useAuth } from '../utils/context/authContext';
import { capitalize } from '../utils/utils';
import TrialForm from '../components/forms/trialForm';
import { statusColorMap, statusOptions, trialColumns } from '../utils/data/lookupData';

function Home() {
  const INITIAL_VISIBLE_COLUMNS = ['nct_id', 'title', 'overall_status', 'study_type', 'phase', 'brief_summary', 'actions'];
  const [trials, setTrials] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState('');
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'age',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const router = useRouter();
  const { user } = useAuth();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  React.useEffect(() => {
    getTrials(user.id).then(setTrials);
  }, [user.id]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return trialColumns;
    return trialColumns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredTrials = [...trials];
    if (hasSearchFilter) {
      filteredTrials = filteredTrials.filter((u) => u.title.toLowerCase().includes(filterValue.toLowerCase())
        || u.nct_id.toLowerCase().includes(filterValue.toLowerCase())
        || u.brief_summary.toLowerCase().includes(filterValue.toLowerCase()));
    }
    if (statusFilter !== 'all' && Array.from(statusFilter).length !== statusOptions.length) {
      filteredTrials = filteredTrials.filter((trial) => Array.from(statusFilter).includes(trial.overall_status.toLowerCase()));
    }
    return filteredTrials;
  }, [trials, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => [...items].sort((a, b) => {
    const first = a[sortDescriptor.column];
    const second = b[sortDescriptor.column];
    let cmp = 0;
    if (first < second) cmp = -1;
    else if (first > second) cmp = 1;
    else cmp = 0;

    return sortDescriptor.direction === 'descending' ? -cmp : cmp;
  }), [sortDescriptor, items]);

  const renderCell = React.useCallback((trial, columnKey) => {
    const cellValue = trial[columnKey];
    let color = 'warning';
    switch (columnKey) {
      case 'nct_id':
      case 'title':
      case 'study_type':
      case 'phase':
      case 'brief_summary':
        return (
          <p className="text-bold text-small capitalize">{cellValue}</p>
        );
      case 'overall_status':
        color = statusColorMap[trial.overall_status] ? statusColorMap[trial.overall_status] : 'warning';
        return (
          <Chip className="capitalize" color={color} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );

      case 'actions':
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown aria-label="Action menu">
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <span className="material-symbols-outlined">more_vert</span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Action menu">
                <DropdownItem aria-label="View">View</DropdownItem>
                <DropdownItem aria-label="Edit">Edit</DropdownItem>
                <DropdownItem aria-label="Delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue('');
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue('');
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<span className="material-symbols-outlined">search</span>}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<span className="material-symbols-outlined">expand_more</span>} variant="flat">
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<span className="material-symbols-outlined">expand_more</span>} variant="flat">
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {trialColumns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Button color="secondary" onPress={onOpen} endContent={<span className="material-symbols-outlined">add</span>}>
            Add New
          </Button>
          <Button color="primary" onPress={onOpen} endContent={<span className="material-symbols-outlined">download</span>}>
            Import
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {trials.length} trials</span>
        <label className="flex items-center text-default-400 text-small">
          Rows per page:
          <select
            className="bg-transparent outline-none text-default-400 text-small"
            onChange={onRowsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  ), [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    trials.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === 'all'
          ? 'All items selected'
          : `${selectedKeys.size} of ${filteredItems.length} selected`}
      </span>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
          Previous
        </Button>
        <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
          Next
        </Button>
      </div>
    </div>
  ), [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      <Table
        aria-label="My Clinical Trials"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: 'grow',
        }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No trials found" items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <TrialForm />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;
