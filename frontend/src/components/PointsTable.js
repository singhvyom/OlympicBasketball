import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function PointsTable({data}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="points table">
        <TableHead>
          <TableRow>
            <TableCell>Team (country name)</TableCell>
            <TableCell align="center">PTS</TableCell>
            <TableCell align="center">GP</TableCell>
            <TableCell align="center">W</TableCell>
            <TableCell align="center">L</TableCell>
            <TableCell align="center">Scored</TableCell>
            <TableCell align="center">Against</TableCell>
            <TableCell align="center">Diff</TableCell>
            <TableCell align="center">Qualified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.team}>
              <TableCell component="th" scope="row">
                {row.team}
              </TableCell>
              <TableCell align="center">{row.pts}</TableCell>
              <TableCell align="center">{row.played}</TableCell>
              <TableCell align="center">{row.won}</TableCell>
              <TableCell align="center">{row.lost}</TableCell>
              <TableCell align="center">{row.scored}</TableCell>
              <TableCell align="center">{row.against}</TableCell>
              <TableCell align="center">{row.dif}</TableCell>
              <TableCell align="center">{row.qualified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}