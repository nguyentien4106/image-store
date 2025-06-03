import { type FC, useEffect, useState, useCallback } from 'react';
import { storeApi } from '@/apis/stores';
import { DataTable } from '@/components/data-table/data-table';
import { getDefaultPaginationRequest } from '@/helpers';
import type { PaginationRequest } from '@/types'; // Assuming PaginationRequest is in @/types/index.ts
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NewStoreForm } from '@/components/stores/new-store-form';
import { columns } from '@/components/stores/columns';
import { useReactTable, getCoreRowModel, getPaginationRowModel, type OnChangeFn, type PaginationState as TablePaginationState } from '@tanstack/react-table';
import { DataTablePagination } from '@/components/data-table/data-table-pagination';
import { Channel, AddChannelPayload } from '@/types/store';

const StoresPage: FC = () => {
  const [stores, setStores] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationRequest>(getDefaultPaginationRequest());
  const [pageCount, setPageCount] = useState<number>(-1);

  const table = useReactTable({
    data: stores,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: pageCount,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
    },
    onPaginationChange: (updater) => {
      setPagination(prevOurPaginationState => {
        let newTableState: TablePaginationState;
        if (typeof updater === 'function') {
          newTableState = updater({
            pageIndex: prevOurPaginationState.pageIndex,
            pageSize: prevOurPaginationState.pageSize,
          });
        } else {
          newTableState = updater;
        }
        return {
          ...prevOurPaginationState,
          pageIndex: newTableState.pageIndex,
          pageSize: newTableState.pageSize,
        };
      });
    },
  });

  const refreshStores = useCallback(async () => {
    setIsLoading(true);
    try {
        const result = await storeApi.getStores(pagination);
        console.log(result);
        if (result.succeed && result.data?.data) {
            setStores(result.data.data);
            setPageCount(result.data.totalPages);
        } else {
            setStores([]);
            setPageCount(0);
        }
    } catch (err: any) {
      setStores([]);
      setPageCount(0);
    }
    setIsLoading(false);
  }, [pagination]);

  useEffect(() => {
    refreshStores();
  }, [refreshStores]);

  const handleAddChannelSubmit = async (payload: AddChannelPayload) => {
    setIsSubmitting(true);
    try {
      const response = await storeApi.addStore(payload);
      if (response.succeed) {
        setIsAddModalOpen(false);
        await refreshStores();
      } else {
        // setAddError(response.message || "Failed to add channel.");
        // console.error("Add channel failed:", response.message);
      }
    } catch (err: any) {
      // setAddError(err.message || "An unexpected error occurred while adding the channel.");
      // console.error("Add channel submission error:", err);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stores Overview</h1>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>Add New Store</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Channel</DialogTitle>
            </DialogHeader>
            <NewStoreForm 
              onSubmit={handleAddChannelSubmit} 
              onCancel={() => setIsAddModalOpen(false)}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable table={table} loading={isLoading} />
      <DataTablePagination table={table} />
    </div>
  );
};

export default StoresPage; 