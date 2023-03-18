import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, TextField } from '@mui/material';
import { AppDispatch } from '../../../core/store';
import {
  changeContractDate,
  changeProductDate,
  fetchProducts,
  selectIsFetching,
  selectIsIdle,
  selectProducts,
} from '../store/productsSlice';
import { Product } from '../models/product';

export const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const isFetching = useSelector(selectIsFetching);
  const isIdle = useSelector(selectIsIdle);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onChangeDate = useCallback(
    (value: Date, productId: string) => {
      dispatch(changeProductDate(value, productId));
    },
    [dispatch]
  );

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', width: 90 },
      {
        field: 'color',
        headerName: 'Color',
        editable: true,
        flex: 1,
        minWidth: 120,
      },
      {
        field: 'department',
        headerName: 'department',
        editable: true,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'price',
        headerName: 'price',
        type: 'string',
        editable: true,
        flex: 1,
        minWidth: 120,
      },
      {
        field: 'productType',
        headerName: 'product type',
        sortable: false,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'productAdjective',
        headerName: 'product Adjective',
        sortable: false,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'productDescription',
        headerName: 'product Description',
        description: 'product Description.',
        sortable: false,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'productMaterial',
        headerName: 'product Material',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'productName',
        headerName: 'product Name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        minWidth: 150,
      },
      {
        field: 'contractDate',
        headerName: 'contract Date',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        editable: true,
        type: 'date',
        minWidth: 150,
        preProcessEditCellProps: async params => {
          // pass from slice but we can call directely api service
          await dispatch(changeContractDate(params.props.value as Date, params.row.id));
          // we can management error
          return params.props;
        },
      },
      {
        field: 'productDate',
        headerName: 'product Date',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        flex: 1,
        minWidth: 200,

        renderCell: params => (
          <DatePicker
            value={params.value}
            onChange={newValue => {
              onChangeDate(newValue, params.row.id);
            }}
            renderInput={renderParams => <TextField {...renderParams} size='small' />}
          />
        ),
      },
      {
        field: 'fullProduct',
        headerName: 'Full product',
        Width: 200,
        valueGetter: (params: GridValueGetterParams<any, Product>) =>
          `${params.row.productName || ''} ${params.row.productType || ''}`,
      },
    ],
    [dispatch, onChangeDate]
  );

  return (
    <Box
      sx={{
        height: '100%',
        '& .MuiDataGrid-cell--editable': {
          textDecoration: 'underline',
        },
      }}>
      {!isIdle && (
        <DataGrid
          rows={products}
          columns={columns}
          loading={isFetching}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      )}
    </Box>
  );
};
