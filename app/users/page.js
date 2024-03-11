'use client';

import React from 'react';
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
} from '@nextui-org/react';
import { useAuth } from '../../utils/context/authContext';
import { deleteUser, getUsers } from '../../utils/data/userData';
import { capitalize } from '../../utils/utils';
import { roleOptions, userColumns, userRoleColorMap } from '../../utils/data/lookupData';
import UserForm from '../../components/forms/userForm';
import DeleteWithConfirm from '../../components/ConfirmDeleteModal';

function Users() {
  const INITIAL_VISIBLE_COLUMNS = ['name', 'email', 'role', 'location', 'department', 'age', 'gender', 'dob', 'actions'];
  const [users, setUsers] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [roleFilter, setStatusFilter] = React.useState('all');
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'name',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);
  const { user } = useAuth();

  function getAllUsers() {
    getUsers().then(setUsers);
  }

  function deleteThisUser(userId) {
    deleteUser(userId).then(() => getAllUsers());
  }

  React.useEffect(() => {
    getAllUsers();
  }, [user.id]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return userColumns;
    return userColumns.filter((column) => Array.from(visibleColumns).includes(column.id));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((dbUser) => dbUser.name.toLowerCase().includes(filterValue.toLowerCase())
        || dbUser.email.toLowerCase().includes(filterValue.toLowerCase())
        || dbUser.role.toLowerCase().includes(filterValue.toLowerCase())
        || dbUser.uid.toLowerCase().includes(filterValue.toLowerCase()));
    }
    if (roleFilter !== 'all' && Array.from(roleFilter).length !== roleOptions.length) {
      filteredUsers = filteredUsers.filter((dbUser) => Array.from(roleFilter).includes(dbUser.role.toLowerCase()));
    }
    return filteredUsers;
  }, [users, filterValue, roleFilter]);

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

  const renderCell = React.useCallback((dbUser, columnKey) => {
    const cellValue = dbUser[columnKey];
    let color = 'warning';
    switch (columnKey) {
      case 'name':
      case 'email':
      case 'uid':
        return (
          <p className="text-bold text-small">{cellValue}</p>
        );
      case 'location':
        return <div>{dbUser.researcher?.location.name}</div>;
      case 'department':
        return <div>{dbUser.researcher?.department}</div>;
      case 'age':
        return <div>{dbUser.patient?.age}</div>;
      case 'gender':
        return <div>{dbUser.patient?.gender}</div>;
      case 'dob':
        return <div>{dbUser.patient?.dob}</div>;
      case 'role':
        color = userRoleColorMap[dbUser.role] ? userRoleColorMap[dbUser.role] : 'warning';
        return (
          <Chip className="capitalize" color={color} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <>
            {user.id === dbUser.id ? <div>Unable to modify your own user account</div> : <></>}
            {user.role === 'Admin' || (user.role === 'Researcher' && dbUser.role === 'Patient') ? (
              <div className="relative flex justify-end items-center gap-2">
                <UserForm existingUser={dbUser} onSave={() => getAllUsers()} />
                <DeleteWithConfirm onConfirm={() => deleteThisUser(dbUser.id)} />
              </div>
            ) : <></>}
          </>
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
                Role
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={roleFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {roleOptions.map((role) => (
                <DropdownItem key={role.id} className="capitalize">
                  {capitalize(role.name)}
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
              {userColumns.map((column) => (
                <DropdownItem key={column.id} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <UserForm onSave={() => getAllUsers()} />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {users.length} users</span>
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
    roleFilter,
    visibleColumns,
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400" />
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
  ), [items.length, page, pages, hasSearchFilter]);

  return user.role === 'Admin' || user.role === 'Researcher' ? (
    <div className="p-4 pt-8 flex grow">
      <Table
        aria-label="Users"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
        classNames={{
          wrapper: 'grow',
        }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.id}
              align={column.id === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="No users found" items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

    </div>
  ) : <div className="flex h-full justify-center items-center">You do not have access to view this page</div>;
}

export default Users;
