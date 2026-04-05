"use client";

import React, { useMemo, useState, useCallback } from "react";
import Image from "next/image";
import DataTable, { TableColumn } from "react-data-table-component";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, SlidersHorizontal, Plus, Eye, Pencil, Trash2,
  RotateCcw, ChevronDown,
} from "lucide-react";

import { data } from "@/constants/properties";
import { Product } from "@/types/property";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select, SelectTrigger, SelectContent, SelectItem, SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Products() {
  const router = useRouter();

  const [search, setSearch]           = useState("");
  const [typeFilter, setTypeFilter]   = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [selectedRows, setSelectedRows] = useState<Product[]>([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [properties, setProperties]   = useState<Product[]>(data);

  //  Filtering 
  const filteredData = useMemo(() => {
    return properties.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.location?.toLowerCase().includes(search.toLowerCase()) ||
        p.price.toString().includes(search);

      const matchesType =
        typeFilter === "all" || p.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" ? p.stock > 0 : p.stock === 0);

      const matchesPrice =
        priceFilter === "all" ||
        (priceFilter === "low"  && Number(p.amount) < 100000) ||
        (priceFilter === "mid"  && Number(p.amount) >= 100000 && Number(p.amount) < 400000) ||
        (priceFilter === "high" && Number(p.amount) >= 400000);

      return matchesSearch && matchesType && matchesStatus && matchesPrice;
    });
  }, [properties, search, typeFilter, statusFilter, priceFilter]);

  const resetFilters = () => {
    setSearch(""); setTypeFilter("all");
    setStatusFilter("all"); setPriceFilter("all");
  };

  //  Row Actions 
  const handleDelete = useCallback((id: string | number) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleBulkDelete = useCallback(() => {
    const ids = new Set(selectedRows.map((r) => r.id));
    setProperties((prev) => prev.filter((p) => !ids.has(p.id)));
    setSelectedRows([]);
    setToggleCleared((t) => !t);
  }, [selectedRows]);

  //  Columns 
  const columns: TableColumn<Product>[] = [
    {
      name: "Property",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,
      cell: (row) => (
        <div className="flex items-center gap-3 py-2">
          <div className="relative h-11 w-16 rounded-lg overflow-hidden bg-primary-light shrink-0">
            {row.image ? (
              <Image src={row.image} alt={row.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 text-[13px] truncate max-w-[160px]">{row.name}</p>
            <p className="text-[11px] text-tertiary mt-0.5">{row.orders ?? 0} inquiries</p>
          </div>
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row: Product) => row.type ?? "",
      sortable: true,
      cell: (row: Product) => (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
          row.type === "sale"
            ? "bg-primary-light text-primary"
            : "bg-secondary-light text-amber-700"
        }`}>
          {row.type === "sale" ? "For Sale" : "For Rent"}
        </span>
      ),
    },
    {
      name: "Price",
      selector: (row: Product) => row.price,
      sortable: true,
      cell: (row: Product) => (
        <span className="font-serif text-[17px] font-semibold text-primary leading-none">
          {row.price}
          {row.type === "rent" && (
            <span className="font-sans text-[11px] font-normal text-tertiary ml-0.5">/mo</span>
          )}
        </span>
      ),
    },
    {
      name: "Location",
      selector: (row: Product) => row.location ?? "",
      sortable: true,
      cell: (row: Product) => (
        <span className="text-[12px] text-tertiary">{row.location}</span>
      ),
    },
    {
      name: "Beds / Baths",
      selector: (row: Product) => `${row.bedrooms} bd · ${row.bathrooms} ba`,
      sortable: true,

      cell: (row: Product) => (
        <span className="text-[12px] text-tertiary">
          {row.bedrooms} bd · {row.bathrooms} ba
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row: Product) => row.stock,
      sortable: true,
      cell: (row: Product) => (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
          row.stock > 0
            ? "bg-primary-light text-primary"
            : "bg-red-50 text-red-600"
        }`}>
          {row.stock > 0 ? "Available" : "Sold / Leased"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-1.5">
          <Link
            href={`/admin/properties/${row.id}`}
            className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:border-primary bg-primary transition-all"
            title="View"
          >
            <Eye className="w-3.5 h-3.5 text-gray-400 hover:text-primary" />
          </Link>
          <Link
            href={`/admin/properties/${row.id}/edit`}
            className="w-7 h-7 rounded-md border flex items-center justify-center border-blue-400 hover:bg-blue-50 transition-all"
            title="Edit"
          >
            <Pencil className="w-3.5 h-3.5 text-gray-400 hover:text-blue-600" />
          </Link>
          <button
            onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}
            className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:border-red-400 bg-red-50 transition-all"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  //  Custom Styles 
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
        minHeight: "44px",
      },
    },
    headCells: {
      style: {
        fontSize: "10px",
        fontWeight: "500",
        textTransform: "uppercase" as const,
        letterSpacing: "0.08em",
        color: "#6b7280",
        paddingLeft: "14px",
      },
    },
    rows: {
      style: {
        minHeight: "68px",
        cursor: "pointer",
        borderBottom: "1px solid #f9fafb",
        "&:hover": { backgroundColor: "#fafafa" },
      },
      selectedHighlightStyle: { backgroundColor: "#f0faf5 !important" },
    },
    cells: { style: { paddingLeft: "14px" } },
    pagination: {
      style: {
        borderTop: "1px solid #e5e7eb",
        fontSize: "12px",
        color: "#6b7280",
      },
    },
  };

  return (
    <div className="space-y-5">

      {/* Page Header */}
      <div className="flex items-flex-end justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1.5">
            <span className="block w-5 h-px bg-secondary" />
            <span className="text-secondary text-[10px] font-medium tracking-[0.12em] uppercase">Listings</span>
          </div>
          <h1 className="font-serif text-[26px] font-semibold text-gray-900 leading-tight">Properties</h1>
          <p className="text-[12px] text-tertiary mt-0.5">
            Manage all listed properties and their availability
          </p>
        </div>
        <Link href="/admin/add">
          <Button
            className="bg-primary hover:bg-primary-dark text-white rounded-lg px-4 py-2.5 h-auto text-[13px] gap-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Property
          </Button>
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-gray-100 rounded-xl p-3.5 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-0 flex-1 min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-tertiary shrink-0" />
          <Input
            placeholder="Search by name, location..."
            className="border-0 bg-transparent shadow-none h-9 text-[13px] px-0 focus-visible:ring-0"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-px h-7 bg-gray-200" />

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-36 h-9 text-[13px] border-gray-200">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36 h-9 text-[13px] border-gray-200">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Availability</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="sold">Sold / Leased</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priceFilter} onValueChange={setPriceFilter}>
          <SelectTrigger className="w-36 h-9 text-[13px] border-gray-200">
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            <SelectItem value="low">Below $100k</SelectItem>
            <SelectItem value="mid">$100k – $400k</SelectItem>
            <SelectItem value="high">Above $400k</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-px h-7 bg-gray-200" />

        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-[12px] text-tertiary hover:text-gray-800 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Bulk Action Bar */}
      {selectedRows.length > 0 && (
        <div className="bg-primary rounded-xl px-5 py-3 flex items-center justify-between animate-in slide-in-from-top-2 duration-200">
          <p className="text-[13px] text-white font-medium">
            {selectedRows.length} {selectedRows.length === 1 ? "property" : "properties"} selected
            <span className="text-white/65 font-normal ml-2 text-[12px]">
              — choose an action below
            </span>
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="bg-white/20 hover:bg-white/30 text-white border-0 h-8 text-[12px] gap-1.5"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit Selected
            </Button>
            <Button
              size="sm"
              onClick={handleBulkDelete}
              className="bg-red-500 hover:bg-red-600 text-white border-0 h-8 text-[12px] gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <Card className="rounded-xl border border-gray-100 shadow-none overflow-hidden">
        <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
          <p className="text-[12px] text-tertiary">
            Showing <span className="font-medium text-gray-900">{filteredData.length}</span> of{" "}
            <span className="font-medium text-gray-900">{properties.length}</span> properties
          </p>
        </div>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={filteredData}
            pagination
            selectableRows
            onSelectedRowsChange={({ selectedRows: rows }) => setSelectedRows(rows)}
            clearSelectedRows={toggleCleared}
            highlightOnHover
            responsive
            customStyles={customStyles}
            paginationPerPage={8}
            onRowClicked={(row) => router.push(`/admin/properties/${row.id}`)}
            noDataComponent={
              <div className="py-16 text-center text-[13px] text-tertiary">
                <p>No properties match your filters.</p>
                <button
                  onClick={resetFilters}
                  className="mt-2 text-primary text-[12px] hover:underline"
                >
                  Reset filters
                </button>
              </div>
            }
          />
        </CardContent>
      </Card>
    </div>
  );
};

