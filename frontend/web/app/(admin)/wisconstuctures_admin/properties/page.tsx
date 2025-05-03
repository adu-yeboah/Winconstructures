"use client"
import { data } from '@/constants/properties';
import { Product } from '@/types/property';
import React from 'react';
import DataTable from 'react-data-table-component';
import Head from '../../components/ui/head';
import { useRouter } from 'next/navigation';



// Column definitions
const columns = [
  {
    name: 'Image',
    selector: (row: Product) => row.image,
    cell: (row: Product) => <img src={row.image} alt={row.name} className="w-12 h-12 object-cover" />,
    width: '80px',
  },
  {
    name: 'Name',
    selector: (row: Product) => row.name,
    sortable: true,
  },
  {
    name: 'Price',
    selector: (row: Product) => row.price,
    sortable: true,
  },
  {
    name: 'Orders',
    selector: (row: Product) => row.orders,
    sortable: true,
  },
  {
    name: 'Stock',
    selector: (row: Product) => row.stock,
    sortable: true,
  },
  {
    name: 'Amount',
    selector: (row: Product) => row.amount,
    sortable: true,
  },
];

// Custom styles for the table
const customStyles = {
  table: {
    style: {
      borderCollapse: 'collapse',
    },
  },
  headRow: {
    style: {
      backgroundColor: '#f3f4f6', 
    },
  },
  headCells: {
    style: {
      border: '1px solid #e5e7eb', 
      padding: '0.5rem 1rem', 
      color: '#6b7280', 
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      border: '1px solid #e5e7eb', 
      padding: '0.5rem 1rem',
    },
  },
  rows: {
    style: {
      '&:hover': {
        backgroundColor: '#f9fafb', 
      },
    },
  },
  pagination: {
    style: {
      border: 'none',
      padding: '0.5rem 0',
    },
    pageButtonsStyle: {
      backgroundColor: '#528265', 
      color: '#FFFFFF',
      borderRadius: '0.375rem', 
      padding: '0.25rem 0.75rem', 
      margin: '0 0.25rem',
      '&:hover:not(:disabled)': {
        backgroundColor: '#C9EFC7', 
      },
      '&:disabled': {
        opacity: 0.5,
      },
    },
  },
};

const Products: React.FC = () => {

  const router = useRouter();

  const handleRowClick = (row: Product) => {
    router.push(`properties/${row.id}`);
  };


  return (
    <div className="container m-auto px-4 py-8 min-h-screen w-full">
      <Head head='Properties' />
      <div className=" rounded p-8 w-full ">
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={5}
          // paginationRowsPerPageOptions={[5]}
          onRowClicked={handleRowClick}
          customStyles={customStyles}
          responsive
        />
      </div>
    </div>
  );
};

export default Products;