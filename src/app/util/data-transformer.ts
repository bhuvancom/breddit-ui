import ApiPagedResponse from '../models/api-paged-response';
import DataState from '../models/data-state';

export const dataTransformer = <T>(
  e: DataState<ApiPagedResponse<T>>,
  olderData: DataState<ApiPagedResponse<T>>,
  onPageUp: () => void
): DataState<ApiPagedResponse<T>> => {
  if (e.data && e.data.last === false && e.error.length < 1 && !e.isLoading) {
    onPageUp();
  }

  const oldData = olderData.data?.content ?? [];
  const newData = e.data?.content ?? [];
  const veryNewData: T[] = [...oldData, ...newData];
  const updatedState: ApiPagedResponse<T> = {
    content: veryNewData,
    first: e.data?.first ?? false,
    last: e.data?.last ?? false,
    totalPages: e.data?.totalPages ?? 0,
    totalElements: e.data?.totalElements ?? 0,
  };

  const updatedDataState = new DataState({
    data: updatedState,
    error: e.error,
    isLoading: e.isLoading,
  });
  return updatedDataState;
};
