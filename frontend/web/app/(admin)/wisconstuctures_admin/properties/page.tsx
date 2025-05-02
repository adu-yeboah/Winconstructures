"use client"

import React from 'react';
import DataTable from 'react-data-table-component';

type Product = {
  image: string;
  name: string;
  price: string;
  orders: number;
  stock: number;
  amount: number;
};

// Sample data
const data: Product[] = [
  { image: 'https://via.placeholder.com/50', name: 'Gadgetex', price: '$20', orders: 40, stock: 300, amount: 6000 },
  { image: 'https://via.placeholder.com/50', name: 'Gadgetable', price: '$30', orders: 35, stock: 250, amount: 6200 },
  { image: 'https://via.placeholder.com/50', name: 'Module Gadget', price: '$24', orders: 60, stock: 257, amount: 5300 },
  { image: 'https://via.placeholder.com/50', name: 'Rubicon Gadget', price: '$25', orders: 46, stock: 278, amount: 5600 },
  { image: 'https://via.placeholder.com/50', name: 'Gadgetish', price: '$26', orders: 34, stock: 267, amount: 4500 },
  { image: 'https://via.placeholder.com/50', name: 'Zone Gadget', price: '$27', orders: 37, stock: 287, amount: 5700 },
  { image: 'https://via.placeholder.com/50', name: 'Gadgetnest', price: '$20', orders: 76, stock: 285, amount: 4300 },
];

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
      backgroundColor: '#f3f4f6', // bg-gray-100
    },
  },
  headCells: {
    style: {
      border: '1px solid #e5e7eb', // border-grey1
      padding: '0.5rem 1rem', // px-4 py-2
      color: '#6b7280', // text-grey1
      fontWeight: 'bold',
    },
  },
  cells: {
    style: {
      border: '1px solid #e5e7eb', // border-grey1
      padding: '0.5rem 1rem', // px-4 py-2
    },
  },
  rows: {
    style: {
      '&:hover': {
        backgroundColor: '#f9fafb', // hover:bg-gray-50
      },
    },
  },
  pagination: {
    style: {
      border: 'none',
      padding: '0.5rem 0',
    },
    pageButtonsStyle: {
      backgroundColor: '#4b5563', // bg-secondary
      color: '#ffffff', // text-white
      borderRadius: '0.375rem', // rounded-lg
      padding: '0.25rem 0.75rem', // px-3 py-1
      margin: '0 0.25rem',
      '&:hover:not(:disabled)': {
        backgroundColor: '#6b7280', // hover:bg-tertiary
      },
      '&:disabled': {
        opacity: 0.5,
      },
    },
  },
};

const Products: React.FC = () => {
  return (
    <div className="container m-auto px-4 py-8 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-grey1 mb-6 text-center">
          Best Selling Products
        </h1>
        <DataTable
          columns={columns}
          data={data}
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5]}
          customStyles={customStyles}
          responsive
        />
      </div>
    </div>
  );
};

export default Products;