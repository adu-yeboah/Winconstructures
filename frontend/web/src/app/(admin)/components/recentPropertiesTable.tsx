"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Eye, Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useProperties } from "@/hooks/useProperty";
import { useRouter } from "next/navigation";
import { Property } from "@/types/property";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

const statusStyles: Record<string, string> = {
  "FOR_SALE": "bg-primary-light text-primary",
  "FOR_RENT": "bg-secondary-light text-amber-700",
};

const typeStyles: Record<string, string> = {
  "HOUSE": "bg-blue-50 text-blue-700",
  "CONDO": "bg-green-50 text-green-700",
  "APARTMENT": "bg-purple-50 text-purple-700",
};

export function RecentPropertiesTable() {
  const router = useRouter();
  const { properties, loading, error, fetchProperties, deleteProperty } = useProperties();
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchProperties();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty(id);
        fetchProperties(); // Refresh the list
      } catch (error) {
        console.error("Failed to delete property:", error);
        alert("Failed to delete property");
      }
    }
  };

  const columns: TableColumn<Property>[] = [
    {
      name: "Property",
      selector: (row: Property) => row.title,
      sortable: true,
      grow: 2,
      cell: (row: Property) => (
        <div className="flex items-center gap-3 py-2">
          <div className="relative h-12 w-16 rounded-lg overflow-hidden bg-primary-light shrink-0">
            {row.images?.[0] ? (
              <Image
                src={row.images[0].img}
                alt={row.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-xs text-primary">🏠</span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-gray-900 text-[13px] truncate max-w-[160px]">
              {row.title}
            </p>
            <p className="text-[11px] text-tertiary mt-0.5">{row.location}</p>
          </div>
        </div>
      ),
    },
    {
      name: "Type",
      selector: (row: Property) => row.type,
      sortable: true,
      cell: (row: Property) => (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
          typeStyles[row.type] || "bg-gray-100 text-gray-600"
        }`}>
          {row.type}
        </span>
      ),
    },
    {
      name: "Price",
      selector: (row: Property) => row.price,
      sortable: true,
      cell: (row: Property) => (
        <span className="font-serif text-[13px] font-semibold text-primary">
          {row.price}
        </span>
      ),
    },
    {
      name: "Status",
      selector: (row: Property) => row.status,
      sortable: true,
      cell: (row: Property) => (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
          statusStyles[row.status] || "bg-gray-100 text-gray-600"
        }`}>
          {row.status === "FOR_SALE" ? "For Sale" : "For Rent"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row: Property) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => router.push(`/properties/${row.id}`)}
            className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:border-primary hover:bg-primary-light transition-all"
            title="View"
          >
            <Eye className="w-3.5 h-3.5 text-gray-400 hover:text-primary" />
          </button>
          <button
            onClick={() => router.push(`/admin/properties/${row.id}/edit`)}
            className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-all"
            title="Edit"
          >
            <Edit className="w-3.5 h-3.5 text-gray-400 hover:text-blue-600" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition-all"
            title="Delete"
          >
            <Trash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(filterText.toLowerCase()) ||
      property.location.toLowerCase().includes(filterText.toLowerCase()) ||
      property.price.toString().includes(filterText);

    const matchesStatus = statusFilter === "all" || property.status === statusFilter;
    const matchesType = typeFilter === "all" || property.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const customStyles = {
    headCells: {
      style: {
        fontSize: "11px",
        fontWeight: "500",
        textTransform: "uppercase" as const,
        letterSpacing: "0.06em",
        color: "#6b7280",
        backgroundColor: "#f9fafb",
        paddingTop: "10px",
        paddingBottom: "10px",
      },
    },
    cells: {
      style: {
        fontSize: "13px",
        paddingTop: "12px",
        paddingBottom: "12px",
      },
    },
    rows: {
      style: {
        borderBottom: "1px solid #f3f4f6",
      },
      highlightOnHoverStyle: {
        backgroundColor: "#f9fafb",
        borderBottomColor: "#f3f4f6",
      },
    },
  };

  if (!mounted) {
    return (
      <Card className="rounded-xl border border-gray-100 shadow-none">
        <CardContent className="p-0">
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="rounded-xl border border-gray-100 shadow-none">
        <CardContent className="p-6">
          <Skeleton className="h-64 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="rounded-xl border border-gray-100 shadow-none">
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>Failed to load properties</p>
            <button
              onClick={() => fetchProperties()}
              className="mt-2 text-sm underline"
            >
              Try again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-xl border border-gray-100 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-[13px] font-medium text-gray-900">
            Recent Properties ({filteredProperties.length})
          </p>
          <div className="flex items-center gap-3">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 h-8 text-xs border-gray-200">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="FOR_SALE">For Sale</SelectItem>
                <SelectItem value="FOR_RENT">For Rent</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32 h-8 text-xs border-gray-200">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="HOUSE">House</SelectItem>
                <SelectItem value="CONDO">Condo</SelectItem>
                <SelectItem value="APARTMENT">Apartment</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-tertiary" />
              <Input
                placeholder="Search..."
                className="pl-8 h-8 text-xs w-48 border-gray-200 bg-gray-50 focus:bg-white"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredProperties}
          pagination
          highlightOnHover
          paginationPerPage={10}
          customStyles={customStyles}
          noDataComponent={
            <div className="py-8 text-center text-tertiary">
              No properties found
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}