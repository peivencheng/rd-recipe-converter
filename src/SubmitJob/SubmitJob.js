import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
// import FormHelperText from '@mui/material/FormHelperText';
// import Select from '@mui/material/Select';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { apiGetRdProbe } from "../Request/api";
import { apiSubmitJob } from "../Request/api";

const rcpTypeOptions = [
  {
    value: "MPPT",
    label: "MPPT",
  },
  {
    value: "SPECS",
    label: "SPECS",
  },
];
const tlDirectionOptions = [
  {
    value: "H",
    label: "H",
  },
  {
    value: "V",
    label: "V",
  },
];
const rcpNotchOptions = [
  {
    value: "0",
    label: "0",
  },
  {
    value: "90",
    label: "90",
  },
  {
    value: "180",
    label: "180",
  },
  {
    value: "270",
    label: "270",
  },
];

class SubmitJob extends React.Component {
  // export default function SubmitJob() {
  // const [age, setAge] = React.useState('');
  constructor(props) {
    super(props);
    this.state = {
      rcpName: "",
      rcpType: "",
      tlDirection: "",
      rcpNotch: 0,
      rcpProbeCard: "",
      rlfZoomX: 0,
      rlfZoomY: 0,
      testStage: "",
      tl3: "",
      tl2: "",
      selectedFileForDIE: null,
      selectedFileForTST: null,
      selectedFileForLIM: null,
      selectedFileForWAF: null,
      rcpProbeCardOptions: [
        {
          value: "H",
          label: "H",
        },
        {
          value: "V",
          label: "V",
        },
      ],
      testStageOptions: [
        {
          value: "H",
          label: "H",
        },
        {
          value: "V",
          label: "V",
        },
      ],
      tl3Options: [
        {
          value: "H",
          label: "H",
        },
        {
          value: "V",
          label: "V",
        },
      ],
      tl2Options: [
        {
          value: "H",
          label: "H",
        },
        {
          value: "V",
          label: "V",
        },
      ],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNotchInput = this.handleNotchInput.bind(this);
    apiGetRdProbe()
      .then((res) => this.setState({ rcpProbeCardOptions: res.data }))
      .catch((err) => {
        console.log(err);
      });
  }
  // const handleChange = event => {
  // setAge(event.target.value);
  // };
  handleInputChange(event) {
    // ??? event object ?????? target
    const target = event.target;
    // ??? target.type ????????????????????? type
    // ???????????? target.checked ?????????????????????
    // ?????? target.value ????????????????????????
    const value = target.type === "checkbox" ? target.checked : target.value;

    // ??? target.name ???????????????????????? name
    const name = target.name;
    // ?????????????????? name ????????? state
    this.setState({
      [name]: value,
    });
    console.log(this.state);
  }
  handleNotchInput(event) {
    this.setState({ rcpNotch: event });
    console.log(this.state);
  }
  onFileChange = (event) => {
    // Update the state
    this.setState({ [event.target.name]: event.target.files[0] });
  };
  onSubmit = (event) => {
    const formData = new FormData();
    formData.append("DIE", this.state.selectedFileForDIE);
    formData.append("TST", this.state.selectedFileForTST);
    formData.append("LIM", this.state.selectedFileForLIM);
    formData.append("WAF", this.state.selectedFileForWAF);
    apiSubmitJob()
      .then((res) => this.setState({ rcpProbeCardOptions: res.data }))
      .catch((err) => {
        console.log(err);
      });
  };
  async componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            name="rcpName"
            id="recipe-name-input"
            label="New Recipe Name"
            variant="standard"
            onChange={this.handleInputChange}
          />
          <TextField
            name="rcpType"
            id="standard-select-recipetype"
            select
            label="RD Recipe Type"
            value={this.state.rcpType}
            onChange={this.handleInputChange}
            helperText="Please select your recipe type"
            variant="standard"
          >
            {rcpTypeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="tlDirection"
            id="standard-select-tldirection"
            select
            label="T/L Direction"
            value={this.state.tlDirection}
            onChange={this.handleInputChange}
            helperText="Please select your tl direction"
            variant="standard"
          >
            {tlDirectionOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="rcpNotch"
            id="standard-select-rcpNotch"
            select
            label="RD Recipe Notch"
            value={this.state.rcpNotch}
            onChange={this.handleInputChange}
            helperText="Please select your notch"
            variant="standard"
          >
            {rcpNotchOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="rcpProbeCard"
            id="standard-select-rcpProbeCard"
            select
            label="RD P/C"
            value={this.state.rcpProbeCard}
            onChange={this.handleInputChange}
            helperText="Please select your recipe probe card"
            variant="standard"
          >
            {this.state.rcpProbeCardOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="rlfZoomX"
            id="rlfZoomX-input"
            label="RLF Zoom X"
            variant="standard"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputLabelProps={{ shrink: true }}
            onChange={this.handleInputChange}
          />
          <TextField
            name="rlfZoomY"
            id="rlfZoomY-input"
            label="RLF Zoom Y"
            variant="standard"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            InputLabelProps={{ shrink: true }}
            onChange={this.handleInputChange}
          />
          <TextField
            name="testStage"
            id="standard-select-testStage"
            select
            label="Test Stage"
            value={this.state.testStage}
            onChange={this.handleInputChange}
            helperText="Please select your tl direction"
            variant="standard"
          >
            {this.state.testStageOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="tl3"
            id="standard-select-tl3"
            select
            label="TL3"
            value={this.state.tl3}
            onChange={this.handleInputChange}
            helperText="Please select your TL3"
            variant="standard"
          >
            {this.state.tl3Options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="tl2"
            id="standard-select-tl2"
            select
            label="TL2"
            value={this.state.tl2}
            onChange={this.handleInputChange}
            helperText="Please select your TL2"
            variant="standard"
          >
            {this.state.tl2Options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <InputLabel>DIE</InputLabel>
          <input
            name="selectedFileForDIE"
            type="file"
            onChange={this.onFileChange}
          />
          <InputLabel>TST</InputLabel>{" "}
          <input
            name="selectedFileForTST"
            type="file"
            onChange={this.onFileChange}
          />
          <InputLabel>LIM</InputLabel>
          <input
            name="selectedFileForLIM"
            type="file"
            onChange={this.onFileChange}
          />
          <InputLabel>WAF</InputLabel>
          <input
            name="selectedFileForWAF"
            type="file"
            onChange={this.onFileChange}
          />
          <div style={{ float: "right" }}>
            <Button variant="contained" onClick={this.onSubmit}>
              Submit
            </Button>
          </div>
        </Box>
      </div>
    );
  }
}
export default SubmitJob;
