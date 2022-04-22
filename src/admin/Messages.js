import React, { useEffect } from "react";
import { filter } from "lodash";
import { useState } from "react";
// material
import {
  Box,
  Link,
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  Chip,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import UserListHead from "./TableHeader";
import axios from "axios";
import { BASE_URL } from "../constants/constants";
import MainCard from "../components/MainCard";
import {  styled } from "@mui/material/styles";
//import { AuthContext } from "../helpers/AuthContext";
import AnswersList from "./AnswersList";
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  {
    id: "name",
    alignRight: false,
    disablePadding: true,
    label: "Contact Name",
  },
  {
    id: "email",
    alignRight: false,
    disablePadding: false,
    label: "email",
  },
  {
    id: "phone",
    alignRight: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "company-name",
    alignRight: true,
    disablePadding: false,
    label: "Company Name",
  },
  {
    id: "actions",
    alignRight: false,
    disablePadding: false,
    label: "Actions",
  },
];
/* const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]; */
const InfoStyle = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-end",
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [USERLIST, setUSERLIST] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [viewDetail, setViewDetail] = useState(false);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  /* const [filterName, setFilterName] = useState(""); */
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isDeleting, setIsDeleting] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteResult, setDeleteResult] = useState({
    state: "success",
    message: "",
  });
  const handleClose = () => {
    setOpenDeleteModal(false);
    setSelectedMessage(null);
  };
  const onDeleteTeams = (message) => {
    setSelectedMessage(message);
    setDeleteResult({
      state: "success",
      message: "",
    });
    setIsDeleting(false);
    setOpenDeleteModal(true);
  };
  const onConfirmDelete = () => {
    setDeleteResult({
      state: "success",
      message: "",
    });
    setIsDeleting(true);
    axios
      .delete(`${BASE_URL}/api/questions/${selectedMessage.id}`, {
        headers: {
          accessTokenBolo: localStorage.getItem("accessTokenBolo"),
        },
      })
      .then((res) => {
        if (!res.data.error) {
          setDeleteResult({
            state: "success",
            message: "question deleted successfully!",
          });
          setIsDeleting(false);
          setApiData({
            state: "success",
            message: "",
            data: null,
          });
          setOpenDeleteModal(false);
          loadData();
        } else {
          setDeleteResult({
            state: "error",
            message: "Something went wrong while deleting question!",
          });
          setIsDeleting(false);
        }
      })
      .catch((error) => {
        setDeleteResult({
          state: "error",
          message: "Something went wrong while deleting question!",
        });
        setIsDeleting(false);
      });
  };
  

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  /* const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  }; */

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(
    USERLIST,
    getComparator(order, orderBy),
    /* filterName */""
  );
  
  const dataParse = (result) => {
    const emails = result.map((value, index) => ({
      id: value._id,
      name: value.contact_name,
      email: value.email,
      phone: value.phone,
      companyName: value.company_name,
      answers: value.answers,
      //date: formatDate(value.updatedAt),
    }));

    return emails;
  };

  const isUserNotFound = filteredUsers.length === 0;

  const onClickViewDetail = (message) => {
    setSelectedMessage(message);
    setViewDetail(true);
  };
  const onClickExitViewDetail = () => {
    setViewDetail(false);
    setSelectedMessage(null);
  };

  const [apiData, setApiData] = useState({
    state: "success",
    message: "",
    data: null,
  });
  const loadData = () => {
    axios
      .get(`${BASE_URL}/api/questions/`, {
        headers: {
          accessTokenBolo: localStorage.getItem("accessTokenBolo")
            ? localStorage.getItem("accessTokenBolo")
            : null,
        },
      })
      .then((response) => {
        if (!response.data.error) {
          setUSERLIST(dataParse(response.data.results.users.docs));
          setApiData({
            state: "success",
            message: response.data.message,
            data: dataParse(response.data.results.users.docs),
          });
        } else {
          setApiData({
            state: "error",
            message: response.data.message,
            data: null,
          });
        }
      })
      .catch((error) => {
        setApiData({
          state: "error",
          message: error.message,
          data: null,
        });
      });
  };
  useEffect(() => {
    loadData();
  },[]);

  //const { authState } = useContext(AuthContext);
  return apiData.data ? (
    <>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            All Client Messages
          </Typography>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to="#"
            //startIcon={<Icon icon={plusFill} />}
            onClick={() => onAddTeams(null)}
          >
            Add Message
          </Button> */}
        </Stack>
        {viewDetail && selectedMessage ? (
          <MainCard border={false} title={selectedMessage.name}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Email:{" "}
              <Link
                href={`mailto:${selectedMessage.email}?Subject=Hello ${selectedMessage.name}`}
              >
                {selectedMessage.email}
              </Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Phone Number:{" "}
              <Link href={`#`}>{selectedMessage.phone || "Not Found"}</Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Company Name:{" "}
              <Link href={`#`}>{selectedMessage.companyName}</Link>
            </Typography>
            <Box sx={{ mt: 4, mx: 5, mb: 3 }}>
              <AnswersList answers={selectedMessage.answers} />
            </Box>
            <InfoStyle>
              <Button onClick={onClickExitViewDetail}>back</Button>
            </InfoStyle>
          </MainCard>
        ) : (
          <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const isItemSelected = selected.indexOf(row.id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, row.id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={row.name} src={row.avatar} />
                              <Typography variant="subtitle2" noWrap>
                                {row.name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="right">{row.email}</TableCell>
                          <TableCell align="right">{row.phone}</TableCell>
                          <TableCell align="right">{row.companyName}</TableCell>

                          <TableCell align="right">
                            <Stack direction="row" spacing={1}>
                              <Chip
                                label="View Detail"
                                component="a"
                                color="info"
                                href="#basic-chip"
                                variant="outlined"
                                clickable
                                onClick={() => onClickViewDetail(row)}
                              />
                              {/*  <Chip
                                label="Edit"
                                component="a"
                                color="success"
                                href="#basic-chip"
                                variant="outlined"
                                clickable
                                onClick={() => onAddTeams(row)}
                              /> */}
                              <Chip
                                label="Delete"
                                component="a"
                                color="error"
                                href="#basic-chip"
                                variant="outlined"
                                clickable
                                onClick={() => onDeleteTeams(row)}
                              />
                            </Stack>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 53 * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <h5>No data found</h5>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={USERLIST.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
      <Dialog
        open={openDeleteModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Question?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            are you sure you want to delete selected question.
          </DialogContentText>
        </DialogContent>

        {deleteResult.message && deleteResult.message !== "" && (
          <Alert severity={deleteResult.state} variant="outlined">
            {deleteResult.message}
          </Alert>
        )}
        <DialogActions>
          <Button disabled={isDeleting} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={isDeleting} onClick={onConfirmDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : apiData.message && apiData.message !== "" ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100%",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Alert severity="error" variant="outlined">
        {apiData.message}
      </Alert>
    </div>
  ) : (
    <div
      style={{
        width: "100%",
        display: "flex",
        height: "100%",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress
        variant="indeterminate"
        disableShrink
        style={{
          color: "#00AB55",
          animationDuration: "550ms",
          position: "absolute",
        }}
        size={40}
        thickness={4}
      />
    </div>
  );
}
