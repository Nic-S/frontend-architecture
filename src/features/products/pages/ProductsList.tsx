import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { AppDispatch } from '../../../core/store';
import { fetchProducts, selectProducts } from '../store/productsSlice';
import { columns } from '../models/product';

export const ProductsList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <Box sx={{ height: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        pageSize={25}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      {products.length === 0 && <Typography>No data</Typography>}
    </Box>
  );
};
