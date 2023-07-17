import ApiPagedResponse from './api-paged-response';

export default function defaultData<T>(): ApiPagedResponse<T> {
    return {
        content: [],
        totalPages: 0,
        last: true,
        first: true,
    };
};
