"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";
import { useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface TransactionData {
  id: string;
  date: string;
  client: string;
  type: string;
  amount: string;
  status: string;
}

const statusStyles: Record<string, string> = {
  Completed: "bg-primary-light text-primary",
  Pending: "bg-amber-50 text-amber-700",
  Cancelled: "bg-gray-100 text-gray-500",
};

export function RecentPropertiesTable() {
  const [filterText, setFilterText] = useState("");
  const [tab, setTab] = useState("all");

  const columns: TableColumn<TransactionData>[] = [
    {
      name: "Property ID",
      selector: (row: TransactionData) => row.id,
      sortable: true,
      cell: (row: TransactionData) => <span className="font-medium text-gray-700">{row.id}</span>,
    },
    { name: "Date", selector: (row: TransactionData) => row.date, sortable: true,
      cell: (row: TransactionData) => <span className="text-tertiary">{row.date}</span> },
    { name: "Client", selector: (row: TransactionData) => row.client, sortable: true },
    { name: "Type", selector: (row: TransactionData) => row.type,
      cell: (row: TransactionData) => <span className="text-tertiary">{row.type}</span> },
    {
      name: "Amount", selector: (row: TransactionData) => row.amount, sortable: true,
      cell: (row: TransactionData) => <span className="text-primary font-medium">{row.amount}</span>,
    },
    {
      name: "Status", selector: (row: TransactionData) => row.status,
      cell: (row: TransactionData) => (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${statusStyles[row.status]}`}>
          {row.status}
        </span>
      ),
    },
  ];

  const data: TransactionData[] = [
    { id: "#PROP1023", date: "Mar 20, 2026", client: "Alice Johnson", type: "Sale", amount: "$180,000", status: "Completed" },
    { id: "#PROP1024", date: "Mar 26, 2026", client: "Bob Smith", type: "Rent", amount: "$2,400", status: "Pending" },
    { id: "#PROP1025", date: "Mar 23, 2026", client: "Charlie Brown", type: "Sale", amount: "$120,000", status: "Completed" },
    { id: "#PROP1026", date: "Apr 1, 2026", client: "Diana Mensah", type: "Rent", amount: "$3,100", status: "Cancelled" },
  ];

  const filtered: TransactionData[] = data.filter((item) => {
    const matchesTab = tab === "all" || item.status.toLowerCase() === tab;
    const matchesSearch =
      item.client.toLowerCase().includes(filterText.toLowerCase()) ||
      item.id.toLowerCase().includes(filterText.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const customStyles = {
    headCells: {
      style: {
        fontSize: "11px", fontWeight: "500", textTransform: "uppercase" as const,
        letterSpacing: "0.06em", color: "#6b7280", backgroundColor: "#f9fafb",
        paddingTop: "10px", paddingBottom: "10px",
      },
    },
    cells: { style: { fontSize: "13px", paddingTop: "12px", paddingBottom: "12px" } },
    rows: { style: { borderBottom: "1px solid #f3f4f6" },
      highlightOnHoverStyle: { backgroundColor: "#f9fafb", borderBottomColor: "#f3f4f6" } },
  };

  return (
    <Card className="rounded-xl border border-gray-100 shadow-none">
      <CardContent className="p-0">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-[13px] font-medium text-gray-900">Recent transactions</p>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
              {["all", "pending", "completed", "cancelled"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1 rounded-md text-xs transition-all ${
                    tab === t ? "bg-primary text-white shadow-sm" : "text-tertiary hover:text-gray-700"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-tertiary" />
              <Input
                placeholder="Search..."
                className="pl-8 h-8 text-xs w-48 border-gray-200 bg-gray-50 focus:bg-white"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
              />
            </div>
            <Select>
              <SelectTrigger className="w-32 h-8 text-xs border-gray-200">
                <SelectValue placeholder="This Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          pagination
          highlightOnHover
          paginationPerPage={10}
          customStyles={customStyles}
        />
      </CardContent>
    </Card>
  );
}