// src/components/SidePanel.tsx

import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';

import { useTracker } from '../../utils/hooks';
export const Tracker = () => {
  const { sites, limits, handleLimitChange, handleReset } = useTracker();

  return (
    <Box p={3} sx={{ width: 400 }}>
      <Typography variant="h6">Website Usage Tracker</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Website</b>
              </TableCell>
              <TableCell>
                <b>Time (sec)</b>
              </TableCell>
              <TableCell>
                <b>Limit (sec)</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(sites).map(([site, time]) => (
              <TableRow key={site}>
                <TableCell>{site}</TableCell>
                <TableCell>{time.toFixed(2)}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={limits[site] || ''}
                    onChange={(e) =>
                      handleLimitChange(site, Number(e.target.value))
                    }
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        onClick={handleReset}
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
      >
        Reset Data
      </Button>
    </Box>
  );
};

export default Tracker;
