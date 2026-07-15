import { Box, Typography,Pagination } from "@mui/material";
import type { Pagination as PaginationType } from "../../models/Pagination";

type Props ={
     metadata : PaginationType;
     onPageChange : (page: number) => void;
}

export default function AppPagination({ metadata, onPageChange }: Props) {
  
  const {currentPage, totalPages, pageSize, totalCount} = metadata;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', marginTop: 2}}>
          <Typography>
               Displying {startItem} - {endItem} of {totalCount} items
          </Typography>
          <Pagination color="secondary" size="large" 
                 count={totalPages}
                 page ={currentPage}
                 onChange={(_, page) => onPageChange(page)}
                 />
    </Box>
  )
}