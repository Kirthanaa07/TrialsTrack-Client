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
  Pagination,
} from '@nextui-org/react';
import { locationColumns } from '../../utils/data/lookupData';
import { capitalize } from '../../utils/utils';
import DeleteWithConfirm from '../../components/ConfirmDeleteModal';
import { deleteLocation, getLocations } from '../../utils/data/locationData';
import LocationForm from '../../components/forms/locationForm';
import { useAuth } from '../../utils/context/authContext';

function Locations() {
  const INITIAL_VISIBLE_COLUMNS = ['name', 'address', 'lat', 'lon', 'actions'];
  const [locations, setLocations] = React.useState([]);
  const [filterValue, setFilterValue] = React.useState('');
  const [visibleColumns, setVisibleColumns] = React.useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: 'name',
    direction: 'ascending',
  });
  const [page, setPage] = React.useState(1);

  const { user } = useAuth();

  const getAllLocations = () => {
    getLocations().then(setLocations);
  }

  const deleteThisLocation = (id) => {
    deleteLocation(id).then(() => getAllLocations());
  }

  React.useEffect(() => {
    getAllLocations();
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return locationColumns;
    return locationColumns.filter((column) => Array.from(visibleColumns).includes(column.id));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredLocations = [...locations];
    if (hasSearchFilter) {
      filteredLocations = filteredLocations.filter((u) => u.name.toLowerCase().includes(filterValue.toLowerCase())
        || u.city.toLowerCase().includes(filterValue.toLowerCase())
        || u.state.toLowerCase().includes(filterValue.toLowerCase()));
    }
    return filteredLocations;
  }, [locations, filterValue]);

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

  const renderCell = React.useCallback((location, columnKey) => {
    let color = 'warning';
    switch (columnKey) {
      case 'name':
        return <p className="text-bold text-small capitalize">{location.name}</p>;
      case 'address':
        return <p className="text-bold text-small capitalize">{location.address} {location.city} {location.state} {location.zip} {location.country}</p>;
      case 'lat':
        return <p className="text-bold text-small capitalize">{location.geo_lat}</p>;
      case 'lon':
        return <p className="text-bold text-small capitalize">{location.geo_lon}</p>;
      case 'actions':
        return (
          <>
            {user.role === 'Admin' ? (
              <div className="relative flex justify-end items-center gap-2">
                <LocationForm existingLocation={location} onSave={() => getAllLocations()} />
                <DeleteWithConfirm onConfirm={() => deleteThisLocation(location.id)} />
              </div>
            ) : <></>}
          </>
        );
      default:
        return <p>N/A</p>;
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
              {locationColumns.map((column) => (
                <DropdownItem key={column.id} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {user.role === 'Admin' || user.role === 'Researcher' ? (
            <LocationForm onSave={() => getAllLocations()} />
          ) : <></>}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {locations.length} locations</span>
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
    visibleColumns,
    onRowsPerPageChange,
    locations.length,
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

  return (
    <div className="p-4 pt-8 flex grow">
      <Table
        aria-label="Locations"
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
        <TableBody emptyContent="No locations found" items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Locations;
