import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";

type Props = {
     options: { value: string, label: string }[];
     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
     selectedValue: string;
}

export default function RadioButtonGroup({ options, onChange, selectedValue }: Props) {
     return (
          <FormControl>
               <RadioGroup 
                    onChange={onChange} 
                    value={selectedValue} 
                    sx={{ my: 0 }}
                    >
                    {options.map(({ value, label }) => (
                         <FormControlLabel key={value}
                              control={<Radio color="secondary" sx={{ py: 0.7 }} />}
                              label={label}
                              value={value}
                         />
                    ))}
               </RadioGroup>
          </FormControl>
     )
}