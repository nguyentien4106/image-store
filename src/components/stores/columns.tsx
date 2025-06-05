"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Channel } from "@/types/store"
import dayjs from "dayjs"
import { Button } from "../ui/button"
import { TrashIcon } from "lucide-react"
import { storeApi } from "@/apis/stores"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ActionCellMeta {
  refreshStores: () => void;
  success: (message: string) => void;
  error: (message: string) => void;
}

export const columns: ColumnDef<Channel>[] = [
    {
        accessorKey: "index",
        header: "No",
        cell: ({ row }) => {
            return <div className="text-left font-medium">{row.index + 1}</div>
        },
    },
    {
      accessorKey: "channelId",
      header: "Channel ID",
    },
    {
      accessorKey: "channelName",
      header: "Channel Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "messageCount",
      header: "Count",
    },
    {
      accessorKey: "createdAt",
      header: "Create At",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"))
        const formatted = dayjs(date).format("DD-MM-YYYY HH:mm:ss")
   
        return <div className="text-left font-medium">{formatted}</div>
      },
    },
    {
        header: "Action",
        id: "actions",
        cell: ({ row, table }) => {
            const meta = table.options.meta as ActionCellMeta;

            const handleDeleteConfirm = async () => {
                try {
                    await storeApi.deleteStore(row.original.id);
                    meta.success("Store deleted successfully");
                    meta.refreshStores();
                } catch (err) {
                    meta.error("Failed to delete store");
                    console.error("Failed to delete store:", err);
                }
            };

          return (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                    <TrashIcon className="w-4 h-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the store "{row.original.channelName}".
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )
        },
      }
]