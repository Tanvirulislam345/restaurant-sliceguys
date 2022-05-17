import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from 'react';

const UsersListResult = ({ alldata, handleUpdate }) => {
    return (
        <Paper elevation={3} sx={{ p: 1 }}>
            <TableContainer sx={{ backgroundColor: "#E5E5E5", color: "white" }}>
                <Table aria-label="spanning table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#F2D7D5" }}>Email</TableCell>
                            <TableCell sx={{ color: "#F2D7D5" }}>Password</TableCell>
                            <TableCell sx={{ color: "#F2D7D5" }}>Role</TableCell>
                            <TableCell sx={{ color: "#F2D7D5" }}>Make Admin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alldata ? (
                            alldata?.reverse().map((user) => (
                                <TableRow key={user._id} order={user}>
                                    <TableCell sx={{ color: "#F2D7D5" }}>{user.email}</TableCell>
                                    <TableCell sx={{ color: "#F2D7D5" }}>{user.password}</TableCell>
                                    <TableCell sx={{ color: "#F2D7D5" }}>{user.role}</TableCell>
                                    <TableCell sx={{ color: "#F2D7D5" }}>
                                        <Button
                                            size="small"
                                            onClick={() => handleUpdate(user._id)}
                                        >
                                            Make Admin
                                        </Button></TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableCell>loadding...</TableCell>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default UsersListResult;