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
                            <TableCell sx={{ color: "black" }}>Email</TableCell>
                            <TableCell sx={{ color: "black" }}>Password</TableCell>
                            <TableCell sx={{ color: "black" }}>Role</TableCell>
                            <TableCell sx={{ color: "black" }}>Make Admin</TableCell>
                            <TableCell sx={{ color: "black" }}>Remove Admin</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {alldata ? (
                            alldata?.reverse().map((user) => (
                                <TableRow key={user._id} order={user}>
                                    <TableCell sx={{ color: "black" }}>{user.email}</TableCell>
                                    <TableCell sx={{ color: "black" }}>{user.password}</TableCell>
                                    <TableCell sx={{ color: "black" }}>{user.role}</TableCell>
                                    <TableCell sx={{ color: "black" }}>
                                        <Button
                                            size="small"
                                            onClick={() => handleUpdate(user._id, "admin")}
                                        >
                                            Make Admin
                                        </Button></TableCell>
                                    <TableCell sx={{ color: "black" }}>
                                        <Button
                                            size="small"
                                            onClick={() => handleUpdate(user._id, "user")}
                                        >
                                            Remove Admin
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