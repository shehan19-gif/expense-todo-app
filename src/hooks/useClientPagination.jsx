import React, { useMemo, useState } from 'react';

export const useClientPagination = (data = [], initialPage = 1, initialLimit = 10) => {
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
  });

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (pagination.page - 1) * pagination.limit;
    const endIndex = startIndex + pagination.limit;
    return data.slice(startIndex, endIndex);
  }, [data, pagination.page]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pagination.limit);
  }, [data.length]);

  const changePage = (page) => {
    setPagination(prev => ({
        ...prev,
        page: Math.max(1, Math.min(page, totalPages)),
    }));
  };

  return {
    paginatedData,
    pagination: {
        ...pagination,
        total: data.length,
        totalPages
    },
    changePage,
  };
};