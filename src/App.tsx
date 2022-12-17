import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {TextFieldComponent} from "./components/TextField.component";

function App() {

  const [ passwordsList, setPasswordsList] = useState<IPassList[] | []>([])
  const [ passwordParams, setPasswordParams] = useState<IPasswordParams>(defaultPasswordReq)
  const [ errorsParams, setErrorsParams] = useState<IErrorsParams>(defaultErrorsParams)
  const [ passwordValue, setPasswordValue] = useState<string>('')

  const countValidPass = passwordsList.filter((item) => item.valid).length
  const countNotValidPass = passwordsList.filter((item) => !item.valid).length

  const isDisableCheck = passwordParams.reqLetter.length && passwordParams.minCount && passwordParams.maxCount && passwordValue.length

  const handleErrorsParams = () => {
    if (passwordParams.minCount > passwordParams.maxCount)
      return setErrorsParams({maxCountError: 'This value must be bigger than Min Count', minCountError: 'This value must be smaller than Max Count'})

    if (passwordParams.maxCount < passwordParams.minCount)
      return setErrorsParams({maxCountError: 'This value must be bigger than Min Count', minCountError: 'This value must be smaller than Max Count'})

    setErrorsParams({minCountError: '', maxCountError: ''})
  }

  useEffect(() => {
    handleErrorsParams()
  },[passwordParams])

  const handleReqLetter = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { target } = e
    if(target.value.trim().length > 1) return;
    setPasswordParams({...passwordParams, reqLetter: target.value.trim()})
  }

  const handleMinCount = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { target } = e
    if(target.value.trim().length > 3 || isNaN(Number(target.value))) return;
    setPasswordParams({...passwordParams, minCount: Number(target.value.trim())})
  }

  const handleMaxCount = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { target } = e
    if(target.value.trim().length > 3 || isNaN(Number(target.value))) return;
    setPasswordParams({...passwordParams, maxCount: Number(target.value.trim())})
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement> ) => {
    const { target } = e
    setPasswordValue(target.value.trim())
  }

  const handleCheckValidity = () => {
    if(!isDisableCheck) return;

    const regExp = new RegExp(passwordParams.reqLetter, 'gi')
    const reqLetters = passwordValue.match(regExp)

    if(!reqLetters) return;

    setPasswordsList([ ...passwordsList,
      {
        param: passwordParams.reqLetter,
        maxCount: passwordParams.maxCount,
        minCount: passwordParams.minCount, pass: passwordValue,
        valid: reqLetters.length >= passwordParams.minCount && reqLetters.length <= passwordParams.maxCount
      }])

    setPasswordParams(defaultPasswordReq)
    setErrorsParams(defaultErrorsParams)
    setPasswordValue('')
  }

  return (
    <div className="App">
      <Grid container spacing={2} justifyContent='center'>
        <TextFieldComponent title='Parameter (max length: 1)' value={passwordParams.reqLetter}
                            onChange={handleReqLetter}/>
        <TextFieldComponent title='Max Count' value={passwordParams.maxCount} onChange={handleMaxCount}
                            errorText={errorsParams.maxCountError}/>
        <TextFieldComponent title='Min Count' value={passwordParams.minCount} onChange={handleMinCount}
                            errorText={errorsParams.minCountError}/>
        <TextFieldComponent title='Enter Password' value={passwordValue} onChange={handlePassword}/>
      </Grid>
      <Grid container justifyContent='center' style={{marginTop: 40}}>
        <Grid item>
          <Button variant="contained"
                  onClick={handleCheckValidity}
                  disabled={!isDisableCheck}>
            Check
          </Button>
        </Grid>
      </Grid>
      {passwordsList.length ?
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
        }}>
          <TableContainer sx={{maxWidth: 650}}>
            <Typography>Valid: {countValidPass}</Typography>
            <Typography>Not Valid: {countNotValidPass}</Typography>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Req Param</TableCell>
                  <TableCell>Max Count</TableCell>
                  <TableCell>Min Count</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Is Valid</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {passwordsList.map((item, key) =>
                  <TableRow key={key}>
                    <TableCell>{item.param}</TableCell>
                    <TableCell>
                      <Typography>{item.minCount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.maxCount}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.pass}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{item.valid ? 'Valid' : 'Not Valid'}</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        : null
      }
    </div>
  );
}

const defaultPasswordReq = {
  reqLetter: '',
  minCount: 0,
  maxCount: 0,
}

const defaultErrorsParams = {
  minCountError: '',
  maxCountError: '',
}

interface IPasswordParams {
  reqLetter: string;
  minCount: number;
  maxCount: number;
}

interface IErrorsParams {
  minCountError: string;
  maxCountError: string;
}

interface IPassList {
  param: string;
  maxCount: number;
  minCount: number;
  pass: string;
  valid: boolean;
}

export default App;
