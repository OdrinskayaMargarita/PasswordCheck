import {Grid, TextField, Typography} from "@mui/material";
import React from "react";

interface IProps {
  title: string;
  value: string | number;
  onChange: (e: any) => void | Promise<void>;
  errorText?: string;
}

export const TextFieldComponent: React.FC<IProps> = ({ title, value, onChange, errorText }) => {
  return(
    <Grid item>
      <Typography>{title}</Typography>
      <TextField variant="outlined" value={value} onChange={onChange}/>
      <Typography variant='body2' style={{color: '#FFA07A', maxWidth: 180}}>{errorText ?? ''}</Typography>
    </Grid>
  )
}
