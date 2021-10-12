import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
// import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import NumericInput from 'react-numeric-input';
import Button from '@mui/material/Button';
import { apiGetRdProbe } from '../Request/api';

const rcpTypeOptions = [
    {
        value: 'MPPT',
        label: 'MPPT',
    },
    {
        value: 'SPECS',
        label: 'SPECS',
    }
]
const tlDirectionOptions = [
    {
        value: 'H',
        label: 'H',
    },
    {
        value: 'V',
        label: 'V',
    }
]

class SubmitJob extends React.Component {
    // export default function SubmitJob() {
    // const [age, setAge] = React.useState('');
    constructor(props) {
        super(props);
        this.state = {
            rcpName: '',
            rcpType: '',
            tlDirection: '',
            rcpNotch: 0,
            rcpProbeCard: '',
            rlfZoomX: 0,
            rlfZoomY: 0,
            testStage: '',
            tl3: '',
            tl2: '',
            selectedFileForDIE: null,
            selectedFileForTST: null,
            selectedFileForLIM: null,
            selectedFileForWAF: null,
            rcpProbeCardOptions: [],
            testStageOptions: [{
                value: 'H',
                label: 'H',
            },
            {
                value: 'V',
                label: 'V',
            }],
            tl3Options: [{
                value: 'H',
                label: 'H',
            },
            {
                value: 'V',
                label: 'V',
            }],
            tl2Options: [{
                value: 'H',
                label: 'H',
            },
            {
                value: 'V',
                label: 'V',
            }]
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNotchInput = this.handleNotchInput.bind(this);
        apiGetRdProbe()
            .then(res =>
                this.setState({ "rcpProbeCardOptions": res.data })
            )
            .catch(err => {
                console.log(err);
            });
    }
    // const handleChange = event => {
    // setAge(event.target.value);
    // };
    handleInputChange(event) {
        // 從 event object 拿到 target
        const target = event.target;
        // 從 target.type 可以知道欄位的 type
        // 分別再從 target.checked 得到選取的狀態
        // 或從 target.value 取出輸入的欄位值
        const value = target.type === 'checkbox' ? target.checked : target.value;

        // 從 target.name 得到該欄位設定的 name
        const name = target.name;
        console.log(name);
        console.log(value);
        // 分別更新不同 name 欄位的 state
        this.setState({
            [name]: value
        });
        console.log(this.state);
    }
    handleNotchInput(event) {
        this.setState({ "rcpNotch": event });
        console.log(this.state);
    }
    onFileChange = event => {

        // Update the state
        this.setState({ [event.target.name]: event.target.files[0] });

    };
    onSubmit = event => {
        const formData = new FormData();
		formData.append('File', this.state.selectedFileForDIE);
    }
    async componentDidMount() {
        console.log("componentDidMount")

    }

    render() {
        return (
            <div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField name="rcpName" id="recipe-name-input" label="New Recipe Name" variant="standard" onChange={this.handleInputChange} />

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
                    <InputLabel>RD Recipe Notch</InputLabel>
                    <NumericInput name="rcpNotch"
                        id="standard-input-rcpNotch"
                        label="RD Recipe Notch" step={90} precision={0} max={270} min={0} onChange={this.handleNotchInput} />
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
                    <TextField name="rlfZoomX" id="rlfZoomX-input" label="RLF Zoom X" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} InputLabelProps={{ shrink: true }} onChange={this.handleInputChange} />
                    <TextField name="rlfZoomY" id="rlfZoomY-input" label="RLF Zoom Y" variant="standard" inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} InputLabelProps={{ shrink: true }} onChange={this.handleInputChange} />
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
                    
                    <InputLabel>DIE</InputLabel><input name="selectedFileForDIE" type="file" onChange={this.onFileChange} />
                    <InputLabel>TST</InputLabel> <input name="selectedFileForTST" type="file" onChange={this.onFileChange} />
                    <InputLabel>LIM</InputLabel><input name="selectedFileForLIM" type="file" onChange={this.onFileChange} />
                    <InputLabel>WAF</InputLabel><input name="selectedFileForWAF" type="file" onChange={this.onFileChange} />
                    <Button variant="contained" onClick={this.onSubmit}>Submit</Button>
                </Box>
            </div>
        );
    }
}
export default SubmitJob;
