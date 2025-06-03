"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { Channel } from "@/types/store"
import dayjs from "dayjs"

export const columns: ColumnDef<Channel>[] = [
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
    }
]