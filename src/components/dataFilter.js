import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Card, CardHeader, CardContent } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const data = [
  {
    id: "a",
    name: "amit",
    date: 1578508200000,
    amount: 1000,
  },
  {
    id: "b",
    name: "bob",
    date: 1581186600000,
    amount: 1500,
  },
  {
    id: "c",
    name: "camsmith",
    date: 1586370600000,
    amount: 2000,
  },
  {
    id: "d",
    name: "damgorge",
    date: 1591641000000,
    amount: 2500,
  },
  {
    id: "e",
    name: "edmire",
    date: 1596911400000,
    amount: 3000,
  },
  {
    id: "f",
    name: "faran",
    date: 1602181800000,
    amount: 3500,
  },
  {
    id: "g",
    name: "gorge",
    date: 1607452200000,
    amount: 4000,
  },
  {
    id: "h",
    name: "hari",
    date: 1604860200000,
    amount: 4500,
  },
  {
    id: "i",
    name: "indu",
    date: 1599589800000,
    amount: 5000,
  },
  {
    id: "j",
    name: "jan smith",
    date: 1594233000000,
    amount: 5500,
  },
  {
    id: "k",
    name: "khushi",
    date: 1588962600000,
    amount: 6000,
  },
  {
    id: "l",
    name: "laxmi",
    date: 1583692200000,
    amount: 6500,
  },
];

export default function BasicTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState({
    from: "",
    to: "",
  });

  const [datefrom, setDateFrom] = React.useState(null);
  const [dateto, setDateTo] = React.useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function DateFilter(Data, from, to) {
    var FilteredData = [...Data];
    if (from !== null) {
      FilteredData = FilteredData.filter((item) => item.date >= from);
    }
    if (to !== null) {
      FilteredData = FilteredData.filter((item) => item.date <= to);
    }
    return FilteredData;
  }

  function AmountFilter(Data, from, to) {
    var FilteredData = [...Data];
    if (from !== "") {
      FilteredData = FilteredData.filter((item) => item.amount >= from);
    }
    if (to !== "") {
      FilteredData = FilteredData.filter((item) => item.amount <= to);
    }
    return FilteredData;
  }

  function NameFilter(Data, name) {
    var FilteredData = [...Data];
    if (name !== "") {
      FilteredData = FilteredData.filter((item) => item.name.includes(name));
    }
    return FilteredData;
  }

  function ApplyPagination(Data, page, size) {
    var PaginatedData = [...Data];
    const startIndex = page * size;
    const lastIndex = Math.min(startIndex + size, Data.length);
    return PaginatedData.slice(startIndex, lastIndex);
  }

  function applyFilters(Data) {
    var FilteredData = [...Data];
    FilteredData = NameFilter(FilteredData, name);
    FilteredData = DateFilter(FilteredData, datefrom, dateto);
    FilteredData = AmountFilter(FilteredData, amount.from, amount.to);
    return FilteredData;
  }

  function Paginate(Data) {
    var FilteredData = [...Data];
    FilteredData = ApplyPagination(FilteredData, page, rowsPerPage);
    return FilteredData;
  }

  function getDateString(date) {
    const Month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const DateObj = new Date(date);
    return `${DateObj.getDate()}-${
      Month[DateObj.getMonth()]
    }-${DateObj.getFullYear()}`;
  }

  return (
    <div style={{ margin: 20 }}>
      <Grid container>
        <Grid xs={4}>
          <Card style={{ margin: 15 }}>
            <h3 style={{ marginLeft: 15, marginBottom: -20 }}>Enter Name</h3>
            <CardContent>
              <Grid
                md={6}
                sm={6}
                xs={6}
                style={{ marginTop: 10, marginBottom: 15 }}
              >
                <TextField
                  id="standard-search"
                  label="Name"
                  type="search"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={4}>
          <Card style={{ margin: 15 }}>
            <h3 style={{ marginLeft: 15, marginBottom: -20 }}>Select Amount</h3>
            <CardContent>
              <Grid container>
                <Grid
                  item
                  md={6}
                  sm={6}
                  xs={6}
                  style={{ marginTop: 10, marginBottom: 15 }}
                >
                  <TextField
                    id="standard-basic"
                    label="From"
                    type="number"
                    value={amount.from}
                    onChange={(e) =>
                      setAmount({ ...amount, from: e.target.value })
                    }
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  sm={6}
                  xs={6}
                  style={{ marginTop: 10, marginBottom: 15 }}
                >
                  <TextField
                    id="standard-basic"
                    label="To"
                    type="number"
                    value={amount.to}
                    onChange={(e) =>
                      setAmount({ ...amount, to: e.target.value })
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid xs={4}>
          <Card style={{ margin: 15 }}>
            <h3 style={{ marginLeft: 15, marginBottom: -20 }}>Select Date</h3>
            <CardContent>
              <Grid container>
                <Grid md={6} sm={6} xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="From"
                      value={datefrom}
                      onChange={(date) => setDateFrom(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid md={6} sm={6} xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="To"
                      value={dateto}
                      onChange={(date) => setDateTo(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Grid container justify={"center"} style={{ marginTop: 30 }}>
        <Grid md={11} sm={11} xs={11}>
          <TableContainer component={Card}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <p style={{ fontWeight: "bolder", fontSize: 18 }}>SN</p>
                  </TableCell>
                  <TableCell align="right">
                    <p style={{ fontWeight: "bolder", fontSize: 18 }}>Name</p>
                  </TableCell>
                  <TableCell align="right">
                    <p style={{ fontWeight: "bolder", fontSize: 18 }}>Amount</p>
                  </TableCell>
                  <TableCell align="right">
                    <p style={{ fontWeight: "bolder", fontSize: 18 }}>
                      PaymentDate
                    </p>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Paginate(applyFilters(data)).map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">
                      {getDateString(row.date)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={applyFilters(data).length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}
